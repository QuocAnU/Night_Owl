const FreeTest = require('../models/FreeTest');

// Lấy danh sách câu hỏi
const getQuestions = async (req, res) => {
  try {
    const questions = await FreeTest.find();
    const groupedData = questions.reduce((acc, item) => {
        if (item.typeV === 'Hiragana') {
            acc.Hiragana.push(item);
        } else if (item.typeV === 'Katakana') {
            acc.Katakana.push(item);
        }
        return acc;
    }, { Hiragana: [], Katakana: [] });

    res.status(200).json({ data: groupedData, message: 'success' });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const submitAnswers = async (req, res) => {
  try {
    const {values} = req.body;
    const questionIds = Object.keys(values);
    const fullQuestions = await FreeTest.find();
    const questions = await FreeTest.find({ _id: { $in: questionIds } });

    let score = 0;
    const totalQuestions = fullQuestions.length;

    questions.forEach((question) => {
      const userAnswer = values[question._id];
      if (userAnswer && userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        score += 1;
      }
    });
    res.status(200).json({
      score,
      totalQuestions,
      message: 'Score calculated successfully',
    });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
  getQuestions,
  submitAnswers
};
