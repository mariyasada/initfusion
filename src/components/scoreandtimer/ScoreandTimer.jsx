import React from "react";
import "./ScoreandTimer.css";

const ScoreandTimer = ({ currentQuestion }) => {
  const { difficulty, timer } = currentQuestion;
  return (
    <div className="scorecontainer">
      <span>level : {difficulty}</span>
      <span>
        points : {difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3}
      </span>
      <span className="timer">Timer:{timer} sec</span>
    </div>
  );
};

export default ScoreandTimer;
