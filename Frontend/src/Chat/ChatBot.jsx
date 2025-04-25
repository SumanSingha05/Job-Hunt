import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import botLogo from "../assets/bot.png"; // Assuming these paths are correct
import userLogo from "../assets/userr.png";

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
    const [streamedReply, setStreamedReply] = useState("");
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newUserMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");
        setIsTyping(true);
        setStreamedReply("");

        try {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer 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`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openchat/openchat-7b",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a helpful and professional career advisor. Provide specific skill suggestions, trending job roles, and mention companies hiring frequently, using accurate and recent data where possible.",
                        },
                        ...messages,
                        newUserMessage,
                    ],
                    stream: true,
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.startsWith('data:'));

                for (const line of lines) {
                    const jsonString = line.substring(5).trim();
                    if (jsonString === '[DONE]') {
                        setIsTyping(false);
                        return;
                    }
                    try {
                        const json = JSON.parse(jsonString);
                        const content = json.choices?.[0]?.delta?.content;
                        if (content) {
                            setStreamedReply((prev) => prev + content);
                        }
                    } catch (error) {
                        console.error("Error parsing JSON:", error, jsonString);
                    }
                }
            }
            setIsTyping(false);
            setMessages((prev) => [...prev, { role: "assistant", content: streamedReply }]);

        } catch (err) {
            console.error("API error:", err);
            setMessages((prev) => [...prev, { role: "assistant", content: "Oops! An error occurred while fetching the response. Please try again later." }]);
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
                                <img src={botLogo} alt="Nekko AI" className="w-8 h-8 rounded-full" />
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
                                            {msg.timestamp && (
                                                <span className={`text-xs block text-right ${msg.role === "user" ? "text-gray-300" : "text-gray-400"}`}>
                                                    {msg.timestamp}
                                                </span>
                                            )}
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
                            {streamedReply && !isTyping && (
                                <div className="flex items-start space-x-2 text-white">
                                    <img src={botLogo} alt="Bot Reply" className="w-8 h-8 rounded-full border border-gray-700" />
                                    <div className="p-3 rounded-lg bg-gray-700 text-sm whitespace-pre-wrap">{streamedReply}</div>
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