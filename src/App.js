import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz/Quiz";
import { quizData } from "./constants/quizData";
import ScoreandTimer from "./components/scoreandtimer/ScoreandTimer";
import FinishScreen from "./components/FinishScreen/FinishScreen";

function App() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState({
    selectedOption: null,
    shuffledOptions: [],
    submitScreen: false,
  });

  useEffect(() => {
    setQuestion(quizData[currentQuestionNumber]);
  }, [currentQuestionNumber]);

  useEffect(() => {
    if (currentQuestionNumber < quizData.length) {
      const timerInterval = setInterval(() => {
        setQuestion((prevQuestion) => {
          if (prevQuestion?.timer > 0) {
            return {
              ...prevQuestion,
              timer: prevQuestion.timer - 1,
            };
          } else {
            if (currentQuestionNumber === 9) {
              setOptions((prev) => ({ ...prev, submitScreen: true }));
              clearInterval(timerInterval);
            } else {
              clearInterval(timerInterval);
              setCurrentQuestionNumber((prev) => prev + 1);
              return quizData[currentQuestionNumber + 1];
            }
          }
        });
      }, 1000);

      setOptions((prev) => ({ ...prev, selectedOption: null }));

      return () => clearInterval(timerInterval);
    }
  }, [currentQuestionNumber]);

  const handleNextQuestion = () => {
    if (currentQuestionNumber < quizData.length - 1) {
      setCurrentQuestionNumber((prev) => prev + 1);
    }
  };

  // shuffled all options
  // useEffect(() => {
  //   if (question) {
  //     const shuffled = question?.options?.sort(() => Math.random() - 0.5);
  //     setOptions((prev) => ({ ...prev, shuffledOptions: shuffled }));
  //   }
  // }, [question]);

  //liftingup state
  const submitHandler = (e, question) => {
    const answer = e.target.value;
    setOptions((prev) => ({ ...prev, selectedOption: e.target.value }));
    const answerData = {
      id: question.id,
      isTrue: answer === question.correctAnswer,
      difficulty: question?.difficulty,
      timer: question.timer,
    };

    const isAlreadyAnswered = answers?.find(
      (item) => item.id === answerData.id
    );
    if (isAlreadyAnswered) {
      setAnswers((prev) =>
        prev.map((item) => (item.id === question.id ? { ...answerData } : item))
      );
    } else {
      setAnswers((prev) => [...prev, answerData]);
    }
  };
  const submitAllAnswers = () => {
    console.log(answers, "check answers");
    setOptions((prev) => ({
      ...prev,
      submitScreen: true,
      selectedOption: null,
    }));
  };

  return (
    <div className="App">
      {!options?.submitScreen ? (
        <>
          <h1 className="heading">Quiz App</h1>
          {question && <ScoreandTimer currentQuestion={question} />}
          <div className="container">
            {question && (
              <Quiz
                currentQuestion={question}
                onChangeHandler={submitHandler}
                shuffledData={options}
              />
            )}
          </div>
          {question && currentQuestionNumber !== quizData.length - 1 ? (
            <div className="nextbtn">
              <button
                onClick={
                  options?.selectedOption ? handleNextQuestion : () => null
                }
                className={
                  options?.selectedOption === null ? "disabled" : "enabled"
                }
              >
                Next
              </button>
            </div>
          ) : (
            <div className="nextbtn">
              <button
                onClick={
                  options?.selectedOption ? submitAllAnswers : () => null
                }
                className={
                  options?.selectedOption === null ? "disabled" : "enabled"
                }
              >
                Finish
              </button>
            </div>
          )}
        </>
      ) : (
        <FinishScreen userAnswers={answers} />
      )}
    </div>
  );
}

export default App;
