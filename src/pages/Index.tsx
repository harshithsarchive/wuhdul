import { useEffect, useState } from "react";
import Wordle from "@/components/Wordle";

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="fixed top-3 right-4 z-50 text-xs font-mono tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}

const Index = () => {
  return (
    <>
      <ThemeToggle />
      <Wordle />
    </>
  );
};

export default Index;
