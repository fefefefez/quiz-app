import axios from 'axios';

export const getQuestions = async (category) => {

    const API_URL = 'http://localhost:5002/api/questions';
    try {
        console.log(` Requete vers l'API pour recuperer les questions : ${API_URL}/generate?category=${category}`); // Requete vers l'API pour recuperer les questions
        const response = await axios.get(`${API_URL}/generate?category=${category}`); // Requete vers l'API pour recuperer les questions
        
        console.log('Reponse de l\'API', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la recuperation de la question', error);
        return [];
    }
};