import { Box, IconButton } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
const PremiumHeader = ({ showHeader, handleClose, handleNavigate }) => {
  return (
    <>
      {showHeader && <PremiumContainer >
        <Box className={"headerText"} onClick={handleNavigate}>
          <div variant='h6' className={"text"}>🌟 Unlock More with Premium! 🌟</div>
        </Box>
        <IconButton onClick={handleClose}><CloseIcon className='crossIcon'/></IconButton>
      </PremiumContainer>}
    </>
  )
}

export default PremiumHeader
const PremiumContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems:"center",
  marginTop: "80px",
  padding: "0px 20px",
  backgroundColor: "#000",
  "& .headerText": {
    display: "flex",
    justifyContent: "space-between",
  },
  "& .text": {
    fontSize: "16px",
    color: "#fff",
  },
  "& .crossIcon":{
    color:"#fff"
  }
})