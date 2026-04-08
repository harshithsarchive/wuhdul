export type LetterStatus = "correct" | "present" | "absent" | "empty";

export interface TileData {
  letter: string;
  status: LetterStatus;
}

/**
 * Two-pass evaluation matching NYT Wordle logic.
 * Pass 1: mark exact matches (green).
 * Pass 2: for remaining letters, mark as present (yellow) only if
 *          the letter exists in the answer AND hasn't been "used" by
 *          a prior green or yellow. Handles duplicates correctly.
 */
export function evaluateGuess(guess: string, answer: string): LetterStatus[] {
  const result: LetterStatus[] = Array(5).fill("absent");
  const answerChars = answer.split("");
  const guessChars = guess.split("");
  // Track which answer positions are still available
  const remaining: (string | null)[] = [...answerChars];

  // Pass 1 — greens
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = "correct";
      remaining[i] = null; // consumed
    }
  }

  // Pass 2 — yellows
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const idx = remaining.indexOf(guessChars[i]);
    if (idx !== -1) {
      result[i] = "present";
      remaining[idx] = null; // consumed
    }
  }

  return result;
}

/**
 * Aggregate keyboard letter statuses across all submitted guesses.
 * Priority: correct > present > absent.
 */
export function getKeyboardStatuses(
  guesses: TileData[][]
): Record<string, LetterStatus> {
  const statuses: Record<string, LetterStatus> = {};

  for (const guess of guesses) {
    for (const tile of guess) {
      if (!tile.letter) continue;
      const key = tile.letter.toUpperCase();
      const existing = statuses[key];
      if (tile.status === "correct") {
        statuses[key] = "correct";
      } else if (tile.status === "present" && existing !== "correct") {
        statuses[key] = "present";
      } else if (tile.status === "absent" && !existing) {
        statuses[key] = "absent";
      }
    }
  }

  return statuses;
}
