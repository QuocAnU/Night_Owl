import { get } from "./../APIInstance";


const HiraApi = {
    async getHira(token) {
        try {
        const data = await get('/hira', token, null);
            return data;
            } catch (error) {
            console.error('Error fetching hira data:', error);
            throw error;
            }
        },

    async getHiraBySection(token, params) { 
        try {
            const resData = await get(`/hira`, token, params);
            return resData;
        }
        catch (error) {
            console.error('Error fetching hira data:', error);
            throw error;
        }
    },
}

export default HiraApi