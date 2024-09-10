const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testGrammarSchema = new Schema({
  name: { type: Schema.Types.Mixed, required: true }, // Allows string or array of strings
  translate: { type: Schema.Types.Mixed, required: true }, // Allows string or array of strings
  questions: [{ type: mongoose.Schema.Types.Mixed, required: true }], // Adjust type according to question structure
  translate_question: [{ type: mongoose.Schema.Types.Mixed, required: true }],
  answer: { type: String },
  type: { type: String },
  sections: { type: Number },
  premium: { type: Boolean, default: false }
});

const TestGrammar = mongoose.model('TestGrammar', testGrammarSchema);

module.exports = TestGrammar;