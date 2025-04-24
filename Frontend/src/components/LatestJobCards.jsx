import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-50 to-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-blue-300'>

      {/* Company Info */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-semibold text-xl text-gray-800'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
        <div className='text-sm text-gray-500'>{job?.location}</div>
      </div>

      {/* Job Title and Description */}
      <div className='mt-4'>
        <h2 className='font-bold text-xl text-gray-900'>{job?.title}</h2>
        <p className='text-sm text-gray-700 mt-2'>{job?.description}</p>
      </div>

      {/* Badges Section */}
      <div className='flex items-center gap-4 mt-5'>
        <Badge className='text-blue-700 bg-blue-100 font-bold px-4 py-2 rounded-full' variant='ghost'>
          {job?.position} Positions
        </Badge>
        <Badge className='text-[#F83002] bg-[#FEE2C7] font-bold px-4 py-2 rounded-full' variant='ghost'>
          {job?.jobType}
        </Badge>
        <Badge className='text-[#7209b7] bg-[#E0C6FF] font-bold px-4 py-2 rounded-full' variant='ghost'>
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
