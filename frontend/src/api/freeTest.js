import { get} from './APIInstance';

const FreeTestApi = {
    async getData(token) {
        try {
        const data = await get('/free-test', 'GET', null, token);
            return data;
            } catch (error) {
            console.error('Error fetching free test data:', error);
            throw error;
            }
        }
    }
    
export default FreeTestApi