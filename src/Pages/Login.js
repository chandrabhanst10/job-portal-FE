import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../Utils/AxiosConfig';

const Login = () => {
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const Navigate = useNavigate()
    const emailChange = (event) => {
        setEmail(event.target.value)
    }
    const passwordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }
    const onSubmit = async () => {
        const payload = {
            email: email,
            password: password,
            role: role
            
        }
        axiosInstance.post("/api/user/login", payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            toast.success(response.data.message)
            Navigate('/')
        }).catch((error) => {
            console.log(error);
            toast.error(error)
        });
    }
    return (
        <LoginContainer>
            <Typography variant='h4' align='center'>Login</Typography>
            <FormControl fullWidth>
                <InputLabel>Select Role</InputLabel>
                <Select
                    value={role}
                    onChange={handleRoleChange}
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
            <Button variant='contained' fullWidth onClick={onSubmit}>Login</Button>
        </LoginContainer>
    )
}

export default Login
const LoginContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "10px"
})