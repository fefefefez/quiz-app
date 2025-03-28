import { useLocation, useNavigate } from "react-router-dom";


function Results()
{
    const location = useLocation();
    const navigate = useNavigate();

    //recuperer les pparametres de l'URL
    const query = new URLSearchParams(location.search);
    const score = query.get("score");
    const category = query.get("category");

    return(
        <div className="results-container">
        <h1>🎉 Fin du Quiz !</h1>
        <p>✅ Votre score : <strong>{score} / 15</strong></p>
        <p>📚 Catégorie jouée : <strong>{category}</strong></p>
  
        <button onClick={() => navigate("/")}>🏠 Retour à l'accueil</button>
        <button onClick={() => navigate(`/quiz?category=${category}`)}>🔄 Rejouer</button>
      </div>
    );
}

export default Results;
