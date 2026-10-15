import { detect } from "tinyld";

export type ChatLanguage = "English" | "Turkish" | "German";

export function getQuestionLanguage(question: string): ChatLanguage {
  const languageCode = detect(question, { only: ["en", "tr", "de"] });

  if (languageCode === "tr") return "Turkish";
  if (languageCode === "de") return "German";
  return "English";
}
