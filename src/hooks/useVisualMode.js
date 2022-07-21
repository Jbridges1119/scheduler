import { useState } from "react";

//Custom hook- Updates mode and history to track flow of interview boxes
export default function useVisualMode(initial) {
  const input = () => initial;
  const [mode, setMode] = useState(input);
  const [history, setHistory] = useState([input]);
  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    }
  }

  function back() {
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  }
  return { mode, transition, back, history };
}
