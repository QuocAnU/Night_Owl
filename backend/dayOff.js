const cron = require('node-cron');
const nodemailer = require('nodemailer');
const oAuth2Client = require('./config/oauth2Config');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/User'); // Đường dẫn đến model User

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,  // Email của bạn
    clientId: process.env.CLIENT_EMAIL_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Hàm gửi email
async function sendReminderEmail(user) {
    try {
        // Lọc access token
        const accessToken = await oAuth2Client.getAccessToken();

        // Cấu hình email
        const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
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
        .profile-img {
            border-radius: 50%;
            width: 100px;
            height: 100px;
        }
        .header {
            margin-top: 10px;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .subtitle {
            color: #777;
            margin-bottom: 20px;
            margin-top: 20px;
        }
        .content {
            text-align: left;
            padding: 0 20px;
            color: #333;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
        }
        .button-container {
            margin: 20px 0;
        }
        .button {
            background-color: #000;
            color: #fff;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            display: inline-block;
        }
        .footer {
            margin-top: 30px;
            color: #888;
            font-size: 12px;
        }
        .footer img {
            margin: 0 5px;
        }
        .social-links {
            margin-top: 10px;
        }
        .social-links img {
            width: 24px;
            height: 24px;
        }
        .hrC{
            margin-top: 10px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Profile Image -->
        <img src="https://res.cloudinary.com/dhqzpgmhm/image/upload/v1726234153/n49hopkljymhfmvkciw5.jpg" alt="Profile Image" class="profile-img">
        
        <!-- Header -->
        <div class="header">Night Owl</div>
        <hr class="hrC"/>
        <div class="subtitle">Try your best and keep disciplined</div>
        <hr class="hrC"/>

        <!-- Main Content -->
        <div class="content">
            <p>Hi user,</p>
            <p>Did you know <strong>犬</strong> means the <strong>dog</strong> in Japanese? Don't forget to visit regularly to learn more useful knowledge!</p>
        </div>

        <!-- Button -->
        <div class="button-container">
            <a href="https://night-owl-xn17.vercel.app/" class="button">Go to Website</a>
        </div>

        <!-- Footer -->
        <div class="footer">
            If this wasn’t you, please ignore this email.
        </div>
    </div>
</body>
</html>
    `,
      auth: {
        accessToken: accessToken.token, 
      },
    };

    } catch (error) {
        console.error('Error sending email:', error);
    }
}


async function checkAndUpdateDayOffs() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        const users = await User.find();

        for (const user of users) {
            if (!user.lastLogin || user.lastLogin < today) {
                // Nếu user không đăng nhập hôm nay, tăng dayOffs
                user.dayOffs += 1;

                if ([2, 7, 15, 21, 28].includes(user.dayOffs)) {
                    await sendReminderEmail(user);
                }

                if(user.dayOffs >= 30) {
                    user.dayOffs = 0;
                }

                await user.save();
            }
        }

        console.log('Đã cập nhật ngày nghỉ và gửi email nhắc nhở (nếu cần).');
    } catch (error) {
        console.error('Lỗi khi cập nhật ngày nghỉ:', error);
    }
}

function startCronJob() {
    cron.schedule('0 0 * * *', () => {
        console.log('Chạy kiểm tra lastLogin và cập nhật dayOffs vào 0 giờ');
        checkAndUpdateDayOffs();
    });
}

module.exports = { startCronJob };
