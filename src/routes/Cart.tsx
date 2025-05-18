/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {
  Grid,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from '@mui/material'

import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { Product } from '../types'
import ProductCart from '@/components/ProductCart'
import CartTable from '@/components/CartTable'

interface CartItem {
  product: Product
  quantity: number
}

interface CartDictionary {
  [key: number]: CartItem
}

export const Route = createFileRoute('/Cart')({
  component: RouteComponent,
})

function RouteComponent() {
  const [cart, setCart] = useState<Array<CartItem>>([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('products')
    if (stored) {
      const cartDict: CartDictionary = JSON.parse(stored)
      const cartItemsArray = Object.values(cartDict)
      setCart(cartItemsArray)
      const total = cartItemsArray.reduce((sum, item) => {
        return sum + item.product.price * item.quantity
      }, 0)
      setTotalPrice(total)
    } else {
      setCart([])
      setTotalPrice(0)
    }
  }, [])

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      return sum + item.product.price * item.quantity
    }, 0)
    setTotalPrice(total)
  }, [cart])

  const handleDecrease = (productId: number) => {
    const stored = localStorage.getItem('products')
    if (stored) {
      const cartDict: CartDictionary = JSON.parse(stored)

      if (cartDict[productId]) {
        cartDict[productId].quantity--
      }

      localStorage.setItem('products', JSON.stringify(cartDict))
      const updatedItems = Object.values(cartDict)
      setCart(updatedItems)
    }
  }

  const handleIncrease = (productId: number) => {
    const stored = localStorage.getItem('products')
    if (stored) {
      const cartDict: CartDictionary = JSON.parse(stored)

      if (cartDict[productId]) {
        cartDict[productId].quantity++
      }

      localStorage.setItem('products', JSON.stringify(cartDict))
      const updatedItems = Object.values(cartDict)
      setCart(updatedItems)
    }
  }

  const handleRemove = (productID: number) => {
    const stored = localStorage.getItem('products')
    if (stored) {
      const cartDict: CartDictionary = JSON.parse(stored)

      if (cartDict[productID]) {
        delete cartDict[productID]
      }

      localStorage.setItem('products', JSON.stringify(cartDict))
      const updatedItems = Object.values(cartDict)
      setCart(updatedItems)
    }
  }

  return (
    <Grid>
      <CartTable>
      
          {cart.length > 0 &&
            cart.map((product) => (
              <TableRow>
                <ProductCart
                  handleIncrease={() =>
                    handleIncrease(Number(product.product.id))
                  }
                  handleDecrease={() =>
                    handleDecrease(Number(product.product.id))
                  }
                  handleRemove={() => handleRemove(Number(product.product.id))}
                  product={product}
                />
              </TableRow>
            ))}
          <TableFooter>
            <TableCell>
              <Typography>{totalPrice}</Typography>
            </TableCell>
          </TableFooter>
        
      </CartTable>
    </Grid>
  )
}
