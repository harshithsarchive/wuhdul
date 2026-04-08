import { useCallback, useEffect, useState } from "react";
import { TileData, LetterStatus, evaluateGuess, getKeyboardStatuses } from "@/lib/wordle";
import { getRandomWord } from "@/lib/words";
import { VALID_WORDS } from "@/lib/valid-words";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export default function Wordle() {
  const [answer, setAnswer] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState<TileData[][]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState("");
  const [shakeRow, setShakeRow] = useState(false);

  const showMessage = (msg: string, duration = 1500) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  };

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) {
      showMessage("Not enough letters");
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 500);
      return;
    }

    if (!VALID_WORDS.has(currentGuess.toLowerCase())) {
      showMessage("Not in word list");
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 500);
      return;
    }

    const statuses = evaluateGuess(currentGuess.toLowerCase(), answer);
    const tiles: TileData[] = currentGuess.split("").map((l, i) => ({
      letter: l,
      status: statuses[i],
    }));

    const newGuesses = [...guesses, tiles];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess.toLowerCase() === answer) {
      setGameOver(true);
      setWon(true);
      showMessage("Brilliant!", 3000);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      showMessage(answer.toUpperCase(), 5000);
    }
  }, [currentGuess, answer, guesses]);

  const handleKey = useCallback(
    (key: string) => {
      if (gameOver) return;
      if (key === "ENTER") {
        submitGuess();
      } else if (key === "⌫" || key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [gameOver, currentGuess, submitGuess]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      handleKey(e.key.toUpperCase());
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  const resetGame = () => {
    setAnswer(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setWon(false);
    setMessage("");
  };

  const keyStatuses = getKeyboardStatuses(guesses);

  // Build grid
  const gridRows: TileData[][] = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      gridRows.push(guesses[i]);
    } else if (i === guesses.length) {
      const row: TileData[] = [];
      for (let j = 0; j < WORD_LENGTH; j++) {
        row.push({ letter: currentGuess[j] || "", status: "empty" });
      }
      gridRows.push(row);
    } else {
      gridRows.push(Array(WORD_LENGTH).fill({ letter: "", status: "empty" as LetterStatus }));
    }
  }

  const isCurrentRow = (ri: number) => ri === guesses.length && !gameOver;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-background text-foreground select-none">
      {/* Header */}
      <header className="w-full border-b border-border py-3 text-center">
        <h1 className="text-lg font-bold tracking-[0.2em] uppercase">Wordle</h1>
      </header>

      {/* Toast */}
      {message && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 text-sm font-bold">
          {message}
        </div>
      )}

      {/* Grid */}
      <div className="flex flex-col gap-[4px] py-4">
        {gridRows.map((row, ri) => (
          <div
            key={ri}
            className={`flex gap-[4px] ${isCurrentRow(ri) && shakeRow ? "animate-shake" : ""}`}
          >
            {row.map((tile, ci) => (
              <Tile key={`${ri}-${ci}`} tile={tile} />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom area */}
      <div className="w-full max-w-[500px] px-2 pb-3">
        {gameOver && (
          <button
            onClick={resetGame}
            className="w-full mb-2 py-2 text-xs font-bold tracking-widest uppercase bg-foreground text-background hover:opacity-80 transition-opacity"
          >
            New Game
          </button>
        )}
        <div className="flex flex-col gap-[6px]">
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-[4px]">
              {row.map((key) => (
                <Key
                  key={key}
                  value={key}
                  status={keyStatuses[key]}
                  onClick={() => handleKey(key)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tile({ tile }: { tile: TileData }) {
  const base =
    "w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] flex items-center justify-center text-sm font-bold uppercase transition-all duration-300";

  const styles: Record<string, string> = {
    correct: "bg-wordle-correct text-wordle-correct-foreground border border-wordle-correct",
    present: "bg-wordle-present text-wordle-present-foreground border border-wordle-present",
    absent: "bg-wordle-absent text-wordle-absent-foreground border border-wordle-absent",
    empty: `border ${tile.letter ? "border-wordle-filled-border" : "border-wordle-empty-border"}`,
  };

  return (
    <div className={`${base} ${styles[tile.status] || styles.empty}`}>
      {tile.letter}
    </div>
  );
}

function Key({
  value,
  status,
  onClick,
}: {
  value: string;
  status?: LetterStatus;
  onClick: () => void;
}) {
  const isWide = value === "ENTER" || value === "⌫";

  const statusMap: Record<string, string> = {
    correct: "bg-wordle-correct text-wordle-correct-foreground",
    present: "bg-wordle-present text-wordle-present-foreground",
    absent: "bg-wordle-absent text-wordle-absent-foreground",
  };

  const bg = status
    ? statusMap[status] || "bg-secondary text-secondary-foreground"
    : "bg-secondary text-secondary-foreground";

  return (
    <button
      onClick={onClick}
      className={`${isWide ? "px-3 text-[10px]" : "w-[28px] sm:w-[34px]"} h-[44px] flex items-center justify-center font-semibold text-xs uppercase transition-colors ${bg} hover:opacity-80 active:opacity-60`}
    >
      {value}
    </button>
  );
}
