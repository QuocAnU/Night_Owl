const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('./models/User'); // Adjust the path as necessary

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

// Function to send reminder email
async function sendReminderEmail(user) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email, // Make sure user has an email property
            subject: 'User, don’t lose your streak! Come back and learn Japanese.',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    /* Add any additional styles you want here */
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Night Owl</h1>
                    <p>Hi ${user.name},</p>
                    <p>Did you know <strong>犬</strong> means the <strong>dog</strong> in Japanese? Don't forget to visit regularly to learn more useful knowledge!</p>
                    <a href="https://night-owl-xn17.vercel.app/" style="background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px;">Go to Website</a>
                    <p>If this wasn’t you, please ignore this email.</p>
                </div>
            </body>
            </html>
            `,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Function to check and update days off
async function checkAndUpdateDayOffs() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        const users = await User.find();

        for (const user of users) {
            if (!user.lastLogin || user.lastLogin < today) {
                user.dayOffs += 1;

                if ([2, 7, 15, 21, 28].includes(user.dayOffs)) {
                    await sendReminderEmail(user);
                }

                if (user.dayOffs >= 30) {
                    user.dayOffs = 0;
                }

                await user.save();
            }
        }

        console.log('Updated days off and sent reminder emails if necessary.');
    } catch (error) {
        console.error('Error updating days off:', error);
    }
}
module.exports = {
    checkAndUpdateDayOffs
};
