import React from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {
    const { Companies } = useSelector(store => store.Company);
    return (
        <div>
            <Table>
                <TableCaption>A List of your recent register companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        companies.length <= 0 ? <span>You haven't registered any company yet.</span> : (
                            <>
                                {
                                     companies?.map((company) => {
                                        return (
                                            <div key = {company._id}>
                                    <TableCell>
                                    <Avatar>
                                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                                    </Avatar>
                                </TableCell>
                                <TableCell>Company Name</TableCell>
                                <TableCell>04-02-2025</TableCell>
                                <TableCell>Company Name</TableCell>
                                <TableCell className='text-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                </>
                                        )
                                    }
                            }

                            </>
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable