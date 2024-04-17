import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
  const [userAnswers, SetUserAnswers] = useState([]);

  //ci deriviamo la active question dalle answers, se answers = 0 allora la domanda active sarà la prima (idx 0)
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; //vero se abbiamo finito

  //la callbackiamo perchè se ricreata e chiamata dalla progress diventa una nuova funz
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
      SetUserAnswers(prevUserAnswer => {
        return [...prevUserAnswer, selectedAnswer];
      });
    },[]
  ); //non dipende da props o states (SetUserAnswers react garantisce che non cambia )

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />; 
  }

  return (
    <div id="quiz">
      {/* settiamo una key così si reloada il componente al cambio dell'index */}
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={() => handleSelectAnswer(null)}
      />
    </div>
  );
}
