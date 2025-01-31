// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import React from 'react'
import { User2 } from "lucide-react"
import { LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import axios from "axios"
import { setUser } from "@/redux/authSlice"
import { USER_API_END_POINT } from "@/utils/constant"
const Navbar = () => {
    const {user} = useSelector(store=>store.auth);
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    
    const logoutHandler = async () =>{
        try{
                const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setUser(null));
                    navigate("/");
                    toast.success(res.data.message);
                }
        }catch(error){
        console.log(error);
        toast.error(error.response.data.message);
        }
    }
    
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Jobs">Jobs</Link></li>
                        <li><Link to="/Browse">Browse</Link></li>
                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#320186]">Signup</Button></Link>

                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="flex gap-4 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>Suman Singha</h4>
                                            <p className='text-sm text-muted-foreground'>
                                                Lorem ipsum dolor sit amet.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />

                                            <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                        </div>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div> 

                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div>

    )
}

export default Navbar