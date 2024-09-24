import React, { useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { cityOptions, jobNicheOptions } from '../Utils/Config.js';
import { useNavigate } from 'react-router-dom';
import JobCard from '../Components/JobCard.js';
import LoadingComponent from '../Components/LoadingComponent.js';
import { useDispatch, useSelector } from "react-redux"
import { SaveJob, UnSaveJob } from "../Store/Slices/JobSlice.js"

const Jobs = () => {
  const [city, setcity] = useState("")
  const [niche, setNiche] = useState("")
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allJobs, loading } = useSelector(state => state.job)

  const handleCityChange = (event) => {
    setcity(event.target.value);
  };
  const handleNicheChange = (event) => {
    setNiche(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const applyNow = (jobId) => {
    navigate(`/jobs-details/${jobId}`)
  };
  const saveJob = (jobId) => {
    dispatch(SaveJob(jobId))
  };
  const unSaveJob = (jobId) => { 
    dispatch(UnSaveJob(jobId))
  };
  return (
    <JobsContainer>
      <LoadingComponent loading={loading} />
      <Typography variant='h5' gutterBottom>All Jobs</Typography>
      <Box className="searchContainer">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Select Niche</InputLabel>
              <Select
                value={city}
                onChange={handleCityChange}
              >
                {cityOptions.map((city) => (
                  <MenuItem key={city.value} value={city.value}>
                    {city.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Select Niche</InputLabel>
              <Select
                value={niche}
                onChange={handleNicheChange}
              >
                {jobNicheOptions.map((niche) => (
                  <MenuItem key={niche.value} value={niche.label}>
                    {niche.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}><TextField fullWidth placeholder='Enter search text' value={search} onChange={handleSearchChange} /></Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Button variant='contained' className='searchBtn' fullWidth>Search</Button>
          </Grid>
        </Grid>
      </Box>
      <AllJobs jobList={allJobs} applyNow={applyNow} saveJob={saveJob} unSaveJob={unSaveJob} />
    </JobsContainer>
  )
}

export default Jobs

const AllJobs = ({ jobList, applyNow, saveJob, unSaveJob }) => {
  return <Box>
    <Grid container spacing={2}>
      {
        jobList.map((job, index) => {
          return <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <JobCard jobId={job._id} title={job.title} jobType={job.jobType} companyName={job.companyName} location={job.location} showJob={applyNow} saveJob={saveJob} unSaveJob={unSaveJob} />
          </Grid>
        })
      }
    </Grid>
  </Box>
}
const JobsContainer = styled(Box)({
  "& .searchContainer": {
    display: "flex",
    margin: "20px 0px",
    gap: "20px"
  },
  "& .searchBtn": {
    height: "55px"
  }
})
