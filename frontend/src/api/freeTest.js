import { get, post} from './APIInstance';

const FreeTestApi = {
    async getData(token) {
        try {
        const data = await get('/free-test', 'GET', null, token);
            return data;
            } catch (error) {
            console.error('Error fetching free test data:', error);
            throw error;
            }
        },

    async submitAnswers(values, token) {
        try {
        const data = await post('/submit-answers', values, 'POST', null, token);
            return data;
            } catch (error) {
            console.error('Error submitting free test answers:', error);
            throw error;
            }
        },
    }

    
export default FreeTestApi