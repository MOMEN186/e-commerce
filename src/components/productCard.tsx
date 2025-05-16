import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from '@mui/material'
import type { Product } from '../types'

function ProductCard({ product }: { product: Product }) {
  return (
    <Grid width="300px">
      <Card>
        <CardHeader title={product.stock > 0 ? 'in stock' : 'out of stock'} />
        <CardMedia component="img" image={product.thumbnail} />
        <CardContent>
          <Grid display="flex" flexDirection="column">
            <Grid display="flex" justifyContent="space-between">
              <Typography>{product.title}</Typography>
              <Typography>${product.price}</Typography>
            </Grid>
            <Grid>
              <Rating name="read-only" value={product.rating} readOnly />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button>Add to Cart</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProductCard
