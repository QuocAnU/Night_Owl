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
    },

    async userMark (token, params) {
        try {
            const response = await get('/users/mark', token, params);
            return response;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    async receiveDiscount (token, data) {
        try {
            const response = await post('/users/discount', data, token);
            return response;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    async getFreePremium (token, params) {
        try {
            const response = await get('/users/free-premium', token, params);
            return response;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;    
        }
    }
};

export default UserApi