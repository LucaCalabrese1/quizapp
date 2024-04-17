import { useRef } from 'react';

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    //all'inizio è undefined
    shuffledAnswers.current = [...answers];
    //shuffle algo
    for (let i = shuffledAnswers.current.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers.current[i], shuffledAnswers.current[j]] = [
        shuffledAnswers.current[j],
        shuffledAnswers.current[i],
      ];
    }
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map(answer => {
        const isSelected = selectedAnswer === answer;
        let cssClass = '';

        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }

        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClass = answerState; //correct or wrong
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
