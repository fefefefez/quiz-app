import Question from "../models/Question.js";


// @desc    Get all questions
export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().limit(10);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ajouter une question
export const addQuestion = async (req, res) => {
    try {
      console.log("📩 Données reçues :", req.body); // Vérification
  
      // Création d'une nouvelle question avec le modèle Mongoose
      const newQuestion = new Question({
        question: req.body.question,
        choices: req.body.choices,
        correctAnswer: req.body.correctAnswer,
        category: req.body.category,
      });
  
      await newQuestion.save();
      res.status(201).json({ message: "✅ Question ajoutée avec succès !" });
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de la question :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };