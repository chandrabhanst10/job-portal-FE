import { Box, Button, List, ListItem, ListItemText, Typography, ListItemIcon } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React from 'react'
import styled from 'styled-components'

const SubscriptionCard = ({ icon, type, price, desc, features }) => {
    return (
        <SubscriptionCardContainer>
            <Box>
                <Typography className='typeText'>{icon}{type}</Typography>
                <Typography className='priceText'>{price}</Typography>
                <Typography className='decText'>{desc}</Typography>
                <List>
                    {features.map((item) => {
                        return <ListItem>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                            />
                        </ListItem>
                    })}
                </List>
            </Box>
            <Box>
                <Button fullWidth variant='contained' className='submitBtn'>Get Started Today</Button>
            </Box>
        </SubscriptionCardContainer>
    )
}

export default SubscriptionCard
const SubscriptionCardContainer = styled(Box)({
    width: "100%",
    borderRadius: "10px",
    padding: "20px",
    height: "80vh",
    border: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    '&:hover': {
        transform: "translateY(-10px)",
        boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)"
    },
    "& .typeText": {
        textAlign: "left",
        fontSize: "24px",
        display: "flex",
        justifyContent: "flex-start",
        gap:"10px",
        alignItems: "center"
    },
    "& .priceText": {
        textAlign: "center",
        fontSize: "32px",
        margin: "20px 0px",
        fontWeight: 900
    },
    "& .decText": {
        fontSize: "16px",
        margin: "30px 0px",
        fontWeight: 400,
        color: "gray"
    },
    "& .submitBtn":{
        "&:hover":{
            backgroundColor:"#EA0774"
        }
    }
})