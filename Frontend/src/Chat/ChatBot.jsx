import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import botLogo from "../assets/bot.png";
import userLogo from "../assets/userr.png";

import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hello! 👋 I'm your dedicated career advisor. How can I assist you today with job trends, in-demand skills, or hiring companies?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const removeMarkdownBold = (text) => {
        return text.replace(/\*\*(.*?)\*\*|\*(.*?)\*/g, '$1$2');
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newUserMessage = { role: "user", content: input };
        const newAssistantMessage = { role: "assistant", content: "" };

        setMessages((prev) => [...prev, newUserMessage, newAssistantMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const history = messages.map((msg) => ({
                role: msg.role === "assistant" ? "model" : msg.role,
                parts: [{ text: msg.content }],
            }));

            const result = await model.generateContentStream({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are an AI-powered Career Guidance Counselor. Your primary goal is to provide accurate, current, and actionable advice on career development.

When responding to user queries:

1.  Be highly specific: Offer concrete examples, names of skills, tools, job titles, and companies.
2.  Prioritize Current Data: Emphasize that your information is based on recent trends (e.g., "Based on Q2 2025 market analysis..." or "Current industry reports indicate..."). If you cannot provide current data for a specific query, state that you are providing general insights.
3.  Actionable Insights: Frame advice in a way that empowers the user to take the next step.
4.  Scope Adherence: Only provide career-related information. If a query is outside this scope, politely redirect the user back to career topics.
5.  Maintain Professional Tone: Your responses should be clear, concise, encouraging, and respectful.
6.  Key Information Areas to Cover (when relevant to user query):
    * In-demand Skills: Mention specific technical skills (e.g., Python, SQL, AWS, React, Data Visualization tools like Tableau/Power BI) and soft skills (e.g., critical thinking, communication, problem-solving, adaptability).
    * Trending Job Roles/Titles: List specific job titles currently experiencing high demand (e.g., AI Engineer, Data Scientist, Cybersecurity Analyst, Cloud Architect, UX Designer, Digital Marketing Specialist).
    * Hiring Companies/Sectors: Identify companies known for frequent hiring in relevant fields, or sectors that are currently expanding rapidly.
    * Educational/Certification Paths: Suggest relevant courses, certifications (e.g., PMP, AWS Certified Solutions Architect), or academic programs.
    * Job Search Strategies: Offer advice on resume optimization, interview preparation, networking, and leveraging platforms like LinkedIn.

Example scenarios to guide your responses:

* User asks about "IT jobs": Break down into sub-domains (e.g., Software Development, Cybersecurity, Cloud Computing, Data Science) and provide specific examples for each.
* User asks about "skills for the future": Focus on evergreen skills (adaptability, critical thinking) combined with emerging tech skills (AI/ML, blockchain, quantum computing fundamentals).
* User asks a non-career question (e.g., "What's the weather like?"): Respond with: "As an AI Career Guidance Counselor, I focus solely on career-related queries. How can I assist you with your professional journey today?"

Begin by offering a broad range of career topics you can cover to set expectations.`,
                            },
                        ],
                    },
                    ...history,
                    {
                        role: "user",
                        parts: [{ text: newUserMessage.content }],
                    },
                ],
            });

            let fullResponse = "";
            for await (const chunk of result.stream) {
                let chunkText = chunk.text();
                chunkText = removeMarkdownBold(chunkText);

                fullResponse += chunkText;

                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    const lastIndex = updatedMessages.length - 1;
                    if (updatedMessages[lastIndex].role === "assistant") {
                        updatedMessages[lastIndex].content = fullResponse;
                    }
                    return updatedMessages;
                });
            }
            setIsTyping(false);

        } catch (err) {
            console.error("API error:", err);
            let errorMessage = "Oops! An error occurred while fetching the response. Please try again later.";
            if (err.message && err.message.includes("API key not valid")) {
                errorMessage = "Authentication error: Your Gemini API key might be invalid or expired. Please check your .env file.";
            } else if (err.message && err.message.includes("429")) {
                errorMessage = "Too many requests. Please wait a moment before trying again.";
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: errorMessage,
                },
            ]);
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
            {!isOpen && (
                <motion.button
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-3 rounded-full shadow-md cursor-pointer hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onClick={() => setIsOpen(true)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    <img src={botLogo} alt="Chatbot" className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-semibold">Need career advice?</span>
                </motion.button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.2 }}
                        className="w-96 bg-gray-900 shadow-2xl rounded-lg flex flex-col border border-gray-800"
                    >
                        <div className="bg-gradient-to-l from-blue-700 via-blue-600 to-indigo-700 text-white p-4 flex justify-between items-center rounded-t-lg shadow-md">
                            <div className="flex items-center space-x-2">
                                <img src={botLogo} alt="Cae" className="w-8 h-8 rounded-full" />
                                <span className="font-semibold text-lg">Career AI Assistant</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-300 hover:text-gray-400 transition-colors duration-200 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="h-72 overflow-y-auto p-4 space-y-4 bg-gray-800 text-white rounded-b-md">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`flex items-end space-x-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <img src={msg.role === "user" ? userLogo : botLogo} alt={msg.role} className="w-8 h-8 rounded-full border border-gray-700" />
                                        <div className={`p-3 rounded-lg text-white text-sm whitespace-pre-wrap ${msg.role === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <img src={botLogo} alt="Bot Typing" className="w-8 h-8 rounded-full border border-gray-700" />
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="flex items-center border-t border-gray-800 p-3 bg-gray-800 rounded-b-lg">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-grow p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button
                                onClick={sendMessage}
                                className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full text-white shadow-md hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                disabled={isTyping}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;