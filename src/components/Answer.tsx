import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import "../styles/answer.scss";

interface AnswerTypes {
  handleSkip: () => void;
  answerCount: number;
  handleSubmit: (e: string) => void;
}

const AnswerButton: FC<{
  className: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
}> = ({ className, handleClick, label }) => (
  <button onClick={handleClick} className={className}>
    {label}
  </button>
);

const Answer: FC<AnswerTypes> = ({ handleSkip, answerCount, handleSubmit }) => {
  const [answer, setAnswer] = useState<string>("");
  const answerField = useRef<HTMLInputElement>(null);

  const labelSkip = "Skip" + (answerCount < 6 && `(+${answerCount}s)`);
  const handleAnswerSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.value) {
      e.preventDefault();
      handleSubmit(answer);
      setAnswer("");
    } else {
      answerField?.current?.focus();
    }
  };

  useEffect(() => {
    answerField.current?.focus();
  }, []);

  return (
    <Fragment>
      <div className="answer-container">
        <div>
          <input
            type="text"
            className="answer-field"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            ref={answerField}
          />
        </div>
      </div>
      <div className="answer-container button-container">
        <div className="answer-button-container">
          <AnswerButton className="answer-skip" handleClick={handleSkip} label={labelSkip} />
          <AnswerButton className="answer-submit" handleClick={handleAnswerSubmit} label="Submit" />
        </div>
      </div>
    </Fragment>
  );
};
Answer.displayName = "Answer";
export default Answer;
