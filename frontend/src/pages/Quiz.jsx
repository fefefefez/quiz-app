import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestions } from "../services/api";
import QuizCard from "../components/QuizCard";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Quiz() {
  const query = useQuery();
  const navigate = useNavigate();
  const category = query.get("category");
  const replay = query.get("replay") === "true";
  
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [askedQuestionIds, setAskedQuestionIds] = useState([]);
  
  useEffect(() => {
    if (!category) {
      setError("❌ Aucune catégorie spécifiée !");
      navigate("/");
      return;
    }

    const fetchAllQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const newQuestions = [];
        const usedIds = [];

        for (let i = 0; i < 15; i++) {
          const data = await getQuestions(category, usedIds);
          if (data && typeof data === "object") {
            newQuestions.push(data);
            if (data.questionId) {
              usedIds.push(data.questionId);
            }
          }
        }

        if (newQuestions.length === 15) {
          setQuestions(newQuestions);
          setQuestionIndex(0);
          setScore(0);
          setQuizFinished(false);
          setAskedQuestionIds(usedIds);
        } else {
          setError("❌ Impossible de charger toutes les questions !");
        }
      } catch (err) {
        setError("❌ Erreur lors du chargement des questions !");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllQuestions();
  }, [category, replay, navigate]);

  const handleNextQuestion = (isCorrect) => {
    setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));

    if (questionIndex < 14) {
      setTimeout(() => {
        setQuestionIndex((prevIndex) => prevIndex + 1);
      }, 200);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReplay = () => {
    setLoading(true);
    setQuestions([]);
    setQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setAskedQuestionIds([]);
    navigate(`/quiz?category=${category}&replay=${!replay}`);
  };

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate("/")}>🏠 Retour à l'accueil</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <p>🔄 Chargement des questions...</p>
        <p>Question {questionIndex + 1} / 15</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {!quizFinished && (
        <div className="quiz-progress">
          <p>Question {questionIndex + 1} / 15</p>
          <p>Score: {score}</p>
        </div>
      )}
      
      {quizFinished ? (
        <div className="results-container">
          <h1>🎉 Fin du Quiz !</h1>
          <p>✅ Votre score : <strong>{score} / 15</strong></p>
          <p>📚 Catégorie jouée : <strong>{category}</strong></p>
          <div className="button-container">
            <button onClick={() => navigate("/")}>🏠 Retour à l'accueil</button>
            <button onClick={handleReplay}>🔄 Rejouer</button>
          </div>
        </div>
      ) : questions[questionIndex] ? (
        <QuizCard
          {...questions[questionIndex]}
          onNext={handleNextQuestion}
          questionNumber={questionIndex + 1}
        />
      ) : (
        <p>❌ Problème lors du chargement de la question...</p>
      )}
    </div>
  );
}

export default Quiz;
