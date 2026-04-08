import { ANSWER_WORDS } from "./answer-words";

export function getRandomWord(): string {
  return ANSWER_WORDS[Math.floor(Math.random() * ANSWER_WORDS.length)];
}
