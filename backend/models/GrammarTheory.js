const mongoose = require('mongoose');

const grammarTheorySchema = new mongoose.Schema({
  theories: {
    type: String, 
    required: true,
  },
  instructions: {
    type: [String], 
    required: true,
  },
  examples: {
    type: [String], 
    required: true,
  },
  sections: {
    type: Number, 
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const GrammarTheory = mongoose.model('GrammarTheory', grammarTheorySchema);

module.exports = GrammarTheory;
