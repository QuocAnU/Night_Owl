const dotenv = require('dotenv');
dotenv.config();
const { google } = require('googleapis');

// Tạo OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,          // Client ID
  process.env.CLIENT_SECRET,      // Client Secret
  process.env.REDIRECT_URI        // Redirect URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN, // Refresh Token
});

module.exports = oAuth2Client;
