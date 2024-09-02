const GrammarTheory = require('../models/GrammarTheory');

const getGrammarTheory = async (req, res) => {
    try {
        const { section } = req.query;
        if (section) {
            // If a section is specified, fetch GrammarTheory by section
            const grammarTheory = await GrammarTheory.findOne({ sections: section });
            res.status(200).json({ data: grammarTheory, message: 'success' });
        } else {
            // If no section is specified, return distinct sections
            const grammarTheorySections = await GrammarTheory.distinct('sections');
            res.status(200).json({ data: grammarTheorySections, message: 'success' });
        }
    } catch (error) {
        console.error('Error fetching GrammarTheory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getGrammarTheory}