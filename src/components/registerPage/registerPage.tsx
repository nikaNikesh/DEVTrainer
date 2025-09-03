import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/useAppSelector';
import InputField from "../input";
import {useAuthForm} from '../../hooks/useAuthForm';
import styles from './RegisterPage.module.scss';
import {Link} from "react-router-dom";
import Button from "../button";

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
                    autocomplete="current-password"
                    onBlur={() => validatePassword()}
                    error={errorPassword}
                    inputRef={passwordRef}
                />
                <div className={styles.buttonContainer}>
                    <Link to={"/auth/"}>Log in</Link>
                    <Button
                        size={'small'}
                        type={'submit'}
                    >
                        Sign up
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default RegisterPage;