const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  answer: { type: String, required: true },
  translate_answer: { type: String },
  typeV: { type: String },
});

const FreeTest = mongoose.model('FreeTest', QuestionSchema);

module.exports = FreeTest;
