import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remaingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('SETTIMEOUT');
    const timer = setTimeout(onTimeout, timeout); //lanciamo onTimeout

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]); //sono dependencies e devono rilanciare lo useEffect se cambiano, ovviamente se il parent rimette un timeout dobbiamo ripartire

  useEffect(() => {
    //necessario perchè update state reloada
    console.log('SET INTERV');
    const interval = setInterval(() => {
      setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
    }, 100);

    return () => {
      //cleanup
      clearInterval(interval);
    };
  }, []); //no dependencies

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remaingTime}
      className={mode}
    />
  );
}
