import React, { useState, useEffect } from "react";
import AuthBox from "../../shared/components/AuthBox";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
import LoginPageFooter from "./LoginPageFooter";
import { validateLoginForm } from "../../shared/utils/validators";
import { connect } from 'react-redux'
import { getActions } from "../../store/actions/authActions";
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ login }) => {
    const navigate = useNavigate();  // Replace useHistory with useNavigate

    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(validateLoginForm({ email, password }));
    }, [email, password, setIsFormValid]);

    const handleLogin = () => {
        const userDetails = {
            email,
            password,
        };
        login(userDetails, navigate);  // Pass navigate function to login action
    };

    return (
        <AuthBox>
            <LoginPageHeader />
            <LoginPageInputs
                email={email}
                setMail={setMail}
                password={password}
                setPassword={setPassword}
            />
            <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
        </AuthBox>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch)
    };
};

export default connect(null, mapActionsToProps)(LoginPage);
