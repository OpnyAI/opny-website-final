import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import axios from "axios";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AngebotPDF } from "../components/AngebotPDF";

type Service = {
  id: number;
  name: string;
  description: string;
  unit: string;
  price: number;
};

export default function OfferGenerator() {
  const [profile, setProfile] = useState<any>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [customer, setCustomer] = useState({ name: "", email: "", adresse: "" });
  const [extraNotes, setExtraNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [angebotNummer, setAngebotNummer] = useState<string>("");
  const [angebotDatum, setAngebotDatum] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    async function fetchProfileAndServices() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
        return;
      }

      let { data: profiles, error: profErr } = await supabase
        .from("generator_profiles")
        .select("*")
        .eq("user_id", user.id);

      if (profErr || !profiles?.length) {
        alert("Kein Profil gefunden. Bitte Onboarding durchführen!");
        router.push("/onboarding/angebot");
        return;
      }

      const myProfile = profiles[0];
      setProfile(myProfile);

      let { data: servs } = await supabase
        .from("generator_services")
        .select("*")
        .eq("profile_id", myProfile.id);

      setServices(servs || []);

      setAngebotNummer("ANG-" + Date.now().toString().slice(-6));
      setAngebotDatum(new Date().toLocaleDateString("de-DE"));
    }
    fetchProfileAndServices();
  }, [router]);

  const total =
    services
      .filter((s) => selectedServices.includes(s.id))
      .reduce(
        (sum, s) => sum + (quantities[s.id] || 1) * (s.price || 0),
        0
      );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const selected = services.filter((s) => selectedServices.includes(s.id));
    const positionen = selected.map((s) => ({
      name: s.name,
      description: s.description,
      unit: s.unit,
      qty: quantities[s.id] || 1, // ACHTUNG: qty!
      price: s.price,
    }));

    const res = await axios.post("/api/angebote/generieren", {
      kundenname: customer.name,
      kundenmail: customer.email,
      positionen,
      extraNotes,
      profile,
      total,
    });

    setResponseText(res.data.angebot);
    console.log("GPT-Angebot:", res.data.angebot); // Debug!
    setLoading(false);
  };

  const angebotServices = services
    .filter(s => selectedServices.includes(s.id))
    .map(s => ({
      ...s,
      menge: quantities[s.id] || 1
    }));

  const kundeName = customer.name;
  const kundeAdresse = customer.adresse || "";

  return (
    <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center px-2">
      <div className="relative w-full max-w-2xl">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-36 bg-white/70 rounded-full blur-2xl opacity-60 z-0 pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-36 h-36 bg-black/10 rounded-full blur-2xl opacity-30 z-0 pointer-events-none" />
        <div className="relative z-10 rounded-2xl border border-white/60 shadow-2xl bg-white/80 backdrop-blur-xl px-8 md:px-12 py-10">
          <h1 className="font-extrabold text-2xl text-center mb-7">KI-Angebotsgenerator</h1>
          {profile && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                placeholder="Name des Angebotsempfängers"
                value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
              <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                placeholder="E-Mail"
                value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} />
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                placeholder="Empfängeradresse (optional)"
                value={customer.adresse}
                onChange={e => setCustomer({ ...customer, adresse: e.target.value })} />

              <div>
                <div className="font-semibold mb-1">Leistungen auswählen</div>
                {services.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 mb-2 bg-gray-100 px-3 py-2 rounded-xl border border-gray-300">
                    <input type="checkbox"
                      checked={selectedServices.includes(s.id)}
                      onChange={e => {
                        if (e.target.checked)
                          setSelectedServices(prev => [...prev, s.id]);
                        else
                          setSelectedServices(prev => prev.filter(id => id !== s.id));
                      }} />
                    {s.name} {s.unit && <>({s.unit})</>}
                    <input
                      type="number"
                      min={1}
                      placeholder="Menge"
                      className="w-16 ml-2 px-2 py-1 rounded border border-gray-300"
                      value={quantities[s.id] || 1}
                      onChange={e =>
                        setQuantities(q => ({ ...q, [s.id]: Number(e.target.value) }))
                      }
                      disabled={!selectedServices.includes(s.id)}
                    />
                    <span className="text-gray-500 text-sm">
                      {s.price ? (s.price + " €/" + (s.unit || "Einheit")) : ""}
                    </span>
                  </label>
                ))}
              </div>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                rows={2}
                placeholder="Zusätzliche Hinweise oder Wünsche (optional)"
                value={extraNotes}
                onChange={e => setExtraNotes(e.target.value)}
              />
              <div className="font-bold text-lg mb-2">
                💰 Gesamtpreis: {total} €
              </div>
              <button type="submit"
                className="w-full py-3 rounded-xl bg-black text-white font-bold text-base shadow hover:bg-neutral-900 transition"
                disabled={loading || selectedServices.length === 0}
              >
                {loading ? "Angebot wird generiert..." : "🚀 Angebot generieren"}
              </button>
            </form>
          )}
          {!profile && (
            <div className="text-center text-gray-500">Lade Kundendaten...</div>
          )}

          {/* Vorschau GPT-Angebot */}
          {responseText && (
            <div className="mt-8">
              <div className="font-semibold mb-2">Angebotsvorschau (KI-Text):</div>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50"
                rows={10}
                value={responseText}
                readOnly
              />
            </div>
          )}

          {/* PDF Download */}
          {responseText && angebotServices.length > 0 && profile && (
            <div className="flex justify-center mt-4">
              <PDFDownloadLink
                document={
                  <AngebotPDF
                    profile={profile}
                    angebot={{
                      intro: profile.intro,
                      outro: profile.outro,
                      gptText: responseText // <-- GPT-Text übergeben!
                    }}
                    services={angebotServices}
                    empfaenger={{ name: kundeName, adresse: kundeAdresse }}
                    angebotDatum={angebotDatum}
                    angebotNummer={angebotNummer}
                  />
                }
                fileName={`Angebot_${angebotNummer}.pdf`}
                style={{
                  padding: "12px 24px",
                  background: "#000",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: "bold",
                  textDecoration: "none"
                }}
              >
                📄 Angebot als PDF herunterladen
              </PDFDownloadLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
