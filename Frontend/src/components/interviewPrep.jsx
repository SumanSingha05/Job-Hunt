import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For smooth animations

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' },
    tap: { scale: 0.95 },
};

const inputVariants = {
    focus: { boxShadow: '0px 0px 6px rgba(78, 115, 223, 0.5)' },
};

const InterviewPrep = () => {
    const [jobDesc, setJobDesc] = useState('');
    const [predictedQuestionsWithAnswers, setPredictedQuestionsWithAnswers] = useState([]);
    const [role, setRole] = useState('');
    const [mcqs, setMcqs] = useState([]);
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState({
        predictQuestions: false,
        mockInterview: false,
        fetchTips: false,
    });
    const [error, setError] = useState('');

    const fetchPredictedQuestionsWithAnswers = async () => {
        setLoading((prevLoading) => ({ ...prevLoading, predictQuestions: true }));
        setError('');
        try {
            const res = await fetch('http://localhost:8000/api/v1/interview/questions-with-answers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription: jobDesc }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Failed to fetch questions: ${errorData.error || res.statusText}`);
            }
            const data = await res.json();
            setPredictedQuestionsWithAnswers(data.questionsWithAnswers);
        } catch (err) {
            console.error('Error fetching predicted questions:', err.message);
            setError('Failed to generate predicted questions. Please try again.');
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, predictQuestions: false }));
        }
    };

    const fetchMock = async () => {
        setLoading((prevLoading) => ({ ...prevLoading, mockInterview: true }));
        setError('');
        try {
            const res = await fetch('http://localhost:8000/api/v1/interview/mock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Failed to fetch mock questions: ${errorData.error || res.statusText}`);
            }
            const data = await res.json();
            setMcqs(data.mcqs);
        } catch (err) {
            console.error('Error fetching mock interview questions:', err.message);
            setError('Failed to generate mock interview questions. Please try again.');
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, mockInterview: false }));
        }
    };

    const fetchTips = async () => {
        setLoading((prevLoading) => ({ ...prevLoading, fetchTips: true }));
        setError('');
        try {
            const res = await fetch('http://localhost:8000/api/v1/interview/tips');
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Failed to fetch tips: ${errorData.error || res.statusText}`);
            }
            const data = await res.json();
            setTips(data.tips);
        } catch (err) {
            console.error('Error fetching interview tips:', err.message);
            setError('Failed to fetch interview tips. Please try again.');
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, fetchTips: false }));
        }
    };

    return (
        <motion.div
            className="p-8 bg-blue-100 min-h-screen flex flex-col items-center justify-start" // Changed background to light blue
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 className="text-3xl bg-blue-300 font-extrabold text-indigo-700 mb-6 shadow-md p-3 rounded-lg" variants={itemVariants}>
                AI-Powered Interview Prep
            </motion.h2>

            {error && (
                <motion.div className="bg-red-200 text-red-700 p-3 rounded-md mb-4" variants={itemVariants}>
                    {error}
                </motion.div>
            )}

            {/* Predictive Questions with Answers */}
            <motion.div className="mb-8 w-full max-w-xl bg-white rounded-lg shadow-lg p-6" variants={itemVariants}>
                <motion.h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2" variants={itemVariants}>
                    Predictive Interview Questions
                </motion.h3>
                <motion.textarea
                    className="border p-3 w-full rounded-md mb-3 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Paste Job Description for Predicted Questions"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    variants={inputVariants}
                    whileFocus="focus"
                />
                <motion.button
                    onClick={fetchPredictedQuestionsWithAnswers}
                    className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-95 ${loading.predictQuestions ? 'disabled:bg-gray-400' : ''
                        }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={loading.predictQuestions}
                >
                    {loading.predictQuestions ? 'Predicting...' : 'Generate Questions & Answers'}
                </motion.button>
                <motion.div className="mt-4" variants={itemVariants}>
                    {Array.isArray(predictedQuestionsWithAnswers) && predictedQuestionsWithAnswers.length > 0 ? (
                        predictedQuestionsWithAnswers.map((item, i) => (
                            <motion.div key={i} className="mb-4 border p-4 rounded-md bg-gray-50" variants={itemVariants}>
                                <p className="font-semibold text-lg text-gray-900">
                                    {i + 1}. [{item.type.toUpperCase()}] {item.question}
                                </p>
                                {item.options && item.options.length > 0 && (
                                    <div className="mt-2">
                                        {item.options.map((opt, j) => (
                                            <p key={j} className="ml-4 text-gray-700">
                                                - {opt} {item.correctAnswer === opt && <span className="text-green-600 font-semibold">(Correct)</span>}
                                            </p>
                                        ))}
                                        <p className="text-sm text-green-700 font-semibold mt-1">Correct Answer: {item.correctAnswer}</p>
                                    </div>
                                )}
                                {item.answer && (
                                    <div className="mt-3">
                                        <p className="text-sm italic text-gray-600">Example Answer:</p>
                                        <p className="text-gray-800">{item.answer}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        !loading.predictQuestions && <motion.p className="text-gray-600 italic" variants={itemVariants}>No predicted questions yet. Paste a job description to get started.</motion.p>
                    )}
                </motion.div>
            </motion.div>

            {/* Mock Interview */}
            <motion.div className="mb-8 w-full max-w-xl bg-white rounded-lg shadow-lg p-6" variants={itemVariants}>
                <motion.h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2" variants={itemVariants}>
                    Mock Interview (MCQs)
                </motion.h3>
                <motion.input
                    type="text"
                    placeholder="Enter Job Role for Mock Interview (e.g. Frontend Developer)"
                    className="border p-3 w-full rounded-md mb-3 focus:ring-green-500 focus:border-green-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    variants={inputVariants}
                    whileFocus="focus"
                />
                <motion.button
                    onClick={fetchMock}
                    className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 active:scale-95 ${loading.mockInterview ? 'disabled:bg-gray-400' : ''
                        }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={loading.mockInterview}
                >
                    {loading.mockInterview ? 'Generating Mock Interview...' : 'Start Mock Interview'}
                </motion.button>
                <motion.div className="mt-4" variants={itemVariants}>
                    {Array.isArray(mcqs) && mcqs.length > 0 ? (
                        mcqs.map((q, i) => (
                            <motion.div key={i} className="mb-4 border p-4 rounded-md bg-gray-50" variants={itemVariants}>
                                <p className="font-semibold text-lg text-gray-900">{i + 1}. {q.question}</p>
                                {q.options.map((opt, j) => (
                                    <p key={j} className="ml-4 text-gray-700">
                                        - {opt} {q.correctAnswer === opt && <span className="text-green-600 font-semibold">(Correct)</span>}
                                    </p>
                                ))}
                                <p className="text-sm text-green-700 font-semibold mt-1">Correct Answer: {q.correctAnswer}</p>
                            </motion.div>
                        ))
                    ) : (
                        !loading.mockInterview && <motion.p className="text-gray-600 italic" variants={itemVariants}>No mock interview questions yet. Enter a job role to begin.</motion.p>
                    )}
                </motion.div>
            </motion.div>

            {/* Interview Tips */}
            <motion.div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6" variants={itemVariants}>
                <motion.h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2" variants={itemVariants}>
                    Interview Tips for Success
                </motion.h3>
                <motion.button
                    onClick={fetchTips}
                    className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 active:scale-95 ${loading.fetchTips ? 'disabled:bg-gray-400' : ''
                        }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={loading.fetchTips}
                >
                    {loading.fetchTips ? 'Fetching Tips...' : 'Get Top Interview Tips'}
                </motion.button>
                <motion.div className="mt-4" variants={itemVariants}>
                    {Array.isArray(tips) && tips.length > 0 ? (
                        <motion.ul className="list-disc pl-5 text-gray-800" variants={itemVariants}>
                            {tips.map((tip, i) => (
                                <motion.li key={i} className="mb-2" variants={itemVariants}>
                                    {tip}
                                </motion.li>
                            ))}
                        </motion.ul>
                    ) : (
                        !loading.fetchTips && <motion.p className="text-gray-600 italic" variants={itemVariants}>No interview tips available yet. Click the button to fetch them.</motion.p>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default InterviewPrep;