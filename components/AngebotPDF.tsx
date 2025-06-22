import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const PRIMARY = "#161b22";
const ACCENT = "#d7a200";
const BORDER = "#eee";
const LIGHT = "#fafbfc";

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 40,
    backgroundColor: LIGHT,
    lineHeight: 1.5,
    fontFamily: "Helvetica"
  },
  logo: { width: 90, height: 40, marginBottom: 6 },
  absender: { fontSize: 11 },
  empfaenger: { fontSize: 11, marginBottom: 2 },
  metaBlock: { fontSize: 11, textAlign: 'right', minWidth: 140 },
  betreff: { fontWeight: 700, fontSize: 13, marginBottom: 9, color: PRIMARY },
  bodyText: { marginBottom: 16, fontSize: 12 },
  tableHeader: {
    flexDirection: 'row', borderBottomWidth: 1, borderColor: PRIMARY, backgroundColor: "#eee",
    fontWeight: 700, marginTop: 10, fontSize: 11
  },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: BORDER, fontSize: 11 },
  cell: { padding: 5, fontSize: 11, flexGrow: 1, flexBasis: 0 },
  cPos: { flex: 0.6, textAlign: 'center' },
  cLeistung: { flex: 1.5 },
  cDesc: { flex: 2 },
  cMenge: { flex: 0.8, textAlign: 'right' },
  cEinheit: { flex: 1, textAlign: 'center' },
  cPreis: { flex: 1.1, textAlign: 'right' },
  cSumme: { flex: 1.2, textAlign: 'right' },
  sumBlock: {
    marginTop: 12, alignSelf: "flex-end", minWidth: 220, borderTopWidth: 1, borderColor: ACCENT,
    paddingTop: 7
  },
  sumRow: { flexDirection: "row", justifyContent: "space-between", fontSize: 11 },
  sumTotal: { fontWeight: 900, fontSize: 13, color: ACCENT },
  zahlungsbedingungen: { marginTop: 14, fontSize: 11, marginBottom: 24 },
  outro: { marginTop: 18, marginBottom: 6 },
  gruss: { fontWeight: 400, marginTop: 18 },
  unterschrift: { fontWeight: 700, marginTop: 1 },
  footer: {
    position: "absolute", left: 40, right: 40, bottom: 24,
    fontSize: 9, borderTopWidth: 1, borderColor: PRIMARY, paddingTop: 5, backgroundColor: "#fff"
  },
  footerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  disclaimer: { marginTop: 4, color: "#888", fontSize: 8, textAlign: 'center' }
});

export function AngebotPDF({
  profile, angebot, services, empfaenger, angebotDatum, angebotNummer
}) {
  // Profile
  const {
    company = "",
    address = "",
    tax_id = "",
    bank_name = "",
    iban = "",
    bic = "",
    phone = "",
    contact_email = "",
    website = "",
    footer_text = "",
    payment_terms = "",
    validity_days = "",
    contact_name = "",
    signature_text = "",
    logo_url = "",
  } = profile || {};

  // Empfänger
  const { name: kundeName = "", adresse: kundeAdresse = "" } = empfaenger || {};

  // Leistungen
  const zeilen = Array.isArray(services) ? services.map((s, idx) => {
    const name = s.name || "";
    const description = s.description || "";
    const unit = s.unit || "";
    const price = Number(s.price) || 0;
    const menge = Number(s.menge) || 1;
    const summe = menge * price;
    return { ...s, name, description, unit, price, menge, summe, idx: idx + 1 };
  }) : [];

  // Summen/MwSt/Datum formatieren
  const mwstSatz = 0.19;
  const nettoSumme = zeilen.reduce((acc, s) => acc + s.summe, 0);
  const mwst = nettoSumme * mwstSatz;
  const bruttoSumme = nettoSumme + mwst;

  function formatEUR(n: number) {
    return n.toLocaleString("de-DE", { minimumFractionDigits: 2 }) + " €";
  }
  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const [d, m, y] = dateStr.split(/[.\-\/]/).map(x => x.padStart(2, "0"));
    return `${d}.${m}.${y}`;
  }
  const gültigBis = (() => {
    if (!angebotDatum) return "";
    try {
      const parts = angebotDatum.split(".");
      if (parts.length === 3) {
        const dt = new Date(Number(parts[2]), Number(parts[1])-1, Number(parts[0]));
        if (validity_days && !isNaN(Number(validity_days))) {
          dt.setDate(dt.getDate() + Number(validity_days));
        } else {
          dt.setDate(dt.getDate() + 14);
        }
        return formatDate(dt.toLocaleDateString("de-DE"));
      }
    } catch {}
    return angebotDatum;
  })();

  // GPT-Text: KEINE doppelte Betreffzeile und KEINE doppelte Grußformel!
  // Nur Haupttext anzeigen
  function extractBody(text: string) {
    if (!text) return "";
    return text
      .split('\n')
      .filter(line =>
        !/^Betreff[: ]/i.test(line.trim()) &&
        !/^Mit freundlichen Grüßen/i.test(line.trim()) &&
        !/^Angebotsmanager/i.test(line.trim()) &&
        !/^\[Name\]/.test(line.trim()) &&
        !/^Ihr Team/i.test(line.trim())
      )
      .join('\n').trim();
  }

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Kopfbereich: Logo, Absender, Abstand, Empfänger, rechts Datum & Angebotsnr. */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}>
          <View style={{ flex: 2 }}>
            {logo_url && <Image src={logo_url} style={styles.logo} />}
            {/* Absenderdaten (ohne USt-ID!) */}
            <Text style={styles.absender}>{company}</Text>
            <Text style={styles.absender}>{address}</Text>
            <Text style={styles.absender}>
              {phone && `Tel.: ${phone} | `}
              {contact_email && `${contact_email} | `}
              {website}
            </Text>
            {/* Mehr Abstand zum Betreff */}
            <View style={{ minHeight: 34 }} />
            {/* Empfänger */}
            <Text style={{ fontWeight: 700, fontSize: 11 }}>{kundeName}</Text>
            {kundeAdresse && <Text style={styles.empfaenger}>{kundeAdresse}</Text>}
          </View>
          <View style={[styles.metaBlock, { alignItems: 'flex-end' }]}>
            <Text style={{ textAlign: "right" }}>
              {angebotDatum ? `${formatDate(angebotDatum)}` : ""}
            </Text>
            <Text style={{ textAlign: "right" }}>
              Angebotsnr.: {angebotNummer || ""}
            </Text>
          </View>
        </View>

        {/* Hauptüberschrift */}
        <Text style={styles.betreff}>
          Angebot für {zeilen.length > 0 ? zeilen.map(s => s.name || "").join(", ") : "unsere Leistungen"}
        </Text>

        {/* Saubere Anrede und KI-Angebotstext (ohne doppelte Infos) */}
        <Text style={styles.bodyText}>
          Sehr geehrte Damen und Herren,
          {"\n\n"}
          {angebot?.gptText ? extractBody(angebot.gptText) : ""}
        </Text>

        {/* Tabelle */}
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.cPos]}>Pos</Text>
          <Text style={[styles.cell, styles.cLeistung]}>Leistung</Text>
          <Text style={[styles.cell, styles.cDesc]}>Beschreibung</Text>
          <Text style={[styles.cell, styles.cMenge]}>Menge</Text>
          <Text style={[styles.cell, styles.cEinheit]}>Einheit</Text>
          <Text style={[styles.cell, styles.cPreis]}>Einzelpreis</Text>
          <Text style={[styles.cell, styles.cSumme]}>Gesamt</Text>
        </View>
        {zeilen.map(s => (
          <View style={styles.tableRow} key={s.idx}>
            <Text style={[styles.cell, styles.cPos]}>{String(s.idx)}</Text>
            <Text style={[styles.cell, styles.cLeistung]}>{s.name}</Text>
            <Text style={[styles.cell, styles.cDesc]}>{s.description}</Text>
            <Text style={[styles.cell, styles.cMenge]}>{String(s.menge)}</Text>
            <Text style={[styles.cell, styles.cEinheit]}>{s.unit}</Text>
            <Text style={[styles.cell, styles.cPreis]}>{formatEUR(s.price)}</Text>
            <Text style={[styles.cell, styles.cSumme]}>{formatEUR(s.summe)}</Text>
          </View>
        ))}

        {/* Summenblock */}
        <View style={styles.sumBlock}>
          <View style={styles.sumRow}>
            <Text>Zwischensumme:</Text>
            <Text>{formatEUR(nettoSumme)}</Text>
          </View>
          <View style={styles.sumRow}>
            <Text>MwSt. (19%):</Text>
            <Text>{formatEUR(mwst)}</Text>
          </View>
          <View style={[styles.sumRow, { marginTop: 3 }]}>
            <Text style={{ fontWeight: 700 }}>Gesamtsumme (inkl. MwSt.):</Text>
            <Text style={styles.sumTotal}>{formatEUR(bruttoSumme)}</Text>
          </View>
        </View>

        {/* Zahlungsbedingungen, Gültigkeit */}
        <View style={styles.zahlungsbedingungen}>
          <Text>
            Zahlungsbedingungen: {payment_terms || "Bitte überweisen Sie den Rechnungsbetrag innerhalb von 14 Tagen ohne Abzug."}
          </Text>
          <Text>
            Angebot gültig bis: {gültigBis}
          </Text>
        </View>

        {/* Outro, Gruß und Signatur */}
        <View style={styles.outro}>
          {/* Nur ein Gruß, keine weiteren Signaturen */}
          <Text style={styles.gruss}>Mit freundlichen Grüßen</Text>
          <Text style={styles.unterschrift}>{signature_text || contact_name || company}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <View style={styles.footerRow}>
            <Text>
              Bank: {bank_name} | IBAN: {iban} | BIC: {bic} | USt-ID: {tax_id}
            </Text>
            <Text>
              Kontakt: {phone}{phone && contact_email ? " | " : ""}
              {contact_email} {website && `| ${website}`}
            </Text>
          </View>
          <Text style={styles.disclaimer}>
            {footer_text || "Dieses Angebot ist freibleibend. Es gelten unsere Allgemeinen Geschäftsbedingungen (AGB)."}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
