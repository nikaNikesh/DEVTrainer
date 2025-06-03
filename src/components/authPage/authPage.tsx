import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/useAppSelector';
import InputField from "../input";
import {useAuthForm} from "../../hooks/useAuthForm";
import styles from './AuthPage.module.scss';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {clearAuthError} from "../../store/slices/authSlice";

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

    const error = useAppSelector((state) => state.auth.error);
    console.log('error:', error);

    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const navigate = useNavigate();
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const loginRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuth) {
            navigate('/', {replace: true});
        } else if (error && error !== "Incorrect login or password") {
            navigate('/error', {
                state: {
                    errorMessage: error,
                }
            });
        }
    }, [isAuth, error, navigate]);

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
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Авторизация</h2>
                    <div className={styles.inputContainer}>
                        <InputField
                            type="text"
                            placeholder="Логин"
                            value={login}
                            onChange={(e) => handleChange(e, 'login')}
                            onBlur={() => validateLogin()}
                            onFocus={() => setErrorLogin("")}
                            onKeyDown={handleKeyDown}
                            error={errorLogin}
                            inputRef={loginRef}
                        />
                        {error === "Incorrect login or password" && <span>{error}</span>}
                        <InputField
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => handleChange(e, 'password')}
                            onBlur={() => validatePassword()}
                            onFocus={() => setErrorPassword("")}
                            error={errorPassword}
                            inputRef={passwordRef}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Войти
                    </button>
                </form>
            </div>
        </main>
    );
};

export default AuthPage;
