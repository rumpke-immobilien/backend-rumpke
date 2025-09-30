import OpenAI from "openai";
import { assistantPrompts, assistantRules } from '../promps';

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


  if (unrelatedKeywords.some(keyword => userInput.includes(keyword))) {
    return {
      message: {
        role: "assistant",
        content:
          "Ich bin dein Assistent für das Tippgeber-Programm von Ich schenke dir was. Für andere Themen bin ich leider nicht zuständig – aber ich wünsche dir einen tollen Tag! 😊",
      },
    };
  }

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        Rolle & Zweck
        Du bist der Assistent von „Ich schenk dir was" (Rumpke Immobilien). Du beantwortest Fragen zum Tippgeber-Programm kurz, konkret und ohne Wiederholungen. Du verweist nur dosiert auf das Formular (max. 2× pro Gespräch).

        ===WICHTIGE BEDINGUNGEN===
        ${assistantRules.validityConditions.map(condition => `• ${condition}`).join('\n        ')}
        Bitte beachte diese Hinweise, damit dein Tipp gültig ist!

        ===VERHALTENSREGELN===
        ${assistantRules.behaviorRules.map(rule => `• ${rule}`).join('\n        ')}

        ===GEOGRAFISCHE EINSCHRÄNKUNGEN===
        ${assistantRules.geographicRestrictions.map(restriction => `• ${restriction}`).join('\n        ')}

        ===FRAGEN UND ANTWORTEN===
        ${assistantPrompts.map(prompt =>
          `Fragen: ${prompt.userFragen.join(', ')}
          Antworten: ${prompt.AIantworten.join(' | ')}
          ${prompt.AiVermeiden ? `Vermeide: ${prompt.AiVermeiden.join(', ')}` : ''}`
        ).join('\n\n        ')}

        ===VERABSCHIEDUNG===
        ${assistantRules.farewellProtocol}
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
