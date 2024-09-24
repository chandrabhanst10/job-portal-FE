import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { jobNicheOptions, Qualifications } from "../Utils/Config";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axiosInstance from "../Utils/AxiosConfig.js"
import { toast } from "react-toastify"
import CircularProgress from '@mui/material/CircularProgress';
const PostNewJob = () => {
    const [title, setTitle] = useState("")
    const [jobType, setJobType] = useState("")
    const [location, setLocation] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [introduction, setIntroduction] = useState("")
    const [responsibilities, setResponsibilities] = useState("")
    const [qualifications, setQualifications] = useState("")
    const [offers, setOffers] = useState("")
    const [salary, setSalary] = useState("")
    const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("")
    const [newsLatter, setSetNewLatter] = useState(false);
    const [nicheList, setNicheList] = useState([]);
    const [niche, setNiche] = useState("");
    const [qualificationList, setQualificationList] = useState([]);
    const [submitBtn, setsubmitBtn] = useState(false);
    // Error states
    const [titleError, setTitleError] = useState("");
    const [jobTypeError, setJobTypeError] = useState("");
    const [nicheError, setNicheError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [companyNameError, setCompanyNameError] = useState("");
    const [introductionError, setIntroductionError] = useState("");
    const [responsibilitiesError, setResponsibilitiesError] = useState("");
    const [qualificationsError, setQualificationsError] = useState("");
    const [offersError, setOffersError] = useState("");
    const [salaryError, setSalaryError] = useState("");
    const [hiringMultipleCandidatesError, setHiringMultipleCandidatesError] = useState("");
    const [jobPostedOnError, setJobPostedOnError] = useState("");
    useEffect(() => {
        setNicheList(jobNicheOptions)
        setQualificationList(Qualifications)
    }, [nicheList])
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleJobTypeChange = (e) => setJobType(e.target.value);
    const handleNicheChange = (e) => setNiche(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);
    const handleCompanyNameChange = (e) => setCompanyName(e.target.value);
    const handleIntroductionChange = (e) => setIntroduction(e.target.value);
    const handleResponsibilitiesChange = (e) => setResponsibilities(e.target.value);
    const handleQualificationsChange = (e) => setQualifications(e.target.value);
    const handleOffersChange = (e) => setOffers(e.target.value);
    const handleSalaryChange = (e) => setSalary(e.target.value);
    const handleHiringMultipleCandidatesChange = (e) => setHiringMultipleCandidates(e.target.value);
    const handleNewsLatter = (e) => setSetNewLatter(e.target.value);
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'title':
                if (!value) {
                    setTitleError("Title is required");
                } else {
                    setTitleError("");
                }
                break;
            case 'jobType':
                if (!value) {
                    setJobTypeError("Job Type is required");
                } else {
                    setJobTypeError("");
                }
                break;
            case 'niche':
                if (!value) {
                    setNicheError("Job Niche is required");
                } else {
                    setNicheError("");
                }
                break;
            case 'location':
                if (!value) {
                    setLocationError("Location is required");
                } else {
                    setLocationError("");
                }
                break;
            case 'companyName':
                if (!value) {
                    setCompanyNameError("Company Name is required");
                } else {
                    setCompanyNameError("");
                }
                break;
            case 'introduction':
                if (!value) {
                    setIntroductionError("Introduction is required");
                } else {
                    setIntroductionError("");
                }
                break;
            case 'responsibilities':
                if (!value) {
                    setResponsibilitiesError("Responsibilities are required");
                } else {
                    setResponsibilitiesError("");
                }
                break;
            case 'qualifications':
                if (!value) {
                    setQualificationsError("Qualifications are required");
                } else {
                    setQualificationsError("");
                }
                break;
            case 'offers':
                if (!value) {
                    setOffersError("Offers information is required");
                } else {
                    setOffersError("");
                }
                break;
            case 'salary':
                if (!value) {
                    setSalaryError("Salary is required");
                } else {
                    setSalaryError("");
                }
                break;
            case 'hiringMultipleCandidates':
                if (!value) {
                    setHiringMultipleCandidatesError("Hiring Multiple Candidates information is required");
                } else {
                    setHiringMultipleCandidatesError("");
                }
                break;
            case 'jobPostedOn':
                if (!value) {
                    setJobPostedOnError("Job Posted On date is required");
                } else {
                    setJobPostedOnError("");
                }
                break;
            default:
                break;
        }
    };
    const handlePostNewJob = () => {
        validateField('title', title);
        validateField('jobType', jobType);
        validateField('location', location);
        validateField('companyName', companyName);
        validateField('introduction', introduction);
        validateField('responsibilities', responsibilities);
        validateField('qualifications', qualifications);
        validateField('offers', offers);
        validateField('salary', salary);
        validateField('hiringMultipleCandidates', hiringMultipleCandidates);
        validateField('niche', niche);
        // Check if there are no errors before proceeding with submission
        if (
            !titleError && !jobTypeError && !locationError && !companyNameError &&
            !introductionError && !responsibilitiesError && !qualificationsError &&
            !offersError && !salaryError && !hiringMultipleCandidatesError  && !jobPostedOnError
        ) {
            // Submit form data
            setsubmitBtn(true)
            let payload = {
                title: title,
                jobType: jobType,
                location: location,
                companyName: companyName,
                introduction: introduction,
                responsibilities: responsibilities,
                qualifications: qualifications,
                offers: offers,
                salary: salary,
                hiringMultipleCandidates: hiringMultipleCandidates,
                jobNiche: niche,
                newsLettersSent: newsLatter,
            }
            axiosInstance.post("/api/jobs/post-job", payload).then((response) => {
                setsubmitBtn(false)
                setTitle("")
                setJobType("")
                setLocation("")
                setCompanyName("")
                setIntroduction("")
                setResponsibilities("")
                setQualifications("")
                setOffers("")
                setSalary("")
                setHiringMultipleCandidates("")
                setSetNewLatter(false);
                setNiche("");
                if (response.data.success) {
                    toast.success(response.data.message)
                }
            }).catch((error) => {
                setsubmitBtn(false)
                toast.error(error.message)
            })
        }

    }
    return <PostNewJobContainer>
        <Typography variant="h5">Post New Job</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Job Title</InputLabel>
                <TextField fullWidth value={title} onChange={handleTitleChange} error={titleError ? true : false} helperText={titleError} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel id="niche-select-label">Job Type</InputLabel>
                <FormControl fullWidth error={jobTypeError ? true : false}>
                    <Select
                        labelId="niche-select-label"
                        value={jobType}
                        onChange={handleJobTypeChange}
                        fullWidth
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        <MenuItem value={"Full-time"}>Full-time</MenuItem>
                        <MenuItem value={"Part-time"}>Part-time</MenuItem>
                        <MenuItem value={"Internship"}>Internship</MenuItem>
                    </Select>
                    <FormHelperText>{jobTypeError}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <InputLabel id="niche-select-label">Job Niche</InputLabel>
                <FormControl fullWidth error={nicheError ? true : false}>
                    <Select
                        labelId="niche-select-label"
                        value={niche}
                        onChange={handleNicheChange}
                        fullWidth
                        IconComponent={KeyboardArrowDownIcon}


                    >
                        {nicheList.map((niche) => {
                            return <MenuItem value={niche.label} key={niche.label}>{niche.label}</MenuItem>
                        })}

                    </Select>
                    <FormHelperText>{nicheError}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Job Location</InputLabel>
                <TextField fullWidth value={location} onChange={handleLocationChange} error={locationError ? true : false} helperText={locationError} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Job Company Name</InputLabel>
                <TextField fullWidth value={companyName} onChange={handleCompanyNameChange} error={companyNameError ? true : false} helperText={companyNameError} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Introduction</InputLabel>
                <textarea className="textarea" value={introduction} onChange={handleIntroductionChange} error={introductionError ? true : false} helperText={introductionError} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Responsibilities</InputLabel>
                <textarea className="textarea" value={responsibilities} onChange={handleResponsibilitiesChange} error={responsibilitiesError ? true : false} helperText={responsibilitiesError} />

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel id="niche-select-label">Qualifications</InputLabel>
                <FormControl fullWidth error={qualificationsError ? true : false} >
                    <Select
                        labelId="niche-select-label"
                        value={qualifications}
                        onChange={handleQualificationsChange}
                        fullWidth
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        {qualificationList.map((qualification) => {
                            return <MenuItem value={qualification.qualification} key={qualification.id}>{qualification.qualification}</MenuItem>
                        })}
                        <FormHelperText>{qualificationsError}</FormHelperText>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Offers</InputLabel>
                <TextField fullWidth value={offers} onChange={handleOffersChange} type="number" error={offersError ? true : false} helperText={offersError} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel>Salary</InputLabel>
                <TextField fullWidth value={salary} onChange={handleSalaryChange} type="number" error={salaryError ? true : false} helperText={salaryError} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel id="niche-select-label">Hiring Mutiple Candidates</InputLabel>
                <FormControl fullWidth error={hiringMultipleCandidatesError ? true : false} >
                    <Select
                        labelId="niche-select-label"
                        value={hiringMultipleCandidates}
                        onChange={handleHiringMultipleCandidatesChange}
                        fullWidth
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                    <FormHelperText>{hiringMultipleCandidatesError}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel id="niche-select-label">News Latter Notification</InputLabel>
                <FormControl fullWidth>
                    <Select
                        labelId="niche-select-label"
                        value={newsLatter}
                        onChange={handleNewsLatter}
                        fullWidth
                        IconComponent={KeyboardArrowDownIcon}

                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button fullWidth variant="outlined" onClick={handlePostNewJob} disabled={submitBtn}>Post New Job{submitBtn && <CircularProgress />}</Button>
            </Grid>
        </Grid>
    </PostNewJobContainer>
}
export default PostNewJob
const PostNewJobContainer = styled(Box)({
    "& .textarea": {
        width: "100%",
        height: "100px",
        resize: "block"
    }
})