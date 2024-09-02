import { get, post } from './../APIInstance';

const CommentApi = {
    async getComments(token, params) {
        try {
        const data = await get(`/comments`, token, params);
            return data;
            } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
            }   
        },

    async createComment(token, data) {
        try {
        const resData = await post('/comments', data, token);
            return resData;
            } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
            }
        },
    };
export default CommentApi