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
        const { clerkUserId } = req.query;
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const user = await User.findOne({ clerkUserId: clerkUserId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingAttendance = await user.attendance.find(att => isToday(att.date));

        if (!existingAttendance) {
            user.attendance.push({ date: today, status: 'present' });
            user.lastLogin = today;
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


const createUseDiscount = async (req, res) => {
    try {
        const { clerkUserId, type, discount, name } = req.body;
        const existingDiscount = await UserDiscount.findOne({ clerkUserId, type });
        const user = await User.findOne({ clerkUserId });
        if(user) {
            if(type === 1) {
                if(user.checkInDays < 7) {
                    return res.status(201).json({ error_code: 11, message: 'Phải điểm danh đủ 7 ngày mới được nhận!'});
                }
            } else if(type === 2) {
                if(user.checkInDays < 14) {
                    return res.status(201).json({ error_code: 12, message: 'Phải điểm danh đủ 14 ngày mới được nhận!'});
                }
            } else if(type === 3) {
                if(user.checkInDays < 30) {
                    return res.status(201).json({ error_code: 13, message: 'Phải điểm danh đủ 30 ngày mới được nhận!'});
                }
            }
        }
        if (existingDiscount) {
            return res.status(201).json({ error_code: 1, message: 'Bạn đã nhận voucher trước đó!' });
        }
        const userDiscount = new UserDiscount({
            clerkUserId,
            type,
            discount,
            name
        });
        await userDiscount.save();
        res.status(201).json({ error_code: 0 , message: 'User discount created successfully' });
    } catch (error) {
        console.error('Error creating user discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getFreePremium = async (req, res) => {
    try {
        const { clerkUserId } = req.query;
        const user = await User.findOne({ clerkUserId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.freePremium) {
            return res.status(200).json({ error_code: 1, message: 'Bạn đã dùng thử trước đó!' });
        }

        user.premium = true;
        user.plan = 'free';
        user.remainingDays = 7;
        user.freePremium = true;
        await user.save();

        res.status(200).json({ error_code: 0, message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    createUser, getUser, getUserDiscount, autoMark, createUseDiscount, getFreePremium
}