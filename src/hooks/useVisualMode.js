import {useEffect, useState} from 'react'


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])
  function transition(newMode, replace) {
    if (replace){
      setMode(newMode)
      console.log(history[0])
      setHistory((prev) => [prev[0], newMode])}

    else {
    setMode(newMode)
    setHistory((prev) => [...prev, newMode])
    }
  }
  function back(){
    const newHistory = [...history]
    newHistory.pop()
    setHistory(newHistory)
    setMode(newHistory[newHistory.length-1])
  }
  return { mode, transition, back, history };
}


