
const mongoose = require('mongoose');
const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  translate_title: { type: String, required: true },
  contents: [{ type: String, required: true }],
  translate: [{ type: String, required: true }],
  sections: { type: Number, required: true },
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;