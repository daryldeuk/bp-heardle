import React, { FC, useCallback, useState } from "react";
import { Answer, AnswerLists, Description, Header, ProgressBar } from "./components";

const CORRECT_ANSWER = "test";
export const App: FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerCount, setAnswerCount] = useState<number>(1);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const handleSkip = useCallback(() => {
    setAnswerCount((prevState) => prevState + 1);
    setAnswers((prevState) => [...prevState, "SKIPPED"]);
  }, []);
  const handleSubmit = useCallback((e: string) => {
    if (e === CORRECT_ANSWER) {
      setIsCorrect(true);
    } else {
      setAnswers((prevState) => [...prevState, e]);
      setAnswerCount((prevState) => prevState + 1);
    }
  }, []);
  return (
    <div style={{ margin: "0 auto" }}>
      <Header />
      {!isCorrect && answers.length < 6 && (
        <>
          <AnswerLists answers={answers} />
          <Description />
          <ProgressBar answerCount={answerCount} />
          <Answer handleSkip={handleSkip} answerCount={answerCount} handleSubmit={handleSubmit} />
        </>
      )}
      {!isCorrect && answers.length === 6 && <div>Better luck next time</div>}
      {isCorrect && <div>Congrats</div>}
    </div>
  );
};
App.displayName = "App";
export default App;
