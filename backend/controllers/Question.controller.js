const Question = require("../models/Questions");
const Topic = require("../models/Topic");

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const { group, section } = req.query;
    const query = {};
    if (group) query.group = group;
    if (section) query.sections = section;
    if(query.group === "read") {
      if(query.sections) {
        const questions = await Question.find(query);
        const topic = await Topic.findOne({sections:query.sections});
        const resData = {
          questions: questions,
          topics: topic
        }
        return res.status(200).json({data: resData, message: "success"});
      } else {
        const section = await Question.distinct("sections",query);
        return res.status(200).json({data: section, message: "success"}); 
        }        
    } else if(query.group === "listen") {
        if(query.sections) {
          const questions = await Question.find(query);
          
          return res.status(200).json({data: questions, message: "success"});
        } else {
          const section = await Question.distinct("sections",query);
          return res.status(200).json({data: section, message: "success"}); 
        }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit an answer
const submitAnswer = async (req, res) => {
    const { values } = req.body;
    const results = [];
    let score = 0;
    let totalScore = 0;
    await Promise.all(
        Object.entries(values).map(async ([questionId, userAnswer]) => {
            const question = await Question.findOne({ _id: questionId });

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
                const normalized = q.text.trim().normalize();
                if (normalized === normalizedUserAnswer) {
                return {
                    ...q,
                    color: normalized === normalizedAnswer ? '#34A853' : '#E94444',
                };
                }
                if (normalized === normalizedAnswer) {
                    return {
                        ...q,
                        color: '#34A853', 
                    };
                }
                return q; 
            });

            const isCorrect = normalizedUserAnswer === normalizedAnswer;
            if(isCorrect){
                score += 1
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

const submitAnswerImage = async (req, res) => {
    const { questionId, image } = req.body;
    let score = 0;
    const totalQuestions = 1;
    const question = await Question.findOne({ _id: questionId });
    if (!question) {
        res.status(404).json({ success: false, message: 'Question not found' });
    }
    const {answer} = question;
        if (answer === image) {
            score += 1
        }
    res.json({
        score
        , totalQuestions
    });
};

const submitAnswerListen = async (req, res) => {
    try {
    const {values, section} = req.body;
    const dataListen = await Question.findOne({group: 'listen', sections: section});
    const answerChecks = dataListen.answer;
    
    let score = 0;
    const totalQuestions = answerChecks.length;

    answerChecks.forEach((ans, index) => {
      const userAnswer = values[index];
      if (userAnswer && userAnswer.toLowerCase() === ans.toLowerCase()) {
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

module.exports = { getAllQuestions, submitAnswer, submitAnswerImage, submitAnswerListen };
