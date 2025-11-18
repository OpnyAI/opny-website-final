import Head from "next/head";
import Card from "../components/Card";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";

const logoUrl = "/logo-opny.png";

type FeatureItem = {
  code: string;
  title: string;
  desc: string;
};

// Inhalte „Warum opny.ai?“
const carouselItems: FeatureItem[] = [
  {
    code: "SEC",
    title: "Sicherheit & Compliance",
    desc: "Verhindern Sie Datenlecks mit anpassbaren Richtlinien. Schützen Sie sensible Informationen und bleiben Sie DSGVO-konform – ohne Produktivitätsverlust.",
  },
  {
    code: "ROUT",
    title: "Intelligentes Routing",
    desc: "Automatische Auswahl des optimalen KI-Modells basierend auf Aufgabe, Latenz und Kosten – mit Fallback-Logik für maximale Verfügbarkeit.",
  },
  {
    code: "COST",
    title: "Kostenkontrolle",
    desc: "Überwachen Sie API-Token-Verbrauch, setzen Sie Budgets pro Team oder Projekt und optimieren Sie Ihre KI-Ausgaben in Echtzeit.",
  },
  {
    code: "LOGS",
    title: "Vollständige Transparenz",
    desc: "Detaillierte Logs und Traces für jeden Prompt, jede Antwort und jede Interaktion. Volle Einsicht in die KI-Nutzung Ihres Unternehmens.",
  },
  {
    code: "API",
    title: "Schnelle Integration",
    desc: "Ein API-Endpunkt für alle Modelle. Das Plug-and-Play-Gateway reduziert Entwicklungsaufwand und Wartungskosten erheblich.",
  },
  {
    code: "LLMs",
    title: "200+ KI-Modelle",
    desc: "Zugriff auf führende Modelle von OpenAI, Anthropic, Google, Meta und mehr – alles über eine zentrale Plattform.",
  },
];

const ITEMS_PER_SLIDE_DESKTOP = 3;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = carouselItems.length;
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive (3 Karten auf Desktop)
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth !== null ? windowWidth >= 768 : false; // Tailwind md

  // Carousel-Logik (loopend)
  const prevSlide = () => {
    if (isDesktop) {
      setActiveIndex(
        (prev) => (prev - ITEMS_PER_SLIDE_DESKTOP + total) % total
      );
    } else {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }
  };
  const nextSlide = () => {
    if (isDesktop) {
      setActiveIndex((prev) => (prev + ITEMS_PER_SLIDE_DESKTOP) % total);
    } else {
      setActiveIndex((prev) => (prev + 1) % total);
    }
  };

  // Autoplay / Endlosschleife (pausiert bei Hover)
  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, isDesktop, total]);

  // Touch-Swipe Mobile
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

  // Sichtbare Items (Desktop: 3, Mobile: 1)
  const getVisibleItems = () => {
    if (!isDesktop) {
      return [carouselItems[activeIndex]];
    }
    const items: FeatureItem[] = [];
    for (let i = 0; i < ITEMS_PER_SLIDE_DESKTOP; i++) {
      items.push(carouselItems[(activeIndex + i) % total]);
    }
    return items;
  };

  // Indikatoren
  const getIndicatorCount = () =>
    isDesktop ? Math.ceil(total / ITEMS_PER_SLIDE_DESKTOP) : total;
  const getIndicatorActive = () =>
    isDesktop ? Math.floor(activeIndex / ITEMS_PER_SLIDE_DESKTOP) : activeIndex;

  return (
    <>
      <Head>
        {/* SEO */}
        <title>opny.ai – KI-Orchestrierung für Unternehmen</title>
        <meta
          name="description"
          content="opny.ai ist die All-in-One-Plattform für sichere, skalierbare und intelligente KI-Orchestrierung in Unternehmen. Verbinden Sie führende KI-Modelle, steuern Sie Kosten und behalten Sie die volle Kontrolle über Ihre KI-Operationen – mit KI-Workspace, KI-Gateway und zentralem Management."
        />
        <meta
          name="keywords"
          content="KI Orchestrierung, AI orchestration, KI-Workspace, KI-Gateway, KI-Plattform, LLM Routing, Kostenkontrolle KI, KI für Unternehmen, KI für Mittelstand, opny.ai"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://opny.ai/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="opny.ai – KI-Orchestrierung für Unternehmen"
        />
        <meta
          property="og:description"
          content="Sichere, zentrale KI-Orchestrierung für Unternehmen – mit KI-Workspace, KI-Gateway, Kostenkontrolle, Routing und vollständiger Transparenz."
        />
        <meta property="og:image" content="https://opny.ai/logo-opny.png" />
        <meta property="og:url" content="https://opny.ai/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="opny.ai – KI-Orchestrierung für Unternehmen"
        />
        <meta
          name="twitter:description"
          content="Verbinden Sie verschiedene KI-Modelle, steuern Sie Kosten und behalten Sie die volle Kontrolle über Ihre KI-Operationen – mit opny.ai."
        />
        <meta name="twitter:image" content="https://opny.ai/logo-opny.png" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm border-b border-gray-100">
        <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="flex items-center h-9">
              <Image
                src={logoUrl}
                alt="Opny Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <span
              className="text-xl font-bold text-gray-900 leading-none flex items-center"
              style={{ marginTop: 2 }}
            >
              Opny
            </span>
          </a>
          <div className="flex items-center gap-8">
            <a
              href="#tools"
              className="text-gray-700 hover:text-blue-700 transition"
            >
              Unsere Produkte
            </a>
            <a
              href="#kontakt"
              className="text-gray-700 hover:text-blue-700 transition"
            >
              Kontakt
            </a>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 ml-3 hidden md:inline-block">
              Pilotphase
            </span>
          </div>
        </nav>
      </header>

      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-24 bg-gradient-to-b from-[#f7f9fb] via-white to-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            KI-Orchestrierung für Unternehmen –{" "}
            <span className="text-blue-700">mit opny.ai</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mb-6 text-gray-700">
            Die All-in-One-Plattform für sichere, skalierbare und intelligente
            KI-Integration. Verbinden Sie unterschiedliche KI-Modelle, steuern
            Sie Kosten und behalten Sie die volle Kontrolle über Ihre
            KI-Operationen.
          </p>
          <a
            href="https://opny.app/"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-xl text-base md:text-lg font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:bg-blue-800 transition mb-2"
          >
            Jetzt ausprobieren
          </a>
          <p className="text-xs md:text-sm text-gray-400 mt-2">
            Direkt im Browser starten – ohne komplexe Integration.
          </p>
        </section>

        {/* Warum opny.ai? */}
        <section className="py-20 bg-[#f5f7fa]">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight">
            Warum opny.ai?
          </h2>
          <div
            className="relative max-w-6xl mx-auto flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
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
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 text-blue-700 shadow-[0_10px_30px_rgba(15,23,42,0.12)] rounded-full p-2 transition border border-gray-200"
              >
                <span className="text-xl">&lsaquo;</span>
              </button>

              {/* Karten */}
              <div
                className={`
                  w-full flex items-center justify-center gap-4
                  ${isDesktop ? "flex-row" : "flex-col"}
                `}
              >
                {getVisibleItems().map(({ title, desc, code }) => (
                  <Card
                    key={title}
                    className={`
                      h-full flex flex-col items-start text-left justify-between
                      shadow-[0_18px_45px_rgba(15,23,42,0.06)]
                      bg-white rounded-3xl border border-gray-100 px-8 py-8
                      ${
                        isDesktop
                          ? "w-full max-w-sm"
                          : "w-[90vw] max-w-xs mx-auto"
                      }
                      min-h-[260px]
                    `}
                  >
                    <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-blue-50 px-3 py-1">
                      <span className="text-xs font-semibold tracking-wide text-blue-700">
                        {code}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      {title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700">{desc}</p>
                  </Card>
                ))}
              </div>

              {/* Pfeil rechts */}
              <button
                aria-label="Weiter"
                onClick={nextSlide}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 text-blue-700 shadow-[0_10px_30px_rgba(15,23,42,0.12)] rounded-full p-2 transition border border-gray-200"
              >
                <span className="text-xl">&rsaquo;</span>
              </button>
            </div>

            {/* Indikator-Punkte */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {[...Array(getIndicatorCount())].map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Gehe zu Slide ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    getIndicatorActive() === idx ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  style={{ outline: "none" }}
                  onClick={() =>
                    setActiveIndex(
                      isDesktop ? idx * ITEMS_PER_SLIDE_DESKTOP : idx
                    )
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Produkte */}
        <section className="py-20 bg-white" id="tools">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">
              Unsere Produkte
            </h2>

            <div className="space-y-10">
              {/* KI-Workspace */}
              <div className="bg-[#f7f9fb] border border-gray-100 rounded-3xl p-8 md:p-10 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center rounded-2xl bg-blue-50 px-3 py-1">
                    <span className="text-xs font-semibold tracking-wide text-blue-700">
                      WS
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    KI-Workspace
                  </h3>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  Eine sichere, browserbasierte Umgebung für Ihre Teams zur
                  Arbeit mit KI – mit voller Kontrolle und Transparenz für
                  Administratoren.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm md:text-base">
                  <li>
                    ✓ Zugriff auf Top-Modelle von OpenAI, Anthropic, Google und
                    mehr
                  </li>
                  <li>
                    ✓ Modell-Benchmarking: Vergleichen Sie verschiedene Modelle
                    mit demselben Prompt
                  </li>
                  <li>✓ Automatisches Fallback bei Modellausfällen</li>
                  <li>✓ Arbeiten mit Bildern, Audio, PDFs und mehr</li>
                  <li>
                    ✓ Zentrale Benutzerverwaltung und Richtliniendurchsetzung
                  </li>
                  <li>✓ Anpassbare Regeln zur Verhinderung von Datenlecks</li>
                </ul>
              </div>

              {/* KI-Gateway */}
              <div className="bg-[#f7f9fb] border border-gray-100 rounded-3xl p-8 md:p-10 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center rounded-2xl bg-blue-50 px-3 py-1">
                    <span className="text-xs font-semibold tracking-wide text-blue-700">
                      GW
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    KI-Gateway
                  </h3>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  Verbinden Sie jedes Modell mit Ihrer App über ein einziges
                  API. Verwalten Sie Workflows, Fallback-Logik, Datenvalidierung
                  und Echtzeit-Monitoring.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm md:text-base">
                  <li>
                    ✓ Intelligentes Routing zwischen verschiedenen Modellen
                    basierend auf Latenz und Aufgabe
                  </li>
                  <li>✓ Fallback-Logik für unterbrechungsfreien Betrieb</li>
                  <li>✓ Token-Verbrauch und Performance-Monitoring</li>
                  <li>✓ Budget-Limits pro Service und Nutzer</li>
                  <li>✓ Ein API-Endpunkt für alle Integrationen</li>
                  <li>✓ Detaillierte Logs und Execution Traces</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Anwendungsfälle */}
        <section className="py-20 bg-[#f5f7fa]" id="anwendungen">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">
              Anwendungsfälle
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  code: "CS",
                  title: "Customer Support",
                  text: "KI-gestützte Ticket-Zusammenfassungen, automatische Antwortvorschläge und Durchsuchung von Wissensdatenbanken für schnellere Lösungen.",
                },
                {
                  code: "HR",
                  title: "HR & Recruiting",
                  text: "Erstellen Sie Stellenanzeigen, fassen Sie Richtlinien zusammen und verbessern Sie Hiring-Prozesse mit KI-Unterstützung.",
                },
                {
                  code: "LC",
                  title: "Legal & Compliance",
                  text: "Fassen Sie Verträge zusammen, erstellen Sie NDAs und überarbeiten Sie Richtlinien – ohne Risiko von Datenlecks.",
                },
                {
                  code: "PD",
                  title: "Produktentwicklung",
                  text: "Experimentieren Sie mit Prompts, speichern Sie KI-generierte Dateien und arbeiten Sie kontextbewusst in sicheren Projekten.",
                },
                {
                  code: "AR",
                  title: "Analytics & Reporting",
                  text: "Verarbeiten Sie strukturierte Daten, fassen Sie Dashboards zusammen und erstellen Sie Management-Reports mühelos.",
                },
                {
                  code: "AUTO",
                  title: "Automatisierung",
                  text: "Integrieren Sie KI in Ihre bestehenden Workflows und Anwendungen für intelligente Automatisierungslösungen.",
                },
              ].map(({ code, title, text }) => (
                <div
                  key={title}
                  className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] flex flex-col gap-3"
                >
                  <div className="inline-flex items-center justify-center rounded-2xl bg-blue-50 px-3 py-1 w-fit">
                    <span className="text-xs font-semibold tracking-wide text-blue-700">
                      {code}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zentrale Verwaltung & Kontrolle */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">
              Zentrale Verwaltung &amp; Kontrolle
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  code: "USERS",
                  title: "Benutzerverwaltung",
                  text: "Weisen Sie Modelle zu, definieren Sie Berechtigungen und verfolgen Sie die KI-Nutzung auf Benutzer- oder Teamebene.",
                },
                {
                  code: "TRACE",
                  title: "Vollständige Transparenz",
                  text: "Einheitliche Logs und Traces für jede Modellinteraktion. Überwachen Sie Prompts, Outputs und API-Aufrufe zentral.",
                },
                {
                  code: "KEYS",
                  title: "API-Key-Verwaltung",
                  text: "Generieren Sie API-Keys pro Nutzer oder Team mit granularer Kontrolle über Modellzugriff und Datenberechtigungen.",
                },
                {
                  code: "FLEX",
                  title: "Modell-Flexibilität",
                  text: "Wählen Sie das richtige Modell für jede Aufgabe ohne Vendor Lock-in. Nahtlose Integration führender LLMs.",
                },
              ].map(({ code, title, text }) => (
                <div
                  key={title}
                  className="bg-[#f7f9fb] rounded-3xl border border-gray-100 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] flex flex-col gap-3"
                >
                  <div className="inline-flex items-center justify-center rounded-2xl bg-blue-50 px-3 py-1 w-fit">
                    <span className="text-xs font-semibold tracking-wide text-blue-700">
                      {code}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 bg-black text-white text-center px-4"
          id="kontakt"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Bereit für sichere KI-Integration?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Entdecken Sie, wie opny.ai Ihre KI-Operationen vereinfacht und
            skaliert.
          </p>
          <a
            href="https://opny.app/"
            className="inline-block bg-white text-black px-8 py-3 rounded-xl text-base md:text-lg font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:bg-gray-100 transition"
          >
            Jetzt ausprobieren
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-500 py-8 text-center text-sm border-t border-gray-200">
        <p>© 2025 Opny. Alle Rechte vorbehalten.</p>
        <p className="mt-1">info@opny.ai</p>
        <div className="mt-4 flex gap-6 justify-center text-xs md:text-sm">
          <Link
            href="/impressum"
            className="underline hover:text-blue-600 transition"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="underline hover:text-blue-600 transition"
          >
            Datenschutz
          </Link>
        </div>
      </footer>
    </>
  );
}
