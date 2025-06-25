import { Box, Tab, Tabs, IconButton } from '@mui/material'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {  useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LanguageIcon from '@mui/icons-material/Language'
import { useAppSelector, useAppDispatch } from '../store/hook'
import { setLanguage } from '@/store/languageSlice'

export const Route = createRootRoute({
  component: () => {
    const [value, setValue] = useState('/')
    const lang = useAppSelector((state) => state.language.value)
    const dispatch = useAppDispatch()

    const handleChange = (e: React.SyntheticEvent, newValue: string) => {
      setValue(newValue)
    }

    const handleClick = () => {
      dispatch(setLanguage(lang === 'en' ? 'ar' : 'en'));
    }

    return (
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            component={Link as React.ElementType}
            value="/"
            to="/"
            label="Home"
            activeProps={{
              // ← props applied when link is active
              sx: { fontWeight: 'bold' },
            }}
          />
          <Tab
            component={Link as React.ElementType}
            icon={<ShoppingCartIcon />}
            aria-label="cart"
            value="/cart"
            to="/cart"
            activeProps={{
              // ← props applied when link is active
              sx: { fontWeight: 'bold' },
            }}
          />
          <IconButton onClick={handleClick}>
            <LanguageIcon sx={{color:"black"}} />
          </IconButton>
        </Tabs>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </Box>
    )
  },
})
