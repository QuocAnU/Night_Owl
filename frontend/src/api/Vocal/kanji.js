import {get} from "./../APIInstance";


const KanjiApi = {
    async getKanji(token) {
        try {
        const data = await get('/kanji', token, null);
            return data;
            } catch (error) {
            console.error('Error fetching kanji data:', error);
            throw error;
            }
        },
    async getKanjiBySection(token, params) {
        try {
            const resData = await get(`/kanji`, token, params);
            return resData;
        }
        catch (error) {
            console.error('Error fetching kanji data:', error);
            throw error;
        }
    },
}

export default KanjiApi