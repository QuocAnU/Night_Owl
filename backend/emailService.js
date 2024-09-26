const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Tạo transporter với OAuth2
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

// Hàm gửi email
const sendEmail = async (to, customerName) => {
  try {
    // Cấu hình email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Chúc Mừng Bạn Đã Trở Thành Night Owleaner Premium',
      html: `
     <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Night Owl Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            background-color: #C5ECFF;
            border: 2px solid #151616;
            padding: 20px;
            margin: auto;
        }
        .content {
            font-size: 14px;
            color: #333;
            line-height: 1.6;
        }
            .header {
            display: block;
            margin: auto;
            max-width: 600px;
        }
        .footer {
            margin-top: 20px;
        }
        .logo {
            margin: 20px auto;
            max-width: 100px;
        }
        .b {
            color: #D700FA;
        }
        .a {
            color: #0091DF;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://res.cloudinary.com/dhqzpgmhm/image/upload/v1727338221/tenqpw3m3q995j257ety.png" alt="logo" class="header">
        <div class="content">
            <p>Xin chào ${customerName},</p>
            <p>Chào mừng bạn đã trở thành <b class="b">Night Owleaner Premium</b>. Chúng tôi rất vui mừng được đồng hành cùng bạn trên hành trình khám phá những lợi ích và trải nghiệm tuyệt vời mà đặc quyền này mang đến.</p>

            <p>Với <b class="b">Night Owleaner Premium</b>, bạn sẽ nhận được các đặc quyền đặc biệt như:</p>
            <ul>
                <li>Có thể học và làm các bài kiểm tra Ngữ Pháp, Đọc và Nghe.</li>
                <li>Có thể chia sẻ cảm nghĩ về bài học, bài kiểm tra với những <b class="b">Night Owleaner Premium</b> khác.</li>
                <li>Được xem chấm điểm chi tiết cũng như những lỗi sai mà bạn đang gặp phải.</li>
                <li>Cùng với vô vàn các lợi ích khác đang chờ đón bạn.</li>
            </ul>

            <p>Nếu có bất kỳ câu hỏi hay cần sự trợ giúp nào, đừng ngần ngại liên hệ với chúng tôi qua facebook: <a href="https://www.facebook.com/nightowljapanese" class="a">Night Owl Learning Japanese</a> hoặc <a class="a">nightowljapanese@gmail.com</a>. Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn bất cứ lúc nào.</p>

            <p>Một lần nữa, cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi. Hãy tận hưởng những trải nghiệm tuyệt vời với đặc quyền <b class="b">Night Owleaner Premium</b> nhé!</p>

            <p>Chúc bạn một ngày vui vẻ!</p>
            <table style="width: 100%; margin-top: 30px;">
                <tr>
                    <td style="text-align: left;">
                        <div class="signature" style="color: #ff0000; font-weight: bold;">
                            Thân mến ❤,<br>Night Owl
                        </div>
                    </td>
                    <td style="text-align: right;">
                        <img class="logo" src="https://res.cloudinary.com/dhqzpgmhm/image/upload/v1727353659/jie46bqngo1dlmtdytrx.png" alt="Night Owl Logo">
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>

      
    `,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
