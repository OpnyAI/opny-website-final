import Head from "next/head";

export default function Datenschutz() {
  return (
    <>
      <Head>
        <title>Datenschutzerklärung | Opny</title>
      </Head>
      <main className="max-w-2xl mx-auto px-4 py-16 text-gray-900">
        <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>
        <div className="space-y-4 text-base">
          <p>
            <strong>Verantwortlicher:</strong><br />
            Opny AI, Mehmet Çatalsakal<br />
            Naumannstraße 3<br />
            73663 Berglen<br />
            info@opny.ai
          </p>
          <p>
            <strong>Allgemeine Hinweise</strong><br />
            Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig. Nachfolgend informieren wir Sie über die Erhebung, Verarbeitung und Nutzung personenbezogener Daten im Rahmen unserer Website.
          </p>
          <p>
            <strong>Hosting bei Vercel</strong><br />
            Unsere Website wird bei <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">Vercel Inc.</a>, 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet.<br />
            Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logdaten, wie Ihre IP-Adresse, Browserinformationen und Zugriffszeiten. Diese Daten werden ausschließlich zur Bereitstellung und Absicherung des Betriebs der Website benötigt.<br />
            Wir haben mit Vercel einen Vertrag zur Auftragsverarbeitung (Data Processing Addendum, DPA) gemäß Art. 28 DSGVO abgeschlossen. Die Speicherung der Daten erfolgt nach Möglichkeit auf Servern innerhalb der EU. Es kann jedoch nicht ausgeschlossen werden, dass Daten auch in die USA übertragen werden.<br />
            Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel:{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">vercel.com/legal/privacy-policy</a>
          </p>
          <p>
            <strong>Kontaktaufnahme</strong><br />
            Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage gespeichert. Die Kommunikation per E-Mail erfolgt unverschlüsselt.
          </p>
          <p>
            <strong>Einsatz von OpenAI</strong><br />
            Wenn Sie KI-Funktionen auf dieser Website nutzen, werden Ihre Eingaben an die OpenAI-API (OpenAI, L.L.C., USA) übermittelt und dort verarbeitet. Einzelheiten entnehmen Sie bitte der <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">Privacy Policy von OpenAI</a>.
          </p>
          <p>
            <strong>Ihre Rechte</strong><br />
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Zudem können Sie jederzeit der Verarbeitung widersprechen.
          </p>
          <p>
            <strong>Kontakt für Datenschutzanfragen</strong><br />
            info@opny.ai
          </p>
        </div>
      </main>
    </>
  );
}
