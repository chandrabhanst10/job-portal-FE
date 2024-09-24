import { Box, Button, Grid, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
const UpdatePassword = () => {
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [showOtpField, setShowOtpField] = useState("")
    const [showPasswordField, setShowPasswordField] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const emailChange = (event) => {
        setEmail(event.target.value)
    }
    const passwordChange = (event) => {
        setPassword(event.target.value)
    }
    const confirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    }
    const otpChange = (event) => {
        setOtp(event.target.value)
    }
    const sendOtp = () => {
        setShowOtpField(!showOtpField)
    }
    const verifyOtp = () => {
        setShowPasswordField(!showPasswordField)
    }
    return <UpdatePasswordContainer>
        <Typography variant="h5" className="heading">Update Password</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <InputLabel>Email</InputLabel>
                <TextField fullWidth variant="outlined" value={email} onChange={emailChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button fullWidth variant="outlined" onClick={sendOtp}>Send OTP</Button>
            </Grid>
            {
                showOtpField &&
                <>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel>OTP</InputLabel>
                        <TextField fullWidth variant="outlined" value={otp} onChange={otpChange} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button fullWidth variant="outlined" onClick={verifyOtp}>Verify Otp</Button>
                    </Grid></>
            }
            {
                showPasswordField &&
                <>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel>Password</InputLabel>
                        <TextField fullWidth variant="outlined" value={password} onChange={passwordChange} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel>Confirm Password</InputLabel>
                        <TextField fullWidth variant="outlined" value={confirmPassword} onChange={confirmPasswordChange} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button fullWidth variant="outlined">Update Password</Button>
                    </Grid>
                </>
            }
        </Grid>
    </UpdatePasswordContainer>
}
export default UpdatePassword
const UpdatePasswordContainer = styled(Box)({

})