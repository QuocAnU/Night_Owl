const nodemailer = require('nodemailer');
const oAuth2Client = require('./config/oauth2Config');
const dotenv = require('dotenv');
dotenv.config();

// Tạo transporter với OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,  // Email của bạn
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Hàm gửi email
const sendEmail = async (to, customerName) => {
  try {
    // Lấy access token
    const accessToken = await oAuth2Client.getAccessToken();
    
    // Cấu hình email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Chúc Mừng Bạn Đã Trở Thành Night Owleaner Premium. V2',
      html: `
      <p>🎁 Cảm ơn bạn đã chọn đồng hành cùng Night Owl 🎁</p>
      <p>Xin chào ${customerName},</p>
      <p>Chào mừng bạn đã trở thành Night Owleaner Premium. Chúng tôi rất vui mừng được đồng hành cùng bạn trên hành trình khám phá những lợi ích và trải nghiệm tuyệt vời mà đặc quyền này mang đến.</p>
      <p>Với Night Owleaner Premium, bạn sẽ nhận được các đặc quyền đặc biệt như:</p>
      <ul>
        <li>Có thể học và làm các bài kiểm tra Ngữ Pháp, Đọc và Nghe.</li>
        <li>Có thể chia sẻ cảm nghĩ về bài học, bài kiểm tra với những Night Owleaner Premium khác.</li>
        <li>Được xem chấm điểm chi tiết cũng như những lỗi sai mà bạn đang gặp phải.</li>
        <li>Cùng với vô vàn các lợi ích khác đang chờ đón bạn.</li>
      </ul>
      <p>Nếu có bất kỳ câu hỏi hay cần sự trợ giúp nào, đừng ngần ngại liên hệ với chúng tôi qua facebook: Night Owl Learning Japanese hoặc nightowljapanese@gmail.com. Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn bất cứ lúc nào.</p>
      <p>Một lần nữa, cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi. Hãy tận hưởng những trải nghiệm tuyệt vời với đặc quyền Night Owleaner Premium nhé!</p>
      <p>Chúc bạn một ngày vui vẻ!</p>
      <p>Thân mến ❤,</p>
      <p>Night Owl</p>
      <p><img src="cid:logo" alt="Night Owl" /></p>
    `,
        // attachments: [
        // {
        //     filename: 'NightOwl_v1.png',
        //     path: './path/to/NightOwl_v1.png', // Đường dẫn tới file logo
        //     cid: 'logo' // ID cho phần hình ảnh trong email
        // }
        // ],
      auth: {
        accessToken: accessToken.token, // Sử dụng access token
      },
    };

    // Gửi email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
