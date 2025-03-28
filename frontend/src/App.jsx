import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results'; //importer la page results
import './App.css'; //importer le fichier CSS

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} /> {/* Ajouter la route vers la page results */} 

      </Routes>
    </Router>
  )
}

export default App
