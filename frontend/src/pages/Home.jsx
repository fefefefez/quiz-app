import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/UI/Header";
import PrimaryButton from "../components/UI/PrimaryButton";
import Select from "../components/UI/Select";

function Home() {
    const [category, setCategory] = useState("pays-capital"); // initialisation de la catégorie
    const navigate = useNavigate(); // hook pour la navigation
    
    // categories:
    const categoryOptions = [
        { value: "pays-capital", label: "Capitales" },
        { value: "capital-pays", label: "Pays(capitales)" },
        { value: "pays-drapeau", label: "Drapeaux" },
        { value: "drapeau-pays", label: "Pays(drapeaux)" },
        { value: "pays-monnaies", label: "Monnaies" },
        { value: "monnaies-pays", label: "Pays(monnaies)" } 
    ];

    const startQuiz = () => {
        navigate(`/quiz?category=${category}`); // redirection vers la page du quiz
    };

    return (
        <div className="page-layout">
            <Header />
            <main className="main-content">
                <div className="home-container">
                    <div className="select-container">
                        <p className="category-label">Choisissez la catégorie pour les questions :</p>
                        <Select value={category} onChange={(e)=> setCategory(e.target.value)} options={categoryOptions}/>
                        <PrimaryButton onClick={startQuiz}>Commencer le Quiz</PrimaryButton> 
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;