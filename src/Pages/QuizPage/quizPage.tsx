import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "./QuizPage.css";

function QuizPage() {
  const questions = [
    {
      questionText: "What's your hair type or texture?",
      options: ["a. Straight", "b. Curly", "c. Wavy", "d. Fine"],
    },
    {
      questionText: "How often do you wash your hair?",
      options: [
        "a. Daily",
        "b. Every other day",
        "c. Twice a week",
        "d. Once a week",
        "e. Once every two weeks",
      ],
    },
    {
      questionText: "What benefit do you look for in your hair products?",
      options: [
        "a. Anti-breakage",
        "b. Hydration",
        "c. Soothing dry scalp",
        "d. Repairs the appearance of damaged hair",
        "e. Volume",
        "f. Curl and coil enhancing",
      ],
    },
    {
      questionText: "Is there anything troubling you about your hair?",
      options: [
        "a. Breakage",
        "b. Frizz",
        "c. Scalp dryness",
        "d. Damage",
        "e. Tangling",
      ],
    },
    {
      questionText: "What is your natural hair color(s) today?",
      options: [
        "a. Black",
        "b. Brown",
        "c. Blonde",
        "d. Red/Orange",
        "e. Silver/Grey",
      ],
    },
  ];

  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsTransitioning(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setIsTransitioning(false);
    } else {
      navigate("/");
    }
  };

  const handleOptionClick = (selectedOption: string, questionIndex: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      const updatedSelectedOptions = [...selectedOptions];
      updatedSelectedOptions[questionIndex] = selectedOption;
      setSelectedOptions(updatedSelectedOptions);

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setIsTransitioning(false);
        }
      }, 1000);
    }
  };

  const fraction = `${currentQuestion + 1}/${questions.length}`;

  return (
    <div className="QuizPage">
      <div className="website_wrapper container">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-md-11">
            <h1>{questions[currentQuestion].questionText}</h1>
          </div>
          <div className="col-md-1 d-none d-md-block d-lg-block d-xl-block">
            <CircularProgressbar
              value={currentQuestion + 1}
              maxValue={questions.length}
              text={fraction}
            />
          </div>

          <div className="anwsers col-md-12 py-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                className="btn-anwser"
                key={index}
                onClick={() => handleOptionClick(option, currentQuestion)}
                style={{
                  backgroundColor:
                    selectedOptions[currentQuestion] === option
                      ? "#5BC1ED"
                      : "white",
                  border:
                    selectedOptions[currentQuestion] === option
                      ? "none"
                      : "1px solid #ccc",
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="col-md-12 btns">
            <button onClick={handlePrevQuestion}>
              {currentQuestion === 0 ? <Link to="/">Back</Link> : "Back"}
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
            >
              {currentQuestion === questions.length - 1 ? (
                <Link to="/result">Finish</Link>
              ) : (
                "Next Question"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
