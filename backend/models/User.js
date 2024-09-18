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
        enum: ['free', 'basic', 'standard', 'premium'], 
        default: null 
    },
    remainingDays: { 
        type: Number, 
        default: null 
    },
    orderCode: { type: Number, default: null },
    checkInDays: {
        type: Number,
        default: 0
    },
    totalCheckInDays: {
        type: Number,
        default: 0
    },
    attendance: [
        {
            date: { type: Date },
            status: { type: String, enum: ['present', 'absent'], default: 'absent'}
        }
    ],
    freePremium: { type: Boolean, default: false },

    lastLogin: { type: Date, default: null },

    dayOffs: { type: Number, default: 0 }
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;