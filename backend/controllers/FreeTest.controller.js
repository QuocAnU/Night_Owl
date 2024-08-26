const FreeTest = require('../models/FreeTest');

// Lấy danh sách câu hỏi
const getQuestions = async (req, res) => {
  try {
    const questions = await FreeTest.find();
    res.status(200).json({ data : questions , message: 'success' });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getQuestions,
};
