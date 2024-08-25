const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    clerkUserId: { type: String, require : true, unique: true },
    firstName: { type: String, },
    lastName: { type: String, },
    email: { type: String, },
    image: { type: String, },
    premium: { type: Boolean, default: false },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
