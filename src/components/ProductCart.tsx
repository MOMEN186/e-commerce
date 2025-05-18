import { Grid, IconButton, TableCell, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add';
import type { Product } from '@/types'

interface CartItem {
  product: Product
  quantity: number
}
interface ProductCartProps {
  product: CartItem;
  handleIncrease: () => void;
  handleDecrease: () => void;
  handleRemove: () => void;
}
export default function ProductCart({ product,handleIncrease,handleDecrease,handleRemove }: ProductCartProps) {
  return (
    <>
      <TableCell>
        <Grid display="flex" alignItems="center">
          <img src={product.product.thumbnail} />
          <Typography sx={{fontWeight:"bold"}}>{product.product.title}</Typography>
        </Grid>
      </TableCell>
      <TableCell>
        <Grid display="flex" alignItems="center" columnGap={1}>

        <IconButton onClick={handleIncrease} sx={{backgroundColor:"black",color:"white",borderRadius:"5px"}}>  
            <AddIcon/>
          </IconButton>

          <IconButton sx={{color:"black",borderRadius:"5px"}}>
            {product.quantity}
          </IconButton>          
          <IconButton  onClick={handleDecrease} sx={{backgroundColor:"silver",color:"white",borderRadius:"5px"}}  >
            <RemoveIcon/>
          </IconButton>
        </Grid>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleRemove}>
          <RemoveIcon />
        </IconButton>
      </TableCell>
      <TableCell>{product.product.price * product.quantity}</TableCell>
    </>
  )
}
