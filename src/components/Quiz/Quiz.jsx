import React from "react";
import "./Quiz.css";

const Quiz = ({ currentQuestion, onChangeHandler, shuffledData }) => {
  const { question, options } = currentQuestion;
  return (
    <div className="quiz-container">
      <div className="title"> {question}</div>
      {options?.map((option) => (
        <div className="options" key={option}>
          <input
            type="radio"
            name="answers"
            onChange={(e) => onChangeHandler(e, currentQuestion)}
            value={option}
            checked={shuffledData?.selectedOption === option}
          />
          <p>{option}</p>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
