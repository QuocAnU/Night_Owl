const mongoose = require('mongoose');

const kanjiSchema = new mongoose.Schema({
  Kanji: { type: String, required: true },
  Hiragana: { type: String, required: true },
  Romaji: { type: String, required: true },
  type: { type: String, required: true }, // Assuming this field is used to describe the type of Kanji
  meaning: { type: String, required: true },
  image: { type: String }, // URL or path to the image
  sound: { type: String }, // URL or path to the sound file
  sections: { type: Number, required: true }, // Array of sections
  premium: { type: Boolean, default: false }, // Indicates if it's a premium entry
});

const Kanji = mongoose.model('Kanji', kanjiSchema);

module.exports = Kanji;
