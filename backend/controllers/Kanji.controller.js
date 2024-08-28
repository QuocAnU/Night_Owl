const Kanji = require('../models/Kanjs');


const getKanji = async (req, res) => {
  try {
    const { section } = req.query;

    if (section) {
      // If a section is specified, fetch Kanji by section
      const kanji = await Kanji.find({ sections: section });
      res.status(200).json({ data: kanji, message: 'success' });
    } else {
      // If no section is specified, return distinct sections
      const kanjiSections = await Kanji.distinct('sections');
      res.status(200).json({ data: kanjiSections, message: 'success' });
    }
  } catch (error) {
    console.error('Error fetching Kanji:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Get Kanji by ID
const getKanjiById = async (req, res) => {
  try {
    const kanji = await Kanji.findById(req.params.id);
    if (!kanji) {
      return res.status(404).json({ message: 'Kanji not found' });
    }
    res.status(200).json(kanji);
  } catch (error) {
    console.error('Error fetching Kanji by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new Kanji entry
const createKanji = async (req, res) => {
  try {
    const newKanji = new Kanji(req.body);
    await newKanji.save();
    res.status(201).json(newKanji);
  } catch (error) {
    console.error('Error creating Kanji:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getKanji,
  getKanjiById,
  createKanji,
};
