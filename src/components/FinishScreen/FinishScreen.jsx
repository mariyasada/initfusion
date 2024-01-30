import React, { useEffect } from "react";
import { quizData, points } from "../../constants/quizData";
import "./FinishScreen.css";

const FinishScreen = ({ userAnswers }) => {
  const findScore = (arr) => {
    return arr.reduce((acc, curr) => {
      let score = points[curr.difficulty] || 0;
      if (curr.hasOwnProperty("isTrue")) return curr.isTrue ? acc + score : acc;
      else return acc + score;
    }, 0);
  };
  const total_score = findScore(quizData);
  const your_score = findScore(userAnswers);
  const allAnwersIds = userAnswers.map((item) => item.id);
  const unansweredQuestion = quizData.filter(
    (question) => !allAnwersIds.includes(question.id)
  );

  return (
    <div className="sheetcontainer">
      <h1 className="heading">Your final Score Sheet</h1>
      <div>
        <h3 className="scoreheading">
          Your Score: {your_score}/{total_score}
        </h3>
      </div>
      <h1 style={{ color: your_score < 10 ? "red" : "green" }}>
        {your_score < 10 ? "You can do better👍👍" : "Great Job 🎉🎉🎉🎉"}
      </h1>
      <div className="answerscontainer">
        <h2 style={{ color: "blue" }}>
          You have attended {userAnswers.length} question
        </h2>
        <div>
          {userAnswers.map((question) => (
            <p>{`You've tackled the ${
              question.id - 1
            }th question, which is of ${
              question.difficulty
            } level, and you completed it in ${question.timer} seconds.`}</p>
          ))}
        </div>
      </div>
      <div className="answerscontainer">
        <h2 style={{ color: "orange" }}>
          {" "}
          {unansweredQuestion.length} unattended question
        </h2>
        <div>
          {unansweredQuestion.map((question) => (
            <p>{`You've not tackled the ${
              question.id - 1
            }th question, which is of ${question.difficulty} level.`}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FinishScreen);
