const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  translate: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.Mixed, required: true }],  // Array of mixed types (could be String or Object)
  translate_question: [{ type: String, required: true }],  // Array of translated questions
  answer: { type: mongoose.Schema.Types.Mixed, required: true },  // Correct answer
  type: { type: String, required: false },
  sections: { type: Number, required: true },
  group: { type: String, required: true },
  sound: { type: String, required: false },
  premium: { type: Boolean, default: false },
});


const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

