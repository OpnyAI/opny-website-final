import Head from "next/head";
import Card from "../components/Card";
import Image from "next/image";
import { useRef } from "react";

const logoUrl = "/logo-opny.png";

const carouselItems = [
  {
    icon: "📄",
    title: "KI-Angebotsgenerator",
    desc: "Erstelle professionelle, individuelle Angebote in Sekunden – automatisch, korrekt und versandfertig.",
  },
  {
    icon: "💬",
    title: "Website-Chatbot",
    desc: "Beantworte Besucherfragen rund um die Uhr – persönlich, präzise, KI-gestützt und DSGVO-konform.",
  },
  {
    icon: "📧",
    title: "E-Mail Assistent",
    desc: "Lasse Standardantworten, Follow-ups oder Beschwerden automatisch und stilvoll von KI schreiben.",
  },
  {
    icon: "❓",
    title: "Q&A System",
    desc: "Deine interne Wissensdatenbank als smarte KI-Lösung – beantworte Team- oder Kundenfragen blitzschnell.",
  },
  {
    icon: "📊",
    title: "Analytics & Insights",
    desc: "Automatische Auswertungen und Handlungsempfehlungen auf Basis deiner Geschäftsdaten – KI, die versteht!",
  },
  {
    icon: "🛠️",
    title: "Individuelle KI-Systeme (Projektbasiert)",
    desc: "Wir entwickeln und implementieren KI-Lösungen, die perfekt auf die Prozesse und Ziele deines Unternehmens zugeschnitten sind.",
  },
  {
    icon: "🚀",
    title: "Weitere KI-Tools (bald)",
    desc: "Stetig wachsendes Angebot: Individuelle Workflows, Automatisierungen und Integrationen – ganz nach Bedarf.",
  },
];

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = () => {
    if (carouselRef.current) {
      const amount = carouselRef.current.offsetWidth * 0.9;
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>Opny – KI-Tools für KMU</title>
        <meta name="description" content="Opny – KI-Startup für KMU. KI-Angebotsgenerator, Website Chatbot, E-Mail Assistent, Q&A-System, Analytics und individuelle KI-Implementierungen." />
      </Head>

      {/* Apple-Style Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm border-b border-gray-100">
        <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
          {/* Logo & Schriftzug, perfekt vertikal ausgerichtet */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex items-center h-9">
              <Image src={logoUrl} alt="Opny Logo" width={36} height={36} className="object-contain" priority />
            </div>
            <span className="text-xl font-bold text-gray-900 leading-none flex items-center" style={{ marginTop: 2 }}>
              Opny
            </span>
          </a>
          <div className="flex items-center gap-8">
            <a href="#tools" className="text-gray-700 hover:text-blue-700 transition">KI-Tools</a>
            <a href="#kontakt" className="text-gray-700 hover:text-blue-700 transition">Kontakt</a>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 ml-3 hidden md:inline-block">
              Pilotphase
            </span>
          </div>
        </nav>
      </header>

      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-blue-50 via-white to-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-blue-700">KI greifbar für KMU</span><br /> – mit Opny.
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-4 text-gray-700">
            Der schnellste Weg zu smarter Automatisierung:<br />
            Angebote, E-Mails, Chatbots, Wissensdatenbank, Analyse – alles nahtlos integriert.
          </p>
          <p className="text-base text-gray-500 mb-8">
            Opny ist ein unabhängiges deutsches <b>KI-Startup</b> – aktuell in der Pilotphase. <br />
            Du willst mehr? Wir implementieren auch individuelle KI-Lösungen projektbasiert.
          </p>
          {/* Garantiert funktionierender Mailto-Button */}
          <a
            href="mailto:kontakt@opny.ai?subject=Pilotkunde%20Opny"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-800 transition mb-2"
          >
            Pilotkunde werden
          </a>
          <p className="text-gray-400 mt-2">Kostenlos & unverbindlich – Early Access sichern</p>
        </section>

        {/* Tools as Apple-Style Carousel */}
        <section className="py-20 bg-gray-50" id="tools">
          <h2 className="text-4xl font-bold text-center mb-10">Deine Opny KI-Tools</h2>
          <div className="relative max-w-6xl mx-auto">
            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex gap-8 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory hide-scrollbar"
              style={{ scrollBehavior: "smooth" }}
            >
              {carouselItems.map((item, idx) => (
                <div
                  key={item.title}
                  className="min-w-[340px] max-w-[350px] snap-start flex-shrink-0 transition-transform duration-300"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Card className="h-full flex flex-col items-center text-center justify-between shadow-lg hover:shadow-2xl transition-shadow bg-white rounded-3xl border border-gray-200">
                    <span className="text-5xl mb-4">{item.icon}</span>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </Card>
                </div>
              ))}
              {/* Apple-Style: kein „Leisten“-Hinweis, dezenter Arrow */}
              <button
                aria-label="Weiter"
                onClick={scrollCarousel}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-50 text-blue-700 shadow-md rounded-full p-2 transition hidden md:block"
                style={{ border: "1.5px solid #d1d5db" }}
              >
                <span className="text-3xl font-bold">&rsaquo;</span>
              </button>
            </div>
          </div>
          <div className="text-center mt-6 text-gray-500">… und viele weitere Tools kommen laufend hinzu!</div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-10">Echte Praxisbeispiele</h2>
            <div className="space-y-6 text-lg text-gray-800">
              <p>„Wir beantworten Angebotsanfragen jetzt in 30 Sekunden statt in 10 Minuten.“</p>
              <p>„Kunden erhalten auch nachts sofort Hilfe durch unseren KI-Chatbot – ohne zusätzliches Personal.“</p>
              <p>„Opny übernimmt Standard-E-Mails – wir sparen täglich 2 Stunden Zeit.“</p>
              <p>„Unser Q&A-System erleichtert die Einarbeitung neuer Teammitglieder enorm.“</p>
              <p>„Für unser Projekt haben wir mit Opny ein komplett eigenes KI-System aufgebaut, das uns einen echten Wettbewerbsvorteil verschafft.“</p>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-20 bg-gradient-to-b from-blue-50 via-white to-white text-center" id="kontakt">
          <h2 className="text-3xl font-bold mb-4">Bereit, als Pilotkunde zu starten?</h2>
          <p className="text-lg mb-8 text-gray-700">
            Fordere jetzt Zugang zu Opny an oder vereinbare eine persönliche Demo.<br />
            Oder sprich mit uns über eine projektbasierte, individuelle KI-Implementierung – wir beraten dich persönlich!
          </p>
          {/* Garantiert funktionierender Mailto-Button */}
          <a
            href="mailto:kontakt@opny.ai?subject=Pilotkunde%20Opny"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-800 transition"
          >
            Pilotkunde werden
          </a>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center text-sm">
        <p>© 2025 Opny. Alle Rechte vorbehalten.</p>
        <p className="mt-2">kontakt@opny.ai</p>
      </footer>

      {/* Apple-Style: Scrollbar verstecken */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
