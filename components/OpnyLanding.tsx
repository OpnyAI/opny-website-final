import React from "react";

const OpnyLanding: React.FC = () => {
  return (
    <div className="opny-landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>KI-Orchestrierung für Unternehmen – mit opny.ai</h1>
          <p>
            Die All-in-One-Plattform für sichere, skalierbare und intelligente
            KI-Integration. Verbinden Sie unterschiedliche KI-Modelle, steuern
            Sie Kosten und behalten Sie die volle Kontrolle über Ihre
            KI-Operationen.
          </p>
          <a href="https://opny.app/" className="cta-button">
            Jetzt ausprobieren
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="funktionen">
        <div className="container">
          <h2 className="section-title">Warum opny.ai?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Sicherheit &amp; Compliance</h3>
              <p>
                Verhindern Sie Datenlecks mit anpassbaren Richtlinien. Schützen
                Sie sensible Informationen und bleiben Sie DSGVO-konform – ohne
                Produktivitätsverlust.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Intelligentes Routing</h3>
              <p>
                Automatische Auswahl des optimalen KI-Modells basierend auf
                Aufgabe, Latenz und Kosten. Mit Fallback-Logik für maximale
                Verfügbarkeit.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Kostenkontrolle</h3>
              <p>
                Überwachen Sie API-Token-Verbrauch, setzen Sie Budgets pro Team
                oder Projekt und optimieren Sie Ihre KI-Ausgaben in Echtzeit.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Vollständige Transparenz</h3>
              <p>
                Detaillierte Logs und Traces für jeden Prompt, jede Antwort und
                jede Interaktion. Volle Einsicht in die KI-Nutzung Ihres
                Unternehmens.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Schnelle Integration</h3>
              <p>
                Ein API-Endpunkt für alle Modelle. Plug-and-Play-Gateway
                reduziert Entwicklungsaufwand und Wartungskosten erheblich.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>200+ KI-Modelle</h3>
              <p>
                Zugriff auf führende Modelle von OpenAI, Anthropic, Google, Meta
                und mehr – alles über eine zentrale Plattform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="produkte">
        <div className="container">
          {/* Anker für deinen bestehenden Header-Link #tools */}
          <span id="tools" className="block -mt-24 pt-24" aria-hidden="true" />
          <h2 className="section-title">Unsere Produkte</h2>

          <div className="product-box">
            <h3>🖥️ KI-Workspace</h3>
            <p>
              Eine sichere, browserbasierte Umgebung für Ihre Teams zur Arbeit
              mit KI – mit voller Kontrolle und Transparenz für Administratoren.
            </p>
            <ul className="product-features">
              <li>
                ✓ Zugriff auf Top-Modelle von OpenAI, Anthropic, Google und mehr
              </li>
              <li>
                ✓ Modell-Benchmarking: Vergleichen Sie verschiedene Modelle mit
                demselben Prompt
              </li>
              <li>✓ Automatisches Fallback bei Modellausfällen</li>
              <li>✓ Arbeiten mit Bildern, Audio, PDFs und mehr</li>
              <li>✓ Zentrale Benutzerverwaltung und Richtliniendurchsetzung</li>
              <li>✓ Anpassbare Regeln zur Verhinderung von Datenlecks</li>
            </ul>
          </div>

          <div className="product-box">
            <h3>🔌 KI-Gateway</h3>
            <p>
              Verbinden Sie jedes Modell mit Ihrer App über ein einziges API.
              Verwalten Sie Workflows, Fallback-Logik, Datenvalidierung und
              Echtzeit-Monitoring.
            </p>
            <ul className="product-features">
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
      </section>

      {/* Use Cases Section */}
      <section className="use-cases" id="anwendungen">
        <div className="container">
          <h2 className="section-title">Anwendungsfälle</h2>
          <div className="use-case-grid">
            <div className="use-case">
              <h4>💬 Customer Support</h4>
              <p>
                KI-gestützte Ticket-Zusammenfassungen, automatische
                Antwortvorschläge und Durchsuchung von Wissensdatenbanken für
                schnellere Lösungen.
              </p>
            </div>
            <div className="use-case">
              <h4>👥 HR &amp; Recruiting</h4>
              <p>
                Erstellen Sie Stellenanzeigen, fassen Sie Richtlinien zusammen
                und verbessern Sie Hiring-Prozesse mit KI-Unterstützung.
              </p>
            </div>
            <div className="use-case">
              <h4>⚖️ Legal &amp; Compliance</h4>
              <p>
                Fassen Sie Verträge zusammen, erstellen Sie NDAs und
                überarbeiten Sie Richtlinien – ohne Risiko von Datenlecks.
              </p>
            </div>
            <div className="use-case">
              <h4>🎨 Produktentwicklung</h4>
              <p>
                Experimentieren Sie mit Prompts, speichern Sie KI-generierte
                Dateien und arbeiten Sie kontextbewusst in sicheren Projekten.
              </p>
            </div>
            <div className="use-case">
              <h4>📈 Analytics &amp; Reporting</h4>
              <p>
                Verarbeiten Sie strukturierte Daten, fassen Sie Dashboards
                zusammen und erstellen Sie Management-Reports mühelos.
              </p>
            </div>
            <div className="use-case">
              <h4>🤖 Automatisierung</h4>
              <p>
                Integrieren Sie KI in Ihre bestehenden Workflows und Anwendungen
                für intelligente Automatisierungslösungen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Features */}
      <section className="products">
        <div className="container">
          <h2 className="section-title">Zentrale Verwaltung &amp; Kontrolle</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Benutzerverwaltung</h3>
              <p>
                Weisen Sie Modelle zu, definieren Sie Berechtigungen und
                verfolgen Sie die KI-Nutzung auf Benutzer- oder Teamebene.
              </p>
            </div>
            <div className="feature-card">
              <h3>Vollständige Transparenz</h3>
              <p>
                Einheitliche Logs und Traces für jede Modellinteraktion.
                Überwachen Sie Prompts, Outputs und API-Aufrufe zentral.
              </p>
            </div>
            <div className="feature-card">
              <h3>API-Key-Verwaltung</h3>
              <p>
                Generieren Sie API-Keys pro Nutzer oder Team mit granularer
                Kontrolle über Modellzugriff und Datenberechtigungen.
              </p>
            </div>
            <div className="feature-card">
              <h3>Modell-Flexibilität</h3>
              <p>
                Wählen Sie das richtige Modell für jede Aufgabe ohne Vendor
                Lock-in. Nahtlose Integration führender LLMs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="kontakt">
        <div className="container">
          <h2>Bereit für sichere KI-Integration?</h2>
          <p>
            Entdecken Sie, wie opny.ai Ihre KI-Operationen vereinfacht und
            skaliert.
          </p>
          <a href="https://opny.app/" className="cta-button-white">
            Jetzt ausprobieren
          </a>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .opny-landing {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          background: #ffffff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .hero {
          padding: 80px 0;
          text-align: center;
        }

        .hero h1 {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 24px;
          color: #000;
        }

        .hero p {
          font-size: 20px;
          color: #666;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-block;
          background: #000;
          color: #fff;
          padding: 16px 40px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          transition: background 0.3s;
        }

        .cta-button:hover {
          background: #333;
        }

        /* Features Section */
        .features {
          padding: 80px 0;
          background: #f9f9f9;
        }

        .section-title {
          font-size: 36px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 60px;
          color: #000;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .feature-card {
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 24px;
          margin-bottom: 16px;
          color: #000;
        }

        .feature-card p {
          color: #666;
          font-size: 16px;
        }

        /* Products Section */
        .products {
          padding: 80px 0;
        }

        .product-box {
          background: #f9f9f9;
          padding: 60px;
          border-radius: 12px;
          margin-bottom: 40px;
        }

        .product-box h3 {
          font-size: 32px;
          margin-bottom: 20px;
          color: #000;
        }

        .product-box p {
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
        }

        .product-features {
          list-style: none;
          margin-top: 20px;
        }

        .product-features li {
          padding: 12px 0;
          border-bottom: 1px solid #e5e5e5;
          color: #333;
        }

        .product-features li:last-child {
          border-bottom: none;
        }

        /* Use Cases Section */
        .use-cases {
          padding: 80px 0;
          background: #f9f9f9;
        }

        .use-case-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .use-case {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
        }

        .use-case h4 {
          font-size: 20px;
          margin-bottom: 12px;
          color: #000;
        }

        .use-case p {
          color: #666;
          font-size: 15px;
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 0;
          text-align: center;
          background: #000;
          color: #fff;
        }

        .cta-section h2 {
          font-size: 42px;
          margin-bottom: 24px;
        }

        .cta-section p {
          font-size: 20px;
          margin-bottom: 40px;
          color: #ccc;
        }

        .cta-button-white {
          display: inline-block;
          background: #fff;
          color: #000;
          padding: 16px 40px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          transition: background 0.3s;
        }

        .cta-button-white:hover {
          background: #f0f0f0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 36px;
          }

          .hero p {
            font-size: 18px;
          }

          .section-title {
            font-size: 28px;
          }

          .product-box {
            padding: 40px 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default OpnyLanding;
