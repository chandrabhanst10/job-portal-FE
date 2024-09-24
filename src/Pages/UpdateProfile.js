import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { jobNicheOptions } from "../Utils/Config";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfileAction } from '../Store/Slices/UserSlice.js';
const UpdateProfile = () => {
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [firstNiche, setFirstNiche] = useState("")
    const [secondNiche, setSecondNiche] = useState("")
    const [thirdNiche, setThirdNiche] = useState("")
    const [resume, setResume] = useState("")
    const [coverLetter, setcoverLetter] = useState("")
    const [nicheList, setNicheList] = useState([])
    const { userProfileData } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    useEffect(() => {
        setNicheList(jobNicheOptions)
        setRole(userProfileData?.role)
        setName(userProfileData?.name)
        setEmail(userProfileData?.email)
        setPhone(userProfileData?.phone)
        setAddress(userProfileData?.address)
        setFirstNiche(userProfileData?.niches?.firstNiche)
        setSecondNiche(userProfileData?.niches?.secondNiche)
        setThirdNiche(userProfileData?.niches?.thirdNiche)
    }, [userProfileData, name, email, phone, address, firstNiche, secondNiche, thirdNiche]);
    const nameChange = (event) => {
        setName(event.target.value)
    }
    const emailChange = (event) => {
        setEmail(event.target.value)
    }
    const phoneChange = (event) => {
        setPhone(event.target.value)
    }
    const addressChange = (event) => {
        setAddress(event.target.value)
    }
    const firstNicheChange = (event) => {
        setFirstNiche(event.target.value)
        console.log(event.target.value)
        let newJobList = nicheList.filter((job) => {
            return job.label !== event.target.value
        })
        setNicheList(newJobList)

    }
    const secondNicheChange = (event) => {
        setSecondNiche(event.target.value)
        let newJobList = nicheList.filter((job) => {
            return job.label !== event.target.value
        })
        setNicheList(newJobList)
    }
    const thirdNicheChange = (event) => {
        setThirdNiche(event.target.value)
        let newJobList = nicheList.filter((job) => {
            return job.label !== event.target.value
        })
        setNicheList(newJobList)
    }
    const resumeChange = (event) => {
        setResume(event.target.files)
    }
    const coverLetterChange = (event) => {
        setcoverLetter(event.target.files)
    }
    const onSubmit = () => {
        const payload = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            firstNiche: firstNiche,
            secondNiche: secondNiche,
            thirdNiche: thirdNiche,
            coverLetter: userProfileData?.coverLetter?.name === coverLetter[0]?.name ? userProfileData?.coverLetter?.url : coverLetter[0],
            resume: userProfileData?.resume?.name === resume[0]?.name ? userProfileData?.resume?.url : resume[0],
        }
        dispatch(UpdateProfileAction(payload))
    }
    return <UpdateProfileContainer>
        <Typography variant="h5" className="heading">Edit Profile</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>First Name</InputLabel>
                <TextField fullWidth variant="outlined" value={name} onChange={nameChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Email</InputLabel>
                <TextField fullWidth variant="outlined" value={email} onChange={emailChange} slotProps={{
                    input: {
                        readOnly: true,
                    },
                }} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Address</InputLabel>
                <TextField fullWidth variant="outlined" value={address} onChange={addressChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Phone</InputLabel>
                <TextField fullWidth variant="outlined" value={phone} onChange={phoneChange} />
            </Grid>
            {role === "Job Seeker" && <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputLabel>First Niche</InputLabel>
                    <Select fullWidth IconComponent={KeyboardArrowDownIcon} value={firstNiche} onChange={firstNicheChange}>
                        {nicheList.map((niche) => (
                            <MenuItem key={niche.value} value={niche.value}>
                                {niche.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputLabel>Second Niche</InputLabel>
                    <Select fullWidth IconComponent={KeyboardArrowDownIcon} value={secondNiche} onChange={secondNicheChange}>
                        {nicheList.map((niche) => (
                            <MenuItem key={niche.value} value={niche.value}>
                                {niche.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputLabel>Third Niche</InputLabel>
                    <Select fullWidth IconComponent={KeyboardArrowDownIcon} value={thirdNiche} onChange={thirdNicheChange}>
                        {nicheList.map((niche) => (
                            <MenuItem key={niche.value} value={niche.value}>
                                {niche.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Resume</InputLabel>
                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}

                    >
                        Upload Resume
                        <input
                            type="file"
                            onChange={resumeChange}
                            multiple={false}
                            style={{ display: "none" }}
                        />
                    </Button>
                    <Typography variant='subtitle1'>{userProfileData?.resume?.name ? userProfileData.resume?.name : resume[0]?.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Cover Latter</InputLabel>
                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}

                    >
                        Upload Cover Latter
                        <input
                            type="file"
                            onChange={coverLetterChange}
                            multiple={false}
                            style={{ display: "none" }}
                        />
                    </Button>
                    <Typography variant='subtitle1'>{userProfileData?.coverLetter?.name ? userProfileData?.coverLetter?.name : coverLetter[0]?.name}</Typography>
                </Grid>
            </>}
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button fullWidth variant="contained" onClick={onSubmit}>Save</Button>
            </Grid>
        </Grid>

    </UpdateProfileContainer>
}
export default UpdateProfile
const UpdateProfileContainer = styled(Box)({
    "& .heading": {
        color: "gray"
    }
})