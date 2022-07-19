import { useState } from "react";

export default function useVisualMode(initial) {
  const input = () => initial;
  const [mode, setMode] = useState(input);
  const [history, setHistory] = useState([input]);
  function transition(newMode, replace = false) {

    if (replace) {
      setMode(newMode);
      setHistory((prev) => [prev]);
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
};
