import React, { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Login')({
  component: Login,
})

type UserObj = {
  name: string
  email: string
  password: string
  username: string
}

type UserErrorObj = Record<keyof UserObj, boolean>

function Login() {
  const [user, setUser] = useState<UserObj>({
    name: '',
    email: '',
    password: '',
    username: '',
  })
  const [userError, setUserError] = useState<UserErrorObj>({
    name: false,
    email: false,
    password: false,
    username: false,
  })
  const [confirmPassword, setConfirmPassword] = useState('')  

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  function handleConfirmChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = () => {
    // 1. Build a fresh errors object by iterating user’s keys
    const errors = (Object.keys(user) as (keyof UserObj)[]).reduce(
      (acc, key) => {
        acc[key] = user[key].trim() === ''
        return acc
      },
      {} as UserErrorObj
    )

    const confirmError = confirmPassword !== user.password


    setUserError(errors)
  
    const hasAnyError =
      Object.values(errors).some(Boolean) || confirmError

    if (hasAnyError) {
      console.log('Validation failed', { errors, confirmError })
      return
    }

    // 5. Otherwise, proceed with submit
    alert(user)
  }

  return (
    <Grid
      container
      padding="20px"
      display="flex"
      flexDirection="column"
      rowGap="20px"
    >
      <Typography variant="h3">Login</Typography>
      <Grid display="flex" flexDirection="column" rowGap={2} width="400px">
        {/** name, email, username, password **/}
        {(['name', 'email', 'username', 'password'] as (keyof UserObj)[]).map(
          field => (
            <TextField
              required
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type={field === 'password' ? 'password' : 'text'}
              value={user[field]}
              onChange={handleChange}
              error={userError[field]}
            />
          )
        )}

        {/** confirm password **/}
        <TextField
          required
          label="Confirm Password"
          name="confirm"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmChange}
          error={confirmPassword !== user.password}
          helperText={
            confirmPassword !== user.password
              ? "Passwords don't match"
              : ''
          }
        />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default Login
