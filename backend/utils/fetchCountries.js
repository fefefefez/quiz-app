import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Country from '../models/Country.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const fetchCountries = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all'); // ✅ Correction de l'API
        const countries = response.data;

        // récupérer les données de chaque pays et les stocker dans la base de données
        for (const country of countries) {
            if (country.capital && country.capital.length > 0) {
                const newCountry = {
                    name: country.name.common, 
                    capital: country.capital[0],
                    flag: country.flags.png, 
                    currency: country.currencies ? Object.values(country.currencies)[0].name : "Inconnue", 
                    region: country.region || "Inconnue",
                    subregion: country.subregion || "Inconnue",
                    languages: country.languages ? Object.values(country.languages) : ["Inconnue"] 
                };

                await Country.findOneAndUpdate(
                    { name: newCountry.name }, 
                    newCountry, 
                    { upsert: true, new: true }
                );
                console.log(`✅ Ajout de ${newCountry.name} dans la base`);
            }
        }
        console.log('🚀 Tous les pays ont été ajoutés avec succès !');
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout des pays :", error); 
    } finally {
        mongoose.connection.close();
    }
};

fetchCountries();
