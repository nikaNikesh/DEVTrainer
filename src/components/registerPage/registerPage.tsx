import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import ErrorPage from '../errorPage';
import InputField from "../input";
import { useAuthForm } from '../../hooks/useAuthForm';
import styles from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
    const {
        login,
        password,
        username,
        errorLogin,
        errorPassword,
        handleChange,
        submitForm,
    } = useAuthForm('register');

    const error = useAppSelector((state) => state.registration.error);
    const isRegistered = useAppSelector((state) => state.registration.isRegistered);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isRegistered) navigate('/', { replace: true });
    }, [isRegistered, navigate]);

    if (error && error !== 'This login is already registered') {
        return <ErrorPage error={error} />;
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
                <h2 className={styles.title}>Регистрация</h2>
                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => handleChange(e, 'username')}
                />
                <InputField
                    type="text"
                    placeholder="Email"
                    value={login}
                    onChange={(e) => handleChange(e, 'login')}
                    error={errorLogin}
                />
                {error === 'This login is already registered' && <span>{error}</span>}
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handleChange(e, 'password')}
                    error={errorPassword}
                />
                <button type="submit" className={styles.button}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;