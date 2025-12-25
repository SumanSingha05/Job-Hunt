import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { INTERVIEW_API_END_POINT } from '../utils/constant';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
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
        setLoading((prev) => ({ ...prev, predictQuestions: true }));
        setError('');
        try {
            const res = await fetch(`${INTERVIEW_API_END_POINT}/questions-with-answers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription: jobDesc }),
            });
            const data = await res.json();
            setPredictedQuestionsWithAnswers(data.questionsWithAnswers);
        } catch (err) {
            console.error(err.message);
            setError('Failed to generate predicted questions.');
        } finally {
            setLoading((prev) => ({ ...prev, predictQuestions: false }));
        }
    };

    const fetchMock = async () => {
        setLoading((prev) => ({ ...prev, mockInterview: true }));
        setError('');
        try {
            const res = await fetch(`${INTERVIEW_API_END_POINT}/mock`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role }),
            });
            const data = await res.json();
            setMcqs(data.mcqs);
        } catch (err) {
            console.error(err.message);
            setError('Failed to generate mock interview questions.');
        } finally {
            setLoading((prev) => ({ ...prev, mockInterview: false }));
        }
    };

    const fetchTips = async () => {
        setLoading((prev) => ({ ...prev, fetchTips: true }));
        setError('');
        try {
            const res = await fetch(`${INTERVIEW_API_END_POINT}/tips`);
            const data = await res.json();
            setTips(data.tips);
        } catch (err) {
            console.error(err.message);
            setError('Failed to fetch interview tips.');
        } finally {
            setLoading((prev) => ({ ...prev, fetchTips: false }));
        }
    };

    return (
        <motion.div
            className="min-h-screen w-full px-4 py-12 bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="text-4xl md:text-5xl font-bold text-indigo-700 drop-shadow-lg mb-10 text-center"
                variants={itemVariants}
            >
                ✨ AI Interview Prep Assistant
            </motion.h1>

            {error && (
                <motion.div
                    className="bg-red-100 text-red-800 border border-red-400 rounded-md px-4 py-2 mb-4 max-w-xl w-full shadow-lg"
                    variants={itemVariants}
                >
                    {error}
                </motion.div>
            )}

            {/* Section Card */}
            <SectionCard
                title="📌 Predictive Interview Questions"
                inputType="textarea"
                inputValue={jobDesc}
                onInputChange={setJobDesc}
                onButtonClick={fetchPredictedQuestionsWithAnswers}
                buttonText={loading.predictQuestions ? 'Generating...' : 'Generate Q&A'}
                loading={loading.predictQuestions}
            >
                {predictedQuestionsWithAnswers?.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white/60 border border-indigo-200 rounded-lg p-4 mb-4 shadow-sm backdrop-blur"
                        variants={itemVariants}
                    >
                        <p className="font-semibold text-indigo-900">
                            {idx + 1}. [{item.type.toUpperCase()}] {item.question}
                        </p>
                        <p className="mt-2 text-gray-700 italic">Answer:</p>
                        <p className="text-gray-800">{item.answer}</p>
                    </motion.div>
                ))}
            </SectionCard>

            <SectionCard
                title="🧪 Mock Interview (MCQs)"
                inputType="input"
                inputValue={role}
                onInputChange={setRole}
                onButtonClick={fetchMock}
                buttonText={loading.mockInterview ? 'Generating...' : 'Start Mock Interview'}
                loading={loading.mockInterview}
            >
                {mcqs.map((q, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white/60 border border-green-200 rounded-lg p-4 mb-4 shadow-sm backdrop-blur"
                        variants={itemVariants}
                    >
                        <p className="font-semibold text-green-900">{idx + 1}. {q.question}</p>
                        {q.options.map((opt, i) => (
                            <p key={i} className="ml-4 text-gray-800">
                                - {opt} {q.correctAnswer === opt && <span className="text-green-600 font-bold">(✔)</span>}
                            </p>
                        ))}
                    </motion.div>
                ))}
            </SectionCard>

            <SectionCard
                title="🎯 Top Interview Tips"
                buttonOnly
                onButtonClick={fetchTips}
                buttonText={loading.fetchTips ? 'Fetching Tips...' : 'Show Tips'}
                loading={loading.fetchTips}
            >
                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                    {tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                    ))}
                </ul>
            </SectionCard>
        </motion.div>
    );
};

export default InterviewPrep;

const SectionCard = ({
    title,
    inputType,
    inputValue,
    onInputChange,
    onButtonClick,
    buttonText,
    loading,
    buttonOnly = false,
    children,
}) => {
    return (
        <motion.div
            className="bg-white/70 border border-gray-200 shadow-xl rounded-2xl p-6 w-full max-w-3xl mb-10 backdrop-blur-lg"
            variants={itemVariants}
        >
            <motion.h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</motion.h2>

            {!buttonOnly && (
                <>
                    {inputType === 'textarea' ? (
                        <textarea
                            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-indigo-500 focus:outline-none resize-none"
                            rows={5}
                            placeholder="Paste your content here..."
                            value={inputValue}
                            onChange={(e) => onInputChange(e.target.value)}
                        />
                    ) : (
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-green-500 focus:outline-none"
                            placeholder="Enter job role (e.g., Frontend Developer)"
                            value={inputValue}
                            onChange={(e) => onInputChange(e.target.value)}
                        />
                    )}
                </>
            )}

            <motion.button
                onClick={onButtonClick}
                className={`transition-all px-5 py-2 text-white rounded-md font-medium ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                    }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
            >
                {buttonText}
            </motion.button>

            <div className="mt-6">{children}</div>
        </motion.div>
    );
};
