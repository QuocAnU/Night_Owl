import { get, post} from './APIInstance';

const FreeTestApi = {
    async getData(token) {
        try {
        const data = await get('/free-test', token, null);
            return data;
            } catch (error) {
            console.error('Error fetching free test data:', error);
            throw error;
            }
        },

    async submitAnswers(data, token) {
        try {
        const resData = await post('/submit-answers', data, token);
            return resData;
            } catch (error) {
            console.error('Error submitting free test answers:', error);
            throw error;
            }
        },
    }

    
export default FreeTestApi