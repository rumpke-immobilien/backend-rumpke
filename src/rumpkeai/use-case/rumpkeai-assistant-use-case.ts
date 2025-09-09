import OpenAI from "openai";

interface Options {
  prompt: string;
}

const unrelatedKeywords = [
  "\u00fcbersetzen", "\u00fcbersetzung", "witz", "scherz", "gedicht", "geschichte", "zusammenfassung", "res\u00fcmieren",
  "philosophie", "religion", "bibel", "film", "serie", "rezept", "kochen", "reisen", "urlaubsort",
  "sex", "sexualit\u00e4t", "porno", "meme", "lustig", "traurig", "gl\u00fccklich", "liebe", "trennung",
  "depression", "angst", "motivation", "sport", "fu\u00dfball", "politik", "kanzler", "regierung",
  "chatgpt", "ki", "openai", "programmieren", "schule", "mathe", "technik", "geld verdienen", "andere sprachen"
];

export const rumpkeAIAssistantUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;
  const userInput = prompt.trim().toLowerCase();

  // ✨ Unrelated keyword check
  if (unrelatedKeywords.some(keyword => userInput.includes(keyword))) {
    return {
      message: {
        role: "assistant",
        content:
          "Ich bin dein Assistent für das Tippgeber-Programm von Rumpke Immobilien. Für andere Themen bin ich leider nicht zuständig – aber ich wünsche dir einen tollen Tag! 😊",
      },
    };
  }

  // ✨ Valid input, respond with core info
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
Ich bin der Assistent von Rumpke Immobilien und beantworte dir gerne alle Fragen zum Tippgeber-Programm. 😊


Du sollst auf keinen Fall auf andere Themen eingehen, sondern nur auf das Tippgeber-Programm fokussiert bleiben.
Du sollst keine persönlichen Daten abfragen oder speichern.
Du sollst die Nachrichten nicht so lang schreiben.
Du sollst erstmal die Fragen klären, bevor du weitere Informationen anforderst.
Das: Wenn du weitere Fragen sollst dui nie wiederholen
Wenn die Frage nicht klar ist, bitte um Klärung.
Du sollst dich verabschieden können und nicht weiter schreiben ausser ein guter verabschiedung.

Du sollst nie etwas SOFORT wiederholen

Gültige Fragen könnten sein:

• Wie funktioniert das Programm?
• Wie lange dauert der Ablauf?
• Sind meine Daten sicher?

⚠ Bitte beachte:
Ich speichere keine Daten selbst. Du musst das Formular ganz unten auf der Seite ausfüllen (bitte scrollen).

🚫 Andere Themen beantworte ich freundlich, aber mein Fokus liegt nur auf dem Tippgeber-Programm.

So funktioniert’s:

🏆 Bitte wähle zuerst im Formular deinen Wunschpreis aus:
• Urlaub
• E-Bike
• Geld
• Roller

Dann trage bitte ein:
• Deinen vollständigen Namen
• Deine Telefonnummer oder E-Mail-Adresse
• Deine Adresse
• Wie du den Eigentümer der Immobilie kennst

📌 Worum geht es im Programm?
Wenn du eine Immobilie kennst, die verkauft werden soll, gib uns bitte folgende Infos:
• Die Adresse der Immobilie
• Optional: Name des Eigentümer
• Optional: Telefonnummer oder E-Mail des Eigentümer

📆 Wenn du die Schritte wissen willst, erkläre ich sie dir gerne – aber am wichtigsten ist:
→ Bitte fülle das Formular vollständig aus.

Ohne deine Angaben (Name, Kontakt, Adresse, Objekt) können wir dich leider nicht berücksichtigen. 😊

🚠 Wir übernehmen den Rest:
Wir kontaktieren den Eigentümer, bewerten die Immobilie, bewerben sie – und wenn sie verkauft wird, bekommst du deine Prämie! 🎉
        `
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.3,
    max_tokens: 200,
  });

  const messageContent = completion.choices[0].message.content ?? "";
  return {
    message: {
      role: "assistant",
      content: messageContent,
    },
  };
};
