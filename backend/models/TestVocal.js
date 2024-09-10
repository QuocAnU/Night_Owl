const mongoose = require('mongoose');

const testVocalSchema = new mongoose.Schema({
  image: { type: String, required: true },
  select: [{ type: String, required: true }], // an array of possible options
  answer: { type: String, required: true },   // correct answer
  sections: { type: Number, required: true }, // section identifier
  premium: { type: Boolean, default: false }  // premium status
});

module.exports = mongoose.model('TestVocal', testVocalSchema);
