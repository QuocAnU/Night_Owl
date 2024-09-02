import {get, post} from './../APIInstance';

const ReadApi = {
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
    };


export default ReadApi