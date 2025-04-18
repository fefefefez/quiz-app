import axios from 'axios';

export const getQuestions = async (category, askedIds = []) => {
    const API_URL = import.meta.env.VITE_API_URL || '/api/questions';
    try {
        const queryParams = new URLSearchParams({
            category,
            exclude: askedIds.join(',')
        });
        
        const response = await axios.get(`${API_URL}/generate?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de la question', error);
        return [];
    }
};