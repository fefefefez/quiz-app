import { useEffect, useState, useRef } from "react";
import correctSoundFile from "../Assets/sounds/correct.wav";
import wrongSoundFile from "../Assets/sounds/wrong.wav";

function QuizCard({ question, choices = [], correctAnswer, flag, onNext, questionNumber }) {
  console.log("Props reçues par QuizCard :", { question, choices, correctAnswer, flag, onNext, questionNumber });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [disableButtons, setDisableButtons] = useState(false);
  const correctSound = useRef(new Audio(correctSoundFile));
  const wrongSound = useRef(new Audio(wrongSoundFile));

  // reglage de volume des sons
  useEffect(() => {
    correctSound.current.volume = 0.2;
    wrongSound.current.volume = 0.2;
  }, []);

  //reinitialiser les boutons - ajout de questionNumber comme dépendance
  useEffect(() => {
    setSelectedAnswer(null);
    setDisableButtons(false);
  }, [question, questionNumber]);
  
  const handleAnswer = (answer) => {
    if (disableButtons) return; // empêcher de cliquer plusieurs fois
    
    setDisableButtons(true);
    setSelectedAnswer(answer);

    const isCorrect = answer === correctAnswer;

    if (isCorrect) {
      correctSound.current.play();
    } else {
      wrongSound.current.play();
    }

    // Délai légèrement plus long pour voir la réponse
    setTimeout(() => onNext(isCorrect), 1000);
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
                : choice === selectedAnswer 
                  ? "wrong" 
                  : ""
              : ""
            }`}
            style={{ 
              pointerEvents: disableButtons ? "none" : "auto", // Correction de PointerEvents à pointerEvents
              cursor: disableButtons ? "default" : "pointer"
            }}
          >
            {choice && choice.startsWith && choice.startsWith("http") ? (
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
