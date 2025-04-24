import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const navigate = useNavigate();
  return (
    <motion.div
      className='max-w-7xl mx-auto py-24 bg-gradient-to-b from-white to-gray-50' // Soft gradient background
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className='mb-16 text-center'> {/* Centered heading */}
        <h2 className='text-3xl font-semibold text-gray-800 tracking-tight'>
          <span className='text-indigo-700'>Explore</span> Exciting Job Openings
        </h2>
        <p className='mt-3 text-lg text-gray-600'>Discover the latest and most sought-after career opportunities.</p> {/* More engaging subtitle */}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'> {/* Increased gap for better spacing */}
        {allJobs.length <= 0 ? (
          <motion.div
            className='col-span-full text-center text-gray-600 italic py-10' // Centered "no jobs" message
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            No exciting job openings currently available. Please check back later!
          </motion.div>
        ) : (
          allJobs?.slice(0, 6).map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }} // Slightly more pronounced slide-in
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }} // Smoother, slightly longer animation
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </div>
      {allJobs.length > 6 && (
        <div className='mt-10 text-center'>
          <motion.button
            className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
            onClick={() => navigate('/Browse')} // Example: Navigate to browse all jobs page
          >
            View All Job Openings
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default LatestJobs;