import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const Signup = () => {

  return (
    <div>
        <Navbar/>
        <div>
            <form action=''>
                <h1 className='font-bold text-xl mb-5'>Sign up</h1>
                <div className='my-2'>
                    <Label>Full Name</Label>
                    <Input
                    type="text"
                    placeholder="Suman"
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup