import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs  from './LatestJobs'
import Footer from './Footer'
import userGetAllJobs from '@/hooks/useGetAllJobs'
const Home = () => {
  userGetAllJobs();
  return (
    <div><Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobs/>
    <Footer/> 
    </div>
  )
}

export default Home