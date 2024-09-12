import {get, post} from '../../APIInstance';

const exeGrammarApi = {
    async getExeGrammar(token, params) {
        try {
        const data = await get(`/exe-grammar`, token, params);
            return data;
            } catch (error) {
            console.error('Error fetching reads:', error);
            throw error;
            }   
        },
    async submitAnswer(data, token) {
        try {
        const resData = await post('/exe-grammar/submit-answers', data, token);
            return resData;
            } catch (error) {
            console.error('Error creating read:', error);
            throw error;
            }
        },

}


export default exeGrammarApi