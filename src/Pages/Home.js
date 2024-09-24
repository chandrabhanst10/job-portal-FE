import { Box, Chip, Grid, IconButton, MenuItem, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import WorkIcon from '../Assets/work.png';
import savedjobs from '../Assets/savedjobs.png';
import More from '../Assets/more.png';
import { Joblist } from '../Utils/Config.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {userProfileData}=useSelector((state)=>state.user)
  const {allJobs}=useSelector((state)=>state.job)
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate()
  const viewAppliedJob = (jobId) => {
    navigate(`/applied-jobs-details/${jobId}`)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <HomeContainer>
      <Typography variant='h5'>Hello, {userProfileData?.name}</Typography>
      <Typography variant='subtitle1' color='gray' marginTop={"5px"} marginBottom={"10px"}>Here is your daily activities and applications</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardContainer>
            <TextContainer>
              <Typography variant="h4" component="div" fontWeight="bold">
                {allJobs.length}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Open Jobs
              </Typography>
            </TextContainer>
            <IconContainer>
              <img src={WorkIcon} style={{ color: '#1976d2', fontSize: 32 }} alt='open' />
            </IconContainer>
          </CardContainer>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardContainer2>
            <TextContainer>
              <Typography variant="h4" component="div" fontWeight="bold">
                {userProfileData?.savedJobs.length}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Saved Jobs
              </Typography>
            </TextContainer>
            <IconContainer>
              <img src={savedjobs} style={{ color: '#1976d2', fontSize: 32 }} alt='saved jobs' />
            </IconContainer>
          </CardContainer2>
        </Grid>
      </Grid>
      <Typography variant='h6' sx={{ marginTop: "20px", marginBottom: "20px" }}>Recently Applied jobs</Typography>
      <TableContainer component={Paper} >
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">S.No</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Company Name</TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left">Job Type</TableCell>
              <TableCell align="left">Salary</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Joblist.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.companyName}</TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left"><Chip label={row.jobType} variant='outlined' /></TableCell>
                <TableCell align="left">{row.salary}</TableCell>
                <TableCell align="left">
                  <IconButton onClick={handleClick}>
                    <img src={More} alt='more' />
                  </IconButton>
                  <PopoverContainer
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem sx={{ p: 2 }} onClick={()=>viewAppliedJob(row.id)}>View</MenuItem>
                  </PopoverContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </HomeContainer>
  )
}

export default Home
const HomeContainer = styled(Box)({})

const CardContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: "10px 20px",
  backgroundColor: '#E9F0F9', // light blue background
  borderRadius: '8px',
  width: '100%',
});

const CardContainer2 = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: "10px 20px",
  backgroundColor: '#ffe7ba', // light blue background
  borderRadius: '8px',
  width: '100%',
});

const TextContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const IconContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50px',
  height: '50px',
  backgroundColor: '#fff',
  borderRadius: '8px',
}));

const PopoverContainer = styled(Popover)({
  "& .css-uywun8-MuiPaper-root-MuiPopover-paper": {
    boxShadow: "0px 0px 1px 1px #e4dfdf "
  }
})