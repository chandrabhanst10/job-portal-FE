import { AppBar, Box, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from "react-redux"
const Header = () => {
    const {authentication} = useSelector((state) => state.user)
    return (
        <AppBar>
            <Toolbar>
                <HeaderContainer>
                    <Box className="headerLeft">
                        <Typography variant='h5'>Niche</Typography>
                    </Box>
                    <Box className="headerRight">
                        <Box className="menuListContainer">
                            {authentication ?<>
                                <Link className='menuItem' to={"/"}><MenuItem>Home</MenuItem></Link>
                                <Link className='menuItem' to={"/jobs"}> <MenuItem>Jobs</MenuItem></Link>
                            </>:<>
                                <Link className='menuItem' to={"/login"}><MenuItem>Login</MenuItem></Link>
                                <Link className='menuItem' to={"/register"}><MenuItem>Register</MenuItem></Link>
                            </>}
                        </Box>
                    </Box>
                </HeaderContainer>
            </Toolbar>
        </AppBar>
    )
}

export default Header
const HeaderContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    "& .menuListContainer": {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    "& .menuItem": {
        color: "#fff",
        textDecoration: "none"
    }
})