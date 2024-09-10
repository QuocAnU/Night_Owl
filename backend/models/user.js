const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    clerkUserId: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    imageUrl: { type: String },
    premium: { type: Boolean, default: false },
    plan: { 
        type: String, 
        enum: ['basic', 'standard', 'premium'], 
        required: function() { return this.premium === true; }, 
        default: null 
    },
    remainingDays: { 
        type: Number, 
        required: function() { return this.premium === true; }, 
        default: null 
    },
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
