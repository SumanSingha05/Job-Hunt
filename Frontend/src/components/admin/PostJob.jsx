import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const PostJob = () => {
  const [input, setInput] = useState({
    title:"",
    description:"",
    requirements:"",
    salary:"",
    location:"",
    jobType:"",
    experience:"",
    position:0,
    companyId:""
  });
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  };
    
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center w-screen my-5'>
            <div className='grid grid-cols-2 gap-2'>
            <div>
                <Label>Title</Label>
                <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label>Description</Label>
                <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label>Requirements</Label>
                <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label>Salary</Label>
                <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label>Location</Label>
                <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label>Job Type</Label>
                <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label>Experience Level</Label>
                <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label>No Of Position</Label>
                <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            </div>
        </div>
    </div>
  )
}

export default PostJob