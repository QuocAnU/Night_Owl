import {get} from "./../../APIInstance";


const GrammarTheoryApi = {

    async getGrammarTheory(token) {
        try {
        const data = await get('/grammar-theory', token, null);
            return data;
            } catch (error) {
            console.error('Error fetching grammar theory data:', error);
            throw error;
            }
        },

    async getGrammarTheoryBySection(token, params) {
        try {
        const data = await get('/grammar-theory', token, params);
            return data;
            } catch (error) {
            console.error('Error fetching grammar theory data:', error);
            throw error;
            }
        },
}

export default GrammarTheoryApi;