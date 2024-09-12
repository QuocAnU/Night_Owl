const Comment = require('../models/Comment');
const User = require('../models/User');

const createComment = async (req, res) => {
    try {
        const { content, from, clerkUserId } = req.body;
        const user = await User.findOne({clerkUserId});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { firstName, lastName, imageUrl } = user;
        const username = `${firstName} ${lastName}`;
        const avatarUrl = imageUrl;

        const comment = new Comment({
            content,
            from,
            username,
            avatarUrl,
            create_at: Date.now(),
        });

        await comment.save();

        res.status(201).json({ message: 'Comment added successfully', data: comment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getComments = async (req, res) => {
    try {
        const { from } = req.query;
        if (!from) {
            return res.status(400).json({ message: 'Missing query parameter: from' });
        }
        const comments = await Comment.find({ from });
        res.status(200).json({ data: comments, message: 'success' });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createComment, getComments };