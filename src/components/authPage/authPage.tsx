import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import ErrorPage from '../errorPage';
import InputField from "../input";
import { useAuthForm } from "../../hooks/useAuthForm";
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

    const error = useAppSelector((state) => state.auth.error);
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const navigate = useNavigate();
    const passwordRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (isAuth) navigate('/', { replace: true });
    }, [isAuth, navigate]);

    if (error && error !== "Incorrect login or password") {
        return <ErrorPage error={error} />;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm();
    };

    const handleKeyDownPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitForm();
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Авторизация</h2>
                <InputField
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => handleChange(e, 'login')}
                    onBlur={() => validateLogin()}
                    onFocus={() => setErrorLogin("")}
                    error={errorLogin}
                />
                {error === "Incorrect login or password" && <span>{error}</span>}
                <InputField
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => handleChange(e, 'password')}
                    onBlur={() => validatePassword()}
                    onFocus={() => setErrorPassword("")}
                    onKeyDown={handleKeyDownPassword}
                    error={errorPassword}
                    inputRef={passwordRef}
                />
                <button type="submit" className={styles.button}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default AuthPage;
