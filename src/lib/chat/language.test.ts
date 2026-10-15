import { expect, test } from "vitest";
import { getQuestionLanguage } from "./language";

test.each([
  ["atakan kimdir?", "Turkish"],
  ["Türkçe cevap ver.", "Turkish"],
  ["Wer ist Atakan?", "German"],
  ["What did Atakan do at Yokogawa?", "English"],
  ["When can he start?", "English"],
  ["EPAM?", "English"],
])("detects the language of a short question: %s", (question, language) => {
  expect(getQuestionLanguage(question)).toBe(language);
});
