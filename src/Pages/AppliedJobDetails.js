import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetAppliedJobDetails } from '../Utils/GetJobDetails.js'
import styled from 'styled-components'
import { Box, Chip, Typography } from '@mui/material'

const AppliedJobDetails = () => {
    const params = useParams()
    const [jobDetails, setJobDetails] = useState()
    useEffect(() => {
        console.log(params.jobId);
        
        const jobDetailsItem = GetAppliedJobDetails(params.jobId)
        setJobDetails(jobDetailsItem);
    }, [jobDetails,params.jobId])
    return (
        <AppliedJobDetailsContainer>
        <Box>

            <Typography className='jobTitle' variant='h4'>{jobDetails?.title} - <Chip size='medium' label={jobDetails?.jobType} /></Typography>
            <Box className="jobDetalsBox">
                <Typography variant='subtitle1' className='label'>Company Name : </Typography>
                <Typography variant='subtitle1' className='jobValue'>{jobDetails?.companyName}</Typography>
            </Box>
            <Box className="jobDetalsBox">
                <Typography variant='subtitle1' className='label'>Location : </Typography>
                <Typography variant='subtitle1' className='jobValue'>{jobDetails?.location}</Typography>
            </Box>
            <Box className="jobDetalsBox">
                <Typography variant='subtitle1' className='label'>Salary : </Typography>
                <Typography variant='subtitle1' className='jobValue'>{jobDetails?.salary}</Typography>
            </Box>
            <Typography variant='h5' className='labelHead'>introduction</Typography>
            <Typography variant='subtitle2' color='gray' className='jobDetailText'>{jobDetails?.introduction}</Typography>
            <Typography variant='h5' className='labelHead'>Responsibilities </Typography>
            <Typography className='responsibiliteis' color='gray'>{jobDetails?.responsibilities}</Typography>
        </Box>
        </AppliedJobDetailsContainer>
    )
}

export default AppliedJobDetails

const AppliedJobDetailsContainer = styled(Box)({
    "& .jobTitle": {
        color: "gray"
    },
    "& .label":{
        color:"#a4a0a0"
    },
    "& .labelHead":{
        color:"#797575"
    },
    "& .jobDetalsBox":{
        display:"flex",
        gap:"10px"
    }
})