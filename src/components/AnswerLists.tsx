import React, { FC } from "react";
import { BsSquare, BsXLg } from "react-icons/bs";
import "../styles/answer-lists.scss";

interface AnswerListsType {
  answers: string[];
}

const AnswerLists: FC<AnswerListsType> = ({ answers }) => {
  return (
    <div className="answer-lists-container">
      <div className="answer-lists-space" />
      {Array(6)
        .fill(6)
        .map((val, index) => (
          <div className="answer-box" key={`answer-box-${index}`}>
            <div className="answer-view">
              {answers[index] && answers[index] === "SKIPPED" && (
                <div className="answer-skip">
                  <BsSquare />{" "}
                  <div style={{ letterSpacing: "3px", fontWeight: "600", marginLeft: "10px" }}>SKIPPED</div>
                </div>
              )}
              {answers[index] && answers[index] !== "SKIPPED" && (
                <div className="answer-not-skip">
                  <BsXLg />{" "}
                  <div style={{ fontSize: "14px", lineHeight: "20px", marginLeft: "10px" }}>{answers[index]}</div>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
AnswerLists.displayName = "AnswerLists";
export default AnswerLists;
