 import { Box, Tab, Tabs } from "@mui/material"
import { Link,Outlet,createRootRoute, } from "@tanstack/react-router"
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useState } from "react"

export const Route = createRootRoute({
  component: () => {

    const [value, setValue] = useState("/");

    const handleChange = (e:React.SyntheticEvent, newValue:string) => {
      setValue(newValue);
    };
  
    return(
    <Box>
      <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            component={Link as React.ElementType}
            value="/"
            to="/"
            label="Home"
            activeProps={{        // ← props applied when link is active
              sx: { fontWeight: 'bold' },
            }}
          />
      
      </Tabs>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      </Box>
    )
  },
})