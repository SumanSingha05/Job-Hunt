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
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-indigo-600'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role == "recruiter" ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/Jobs">Jobs</Link></li>
                                    <li><Link to="/Browse">Browse</Link></li>
                                    <li><Link to="/resume-templates">Resume Templates</Link></li>
                                    <li>
                                        <Link
                                            to="/interview-prep"
                                            style={{
                                                textDecoration: 'none',
                                                color: '#3d5afe', // A moderate indigo text color
                                                background: 'linear-gradient(90deg, #e8eaf6, #c5cae9)', // Very light cyan to light indigo gradient
                                                padding: '8px 15px',
                                                borderRadius: '5px',
                                                boxShadow: '0 2px 4px rgba(63, 81, 181, 0.08)', // Subtle indigo shadow for depth
                                                transition: 'box-shadow 0.3s ease-in-out',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.boxShadow = '0 3px 6px rgba(63, 81, 181, 0.15)'; // Slightly more noticeable indigo shadow on hover
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.boxShadow = '0 2px 4px rgba(63, 81, 181, 0.08)'; // Revert to the initial subtle indigo shadow
                                            }}
                                        >
                                            Interview Preparation With AI
                                        </Link>
                                    </li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-indigo-600 hover:bg-[#320186]">Signup</Button></Link>

                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="flex gap-4 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>
                                                {user.profile?.bio}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        {
                                            user && user.role == 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }

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