const TestVocal = require('../models/TestVocal');


const getTestVocal = async (req, res) => {
    try {
        const { section } = req.query;
        if (section) {
            const testGrammar = await TestVocal.find({ sections: section });
            res.status(200).json({ data: testGrammar, message: 'success' });
        } else {
            const testGrammarSections = await TestVocal.distinct('sections');
            res.status(200).json({ data: testGrammarSections, message: 'success' });
        }
    } catch (error) {
        console.error('Error fetching TestGrammar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const submitAnswer = async (req, res) => {
    try {
        const { values } = req.body;
        const questionIds = Object.keys(values);

        const questions = await TestVocal.find({ _id: { $in: questionIds } });

        let score = 0;
        const totalQuestions = questions.length;

        const processedQuestions = questions.map(question => {
            const userAnswer = values[question._id];
            const isCorrect = userAnswer && userAnswer.toLowerCase() === question.answer.toLowerCase();
            if (isCorrect) {
                score += 1;
            }
            return {
                ...question.toObject(),
                score: isCorrect ? 1 : 0 
            };
        });


        res.status(200).json({
            score,
            totalQuestions,
            questions: processedQuestions,
            message: 'Score calculated successfully',
        });
    } catch (error) {
        console.error('Error submitting answers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getTestVocal,
    submitAnswer
}