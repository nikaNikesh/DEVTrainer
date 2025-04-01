import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import ErrorPage from '../errorPage';
import InputField from "../input";
import { useAuthForm } from '../../hooks/useAuthForm';
import { clearRegistrationError } from "../../store/slices/registerSlice";
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
        clearError
    } = useAuthForm('register');

    const error = useAppSelector((state) => state.registration.error);
    const isRegistered = useAppSelector((state) => state.registration.isRegistered);
    const navigate = useNavigate();
    const passwordRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (isRegistered) navigate('/', { replace: true });
    }, [isRegistered, navigate]);

    if (error && error !== 'This login is already registered') {
        return <ErrorPage error={error} />;
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
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
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
                        dispatch(clearRegistrationError());
                    }}
                    onChange={handleChangeLogin}
                    onBlur={validationLogin}
                    onKeyDown={handleKeyDown}
                    inputRef={loginRef}
                />
                {error === 'This login is already registered' && <span>{error}</span>}
                <InputField
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onFocus={clearPasswordError}
                    onChange={handleChangePassword}
                    onBlur={validationPassword}
                />
                <button type="submit" className={styles.button}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;