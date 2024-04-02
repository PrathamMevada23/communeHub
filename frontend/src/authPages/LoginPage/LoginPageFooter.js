import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import NavigateInfo from "../../shared/components/NavigateInfo";
import { useNavigate } from 'react-router-dom'
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
    return 'Enter correct e-mail and password length should be 6-12'
}

const getFormValidMessage = () => {
    return 'Press to Log in!'
}

const LoginPageFooter = ({handleLogin, isFormValid}) => {
    const history = useNavigate()

    const handlePushToRegisterPage = () => {
        history('/register')
    }

    return (
        <> 
        <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
        >
        <div> 
            <CustomPrimaryButton
            label='LogIn'
            additionalStyles={{ marginTop: '30px'}}
            disabled={!isFormValid}
            onClick={handleLogin}
            />
            
         </div>
         </Tooltip>
         <NavigateInfo
         text='Need an account? '
         navigateText='Create an account'
         additionalStyles={{ marginTop: '5px'}}
         navigateHandler={handlePushToRegisterPage}
         
         />
         </>
    )
}

export default LoginPageFooter