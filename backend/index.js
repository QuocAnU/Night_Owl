const express = require('express');
const { connect } = require('./config');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
const cron = require('node-cron');


const UserRoute = require('./routes/userRouter');
const MediaRoute = require('./routes/mediaRouter');
const FreeTestRoute = require('./routes/freeTestRouter');
const KanjiRoute = require('./routes/kanjiRouter');
const CommentRoute = require('./routes/commentRouter');
const KataRoute = require('./routes/kataRouter');
const HiraRoute = require('./routes/hiraRouter');
const GrammarTheoryRoute = require('./routes/grammarTheoryRouter');
const QuestionRoute = require('./routes/questionRouter');
const TestGrammarRoute = require('./routes/testGrammarRouter');
const TestVocalRoute = require('./routes/testVocalRouter');
const ExeGrammarRoute = require('./routes/exeGrammarRouter');
const { sendEmail} = require('./emailService');
const { startCronJob } = require('./dayOff');

const PayOS = require('@payos/node');
const User = require('./models/User');
const UserDiscount = require('./models/UserDiscount');



dotenv.config();
const payos = new PayOS(process.env.CLIENT_ID, process.env.API_KEY_PAYOS, process.env.CHECKSUM_KEY);

const app = express();
const port = process.env.PORT || 5001;

app.use(cors(
    {
        origin: "*",
        credentials: true,
    }
))

connect();
app.use(bodyParser.json());
app.use(upload.any());

app.post('/api/create-payment-link', async (req, res) => {
  try {
    const { amount, orderCode, clerkUserId, type  } = req.body;

    const user = await User.findOneAndUpdate(
        { clerkUserId },           
        { orderCode },              
        { new: true, upsert: false }
    );

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if(type) {
      await UserDiscount.findOneAndDelete({ clerkUserId, type });
    }


    const order = {
      amount,
      orderCode,
      description: `Payment for order ${orderCode}`,
      returnUrl: "http://localhost:5173/profile",
      // returnUrl: "https://night-owl-xn17.vercel.app/profile",
      cancelUrl: "http://localhost:5173/premium",
      // cancelUrl: "https://night-owl-xn17.vercel.app/premium",
    };

    const paymentLink = await payos.createPaymentLink(order);
    res.json({ checkoutUrl: paymentLink.checkoutUrl });
    } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
})

app.post('/receive-hook', async (req, res) => {
  const {data} = req.body;
  if( data.code === '00') {
    let plan = 'basic';
    let remainingDays = 0;
    if(data.amount === 50000 || data.amount === 45000) {
      plan = 'basic';
      remainingDays = 30;
    }
    else if(data.amount === 280000 || data.amount === 252000) {
      plan = 'standard';
      remainingDays = 180;
    }
    else if(data.amount === 550000 || data.amount === 495000) {
      plan = 'premium';
      remainingDays = 365;
    }
    const userEmail = user.email;
    const customerName = user.firstName + ' ' + user.lastName;
    await sendEmail(userEmail, customerName);
    
    const user = await User.findOneAndUpdate(
      { orderCode: data.orderCode },           
      { premium: true, plan: plan, remainingDays: remainingDays },              
      { new: true, upsert: false }
    );

  }
  res.json();
});

startCronJob();

cron.schedule('0 0 * * *', async () => {
  const users = await User.find({ premium: true });

  for (const user of users) {
    if (user.remainingDays > 0) {
      user.remainingDays -=1;
    }

    if(user.remainingDays === 0) {
      user.premium = false;
      user.plan = null;
      user.remainingDays = null;
    }
    await user.save();
  }
});

app.use('/api', UserRoute);
app.use('/api', MediaRoute);
app.use('/api', FreeTestRoute);
app.use('/api', KanjiRoute);
app.use('/api', CommentRoute);
app.use('/api', KataRoute);
app.use('/api', HiraRoute);
app.use('/api', GrammarTheoryRoute);
app.use('/api', QuestionRoute);
app.use('/api', TestGrammarRoute);
app.use('/api', TestVocalRoute);
app.use('/api', ExeGrammarRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
