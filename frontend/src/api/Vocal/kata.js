import {get} from './../APIInstance';

const KataApi = {
    async getKata(token) {
        try {
        const data = await get('/kata', token, null);
            return data;
            } catch (error) {
            console.error('Error fetching kata data:', error);
            throw error;
            }
        },

    async getKataBySection(token, params) {
        try {
            const resData = await get(`/kata`, token, params);
            return resData;
        }
        catch (error) {
            console.error('Error fetching kata data:', error);
            throw error;
        }
    },
}

export default KataApi;