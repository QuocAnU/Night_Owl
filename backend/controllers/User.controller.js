const UserDiscount = require('../models/UserDiscount');
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

const getUser = async (req, res) => {
    try {
        const { clerkUserId } = req.query;
        const user = await User.findOne({ clerkUserId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ data: user, message: 'success' });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getUserDiscount = async (req, res) => {
    try {
        console.log(req.query);
        const { clerkUserId, type } = req.query;
        const userDiscount = await UserDiscount.findOne({ clerkUserId, type });
        if (!userDiscount) {
            return res.status(404).json({ message: 'User discount not found' });
        }
        res.status(200).json({ data: userDiscount, message: 'success' });
    } catch (error) {
        console.error('Error fetching user discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const isToday = (date) => {
    const today = new Date();
    return date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
};

const autoMark = async (req, res) => {
    try {
        const { userId } = req.auth.userId;
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const user = await User.findOne({ clerkUserId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingAttendance = await user.attendance.find(att => isToday(att.date));

        if (!existingAttendance) {
            user.attendance.push({ date: today, status: 'present' });
            user.checkInDays += 1;
            user.totalCheckInDays += 1;

            if(user.checkInDays >= 30) {
                user.attendance = [];
                user.checkInDays = 0;
                await user.save();

                return res.status(200).json({ message: 'Chúc mừng bạn đã hoàn thành 30 ngày điểm danh!' });
            } else {
                await user.save();
            }
        }

        res.status(200).json({ message: 'Điểm danh thành công!'});
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createUser, getUser, getUserDiscount, autoMark
}