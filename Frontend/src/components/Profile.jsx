import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'


const skills =["html","css","javascript","reactjs"];
const Profile = () => {
  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className='mex-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src='https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg' alt="profile" />
            </Avatar>

            <div>
              <h1 className='font-medium text-xl'>Full Name</h1>
              <p>Add your bio here here your bio must be here due to the code </p>
            </div>
          </div><Button className='text-right' variant='outline'>
            <Pen />
          </Button>
        </div>
        <div className='my-5'>
        <div className='flex items-center gap-3 my-2'>
          <Mail/>
          <span>
            sumansingha@gmail.com
          </span>
        </div>
        <div className='flex items-center gap-3 my-2'>
          <Contact/>
          <span>
            7894561235
          </span>
        </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>
          {
            skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
          }
        </div>
      </div>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label className="text-md font-bold">Resume</Label>
            {
              isResume ? <a target='blank'href='https://youtube.com' className='text-blue-500 w-full hover:underline cursor-pointer'>Suman Singha</a> : <span>NA</span>
            }
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
      <h1>Applied Jobs</h1>
      {/* application table will be displayed */}
      </div>
    </div>
    </div>
  )
}

export default Profile