import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// OpenAI initialisieren – der Key muss in .env.local gesetzt sein!
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Nur POST-Requests erlauben
  if (req.method !== "POST") {
    return res.status(405).json({ angebot: "Nur POST-Anfragen erlaubt!" });
  }

  try {
    const {
      kundenname,
      kundenmail,
      positionen,
      extraNotes,
      profile,
      total
    } = req.body;

    // Positionsliste für den Prompt generieren
    const posText = positionen
      .map(
        (p: any, idx: number) =>
          `${idx + 1}. ${p.name} (${p.qty || 1} ${p.unit || ""} à ${p.price} €)${
            p.description ? ": " + p.description : ""
          }`
      )
      .join("\n");

    // KI-Prompt generieren (anpassen, falls gewünscht)
    const prompt = `
Du bist Angebotsmanager bei ${profile.company} (${profile.branche}). 
Erstelle ein professionelles, klar strukturiertes und höflich formuliertes Angebot auf Basis folgender Vorgaben:

${profile.intro ? "Einleitung: " + profile.intro : ""}
Empfänger: ${kundenname} (${kundenmail})
Leistungen:
${posText}
${extraNotes ? "Zusätzliche Hinweise: " + extraNotes : ""}
Preismodell: ${profile.preismodell?.join(", ")}
Gesamtpreis: ${total} €

${profile.outro ? "Abschlussformel: " + profile.outro : ""}
Bitte beachte folgende Pflichtangaben: ${profile.pflicht || "keine besonderen Vorgaben"}
Verwende diesen Tonfall: ${profile.tonality || "neutral, freundlich, professionell"}

Strukturiere das Angebot klar, verwende Absätze, eine übersichtliche Positionsliste und eine höfliche Grußformel.
`;

    // GPT aufrufen (Modell ggf. auf gpt-4o anpassen, falls verfügbar)
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    // Antwort auslesen (mit Fallback)
    const angebot = response.choices[0]?.message?.content || "Fehler: Kein Text von GPT erhalten!";
    res.status(200).json({ angebot });
  } catch (e: any) {
    console.error("Fehler beim Generieren des Angebots:", e);
    res.status(500).json({ angebot: "Fehler beim Generieren des Angebots: " + (e.message || e.toString()) });
  }
}
