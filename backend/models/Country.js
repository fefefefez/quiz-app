import mongoose from 'mongoose';


const countrySchema = new mongoose.Schema({
    name: {type: String, required: true},
    capital: {type: String, required: true},
    flag: {type: String, required: true},
    currency: {type: String, required: true},
    region: {type: String, required: true}, //region du monde (Afrique, Amérique, Asie, Europe, Océanie)
    subregion: {type: String, required: true}, //sous-région du monde (Afrique du Nord, Amérique du Sud, Asie de l'Est, Europe de l'Ouest, Océanie du Sud)
    languages: {type: [String], required: true}, //tableau de langues parlées dans le pays
});

const Country = mongoose.model('Country', countrySchema); //créer un modèle Country à partir du schéma countrySchema

export default Country;  //exporter la classe Country