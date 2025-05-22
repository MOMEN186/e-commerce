/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {
  Chip,
  Divider,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import {  useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ProductImageGallery from '../components/ProductImageGallery'
import type { Product } from '@/types'

export const Route = createFileRoute('/$product')({
  component: Product,
  loader: async ({ params }) => {
    const { product } = params
    const res = await axios.get(`https://dummyjson.com/products/${product}`)
    return { product: res.data }
  },
})


interface Dictionary<T>{
  [key: number]: {
    product: Product,
    quantity:number,
  }
}


function Product() {
  const { product } = Route.useLoaderData()
  const [count, setCount] = useState(0);

  const handleAddCart = () => {
    const stored = localStorage.getItem("products");
    const dict: Dictionary<Product> = stored ? JSON.parse(stored) : {};
  
    const previousQuantity = Number(dict[product.id]?.quantity);
    const newQuantity = count +previousQuantity;
  
    dict[product.id] = {
      product,
      quantity: newQuantity > 0 ? newQuantity : 0,
    };
  
    localStorage.setItem("products", JSON.stringify(dict));
  };


  return (
    <Grid container display="flex" padding="20pxs">
      <Grid display="flex">
        <Grid display="flex">
          <ProductImageGallery images={product.images} />
        </Grid>
        <Grid
          padding="10px"
          marginLeft="10px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h3">{product.title}</Typography>
          <Typography variant="h6">{product.description}</Typography>
          <Rating value={product.rating} readOnly />
          <Divider />
          <Grid
            display="flex"
            flexDirection="column"
            rowGap="20px"
            marginTop="50px"
          >
            <Typography variant="h5">
              ${product.price} or{' '}
              {Math.round((product.price / 12.0 + Number.EPSILON) * 100) / 100}
              /Month
            </Typography>
            {product.stock ? (
              <Chip sx={{ backgroundColor: 'green' }} label="In Stock" />
            ) : (
              <Chip label="Out of Stock" />
            )}
            <Grid display="flex" flexDirection="row" columnGap={10}>
              <Chip label={product.category} />
              {product.brand && <Chip label={product.brand} />}
            </Grid>
            <Divider />
            <Grid display="flex" flexDirection="column">
              <Grid display="flex" columnGap="10px" alignItems="center">
                <IconButton onClick={() => {
                  if (count > 0) return setCount(count - 1);
                }}>
                  <RemoveIcon />
                </IconButton>

                <Typography>{count}</Typography>
                <IconButton onClick={() => {
                  if (count < product.stock) setCount(count + 1);
                }}>
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid display="flex">
                <Chip label="Buy now" />
                <Chip onClick={handleAddCart} label="Add to Cart" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
