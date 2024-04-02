import React from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";


const LoginPageInputs = ({ email, setMail, password, setPassword}) => {
    return <>
    <InputWithLabel
    value={email}
    setValue={setMail}
    label="E-mail"
    type='text'
    placeholder='Enter e-mail address'
    />

<InputWithLabel
    value={password}
    setValue={setPassword}
    label="Password"
    type='password'
    placeholder='Enter your password'
    />
    </>
}

export default LoginPageInputs