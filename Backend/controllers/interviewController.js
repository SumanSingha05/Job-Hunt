// controllers/interviewController.js

import { askOpenRouter } from "../utils/openRouter.js";

// 1️⃣ Mock Interview MCQs
export const getMockInterview = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        const prompt = `
You are an expert interviewer. Based on this job description:

${jobDescription}

Generate 3 MCQ-style interview questions. For each, give:
- The question
- 4 options
- The correct answer.

Return ONLY a JSON array in this format:
[
    {
        "question": "What is XYZ?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "B"
    }
]
`;

        const aiResponse = await askOpenRouter(prompt);
        console.log("Raw AI Response (MCQs):", aiResponse);

        const match = aiResponse.match(/\[\s*{[\s\S]*?}\s*\]/);
        if (!match) {
            return res.status(500).json({ error: "Could not extract valid JSON from AI response." });
        }

        const parsed = JSON.parse(match[0]);
        res.status(200).json({ mcqs: parsed });
    } catch (err) {
        console.error("Error parsing AI output:", err.message);
        res.status(500).json({ error: "Failed to generate mock interview questions." });
    }
};

// 2️⃣ Interview Tips
export const getInterviewTips = async (req, res) => {
    try {
        const prompt = `
You are an expert in interview coaching. Please provide 7 concise tips to perform well in a face-to-face interview.

Return the tips ONLY in a clean JSON array like:
[
    "Tip 1",
    "Tip 2",
    "Tip 3"
]
`;

        const aiResponse = await askOpenRouter(prompt);
        const match = aiResponse.match(/\[\s*"(?:[^"]|\\")*"\s*(,\s*"(?:[^"]|\\")*"\s*)*\]/);

        if (!match) {
            return res.status(500).json({ error: "Could not extract valid JSON from AI response." });
        }

        const parsedTips = JSON.parse(match[0]);
        res.status(200).json({ tips: parsedTips });
    } catch (err) {
        console.error("Error getting interview tips:", err.message);
        res.status(500).json({ error: "Failed to fetch interview tips." });
    }
};

// 3️⃣ Predictive Questions (Technical, Behavioral, Situational) WITH ANSWERS
export const getPredictedQuestionsWithAnswers = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        const prompt = `
You are an experienced recruiter and interview expert. Based on the following job description:

${jobDescription}

Predict 3 technical, 2 behavioral, and 2 situational interview questions that a candidate might be asked. For each question, also provide a concise example answer that would impress an interviewer.

Return ONLY a JSON array in this format:
[
    {
        "type": "technical",
        "question": "What is XYZ?",
        "answer": "A concise and impressive answer to XYZ."
    },
    {
        "type": "behavioral",
        "question": "Describe a time you faced a challenge.",
        "answer": "A concise and impressive answer describing a challenging situation."
    },
    {
        "type": "situational",
        "question": "What would you do if your team missed a deadline?",
        "answer": "A concise and impressive answer outlining steps to take if a deadline is missed."
    }
]
`;

        const aiResponse = await askOpenRouter(prompt);
        console.log("Raw AI Response (Predicted Questions with Answers):", aiResponse);

        const match = aiResponse.match(/\[\s*{[\s\S]*?}\s*\]/);
        if (!match) {
            return res.status(500).json({ error: "Could not extract valid JSON from AI response." });
        }

        const parsedQuestionsWithAnswers = JSON.parse(match[0]);
        res.status(200).json({ questionsWithAnswers: parsedQuestionsWithAnswers });
    } catch (err) {
        console.error("Error fetching predicted questions with answers:", err.message);
        res.status(500).json({ error: "Failed to generate predicted questions with answers." });
    }
};