// models/Hiragana.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HiraganaSchema = new Schema({
  Hiragana: { type: String, required: true },
  Romaji: { type: String, required: true },
  type: { type: String, required: true },
  meaning: { type: String, required: true },
  image: { type: String, required: true },
  sound: { type: String, required: true },
  sections: { type: Number, required: true },
  premium: { type: Boolean, default: false },
});

module.exports = mongoose.model('Hiragana', HiraganaSchema);
