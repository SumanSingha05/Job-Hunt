import React from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead} from '../ui/table'

const CompaniesTable = () => {
  return (
    <div>
        <Table>
        <TableCaption>A List of your recent register companies</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        </Table>
    </div>
  )
}

export default CompaniesTable