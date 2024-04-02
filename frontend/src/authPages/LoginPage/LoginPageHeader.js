import React from "react";
import { Typography } from "@mui/material";

const LoginPageHeader = () => {
    return <>
        <Typography variant='h4' sx={{ color: "white", fontFamily: "inherit"}}>
            Welcome Back!</Typography>
        <Typography variant="h8" sx={{ color: "#b9bbbe", fontFamily: "inherit"}}>We are happy that you are back!</Typography>
    </>
}

export default LoginPageHeader