import { useEffect, useState } from "react";

function QuizCard({ question, choices = [], correctAnswer, flag, onNext }) {
  console.log("Props reçues par QuizCard :", { question, choices, correctAnswer, flag, onNext });

  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [disableButtons, setDisableButtons] = useState(false);

  //reinitialiser les boutons
  useEffect(() => {
    setSelectedAnswer(null);
    setDisableButtons(false);
  }, [question]);
  
  const handleAnswer = (answer) => {

    if (disableButtons) return; // empêcher de cliquer plusieurs fois
    setDisableButtons(true);
    setSelectedAnswer(answer);

    const isCorrect = answer === correctAnswer;

    setTimeout(() => onNext(isCorrect), 200);
  };

  return (
    <div className="quiz-card">
      <h3>{question}</h3>
      {flag && <img src={flag} alt="Drapeau" style={{ width: "150px", margin: "10px 0" }} />}


      <ul className="choices">
        {choices.map((choice, i) => (
          <li
            key={i}
            onClick={() => handleAnswer(choice)}
            className={`choice ${selectedAnswer
              ? choice === correctAnswer
                ? "correct"
                : "wrong"
              : ""
            }`}
            style={{ PointerEvents: disableButtons ? "none" : "auto" }}//desactiver les boutons
          >
            {choice.startsWith("http") ? (
              <img src={choice} alt="Drapeau" className="choice-flag" style={{ width: "100px", height: "auto", borderRadius: "5px" }} />
            ) : (
              choice
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizCard;
