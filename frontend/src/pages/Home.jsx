import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [category, setCategory] = useState("pays-capital"); // initialisation de la catégorie
    const navigate = useNavigate(); // hook pour la navigation

    const startQuiz = () => {
        navigate(`/quiz?category=${category}`); // redirection vers la page du quiz
    };

    return (
        <div className="home-container">
           <h1 className="app-title">Bienvenue sur le Quiz de Géographie</h1>
           
           <div className="select-container">
             <p className="category-label">Choisissez la catégorie pour les questions :</p>
             <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="pays-capital">Capitales</option>
                <option value="capital-pays">Pays(capitales)</option>
                <option value="pays-drapeau">Drapeaux</option>
                <option value="drapeau-pays">Pays(drapeaux)</option>
                <option value="pays-monnaies">Monnaies</option>
                <option value="monnaies-pays">Pays(monnaies)</option>
             </select>
             <button className="start-button" onClick={startQuiz}>Commencer le Quiz</button>
           </div>
        </div>
    );
}

export default Home;