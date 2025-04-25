import express from 'express';
import {
    getMockInterview,
    getInterviewTips,
    getPredictedQuestionsWithAnswers
} from '../controllers/interviewController.js';

const router = express.Router();

router.post('/questions-with-answers', getPredictedQuestionsWithAnswers);
router.post('/mock', getMockInterview);
router.get('/tips', getInterviewTips);

export default router;
