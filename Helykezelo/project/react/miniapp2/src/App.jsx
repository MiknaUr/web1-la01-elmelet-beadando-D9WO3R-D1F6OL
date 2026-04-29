import { useState } from "react";
import ChoiceButton from "./ChoiceButton";
import ResultPanel from "./ResultPanel";

const choices = ["Kő", "Papír", "Olló"];

export default function App() {
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [result, setResult] = useState("");

  function play(choice) {
    const comp = choices[Math.floor(Math.random() * 3)];

    setPlayer(choice);
    setComputer(comp);

    if (choice === comp) {
      setResult("Döntetlen");
    } else if (
      (choice === "Kő" && comp === "Olló") ||
      (choice === "Papír" && comp === "Kő") ||
      (choice === "Olló" && comp === "Papír")
    ) {
      setResult("Nyertél!");
    } else {
      setResult("Vesztettél!");
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Kő‑Papír‑Olló</h1>

      <div style={{ marginBottom: 20 }}>
        {choices.map(c => (
          <ChoiceButton key={c} text={c} onClick={() => play(c)} />
        ))}
      </div>

      <ResultPanel player={player} computer={computer} result={result} />
    </div>
  );
}
