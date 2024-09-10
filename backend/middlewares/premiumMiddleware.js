const cron = require('node-cron');
const User = require('../models/User'); // Adjust the path as needed

const handlePremiumUsers = () => {
    // Schedule a cron job to run every day at midnight
    cron.schedule('0 0 * * *', async () => {
        try {
            // Find users who are premium and have remaining days
            const users = await User.find({ premium: true, remainingDays: { $gt: 0 } });

            for (let user of users) {
                user.remainingDays -= 1;

                if (user.remainingDays <= 0) {
                    user.premium = false;
                    user.plan = null;
                    user.remainingDays = null;
                }

                await user.save();
            }

            console.log('Daily premium status check and update completed.');
        } catch (error) {
            console.error('Error updating users:', error);
        }
    });
};

module.exports = handlePremiumUsers;
