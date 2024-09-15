
const mongoose = require('mongoose');

const userDiscountSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100  // Giả sử discount là phần trăm từ 0 đến 100
  },
  type: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
    default: 1
  },
  use: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const UserDiscount = mongoose.model('UserDiscount', userDiscountSchema);

module.exports = UserDiscount;
