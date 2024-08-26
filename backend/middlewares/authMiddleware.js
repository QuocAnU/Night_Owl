const dotenv = require('dotenv');
dotenv.config();
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
console.log(process.env.CLERK_SECRET_KEY);

const verifyToken = ClerkExpressWithAuth({
  apiKey: process.env.CLERK_SECRET_KEY,
  apiVersion: 2,
});

module.exports = { verifyToken };
