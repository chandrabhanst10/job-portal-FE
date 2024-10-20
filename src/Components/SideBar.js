import { Box, Divider, MenuItem } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ProfileImg from "../Assets/profile.png"
import { useSelector } from 'react-redux'
const SideBar = () => {
    const { authentication,userProfileData } = useSelector((state) => state.user)
    
    return (
        <SideBarContainer>
            <Box className="profileImgContainer">
                <img src={ProfileImg} alt='profileimg' className='profileImg' />
            </Box>
            {authentication ?
                <>
                    <Link className='menuItem' to={"/"}><MenuItem className="menuItem">My Profile</MenuItem></Link>
                    <Link className='menuItem' to={"/"}><MenuItem className="menuItem">Home</MenuItem></Link>
                    <Link className='menuItem' to={"/jobs"}><MenuItem className="menuItem">Jobs</MenuItem></Link>
                    <Link className='menuItem' to={"/update-profile"}><MenuItem className="menuItem">Update Profile</MenuItem></Link>
                    <Link className='menuItem' to={"/update-password"}><MenuItem className="menuItem">Update Password</MenuItem></Link>
                    {userProfileData?.role==="Employer"&&
                    <Link className='menuItem' to={"/post-new-job"}><MenuItem className="menuItem">Post New Job</MenuItem></Link>
                    }
                    {userProfileData?.role==="Employer"&&
                    <Link className='menuItem' to={"/"}><MenuItem className="menuItem">My Jobs</MenuItem></Link>
                    }
                    <Link className='menuItem' to={"/create-application"}><MenuItem className="menuItem">Applications</MenuItem></Link>
                    <Divider/>
                    <Link className='menuItem' to={"/subscription"}><MenuItem className="premiumText">🌟Try Premium🌟</MenuItem></Link>
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
    "& .premiumText":{
        color:"gold",
        textDecoration:"none"
    },
    "& .menuItem": {
        color: "gray",
        textDecoration: "none",
        textAlign: "center",
        margin: "auto",
    },
    "& .profileImg": {
        width: "200px",
        height: "200px",
        objectFit: "contain",
        border: "3px solid #3498db",
 borderRadius: "50%"
    },
    '@media (max-width: 576px)': {
        width: "100%",
        height: "100%",
    },
})