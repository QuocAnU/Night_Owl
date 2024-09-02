const express = require('express');
const { connect } = require('./config');
const dotenv = require('dotenv');
const { Webhook } = require('svix'); // Use the correct import
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cors = require('cors');

const User = require('./models/user');
const MediaRoute = require('./routes/mediaRouter');
const FreeTestRoute = require('./routes/freeTestRouter');
const KanjiRoute = require('./routes/kanjiRouter');
const CommentRoute = require('./routes/commentRouter');
const KataRoute = require('./routes/kataRouter');
const HiraRoute = require('./routes/hiraRouter');
const GrammarTheoryRoute = require('./routes/grammarTheoryRouter');
const QuestionRoute = require('./routes/questionRouter');

const PayOS = require('@payos/node');


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

app.post('/create-payment-link', async (req, res) => {
  try {
    const { amount, orderCode } = req.body;
    const order = {
      amount,
      orderCode,
      description: `Payment for order ${orderCode}`,
      returnUrl: "https://night-owl-xn17.vercel.app/profile",
      cancelUrl: "https://night-owl-xn17.vercel.app/premium/payment",
    };

    const paymentLink = await payos.createPaymentLink(order);
    res.json({ checkoutUrl: paymentLink.checkoutUrl });
    } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
})

app.post('/receive-hook', async (req, res) => {
  console.log(req.body);
  res.json();
});

app.post(
  '/api/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  async function (req, res) {
    try {
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;

        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = webhook.verify(payloadString, svixHeaders);

        const { id, ...attributes } = evt.data;
        const eventType = evt.type;

        if (eventType === 'user.created') {
            const firstName = attributes.first_name;
            const lastName = attributes.last_name;
            const email = attributes.external_accounts[0].email_address;
            const image = attributes.image_url;

            const user = new User({ clerkUserId: id, firstName, lastName, email, image });
            await user.save();
        }
        res.status(200).json({ success: true, message: 'Webhook received' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
  },
);



app.use('/api', MediaRoute);
app.use('/api', FreeTestRoute);
app.use('/api', KanjiRoute);
app.use('/api', CommentRoute);
app.use('/api', KataRoute);
app.use('/api', HiraRoute);
app.use('/api', GrammarTheoryRoute);
app.use('/api', QuestionRoute);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
