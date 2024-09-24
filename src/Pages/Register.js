import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { jobNicheOptions } from '../Utils/Config.js'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axiosInstance from '../Utils/AxiosConfig.js'
import CircularProgress from '@mui/material/CircularProgress';
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [firstNiche, setFirstNiche] = useState("")
    const [secondNiche, setSecondNiche] = useState("")
    const [thirdNiche, setThirdNiche] = useState("")
    const [resume, setResume] = useState("")
    const [coverLatter, setCoverLatter] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [nicheList, setNicheList] = useState([])
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate()
    useEffect(() => {
        setNicheList(jobNicheOptions)
    }, [])
    const roleChange = (event) => {
        setRole(event.target.value)
        setFirstNiche("");
        setSecondNiche("");
        setThirdNiche("");
    }
    const nameChange = (event) => {
        setName(event.target.value)
    }
    const emailChange = (event) => {
        setEmail(event.target.value)
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
    const passwordChange = (event) => {
        setPassword(event.target.value)
    }
    const resumeChange = (event) => {
        setResume(event.target.files)
    }
    const coverLatterChange = (event) => {
        setCoverLatter(event.target.files)
    }
    const onSubmit = () => {
        setLoading(true);
        const payload = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            address: address,
            role: role,
            firstNiche: firstNiche,
            secondNiche: secondNiche,
            thirdNiche: thirdNiche,
            coverLatter: coverLatter,
            resume: resume[0]
        }
        axiosInstance.post("/api/user/register", payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            if (response.data.success) {
                setLoading(false);
                toast.success(response.data.message)
                Navigate("/")
            } else {
                toast.warning(response.data.message)
            }
        }).catch((error) => {
            setLoading(false);
            console.error("Error:", error.response || error.message);
        });
    }
    return (
        <RegisterContainer>
            <Typography variant='h4' align='center'>Register</Typography>
            <InputLabel>Select Role</InputLabel>
            <Select fullWidth onChange={roleChange} value={role} IconComponent={KeyboardArrowDownIcon}>
                <MenuItem value={"Job Seeker"}>Job Seeker</MenuItem>
                <MenuItem value={"Employer"}>Employer</MenuItem>
            </Select>
            <Divider className='divider' />
            <Grid container spacing={1}>
                {role !== "" && <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel>Name</InputLabel>
                        <TextField fullWidth placeholder='Enter name' value={name} onChange={nameChange} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel>Email</InputLabel>
                        <TextField fullWidth placeholder='Enter email' value={email} onChange={emailChange} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel>Phone</InputLabel>
                        <TextField fullWidth placeholder='Enter phone' value={phone} onChange={phoneChange} type='number' />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel>Address</InputLabel>
                        <TextField fullWidth placeholder='Enter phone' value={address} onChange={addressChange} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel>Password</InputLabel>
                        <TextField fullWidth placeholder='Enter password' value={password} onChange={passwordChange} />
                    </Grid>
                </>}
                {role === "Job Seeker" && <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel id="niche-select-label">Select First Niche</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="niche-select-label"
                                value={firstNiche}
                                onChange={firstNicheChange}
                                fullWidth
                                IconComponent={KeyboardArrowDownIcon}
                            >
                                {nicheList.map((niche) => (
                                    <MenuItem key={niche.value} value={niche.value}>
                                        {niche.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel id="niche-select-label">Select Second Niche</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="niche-select-label"
                                value={secondNiche}
                                onChange={secondNicheChange}
                                fullWidth
                                IconComponent={KeyboardArrowDownIcon}

                            >
                                {nicheList.map((niche) => (
                                    <MenuItem key={niche.value} value={niche.value}>
                                        {niche.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel id="niche-select-label">Select Third Niche</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="niche-select-label"
                                value={thirdNiche}
                                onChange={thirdNicheChange}
                                fullWidth
                                IconComponent={KeyboardArrowDownIcon}

                            >
                                {nicheList.map((niche) => (
                                    <MenuItem key={niche.value} value={niche.value}>
                                        {niche.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                        <Typography variant='subtitle1'>{resume[0]?.name}</Typography>
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
                        <Typography variant='subtitle1'>{coverLatter[0]?.name}</Typography>
                    </Grid>
                </>}
            </Grid>
            <Button variant='contained' fullWidth disabled={loading} onClick={onSubmit} endIcon={loading && <CircularProgress color="inherit" />}>Register</Button>
        </RegisterContainer>
    )
}

export default Register
const RegisterContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "10px",
    "& .divider": {
        height: "1px",
        width: "100%"
    }
})