import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";

import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAuthForm} from '../../hooks/useAuthForm';
import {clearRegistrationError} from "../../store/slices/registerSlice";
import {ERROR_MESSAGES} from "../../constants/errorMessages";

import Button from "../button";
import InputField from "../input";

import styles from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
    const {
        login,
        password,
        username,
        errorLogin,
        errorPassword,
        validateLogin,
        validatePassword,
        handleChange,
        submitForm,
        clearError
    } = useAuthForm('register');

    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.registration.error);
    const isRegistered = useAppSelector((state) => state.registration.isRegistered);
    const loading = useAppSelector((state) => state.registration.loading);
    const navigate = useNavigate();
    const passwordRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (isRegistered) {
            navigate('/auth', {replace: true});
            return;
        }

        if (error && error !== ERROR_MESSAGES.LOGIN_ALREADY_REGISTERED) {
            navigate('/error', {
                state: {
                    errorMessage: error,
                },
            });

            dispatch(clearRegistrationError());
        }
    }, [isRegistered, error, navigate, dispatch]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            passwordRef.current?.focus();
        }
    };
    const handleKeyDownToLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            loginRef.current?.focus();
        }
    };


    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}>
                <h2 className={styles.title}>Sign up</h2>
                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => handleChange(e, 'username')}
                    autocomplete="username"
                    onKeyDown={handleKeyDownToLogin}
                    disabled={loading}
                />
                <InputField
                    type="text"
                    placeholder="Login"
                    value={login}
                    onFocus={() => {
                        clearError('login');
                    }}
                    onChange={(e) => handleChange(e, 'login')}
                    autocomplete="email"
                    onBlur={() => validateLogin()}
                    onKeyDown={handleKeyDown}
                    error={errorLogin}
                    inputRef={loginRef}
                    disabled={loading}
                />
                {error === ERROR_MESSAGES.LOGIN_ALREADY_REGISTERED && (
                    <span>{error}</span>
                )}
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onFocus={() => {
                        clearError('password');
                    }
                    }
                    onChange={(e) => handleChange(e, 'password')}
                    autocomplete="current-password"
                    onBlur={() => validatePassword()}
                    error={errorPassword}
                    inputRef={passwordRef}
                    disabled={loading}
                />
                <div className={styles.buttonContainer}>
                    <Link to={"/auth/"}>Log in</Link>
                    <Button
                        size={'small'}
                        type={'submit'}
                        disabled={loading}
                        loading={loading}
                    >
                        Sign up
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default RegisterPage;