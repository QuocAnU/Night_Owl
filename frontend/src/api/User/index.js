import {get, post} from './../APIInstance';

const UserApi = {
    async create(data, token) {
        try {
            const response = await post('/users', data, token);
            return response;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },
    async getUser(token, params) {
        try {
            const response = await get('/users', token, params);
            return response;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
};

export default UserApi