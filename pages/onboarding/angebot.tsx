import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

type Service = {
  name: string;
  description: string;
  unit: string;
  price: string;
};

const BRANCHEN = [
  "Handwerk", "IT-Dienstleistung", "Beratung", "Agentur", "Gesundheitswesen", "Anwalt/Kanzlei", "Baugewerbe", "Finanzen/Steuern", "Handel/E-Commerce", "Gastronomie", "Logistik", "Sonstiges"
];

export default function OnboardingAngebot() {
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState("");
  const [branche, setBranche] = useState("");
  const [brancheCustom, setBrancheCustom] = useState("");
  const [website, setWebsite] = useState("");
  const [contact, setContact] = useState({ name: "", email: "" });
  const [address, setAddress] = useState("");
  const [tax_id, setTaxId] = useState("");
  const [phone, setPhone] = useState("");
  const [logo_url, setLogoUrl] = useState("");
  const [bank_name, setBankName] = useState("");
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");
  const [footer_text, setFooterText] = useState("");
  const [signature_text, setSignatureText] = useState("");
  const [payment_terms, setPaymentTerms] = useState("");
  const [validity_days, setValidityDays] = useState(14);
  const [preismodell, setPreismodell] = useState<string[]>([]);
  const [intro, setIntro] = useState("");
  const [outro, setOutro] = useState("");
  const [tonality, setTonality] = useState("");
  const [pflicht, setPflicht] = useState("");
  const [special, setSpecial] = useState("");
  const [services, setServices] = useState<Service[]>([{ name: "", description: "", unit: "", price: "" }]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Service-Helper
  const handleServiceChange = (idx: number, key: keyof Service, value: string) => {
    setServices(services => services.map((s, i) =>
      i === idx ? { ...s, [key]: value } : s
    ));
  };
  const addService = () => setServices(s => [...s, { name: "", description: "", unit: "", price: "" }]);
  const removeService = (idx: number) => setServices(s => s.length > 1 ? s.filter((_, i) => i !== idx) : s);

  // Wizard: Navigation
  const next = () => setStep(step => Math.min(step + 1, 5));
  const back = () => setStep(step => Math.max(step - 1, 1));

  // Gesamtes Profil speichern (nach Schritt 5)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Eingeloggten User holen
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Fehler: Kein eingeloggter User.");
      setLoading(false);
      return;
    }

    // Profil anlegen – IMMER user_id verknüpfen!
    const { data: profileData, error: profileError } = await supabase
      .from("generator_profiles")
      .insert([{
        company,
        branche: branche === "Sonstiges" ? brancheCustom : branche,
        website,
        contact_name: contact.name,
        contact_email: contact.email,
        address,
        tax_id,
        phone,
        logo_url,
        bank_name,
        iban,
        bic,
        footer_text,
        signature_text,
        payment_terms,
        validity_days,
        preismodell,
        intro,
        outro,
        tonality,
        pflicht,
        special,
        user_id: user.id // <<< entscheidend!
      }])
      .select()
      .single();

    if (profileError) {
      alert("Fehler beim Speichern des Profils: " + profileError.message);
      setLoading(false);
      return;
    }
    const profile_id = profileData.id;

    // Leistungen speichern (nur mit dieser profile_id!)
    const servicesPayload = services
      .filter(s => s.name)
      .map(s => ({
        profile_id,
        ...s
      }));
    if (servicesPayload.length > 0) {
      const { error: servicesError } = await supabase
        .from("generator_services")
        .insert(servicesPayload);
      if (servicesError) {
        alert("Fehler beim Speichern der Leistungen: " + servicesError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    router.push("/offer-generator");
  };

  // Fortschrittsbalken
  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center px-2">
      <div className="relative w-full max-w-2xl">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-36 bg-white/70 rounded-full blur-2xl opacity-60 z-0 pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-36 h-36 bg-black/10 rounded-full blur-2xl opacity-30 z-0 pointer-events-none" />
        <div className="relative z-10 rounded-2xl border border-white/60 shadow-2xl bg-white/80 backdrop-blur-xl px-8 md:px-12 py-10">
          <div className="mb-6">
            <div className="text-xs text-gray-400 mb-2">Schritt {step} von 5</div>
            <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
              <div className="bg-black h-2 rounded" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <h2 className="font-extrabold text-xl mb-4">Firmen- & Kontaktdaten</h2>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white" placeholder="Firmenname *"
                  value={company} onChange={e => setCompany(e.target.value)} required />
                <div className="flex gap-2">
                  <select className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white"
                    value={branche} onChange={e => setBranche(e.target.value)} required>
                    <option value="">Branche wählen *</option>
                    {BRANCHEN.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {branche === "Sonstiges" && (
                    <input type="text" className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white"
                      placeholder="Branche (Freitext)"
                      value={brancheCustom}
                      onChange={e => setBrancheCustom(e.target.value)}
                      required
                    />
                  )}
                </div>
                <input type="url" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  placeholder="Website (optional)" value={website} onChange={e => setWebsite(e.target.value)} />
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  placeholder="Adresse *" value={address} onChange={e => setAddress(e.target.value)} required />
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  placeholder="USt-ID / Steuernummer *" value={tax_id} onChange={e => setTaxId(e.target.value)} required />
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white"
                    placeholder="Ansprechpartner Name *"
                    value={contact.name}
                    onChange={e => setContact({ ...contact, name: e.target.value })}
                    required />
                  <input type="email" className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white"
                    placeholder="E-Mail *"
                    value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                    required />
                </div>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  placeholder="Telefonnummer" value={phone} onChange={e => setPhone(e.target.value)} />
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-extrabold text-xl mb-4">Branding & Logo</h2>
                <input type="url" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  placeholder="Logo-URL (optional)" value={logo_url} onChange={e => setLogoUrl(e.target.value)} />
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="font-extrabold text-xl mb-4">Bankdaten & Fußzeile</h2>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  placeholder="Bankname" value={bank_name} onChange={e => setBankName(e.target.value)} />
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white"
                    placeholder="IBAN" value={iban} onChange={e => setIban(e.target.value)} />
                  <input type="text" className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white"
                    placeholder="BIC" value={bic} onChange={e => setBic(e.target.value)} />
                </div>
                <textarea className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  rows={2} placeholder="Fußzeile (z.B. Bankdaten, AGB, Impressum)"
                  value={footer_text} onChange={e => setFooterText(e.target.value)} />
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  placeholder="Unterschrift / Signatur (optional)" value={signature_text} onChange={e => setSignatureText(e.target.value)} />
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="font-extrabold text-xl mb-4">Angebots-Einstellungen</h2>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white"
                    placeholder="Standard-Zahlungsbedingung" value={payment_terms} onChange={e => setPaymentTerms(e.target.value)} />
                  <input type="number" min={1} max={365} className="w-32 px-4 py-3 rounded-xl border border-gray-300 bg-white"
                    placeholder="Gültigkeit (Tage)" value={validity_days}
                    onChange={e => setValidityDays(Number(e.target.value))} />
                </div>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  placeholder="Wunsch-Einleitung (optional)" value={intro} onChange={e => setIntro(e.target.value)} />
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  placeholder="Wunsch-Abschlussformel (optional)" value={outro} onChange={e => setOutro(e.target.value)} />
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  value={tonality} onChange={e => setTonality(e.target.value)}>
                  <option value="">Wunsch-Tonalität wählen</option>
                  <option value="formell/siezen">Formell (Sie)</option>
                  <option value="locker/duzen">Locker (Du)</option>
                  <option value="neutral">Neutral</option>
                </select>
                <textarea className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  rows={2} placeholder="Pflichtangaben/Disclaimer (optional)" value={pflicht} onChange={e => setPflicht(e.target.value)} />
                <textarea className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                  rows={2} placeholder="Branchenspezifische Besonderheiten, Wünsche, Vorgaben (optional)"
                  value={special} onChange={e => setSpecial(e.target.value)} />
                <div>
                  <div className="font-semibold mb-1 mt-2">Preismodell</div>
                  <div className="flex flex-wrap gap-4">
                    {["Stundensatz", "Festpreis", "Einzelposten", "Mischkalkulation"].map(opt => (
                      <label key={opt} className="flex items-center gap-2">
                        <input type="checkbox"
                          checked={preismodell.includes(opt)}
                          onChange={e => {
                            setPreismodell(prev =>
                              e.target.checked ? [...prev, opt] : prev.filter(v => v !== opt)
                            )
                          }} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h2 className="font-extrabold text-xl mb-4">Typische Leistungen/Produkte</h2>
                {services.map((s, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <input type="text" className="flex-1 px-3 py-2 rounded-xl border border-gray-300 bg-white"
                      placeholder="Bezeichnung" value={s.name}
                      onChange={e => handleServiceChange(idx, "name", e.target.value)} required />
                    <input type="text" className="flex-1 px-3 py-2 rounded-xl border border-gray-300 bg-white"
                      placeholder="Standardbeschreibung (optional)" value={s.description}
                      onChange={e => handleServiceChange(idx, "description", e.target.value)} />
                    <input type="text" className="w-24 px-3 py-2 rounded-xl border border-gray-300 bg-white"
                      placeholder="Einheit" value={s.unit}
                      onChange={e => handleServiceChange(idx, "unit", e.target.value)} required />
                    <input type="number" className="w-28 px-3 py-2 rounded-xl border border-gray-300 bg-white"
                      placeholder="Preis (€)" value={s.price}
                      onChange={e => handleServiceChange(idx, "price", e.target.value)} />
                    {services.length > 1 && (
                      <button type="button"
                        className="px-2 py-1 bg-neutral-200 rounded-xl hover:bg-red-400 hover:text-white font-bold"
                        onClick={() => removeService(idx)}>-</button>
                    )}
                  </div>
                ))}
                <button type="button"
                  className="mt-1 px-4 py-2 bg-black text-white rounded-xl font-bold hover:bg-neutral-900"
                  onClick={addService}>+ Weitere Leistung</button>
              </>
            )}

            {/* Wizard-Navigation */}
            <div className="flex gap-2 mt-6">
              {step > 1 && (
                <button type="button"
                  className="px-6 py-3 rounded-xl border bg-white text-black font-bold border-gray-400 shadow hover:bg-gray-100"
                  onClick={back}
                  disabled={loading}>
                  Zurück
                </button>
              )}
              {step < 5 && (
                <button type="button"
                  className="px-6 py-3 rounded-xl bg-black text-white font-bold shadow hover:bg-neutral-900 transition"
                  onClick={next}
                  disabled={loading}>
                  Weiter
                </button>
              )}
              {step === 5 && (
                <button type="submit"
                  className="px-6 py-3 rounded-xl bg-black text-white font-bold shadow hover:bg-neutral-900 transition"
                  disabled={loading}>
                  {loading ? "Speichere..." : "Onboarding abschließen & Generator starten"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
