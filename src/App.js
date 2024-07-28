import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Answers from "./Answers";
import CountDown from "./Countdown";
import SigninPage from "./SigninPage";
import SignIn from "./SigninPage";
import SignupPage from "./SignupPage";
import SignUp from "./SignupPage";

const apiUrl = "https://opentdb.com/api.php?amount=1&type=multiple";
let timerId = null;

function App() {
  const [answers, setAnswers] = useState([]);
  const [isAnswersVisible, setIsAnswersVisible] = useState(false);
  const [isAttempted, setIsAttempted] = useState(false);
  const [clickedBtnId, setClickedBtnId] = useState(false);
  const [question, setQuestion] = useState("");
  const [seconds, setSeconds] = useState(10);

  const fetchData = async () => {
    let response = await fetch(apiUrl);
    let json = await response.json();
    console.log(json);
    setQuestion(json.results[0].question);
    let answersArr = [];
    answersArr.push({
      answer: json.results[0].correct_answer,
      id: "correct-answer",
    });
    answersArr.push({
      answer: json.results[0].incorrect_answers[0],
      id: "wrong-answer-one",
    });
    answersArr.push({
      answer: json.results[0].incorrect_answers[1],
      id: "wrong-answer-two",
    });
    answersArr.push({
      answer: json.results[0].incorrect_answers[2],
      id: "wrong-answer-three",
    });
    answersArr = answersArr.sort((a, b) => {
      return a.answer.localeCompare(b.answer);
    });
    setAnswers(answersArr);
  };

  useEffect(() => {
    if (seconds < 1) {
      clearInterval(timerId);
      if (!isAttempted) {
        setIsAttempted(true);
        setClickedBtnId("correct-answer");
      }
    }
  }, [seconds]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeeAnswer = () => {
    setIsAnswersVisible(true);

    timerId = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
  };

  const handleAnswerClick = (event) => {
    setIsAttempted(true);
    setClickedBtnId(event.target.id);
    if (event.target.id === "correct-answer") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    clearInterval(timerId);
    setSeconds(20);
  };

  const handleNextQuestion = () => {
    setIsAnswersVisible(false);
    setIsAttempted(false);
    setClickedBtnId(false);
    fetchData();
  };

  return (
    <div className="main-div">
      <div className="quiz-container">
        <div
          className="question"
          dangerouslySetInnerHTML={{ __html: question }}
        />
        <button className="see-answer" onClick={handleSeeAnswer}>
          See Answers
        </button>
        <a className="next-question hover-link" onClick={handleNextQuestion}>
          Go to next question
        </a>
      </div>

      {isAnswersVisible && (
        <Answers
          answers={answers}
          isAttempted={isAttempted}
          clickedBtnId={clickedBtnId}
          handleAnswerClick={handleAnswerClick}
        />
      )}
      <br></br>
      <CountDown seconds={seconds} />
    </div>
  );
}

let OpenAiUrl = "https://api.openai.com/v1/chat/completions";

function MoreInfo(props) {
  let [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    //fetchData();
  }, []);

  const fetchData = async () => {
    const correctAnswer = props.answers.filter(
      (a) => a.id === "correct-answer"
    )[0];
    let response = await fetch(OpenAiUrl, {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `There is a question: ${props.question} and the answer is ${correctAnswer.answer}, can you explain this answer`,
          },
        ],
        temperature: 0.7,
      }),
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    setAiResponse(json.choices[0].message.content);
  };

  return <div className="more-info">{aiResponse}</div>;
}

export default App;
