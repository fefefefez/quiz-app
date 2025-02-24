import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
    const [category, setCategory] = useState("pays-capital"); // initialisation de la catégorie
    const navigate = useNavigate(); // hook pour la navigation

    const startQuiz = () => {
        navigate(`/quiz?category=${category}`); // redirection vers la page du quiz
    };

    // fonction qui permet de changer la catégorie
    return (
        <div>
           <h1> Bienvenue sur le Quiz de Geographie </h1>
           <label>Choisissez la categorie pour les questions :</label>

              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="pays-capital">Capitales</option>
                <option value="capital-pays">Pays(capitales)</option>
                <option value="pays-drapeau">Drapeaux</option>
                <option value="drapeau-pays">Pays(drapeaux)</option>
                <option value="pays-monnaies">Monnaies</option>
                <option value="monnaies-pays">Pays(monnaies)</option>
              </select>
                <button onClick={startQuiz}>Commencer le Quiz</button>
        </div>
    );
}
export default Home;