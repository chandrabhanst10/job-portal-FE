import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
import { Authentication, AuthRoute } from './Utils/Authentication.js'
import { useSelector } from 'react-redux'
import Application from './Pages/Application.js'
const WebRoutes = () => {
  const { userProfileData } = useSelector((state) => state.user);
  return (
    <CommonLayoutContainer>
      <Box>
        <Header />
      </Box>
      <Box className="layoutBottom">
        <SideBar />
        <WebRoutesContainer>
          <Routes>
            <Route path='/' element={<Authentication><Home /></Authentication>} />
            <Route path='/jobs' element={<Authentication><Jobs /></Authentication>} />
            <Route path='/jobs-details/:id' element={<Authentication><JobDetails /></Authentication>} />
            <Route path='/dashboard' element={<Authentication><Dashboard /></Authentication>} />
            <Route path='/post/application/:jobId' element={<Authentication><PostApplication /></Authentication>} />
            <Route path='/applied-jobs-details/:jobId' element={<Authentication><AppliedJobDetails /></Authentication>} />
            <Route path='/update-profile' element={<Authentication><UpdateProfile /></Authentication>} />
            <Route path='/update-password' element={<Authentication><UpdatePassword /></Authentication>} />
            {userProfileData?.role ==="Employer" && <>
            <Route path='/post-new-job' element={<Authentication><PostNewJob /></Authentication>} />
            </> }
            <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} />
            <Route path='/register' element={<AuthRoute><Register /></AuthRoute>} />
            <Route path='/create-application' element={<Authentication><Application /></Authentication>} />
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
  }
})