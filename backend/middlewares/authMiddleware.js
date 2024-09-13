const dotenv = require('dotenv');
dotenv.config();
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const verifyToken = ClerkExpressWithAuth({
  apiKey: process.env.CLERK_SECRET_KEY,
  apiVersion: 2,
});

module.exports = { verifyToken };
