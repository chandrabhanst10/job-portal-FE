import { Box, Button, Grid, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const Application = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [resume, setResume] = useState("")
    const [coverLatter, setCoverLatter] = useState("")
    const { userProfileData } = useSelector(state => state?.user)
    console.log(userProfileData);
    useEffect(() => {
        settingValues();
    }, [userProfileData])

    const settingValues = () => {
        setName(userProfileData?.name)
        setEmail(userProfileData?.email)
        setPhone(userProfileData?.phone)
        setAddress(userProfileData?.address)
        setResume(userProfileData?.resume)
        setCoverLatter(userProfileData?.coverLatter)
        checkingRequiredData()
    }
    const checkingRequiredData = () => {
        console.log(userProfileData?.resume?.name);
        console.log(userProfileData?.coverLatter);

        if (userProfileData?.resume?.name === "" || userProfileData?.resume?.name === undefined) {
            toast.error("Please Upload Resume to apply for any job")
        }
        if (userProfileData?.coverLatter?.name === "" || userProfileData?.coverLatter?.name === undefined) {
            toast.error("Please Upload Cover Latter to apply for any job")
        }

    }
    const phoneChange = (event) => {
        const { value } = event.target;
        if (/^\d*$/.test(value)) {
            setPhone(value);
        } else {
            event.target.value = value.replace(/[^\d]/g, '');
        }

    }
    const addressChange = (event) => {
        setAddress(event.target.value)
    }
    const resumeChange = (event) => {
        setResume(event.target.files)
    }
    const coverLatterChange = (event) => {
        setCoverLatter(event.target.files)
    }
    return (
        <ApplicationContainer>
            <Typography variant='h6'>Job Application</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField fullWidth value={name} slotProps={{ input: { readOnly: true, }, }} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField fullWidth value={email} slotProps={{ input: { readOnly: true, }, }} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField fullWidth value={phone} onChange={phoneChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField fullWidth value={address} slotProps={{ input: { readOnly: true, }, }} onChange={addressChange} />
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
                    <Typography variant='subtitle1'>{resume && resume?.name ? resume?.name : ""}</Typography>
                    <Typography variant='subtitle1'>
                        {resume && resume[0] && resume[0].name ? resume[0].name : ""}
                    </Typography>
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
                            onChange={coverLatterChange}
                            multiple={false}
                            style={{ display: "none" }}
                        />
                    </Button>
                    <Typography variant='subtitle1'>{coverLatter && coverLatter?.name ? coverLatter?.name : ""}</Typography>
                    <Typography variant='subtitle1'>
                        {coverLatter && coverLatter[0] && coverLatter[0].name ? coverLatter[0].name : ""}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button fullWidth variant='outlined'>Submit Application</Button>
                </Grid>
            </Grid>
        </ApplicationContainer>
    )
}

export default Application
const ApplicationContainer = styled(Box)({})