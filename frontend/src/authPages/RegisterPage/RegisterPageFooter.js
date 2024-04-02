import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import NavigateInfo from "../../shared/components/NavigateInfo";
import { useNavigate } from 'react-router-dom'
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
    return `Username 3-12 characters,
      Password 6-12 characters,
      e-mail should be correct`

}

const getFormValidMessage = () => {
    return 'Press to Register!'
}

const RegisterPageFooter = ({handleRegister, isFormValid}) => {
    const history = useNavigate()

    const handlePushToLoginPage = () => {
        history('/login')
    }

    return (
        <> 
        <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
        >
        <div> 
            <CustomPrimaryButton
            label='Register'
            additionalStyles={{ marginTop: '30px'}}
            disabled={!isFormValid}
            onClick={handleRegister}
            />
            
         </div>
         </Tooltip>
         <NavigateInfo
         text=''
         navigateText='Already have an account?'
         additionalStyles={{ marginTop: '5px'}}
         navigateHandler={handlePushToLoginPage}
         
         />
         </>
    )
}

export default RegisterPageFooter