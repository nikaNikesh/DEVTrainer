import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/useAppSelector';
import InputField from "../input";
import {useAuthForm} from '../../hooks/useAuthForm';
import styles from './RegisterPage.module.scss';
import {useAppDispatch} from "../../hooks/useAppDispatch";

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

    const error = useAppSelector((state) => state.registration.error);
    const isRegistered = useAppSelector((state) => state.registration.isRegistered);
    const navigate = useNavigate();
    const passwordRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (isRegistered) navigate('/', {replace: true});
    }, [isRegistered, navigate]);

    if (error && error !== 'This login is already registered') {
        navigate('/error', {
            state: {
                errorMessage: error,
            }
        });
    }

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
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}>
                <h2 className={styles.title}>Регистрация</h2>
                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => handleChange(e, 'username')}
                    onKeyDown={handleKeyDownToLogin}
                />
                <InputField
                    type="text"
                    placeholder="Login"
                    value={login}
                    onFocus={() => {
                        clearError('login');
                    }}
                    onChange={(e) => handleChange(e, 'login')}
                    onBlur={() => validateLogin()}
                    onKeyDown={handleKeyDown}
                    error={errorLogin}
                    inputRef={loginRef}
                />
                {error === 'This login is already registered' && <span>{error}</span>}
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onFocus={() => {
                        clearError('password');
                    }
                    }
                    onChange={(e) => handleChange(e, 'password')}
                    onBlur={() => validatePassword()}
                    error={errorPassword}
                    inputRef={passwordRef}
                />
                <button type="submit" className={styles.button}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;