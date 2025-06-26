import Head from "next/head";

export default function Impressum() {
  return (
    <>
      <Head>
        <title>Impressum | Opny</title>
      </Head>
      <main className="max-w-2xl mx-auto px-4 py-16 text-gray-900">
        <h1 className="text-3xl font-bold mb-6">Impressum</h1>
        <div className="space-y-2 text-base">
          <p>Opny AI<br />
            Inhaber: Mehmet Çatalsakal<br />
            Naumannstr. 3<br />
            73663 Berglen<br />
            Deutschland<br /><br />
            Telefon: +49 1511 1956479<br />
            E-Mail: info@opny.ai<br /><br />
            Umsatzsteuer-ID: DE367221694<br /><br />
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br />
            Mehmet Çatalsakal, Naumannstr. 3, 73663 Berglen<br /><br />
            Online-Streitbeilegung:<br />
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">europa.eu/consumers/odr/</a><br /><br />
            Verbraucherstreitbeilegung/Universalschlichtungsstelle:<br />
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </main>
    </>
  );
}
