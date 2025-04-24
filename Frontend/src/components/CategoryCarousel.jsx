import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "Project Manager",
  "DevOps Engineer",
  "Marketing Specialist",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Automatically move the carousel every 3 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return; // Pause if hovered
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % category.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [isHovered]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <motion.div
      className="py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
        Explore by Category
      </h2>
      <div
        className="relative w-full max-w-4xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel className="w-full" selectedIndex={currentIndex} onChange={goToSlide}>
          <CarouselContent className="-ml-1 md:-ml-2">
            {category.map((cat, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-1 md:p-2">
                <motion.button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="w-full py-3 md:py-4 rounded-full border border-gray-300 bg-white hover:bg-indigo-50 text-indigo-500 hover:text-indigo-700 font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </motion.button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-1/2 -translate-y-1/2 left-2">
            <CarouselPrevious className="bg-white/80 hover:bg-white shadow-md rounded-full p-2 text-gray-600 hover:text-indigo-500 focus:outline-none" />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2">
            <CarouselNext className="bg-white/80 hover:bg-white shadow-md rounded-full p-2 text-gray-600 hover:text-indigo-500 focus:outline-none" />
          </div>
        </Carousel>
      </div>
    </motion.div>
  );
};

export default CategoryCarousel;
