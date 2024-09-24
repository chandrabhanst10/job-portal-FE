import { Box, MenuItem } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ProfileImg from "../Assets/profile.png"
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../Store/Slices/UserSlice'
const SideBar = () => {
    const Navigate = useNavigate();
    const { authentication,userProfileData } = useSelector((state) => state.user)
    const dispatch=useDispatch()
    const logout = async() => {
        await dispatch(Logout())
        Navigate("/login")
    }
    return (
        <SideBarContainer>
            <Box className="profileImgContainer">
                <img src={ProfileImg} alt='profileimg' className='profileImg' />
            </Box>
            {authentication ?
                <>
                    <Link className='menuItem' to={"/"}><MenuItem className="menuItem">My Profile</MenuItem></Link>
                    <Link className='menuItem' to={"/update-profile"}><MenuItem className="menuItem">Update Profile</MenuItem></Link>
                    <Link className='menuItem' to={"/update-password"}><MenuItem className="menuItem">Update Password</MenuItem></Link>
                    {userProfileData?.role==="Employer"&&
                    <Link className='menuItem' to={"/post-new-job"}><MenuItem className="menuItem">Post New Job</MenuItem></Link>
                    }
                    {userProfileData?.role==="Employer"&&
                    <Link className='menuItem' to={"/"}><MenuItem className="menuItem">My Jobs</MenuItem></Link>
                    }
                    <Link className='menuItem' to={"/create-application"}><MenuItem className="menuItem">Applications</MenuItem></Link>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </>
                : ""
            }

        </SideBarContainer>
    )
}

export default SideBar
const SideBarContainer = styled(Box)({
    backgroundColor: "#fff",
    padding: "20px",
    width: "300px",
    borderRadius: "10px",
    "& .menuItem": {
        color: "gray",
        textDecoration: "none",
        textAlign: "center",
        margin: "auto",
    },
    "& .profileImgContainer": {
        width: "100%",
        height: "48%",
        border: "3px solid #3498db",
        borderRadius: "50%"
    },
    "& .profileImg": {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    },
    '@media (max-width: 576px)': {
        width: "100%",
        height: "100%",
    },
})