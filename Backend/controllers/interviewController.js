import { askGemini } from "../utils/gemini.js";

// ✅ 1️⃣ Mock Interview MCQs
// ✅ 1️⃣ Mock Interview MCQs
export const getMockInterview = async (req, res) => {
    try {
        // --- CHANGE START ---
        const { role } = req.body; // Change to 'role'
        if (!role || typeof role !== "string") { // Update validation
            return res.status(400).json({ error: "Missing or invalid job role for mock interview." }); // Update error message
        }
        // --- CHANGE END ---

        const prompt = `
You are an expert interviewer. Based on this job description or role:

${role}

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
`; // Also update prompt to reference 'role'

        const aiResponse = await askGemini(prompt);

        const match = aiResponse.match(/\[\s*{[\s\S]*?}\s*\]/);
        if (!match) {
            return res.status(500).json({ error: "Could not extract valid JSON from AI response." });
        }

        const parsed = JSON.parse(match[0]);
        // Optional: Add some basic validation for parsed data
        if (!Array.isArray(parsed) || parsed.some(q => !q.question || !Array.isArray(q.options) || !q.correctAnswer)) {
            return res.status(500).json({ error: "AI response did not contain expected MCQ structure." });
        }

        res.status(200).json({ mcqs: parsed });
    } catch (err) {
        console.error("Error generating mock interview questions:", err.message); // More specific error log
        res.status(500).json({ error: "Failed to generate mock interview questions." });
    }
};
// ✅ 2️⃣ Interview Tips
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

        const aiResponse = await askGemini(prompt);

        let parsedTips;

        try {
            parsedTips = JSON.parse(aiResponse);
        } catch (e) {
            const match = aiResponse.match(/\[\s*"(?:[^"]|\\")*"\s*(,\s*"(?:[^"]|\\")*"\s*)*\]/);
            if (match) {
                parsedTips = JSON.parse(match[0]);
            } else {
                return res.status(500).json({ error: "Could not extract valid JSON from AI response." });
            }
        }

        res.status(200).json({ tips: parsedTips });
    } catch (err) {
        console.error("Error getting interview tips:", err.message);
        res.status(500).json({ error: "Failed to fetch interview tips." });
    }
};

// ✅ 3️⃣ Predictive Questions with Answers
export const getPredictedQuestionsWithAnswers = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        if (!jobDescription || typeof jobDescription !== "string") {
            return res.status(400).json({ error: "Missing or invalid jobDescription" });
        }

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

        const aiResponse = await askGemini(prompt);

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
