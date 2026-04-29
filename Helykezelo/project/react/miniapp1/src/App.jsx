import { useState, useEffect } from "react";
import Display from "./Display";
import Control from "./Control";

export default function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Stopperóra</h1>
      <Display time={time} />
      <Control
        running={running}
        onStart={() => setRunning(true)}
        onStop={() => setRunning(false)}
        onReset={() => setTime(0)}
      />
    </div>
  );
}
