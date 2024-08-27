import {get} from "./../APIInstance";


const KanjiApi = {
    async getKanji() {
        try {
        const data = await get('/kanji', 'GET', null, null);
            return data;
            } catch (error) {
            console.error('Error fetching kanji data:', error);
            throw error;
            }
        },
}

export default KanjiApi