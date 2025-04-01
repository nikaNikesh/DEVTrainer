import React, { useState } from 'react';
import { useAppDispatch } from "./useAppDispatch";
import authService from '../service/authService';
import registerService from '../service/registerService';
import { clearRegistrationError } from '../store/slices/registerSlice';

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,6}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[^\sА-Яа-я]{8,}$/;


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

    const validateLogin = () => {
        let isValid = true;

        if (!emailPattern.test(login)) {
            setErrorLogin('Invalid email address');
            isValid = false;
        }

        return isValid;
    };

     const validatePassword = () => {
        let isValid = true;

        if (!passwordPattern.test(password)) {
            setErrorPassword('Password must be at least 8 characters long, including at least 1 letter and 1 number');
            isValid = false;
        }

        return isValid;
    };

    const submitForm = () => {
        if (!validateLogin() || !validatePassword()) return;

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

    const clearError = (field: string) => {
        if (field === 'login') {
             setErrorLogin("");
        } else {
            setErrorPassword("");
        }
    };

    return {
        login,
        password,
        username,
        errorLogin,
        errorPassword,
        validateLogin,
        validatePassword,
        handleChange,
        submitForm,
        setErrorLogin,
        setErrorPassword,
        clearError
    };
};
