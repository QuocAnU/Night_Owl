const express = require('express');
const { connect } = require('./config');
const dotenv = require('dotenv');
const { Webhook } = require('svix'); // Use the correct import
const bodyParser = require('body-parser');
const User = require('./models/user');
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

connect();

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
