import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Box, Button, Chip, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import LoadingComponent from '../Components/LoadingComponent.js'
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleJob, SaveJob, UnSaveJob } from '../Store/Slices/JobSlice.js'
import { GetUserProfile } from '../Store/Slices/UserSlice.js'
import { PostNewApplication } from '../Store/Slices/ApplicationSlice.js'

const JobDetails = () => {
    const Navigate = useNavigate();
    const params = useParams()
    const dispatch = useDispatch()
    const [isSaved, setIsSaved] = useState(false)
    const { userProfileData } = useSelector(state => state.user)
    const { singleJob,loading } = useSelector(state => state.job)
    useEffect(() => {
         dispatch(GetSingleJob(params.id))
        const isSavedJob = () => {
            setIsSaved(userProfileData?.savedJobs.includes(params.id))
        }
        isSavedJob()
    }, [params.id,userProfileData,dispatch])

    const saveJob = () => {
        dispatch(SaveJob(params.id))
        dispatch(GetUserProfile())
        setIsSaved(userProfileData.savedJobs.includes(params.id))
    };
    const unSaveJob = () => {
        dispatch(UnSaveJob(params.id))
        dispatch(GetUserProfile())
        setIsSaved(userProfileData.savedJobs.includes(params.id))
    };
    const sendApplication = () => {
        if (
            userProfileData?.resume?.name === "" ||
            userProfileData?.resume?.name === undefined ||
            userProfileData?.coverLetter===null ||
            userProfileData?.coverLetter?.name === "" ||
            userProfileData?.coverLetter?.name === undefined) {
            Navigate("/update-profile")
            return toast.error("Please Upload Resume and Cover Letter to apply for any job")
        }

        const payload = {
            name: userProfileData.name,
            email: userProfileData.email,
            phone: userProfileData.phone,
            address: userProfileData.address,
            resume: userProfileData.resume,
            coverLetter: userProfileData.coverLetter,
            jobId: params.id
        }
        dispatch(PostNewApplication(payload))
    }
    return (
        <JobDetailsContainer>
            <LoadingComponent loading={loading} />
            <Box>
                <Typography className='jobTitle' variant='h4'>{singleJob?.title} - <Chip size='medium' label={singleJob?.jobType} /></Typography>
                <Box className="jobDetalsBox">
                    <Typography variant='subtitle1' className='label'>Company Name : </Typography>
                    <Typography variant='subtitle1' className='jobValue'>{singleJob?.companyName}</Typography>
                </Box>
                <Box className="jobDetalsBox">
                    <Typography variant='subtitle1' className='label'>Location : </Typography>
                    <Typography variant='subtitle1' className='jobValue'>{singleJob?.location}</Typography>
                </Box>
                <Box className="jobDetalsBox">
                    <Typography variant='subtitle1' className='label'>Salary : </Typography>
                    <Typography variant='subtitle1' className='jobValue'>{singleJob?.salary}</Typography>
                </Box>
                <Typography variant='h5' className='labelHead'>introduction</Typography>
                <Typography variant='subtitle2' color='gray' className='jobDetailText'>{singleJob?.introduction}</Typography>
                <Typography variant='h5' className='labelHead'>Responsibilities </Typography>
                <Typography className='responsibiliteis' color='gray'>{singleJob?.responsibilities}</Typography>
            </Box>
            <Box className="buttonContainer">
                <Button variant='outlined' fullWidth onClick={isSaved ? unSaveJob : saveJob}>{isSaved ? "Un Save Job" : "Save Job"}</Button>
                <Button variant='contained' fullWidth onClick={sendApplication}>Apply</Button>
            </Box>
        </JobDetailsContainer>
    )
}

export default JobDetails

const JobDetailsContainer = styled(Box)({
    "& .jobTitle": {
        color: "gray"
    },
    "& .label": {
        color: "#a4a0a0"
    },
    "& .labelHead": {
        color: "#797575"
    },
    "& .jobDetalsBox": {
        display: "flex",
        gap: "10px"
    },
    "& .buttonContainer": {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: "10%",
        marginTop: "50px"
    }
})