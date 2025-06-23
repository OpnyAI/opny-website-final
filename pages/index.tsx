import Head from "next/head";
import Card from "../components/Card";
import Image from "next/image";
import React, { useState, useRef } from "react";

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

const ITEMS_PER_SLIDE_DESKTOP = 3;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = carouselItems.length;
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  // Responsiveness (for showing 3 cards on desktop)
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth !== null ? windowWidth >= 768 : false; // Tailwind md

  // Carousel logic (looping)
  const prevSlide = () => {
    if (isDesktop) {
      setActiveIndex((prev) =>
        (prev - ITEMS_PER_SLIDE_DESKTOP + total) % total
      );
    } else {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }
  };
  const nextSlide = () => {
    if (isDesktop) {
      setActiveIndex((prev) =>
        (prev + ITEMS_PER_SLIDE_DESKTOP) % total
      );
    } else {
      setActiveIndex((prev) => (prev + 1) % total);
    }
  };

  // Mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 40) nextSlide();
      if (diff < -40) prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Für Desktop: drei Karten berechnen (startend bei activeIndex)
  const getVisibleItems = () => {
    if (!isDesktop) {
      return [carouselItems[activeIndex]];
    }
    let items = [];
    for (let i = 0; i < ITEMS_PER_SLIDE_DESKTOP; i++) {
      items.push(carouselItems[(activeIndex + i) % total]);
    }
    return items;
  };

  // Indikatoren (bei Desktop für jedes Set von 3, bei Mobile für jede Karte)
  const getIndicatorCount = () =>
    isDesktop
      ? Math.ceil(total / ITEMS_PER_SLIDE_DESKTOP)
      : total;
  const getIndicatorActive = () =>
    isDesktop
      ? Math.floor(activeIndex / ITEMS_PER_SLIDE_DESKTOP)
      : activeIndex;

  return (
    <>
      <Head>
        <title>Opny – KI-Tools für KMU</title>
        <meta name="description" content="Opny – KI-Startup für KMU. KI-Angebotsgenerator, Website Chatbot, E-Mail Assistent, Q&A-System, Analytics und individuelle KI-Implementierungen." />
      </Head>

      {/* Header (wie gehabt) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm border-b border-gray-100">
        <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
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
        {/* Hero (wie gehabt) */}
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
          <a
            href="mailto:info@opny.ai?subject=Pilotkunde%20Opny"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-800 transition mb-2"
          >
            Pilotkunde werden
          </a>
          <p className="text-gray-400 mt-2">Kostenlos & unverbindlich – Early Access sichern</p>
        </section>

        {/* Carousel */}
        <section className="py-20 bg-gray-50" id="tools">
          <h2 className="text-4xl font-bold text-center mb-10">Deine Opny KI-Tools</h2>
          <div className="relative max-w-6xl mx-auto flex flex-col items-center">
            <div
              className="relative w-full flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Pfeil links */}
              <button
                aria-label="Zurück"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-50 text-blue-700 shadow-md rounded-full p-2 transition border border-gray-200"
                style={{ display: 'block' }}
              >
                <span className="text-2xl">&#8249;</span>
              </button>

              {/* Karten */}
              <div
  className={`
    w-full flex items-center justify-center gap-4
    ${isDesktop ? "flex-row" : "flex-col"}
  `}
>
  {getVisibleItems().map((item, idx) => (
    <Card
      key={item.title}
      className={`
        h-full flex flex-col items-center text-center justify-between
        shadow-lg hover:shadow-2xl transition-shadow
        bg-white rounded-3xl border border-gray-200 p-8
        ${isDesktop ? "w-full max-w-sm" : "w-[90vw] max-w-xs mx-auto"}
        min-h-[320px]
      `}
    >
      <span className="text-5xl mb-4">{item.icon}</span>
      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
      <p className="text-gray-700">{item.desc}</p>
    </Card>
  ))}
</div>


              {/* Pfeil rechts */}
              <button
                aria-label="Weiter"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-50 text-blue-700 shadow-md rounded-full p-2 transition border border-gray-200"
                style={{ display: 'block' }}
              >
                <span className="text-2xl">&#8250;</span>
              </button>
            </div>

            {/* Indikator Punkte */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {[...Array(getIndicatorCount())].map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Gehe zu Slide ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition ${getIndicatorActive() === idx ? "bg-blue-600" : "bg-gray-300"}`}
                  style={{ outline: "none" }}
                  onClick={() => setActiveIndex(isDesktop ? idx * ITEMS_PER_SLIDE_DESKTOP : idx)}
                />
              ))}
            </div>
            <div className="text-center mt-6 text-gray-500">… und viele weitere Tools kommen laufend hinzu!</div>
          </div>
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
          {/* Mailto-Button */}
          <a
            href="mailto:info@opny.ai?subject=Pilotkunde%20Opny"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-800 transition"
          >
            Pilotkunde werden
          </a>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center text-sm">
        <p>© 2025 Opny. Alle Rechte vorbehalten.</p>
        <p className="mt-2">info@opny.ai</p>
        <div className="mt-4 flex gap-4 justify-center">
          <a href="/impressum" className="underline hover:text-blue-300">Impressum</a>
          <a href="/datenschutz" className="underline hover:text-blue-300">Datenschutz</a>
        </div>
      </footer>
    </>
  );
}
