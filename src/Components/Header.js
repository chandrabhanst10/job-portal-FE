import { AppBar, Box, IconButton, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import LogoutIcon from '@mui/icons-material/Logout';
import { Logout } from '../Store/Slices/UserSlice'
const Header = () => {
    const {authentication} = useSelector((state) => state.user)
    const dispatch=useDispatch();
    const Navigate = useNavigate();
    const logout = async () => {
        let result = await dispatch(Logout())
        if (Logout.fulfilled.match(result)) {
            Navigate("/login");
        }
    }
    return (
        <AppBar>
            <Toolbar>
                <HeaderContainer>
                    <Box className="headerLeft">
                        <Typography variant='h5'>Niche</Typography>
                    </Box>
                    <Box className="headerRight">
                        <Box className="menuListContainer">
                            {authentication ? <>
                                <IconButton onClick={logout}>
                                    <LogoutIcon color='secondary' className='logoutBtn' />
                                </IconButton>
                            </> : <>
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
    },
    "& .logoutBtn":{
        color:"#fff"
    }
})