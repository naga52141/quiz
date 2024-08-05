const express = require('express');
const router = express.Router();

let quizzes = [];

// Create a quiz
router.post('/create', (req, res) => {
    const { title, questions } = req.body;
    const quiz = { id: quizzes.length + 1, title, questions };
    quizzes.push(quiz);
    res.json({ message: 'Quiz created successfully!', quiz });
});

// Get all quizzes
router.get('/all', (req, res) => {
    res.json(quizzes);
});

// Get a quiz by ID
router.get('/:id', (req, res) => {
    const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
    if (!quiz) return res.status(404).send('Quiz not found');
    res.json(quiz);
});

// Submit a quiz and get the score
router.post('/submit/:id', (req, res) => {
    const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
    if (!quiz) return res.status(404).send('Quiz not found');

    const { answers } = req.body;
    let score = 0;
    
    quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
            score++;
        }
    });

    res.json({ score, total: quiz.questions.length });
});

module.exports = router;
