import {get, post} from '../APIInstance';

const QuestionApi = {
    async getReads(token, params) {
        try {
        const data = await get(`/read`, token, params);
            return data;
            } catch (error) {
            console.error('Error fetching reads:', error);
            throw error;
            }   
        },

    async submitAnswer(data, token) {
        try {
        const resData = await post('/submit-answer', data, token);
            return resData;
            } catch (error) {
            console.error('Error creating read:', error);
            throw error;
            }
        },  
    async submitAnswerImage (data, token) {
        try {
        const resData = await post('/submit-answer-image', data, token);
            return resData;
            } catch (error) {
            console.error('Error creating read:', error);
            throw error;
            }
        }, 

    async submitAnswerListen (data, token) {
        try {
        const resData = await post('/submit-answer-listen', data, token);
            return resData;
            } catch (error) {
            console.error('Error creating listen:', error);
            throw error;
            }
        },
    };

    


export default QuestionApi;