import {get, post} from '../APIInstance';

const TestApi = {
    async getTestGrammar(token, params) {
        try {
        const data = await get(`/test-grammar`, token, params);
            return data;
            } catch (error) {
            console.error('Error fetching reads:', error);
            throw error;
            }   
        },
    async submitAnswer(data, token) {
        try {
        const resData = await post('/test-grammar/submit-answers', data, token);
            return resData;
            } catch (error) {
            console.error('Error creating read:', error);
            throw error;
            }
        },
     async getTestVocal(token, params) {
        try {
        const data = await get(`/test-vocal`, token, params);
            return data;
            } catch (error) {
            console.error('Error fetching reads:', error);
            throw error;
            }   
        },  
     async submitVocalAnswer(data, token) {
        try {
        const resData = await post('/test-vocal/submit-answers', data, token);
            return resData;
            } catch (error) {
            console.error('Error creating read:', error);
            throw error;
            }
        },
    };

    


export default TestApi;