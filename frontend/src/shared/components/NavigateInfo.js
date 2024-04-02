import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";


const NavigateText = styled('span')({
    color: '#00AFF4',
    fontWeight: 500,
    cursor: "pointer"
})

const NavigateInfo = ({ 
    text,
    navigateText,
    additionalStyles,
    navigateHandler,
}) => {
    return <Typography
        sx={{ color: '#72767d' }}
        style={additionalStyles ? additionalStyles : {}}
        variant='subtitle2'
    >
        {text}
        <NavigateText onClick={navigateHandler}>
            {navigateText}
        </NavigateText>
    </Typography>
}

export default NavigateInfo