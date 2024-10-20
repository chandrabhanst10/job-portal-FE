import { Box} from '@mui/material'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Home from './Pages/Home.js'
import Jobs from './Pages/Jobs.js'
import Dashboard from './Pages/Dashboard.js'
import Login from './Pages/Login.js'
import Register from './Pages/Register.js'
import Header from './Components/Header.js'
import SideBar from './Components/SideBar.js'
import PostApplication from './Pages/PostApplication.js'
import JobDetails from './Pages/JobDetails.js'
import AppliedJobDetails from './Pages/AppliedJobDetails.js'
import UpdateProfile from './Pages/UpdateProfile.js'
import UpdatePassword from './Pages/UpdatePassword.js'
import PostNewJob from './Pages/PostNewJob.js'
import { AuthenticationRoute, AuthRoute, AuthSubscription } from './Utils/AuthenticationRoute.js'
import { useDispatch, useSelector } from 'react-redux'
import Application from './Pages/Application.js'
import { Authentication, GetUserProfile, handleSubscriptionHeader } from './Store/Slices/UserSlice.js'
import PremiumHeader from './Components/PremiumHeader.js'
import Subscription from './Pages/Subscription.js'
import { io } from "socket.io-client"
import { toast } from 'react-toastify'
import { Notificatons } from './Notification/Notification.js'
const WebRoutes = () => {
  const { showSubscriptionHeader } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const socket = io("http://localhost:5500")
  const handleClose = () => {
    dispatch(handleSubscriptionHeader())
  }
  const handleNavigate = () => {
    dispatch(handleSubscriptionHeader())
    Navigate("/subscription")
  }
  const { userProfileData } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(Authentication())
    dispatch(GetUserProfile());
    Notificatons(socket)
  }, [dispatch]);
// const handleSubmit=(e)=>{
//   e.preventDefault()
// socket.emit("message",message)
// }
  return (
    <CommonLayoutContainer>
      <Box>
        <Header />
        {/* {userProfileData?.role && <PremiumHeader showHeader={showSubscriptionHeader} handleClose={handleClose} handleNavigate={handleNavigate} />} */}
      </Box>
      <Box className={"layoutBottom"}>
        <SideBar />
        <WebRoutesContainer>
          <Routes>
            <Route path='/' element={<AuthenticationRoute><Home /></AuthenticationRoute>} />
            <Route path='/jobs' element={<AuthenticationRoute><Jobs /></AuthenticationRoute>} />
            <Route path='/jobs-details/:id' element={<AuthenticationRoute><JobDetails /></AuthenticationRoute>} />
            <Route path='/dashboard' element={<AuthenticationRoute><Dashboard /></AuthenticationRoute>} />
            <Route path='/post/application/:jobId' element={<AuthenticationRoute><PostApplication /></AuthenticationRoute>} />
            <Route path='/applied-jobs-details/:jobId' element={<AuthenticationRoute><AppliedJobDetails /></AuthenticationRoute>} />
            <Route path='/update-profile' element={<AuthenticationRoute><UpdateProfile /></AuthenticationRoute>} />
            <Route path='/update-password' element={<AuthenticationRoute><UpdatePassword /></AuthenticationRoute>} />
            {userProfileData?.role && <Route path='/subscription' element={<AuthSubscription><Subscription /></AuthSubscription>} />}
            {userProfileData?.role === "Employer" && <>
              <Route path='/post-new-job' element={<AuthenticationRoute><PostNewJob /></AuthenticationRoute>} />
            </>}
            <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} />
            <Route path='/register' element={<AuthRoute><Register /></AuthRoute>} />
            <Route path='/create-application' element={<AuthenticationRoute><Application /></AuthenticationRoute>} />
          </Routes>
        </WebRoutesContainer>
      </Box>
    </CommonLayoutContainer>

  )
}

export default WebRoutes
const WebRoutesContainer = styled(Box)({
  padding: "20px",
  backgroundColor: "#fff",
  width: "100%",
  borderRadius: "10px",
  height: "86vh",
  overflow: "scroll",

})
const CommonLayoutContainer = styled(Box)({
  "& .layoutBottom": {
    height: "91vh",
    marginTop: "63px",
    display: "flex",
    gap: "20px",
    backgroundColor: "#eee",
    overflow: "scroll",
    padding: "20px",

    '@media (max-width: 576px)': {
      flexDirection: "column",
      height: "auto",
    },
  },
  "& .layoutBottomshow": {
    height: "91vh",
    display: "flex",
    gap: "20px",
    backgroundColor: "#eee",
    overflow: "scroll",
    padding: "20px",
  },
})