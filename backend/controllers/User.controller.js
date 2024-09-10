const User = require('../models/User');

const createUser = async (req, res) => {
    try {
        const { clerkUserId, firstName, lastName, email, imageUrl } = req.body;

        let user = await User.findOne({ clerkUserId });

        if (!user) {
            user = new User({
                clerkUserId,
                firstName,
                lastName,
                email,
                imageUrl
            });
            await user.save();
        }
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createUser
}