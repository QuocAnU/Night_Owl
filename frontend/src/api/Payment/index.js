import {get, post} from './../APIInstance';

const PaymentApi = {
    async getDiscount(token, params) {
        try {
            const response = await get('/users/discount', token, params);
            return response;    
        } catch (error) {
            console.error('Error fetching discount:', error);
            throw error;
        }
    },

    async createPayment(data) {
        try {
            const response = await post('/create-payment-link', data, null);
            return response;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw error;
        }
    }
};
export default PaymentApi