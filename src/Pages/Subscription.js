import { Box, Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SubscriptionCard from '../Components/SubscriptionCard'

const Subscription = () => {
    const {subscriptionPlans}=useSelector((state)=>state.user)
    console.log(subscriptionPlans);
    
    return (
        <SubscriptionContainer>
            <Grid container spacing={2}>
            {subscriptionPlans.map((item)=>{return<Grid item xs={12} sm={6} md={4} lg={4}> <SubscriptionCard icon={item.icon} type={item.type} price={item.price} desc={item.desc} features ={item.features}/></Grid>})}
            </Grid>
        </SubscriptionContainer>
    )
}

export default Subscription
const SubscriptionContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px"
})