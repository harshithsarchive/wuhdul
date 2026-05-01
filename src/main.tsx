/**
 * Wuhdul
 * Designed and built by Harshith Gupta (@progharshith)
 * github.com/progharshith | linkedin.com/in/harshithgupta
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log(
  "%cWuhdul",
  "font-weight:bold;font-size:18px;color:#6aaa64;letter-spacing:0.15em;"
);
console.log(
  "%cDesigned & built by Harshith Gupta",
  "font-size:12px;color:#888;"
);
console.log(
  "%cgithub.com/progharshith  •  linkedin.com/in/harshithgupta",
  "font-size:11px;color:#555;"
);

createRoot(document.getElementById("root")!).render(<App />);