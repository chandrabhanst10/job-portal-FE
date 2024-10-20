import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Authentication, GetUserProfile, LoginUser } from '../Store/Slices/UserSlice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { GetAllJobs } from '../Store/Slices/JobSlice';

const Login = () => {
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const Navigate = useNavigate()
    const dispatch =useDispatch()
    const {loading} = useSelector(state=>state.user)

    const emailChange = (event) => {
        setEmail(event.target.value)
    }
    const passwordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleRoleChange = (event) => {
        setRole(event.target.value)
        setEmail("")
        setPassword("")
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            password: password,
            role: role
        }
        dispatch(LoginUser(payload)).then((response) => {
            if (!response.error) {
                dispatch(GetAllJobs());
                dispatch(GetUserProfile());
                dispatch(Authentication());
                Navigate("/");
            }
        }).catch(() => {
            Navigate("/login");
        });
    }
    return (
        <LoginContainer onSubmit={onSubmit}>
            <Typography variant='h4' align='center'>Login</Typography>
            <FormControl fullWidth>
                <InputLabel>Select Role</InputLabel>
                <Select
                    value={role}
                    onChange={handleRoleChange}
                    IconComponent={KeyboardArrowDownIcon}
                >
                    <MenuItem value={"Job Seeker"}>
                        Job Seeker
                    </MenuItem>
                    <MenuItem value={"Employer"}>
                        Employer
                    </MenuItem>

                </Select>
            </FormControl>
            <InputLabel>Email</InputLabel>
            <TextField fullWidth placeholder='Enter email' value={email} onChange={emailChange} />
            <InputLabel>Password</InputLabel>
            <TextField fullWidth placeholder='Enter password' value={password} onChange={passwordChange} />
            <Button variant='contained' fullWidth type='submit' endIcon={loading && <CircularProgress color="inherit" />}>Login</Button>
        </LoginContainer>
    )
}

export default Login
const LoginContainer = styled('form')({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "10px"
})