const TestGrammar = require('../models/TestGrammar');

const getTestGrammar = async (req, res) => {
    try {
        const { section } = req.query;
        
        if (section) {
            // If a section is specified, fetch TestGrammar by section
            const testGrammar = await TestGrammar.find({ sections: section });
            res.status(200).json({ data: testGrammar, message: 'success' });
        } else {
            // If no section is specified, return distinct sections
            const testGrammarSections = await TestGrammar.distinct('sections');
            res.status(200).json({ data: testGrammarSections, message: 'success' });
        }
    } catch (error) {
        console.error('Error fetching TestGrammar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const submitAnswer = async (req, res) => {
    const { values } = req.body;
    const results = [];
    let score = 0;
    let totalScore = 0;

    await Promise.all(
        Object.entries(values).map(async ([questionId, userAnswer]) => {
            const question = await TestGrammar.findOne({ _id: questionId });

            if (!question) {
                results.push({
                    questionId,
                    success: false,
                    message: 'Question not found',
                });
                return;
            }

            const { answer, questions } = question;

            const normalizedUserAnswer = userAnswer.trim().normalize();
            const normalizedAnswer = answer.trim().normalize();

            const updatedQuestions = questions.map((q) => {
                const normalizedText = q.text.trim().normalize();
                if (normalizedText === normalizedUserAnswer) {
                    return {
                        ...q,
                        color: normalizedText === normalizedAnswer ? '#34A853' : '#E94444',
                    };
                }
                if (normalizedText === normalizedAnswer) {
                    return {
                        ...q,
                        color: '#34A853', 
                    };
                }
                return q; 
            });

            const isCorrect = normalizedUserAnswer === normalizedAnswer;
            if (isCorrect) {
                score += 1;
            }
            totalScore += 1;

            results.push({
                questionId,
                updatedQuestions,
                isCorrect,
            });
        })
    );

    res.json({
        success: true,
        score,
        totalScore,
        results,
    });
};

module.exports = {getTestGrammar, submitAnswer}