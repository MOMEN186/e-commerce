import { Grid } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useState } from 'react'
import ProductCard from '../components/productCard'

import type { Product } from '../types'


export const Route = createFileRoute('/')({
  component: ProductsList,
  loader: async () => {
    const res = await axios.get('https://dummyjson.com/products')
    const products = res.data.products;
    return products
  },
})

export default function ProductsList() {
  // const products = Route.useLoaderData();
  const [products,] = useState<Array<Product>>(Route.useLoaderData());


  return (
    <Grid>
      <Grid padding="20px" display="flex" gap="10px" flexWrap="wrap" >
        {products.map((product: Product) => <ProductCard product={product} />)}
      </Grid>
    </Grid>
  )
}
