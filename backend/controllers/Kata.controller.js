const Katakana = require('../models/Kata');


const getKata = async (req, res) => {
    try {
        const { section } = req.query;

        if (section) {
            // If a section is specified, fetch Katakana by section
            const katakana = await Katakana.find({ sections: section });
            res.status(200).json({ data: katakana, message: 'success' });
        } else {
            // If no section is specified, return distinct sections
            const katakanaSections = await Katakana.distinct('sections');   
            res.status(200).json({ data: katakanaSections, message: 'success' });
        }
    } catch (error) {
        console.error('Error fetching Katakana:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getKata}