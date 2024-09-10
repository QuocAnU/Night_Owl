const Hiragana = require('../models/Hira');

const getHira = async (req, res) => {
    try {
        const { section } = req.query;
        
        if (section) {
            // If a section is specified, fetch Hiragana by section
            const hiragana = await Hiragana.find({ sections: section });
            res.status(200).json({ data: hiragana, message: 'success' });
        } else {
            // If no section is specified, return distinct sections
            const hiraganaSections = await Hiragana.distinct('sections');
            res.status(200).json({ data: hiraganaSections, message: 'success' });
        }
    } catch (error) {
        console.error('Error fetching Hiragana:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {getHira}   