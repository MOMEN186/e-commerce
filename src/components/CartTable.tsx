import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'

type CartTableProps = {
  children?: ReactNode
}

export default function CartTable({ children }: CartTableProps) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Description</Typography>
              </TableCell>
              <TableCell>
                <Typography>Quantity</Typography>
              </TableCell>
              <TableCell>
                <Typography>Remove</Typography>
              </TableCell>
              <TableCell>
                <Typography>total price</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
