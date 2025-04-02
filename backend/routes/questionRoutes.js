import express from "express";
import Country from "../models/Country.js";

const router = express.Router();

// 🛠️ Fonction pour nettoyer le nom de la monnaie
const cleanCurrencyName = (currency, countryName) => {
  // Liste des suffixes/adjectifs pouvant être attachés au nom du pays
  const possibleSuffixes = ["ian", "an", "ish", "ese", "ic", "ite", "i"];
  
  // Construire une RegExp pour supprimer les versions du nom du pays
  const regexBase = countryName.replace(/\s+/g, "\\s*"); // Gérer les espaces dans "United States"
  const regexVariants = possibleSuffixes.map(suffix => regexBase + suffix).join("|");
  
  // Supprimer les occurrences du pays ET de ses variantes
  const regex = new RegExp(`\\b(${regexBase}|${regexVariants})\\b`, "gi");

  return currency.replace(regex, "").trim();
};

// 🟢 Route pour générer une question
router.get("/generate", async (req, res) => {
  try {
    const category = req.query.category || "pays-capital";


    // Sélectionner un pays aléatoire
    const correctCountry = await Country.aggregate([{ $sample: { size: 1 } }]);
    if (!correctCountry.length) return res.status(404).json({ message: "Aucun pays trouvé." });
    const correct = correctCountry[0];

    let wrongAnswers, question;

    // 🟢 Génération de la question en fonction de la catégorie
    switch (category) {
      case "pays-capital":
        // Récupérer plus de pays que nécessaire pour éviter les doublons
        wrongAnswers = await Country.aggregate([
          { $match: { _id: { $ne: correct._id } } },
          { $sample: { size: 10 } },
        ]);
        
        // Filtrer pour s'assurer que les capitales sont différentes
        wrongAnswers = wrongAnswers
          .filter(c => c.capital !== correct.capital)
          .slice(0, 3);
        
        question = {
          question: `Quelle est la capitale de ${correct.name} ?`,
          choices: [correct.capital, ...wrongAnswers.map((c) => c.capital)].sort(() => Math.random() - 0.5),
          correctAnswer: correct.capital,
          // Ajouter un identifiant unique pour éviter les doublons
          questionId: `capital-${correct._id}`,
        };
        break;

      // Appliquer la même logique aux autres cas
      case "capital-pays":
        wrongAnswers = await Country.aggregate([
          { $match: { _id: { $ne: correct._id } } },
          { $sample: { size: 10 } },
        ]);
        
        // Filtrer pour s'assurer que les noms sont différents
        wrongAnswers = wrongAnswers
          .filter(c => c.name !== correct.name)
          .slice(0, 3);
        
        question = {
          question: `Quel pays a pour capitale ${correct.capital} ?`,
          choices: [correct.name, ...wrongAnswers.map((c) => c.name)].sort(() => Math.random() - 0.5),
          correctAnswer: correct.name,
          questionId: `pays-${correct._id}`,
        };
        break;

      case "pays-drapeau":
        wrongAnswers = await Country.aggregate([
          { $match: { _id: {$ne: correct._id } } },
          { $sample: { size: 10 } },
        ]);
      
        // Filtrer pour s'assurer que les drapeaux sont différents
        wrongAnswers = wrongAnswers
         .filter(c => c.flag!== correct.flag)
         .slice(0, 3);

        question = {
          question: `Quel est le drapeau de ${correct.name} ?`,
          choices: [correct.flag, ...wrongAnswers.map((c) => c.flag)].sort(() => Math.random() - 0.5),
          correctAnswer: correct.flag,
          questionId: `drapeau-${correct._id}`, // Ajout de l'identifiant unique
        };
        break;

      case "drapeau-pays":
        wrongAnswers = await Country.aggregate([
          { $match: { _id: {$ne: correct._id } } },
          { $sample: { size: 10 } },
        ]);

        // Filtrer pour s'assurer que les noms sont différents
        wrongAnswers = wrongAnswers
        .filter(c => c.name!== correct.name)
        .slice(0, 3);

        question = {
          question: `À quel pays appartient ce drapeau ?`,
          flag: correct.flag,
          choices: [correct.name, ...wrongAnswers.map((c) => c.name)].sort(() => Math.random() - 0.5),
          correctAnswer: correct.name,
          questionId: `drapeau-pays-${correct._id}`, // Ajout de l'identifiant unique
        };
        break;

      case "pays-monnaies":
        wrongAnswers = await Country.find({
          currency: correct.currency,
          _id: { $ne: correct._id },
        }).limit(3);

        const usedCurrencies = new Set([correct.currency]);

        if (wrongAnswers.length < 3) {
            const additionalWrongAnswers = await Country.aggregate([
                { $match: { currency: { $ne: correct.currency } } }, 
                { $sample: { size: 10 } }
            ]);

            for (let country of additionalWrongAnswers) {
                if (!usedCurrencies.has(country.currency) && wrongAnswers.length < 3) {
                    wrongAnswers.push(country);
                    usedCurrencies.add(country.currency);
                }
            }
        }

        // 🔥 Nettoyer la monnaie pour éviter "n dollar"
        const cleanCurrency = cleanCurrencyName(correct.currency, correct.name);
        const uniqueChoices = new Set([cleanCurrency, ...wrongAnswers.map((c) => cleanCurrencyName(c.currency, c.name))]);

        while (uniqueChoices.size < 4) {
          const extraCurrency = await Country.aggregate([{ $sample: { size: 1 } }]);
          if (extraCurrency.length > 0) {
            const cleanExtraCurrency = cleanCurrencyName(extraCurrency[0].currency, extraCurrency[0].name);
            if (!uniqueChoices.has(cleanExtraCurrency)) {
              uniqueChoices.add(cleanExtraCurrency);
            }
          }
        }

        question = {
          question: `Quelle est la monnaie utilisée en ${correct.name} ?`,
          choices: Array.from(uniqueChoices).sort(() => Math.random() - 0.5),
          correctAnswer: cleanCurrency
        };
        break;

      case "monnaies-pays":
        wrongAnswers = await Country.find({
          currency: correct.currency,
          _id: { $ne: correct._id },
        }).limit(3);

        const usedCountries = new Set([correct.name]);

        if (wrongAnswers.length < 3) {
            const additionalWrongAnswers = await Country.aggregate([
                { $match: { currency: { $ne: correct.currency } } }, 
                { $sample: { size: 10 } }
            ]);

            for (let country of additionalWrongAnswers) {
                if (!usedCountries.has(country.name) && wrongAnswers.length < 3) {
                    wrongAnswers.push(country);
                    usedCountries.add(country.name);
                }
            }
        }

        // 🔥 Nettoyer la monnaie avant d'afficher
        const cleanMonnaie = cleanCurrencyName(correct.currency, correct.name);

        question = {
          question: `Quel pays utilise la monnaie ${cleanMonnaie} ?`,
          choices: [correct.name, ...wrongAnswers.map((c) => c.name)].sort(() => Math.random() - 0.5),
          correctAnswer: correct.name
        };
        break;

      default:
        return res.status(400).json({ message: "Catégorie invalide." });
    }


    // Vérifier que les choix sont uniques
    const uniqueChoices = [...new Set(question.choices)];
    
    // Si des doublons ont été supprimés, compléter avec d'autres options
    if (uniqueChoices.length < 4) {
      // Récupérer des pays supplémentaires
      const additionalCountries = await Country.aggregate([
        { $match: { _id: { $ne: correct._id } } },
        { $sample: { size: 10 } },
      ]);
      
      // Ajouter des choix jusqu'à avoir 4 options uniques
      for (const country of additionalCountries) {
        let newOption;
        
        if (category === "pays-capital") newOption = country.capital;
        else if (category === "capital-pays") newOption = country.name;
        else if (category === "pays-drapeau") newOption = country.flag;
        else if (category === "drapeau-pays") newOption = country.name;
        else if (category === "pays-monnaies") newOption = cleanCurrencyName(country.currency, country.name);
        else if (category === "monnaies-pays") newOption = country.name;
        
        if (newOption && !uniqueChoices.includes(newOption)) {
          uniqueChoices.push(newOption);
        }
        
        if (uniqueChoices.length === 4) break;
      }
      
      // Mettre à jour les choix avec les options uniques
      question.choices = uniqueChoices.sort(() => Math.random() - 0.5);
    }

    res.json(question);
  } catch (error) {
    console.error("❌ Erreur lors de la génération de la question :", error);
    res.status(500).json({ message: "Erreur serveur, réessayez plus tard." });
  }
});

export default router;
