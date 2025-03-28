import React, { useState } from 'react';
import { useAppDispatch } from "./useAppDispatch";
import authService from '../service/authService';
import registerService from '../service/registerService';
import { clearAuthError } from '../store/slices/authSlice';
import { clearRegistrationError } from '../store/slices/registerSlice';

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,6}$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

type AuthMode = 'login' | 'register';

export const useAuthForm = (mode: AuthMode = 'login') => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const dispatch = useAppDispatch();

    const handlers = {
    login: (value: string) => {
        setLogin(value);
        dispatch(clearRegistrationError());
    },
    password: (value: string) => setPassword(value),
    username: (value: string) => setUsername(value),
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof handlers) => {
    handlers[field](e.target.value);
};

    const validateForm = () => {
        let isValid = true;

        if (!emailPattern.test(login)) {
            setErrorLogin('Invalid email address');
            isValid = false;
        }

        if (!passwordPattern.test(password)) {
            setErrorPassword('Password must be at least 8 characters long, including at least 1 letter and 1 number');
            isValid = false;
        }

        return isValid;
    };

    const submitForm = () => {
        if (!validateForm()) return;

        if (mode === 'login') {
            dispatch(authService({
                url: '/api/v1/auth/authenticate',
                credentials: { login, password },
            }));
        } else {
            dispatch(registerService({
                url: '/api/v1/auth/register',
                credentials: { username, login, password, role: 'USER' },
            }));
        }
    };

    return {
        login,
        password,
        username,
        errorLogin,
        errorPassword,
        handleChange,
        submitForm,
        setErrorLogin,
        setErrorPassword,
    };
};
