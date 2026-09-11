import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAuthForm  } from "../../hooks/useAuthForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { clearAuthError } from "../../store/slices/authSlice";
import {ERROR_MESSAGES} from "../../constants/errorMessages";

import InputField from "../input";
import Button from "../button";

import styles from './AuthPage.module.scss';

const AuthPage: React.FC = () => {
    const {
        login,
        password,
        errorLogin,
        errorPassword,
        handleChange,
        validateLogin,
        validatePassword,
        submitForm,
        setErrorLogin,
        setErrorPassword,
    } = useAuthForm('login');

    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.auth.error);
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const loading = useAppSelector((state) => state.auth.loading);
    const navigate = useNavigate();
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const loginRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isAuth) {
            navigate('/tasks', {replace: true});
            return;
        }
        if (error && error !== ERROR_MESSAGES.UNAUTHORIZED) {
            navigate('/error', {
                state: {
                    errorMessage: error,
                }
            });
            dispatch(clearAuthError());
        }
    }, [isAuth, error, navigate, dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            passwordRef.current?.focus();
        }
    };

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Log in</h2>
                <div className={styles.inputContainer}>
                    <InputField
                        type="text"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => handleChange(e, 'login')}
                        autocomplete='email'
                        onBlur={() => validateLogin()}
                        onFocus={() => setErrorLogin("")}
                        onKeyDown={handleKeyDown}
                        error={errorLogin}
                        inputRef={loginRef}
                    />
                    {error === ERROR_MESSAGES.UNAUTHORIZED && (
                        <span>{error}</span>
                    )}

                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handleChange(e, 'password')}
                        autocomplete="current-password"
                        onBlur={() => validatePassword()}
                        onFocus={() => setErrorPassword("")}
                        error={errorPassword}
                        inputRef={passwordRef}
                    />
                </div>

                <Button
                    size={'small'}
                    type={'submit'}
                    disabled={loading}
                    loading={loading}
                >
                    Log in
                </Button>

            </form>
        </main>
    );
};

export default AuthPage;
