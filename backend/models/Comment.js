const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  from: {
    type: String,  // This could be a user ID or some other identifier
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
