import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
const Signup = () => {

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form action='' className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign up</h1>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Suman"
            />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="sumansingha@gmail.com"
            />
          </div>
          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type="phone number"
              placeholder="sumansingha8654@gmail.com"
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="email"
              placeholder="sumansingha@gmail.com"
            />
          </div>
          <div className='flex items-center justify between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                  <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
            <Label>Profile</Label>
            <Input
            accept="image/*"
            type="file"
            className="cursor-pointer"
            />
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signup