import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'

const Job = () => {
  return (
    <div>
    <div>
    <p>2 days ago</p>
    <Button variant='outline' classname="rounded-full" size='icon'><Bookmark/></Button>
    </div>
      
   <div className='flex items-center gap-2 my-2'>
    <Button classname="p-6" variant="outline" size="icon">
      <Avatar>
        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
      </Avatar>
    </Button>
    <div>
      <h1>Company Name</h1>
      <p>India</p>
    </div>
   </div>
    </div>
  )
}

export default Job