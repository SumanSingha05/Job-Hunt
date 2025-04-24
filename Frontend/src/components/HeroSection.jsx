import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.div
            className="text-center py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-100" // Subtle gradient background
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <motion.div
                className="flex flex-col gap-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
                <motion.span
                    className="mx-auto px-5 py-2 rounded-full bg-indigo-100 text-[#6A38C2] font-semibold shadow-md" // Updated badge style
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    #1 Job Discovery Platform
                </motion.span>
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight" // Refined typography
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                >
                    Find Your Next <br />
                    <span className="text-indigo-500">Career Opportunity</span>
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600 max-w-xl mx-auto" // Improved paragraph styling
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                >
                    Explore thousands of authentic job listings and take the next step in your professional journey. Your dream job awaits!
                </motion.p>
                <motion.div
                    className="relative w-full max-w-md mx-auto shadow-xl rounded-full overflow-hidden border border-gray-200" // Enhanced search bar styling
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for jobs, keywords, or companies"
                        onChange={(e) => setQuery(e.target.value)}
                        className="py-3 pl-11 pr-4 w-full text-gray-700 placeholder-gray-400 outline-none border-none"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="absolute inset-y-0 right-0 bg-indigo-500 hover:bg-indigo-600 text-white rounded-r-full transition-colors duration-200" // Updated button style
                    >
                        Search
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default HeroSection