import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestions } from "../services/api";
import QuizCard from "../components/QuizCard";

// Hook pour récupérer les paramètres de l'URL
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Quiz() {
  const query = useQuery();
  const navigate = useNavigate();
  const category = query.get("category");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  // Dans votre composant Quiz
  const [askedQuestionIds, setAskedQuestionIds] = useState([]);
  
  // Lors du chargement des questions
  const fetchQuestion = async () => {
    try {
      // Envoyer les IDs des questions déjà posées
      const response = await getQuestions(category, askedQuestionIds);
      
      // Ajouter l'ID de la nouvelle question à la liste
      if (response.questionId) {
        setAskedQuestionIds(prev => [...prev, response.questionId]);
      }
      
      // Reste de votre code...
    } catch (error) {
      console.error(error);
    }
  };
  // Utilisation de useEffect pour charger les questions
  useEffect(() => {
    fetchQuestion();
  }, [category, askedQuestionIds]);

  useEffect(() => {
    if (!category) {
      console.error("❌ Aucune catégorie spécifiée !");
      navigate("/");
      return;
    }

    const fetchAllQuestions = async () => {
      setLoading(true);
      const newQuestions = [];

      for (let i = 0; i < 15; i++) {
        const data = await getQuestions(category);
        if (data && typeof data === "object") {
          newQuestions.push(data);
        }
      }

      if (newQuestions.length === 15) {
        setQuestions(newQuestions);
      } else {
        console.error("❌ Problème lors du chargement des questions !");
      }
      setLoading(false);
    };

    fetchAllQuestions();
  }, [category, navigate]);

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

  if (loading) {
    return <p>🔄 Chargement des questions...</p>;
  }

  return (
    <div className="quiz-container">
      
      {quizFinished ? (
          <div className="results-container">
            <h1>🎉 Fin du Quiz !</h1>
            <p>✅ Votre score : <strong>{score} / 15</strong></p>
            <p>📚 Catégorie jouée : <strong>{category}</strong></p>
      
            <button onClick={() => navigate("/")}>🏠 Retour à l'accueil</button>
            <button onClick={() => navigate(`/quiz?category=${category}`)}>🔄 Rejouer</button>
          </div>
        ) : questions[questionIndex] ? (
          <QuizCard
            {...questions[questionIndex]}
            onNext={handleNextQuestion}
          />
        ) : (
          <p>❌ Problème lors du chargement de la question...</p>
        )}
    </div>
  );
}

export default Quiz;
