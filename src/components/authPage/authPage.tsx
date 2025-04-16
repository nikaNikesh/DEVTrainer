import React, {ReactElement, useRef, useState, useEffect, SyntheticEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './AuthPage.module.scss';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import authService from "../../service/authService";
import {useAppSelector} from "../../hooks/useAppSelector";
import {clearAuthError} from "../../store/slices/authSlice";
import ErrorPage from "../errorPage";

const AuthPage = (): ReactElement => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [errorLogin, setErrorLogin] = useState<string>("");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // format: username, domain name, domain zone
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //min 8 characters and at least 1 letter and 1 number

    const error = useAppSelector((state) => state.auth.error);
    const isAuth: boolean = useAppSelector((state) => state.auth.isAuth);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const url: string = 'https://localhost:8443/api/v1/auth/authenticate';

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        dispatch(clearAuthError());
    };

    const validationPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!passwordPattern.test(e.target.value)) {
            setErrorPassword("Password must be at least 8 characters long, including at least 1 letter and 1 number");
        } else {
            setErrorPassword("");
        }
    }

    const validationLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!emailPattern.test(e.target.value)) {
            setErrorLogin("Invalid email address");
        } else {
            setErrorLogin("");
        }
    }

    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
        dispatch(clearAuthError());
    };

    const clearPasswordError = () => {
        setErrorPassword("");
    };

    const clearLoginError = () => {
        setErrorLogin("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            passwordRef.current?.focus();
        }
    };

    const submitForm = () => {
        dispatch(clearAuthError());
        if (!emailPattern.test(login)) {
            setErrorLogin("Invalid email address");
            return;
        }

        if (!passwordPattern.test(password)) {
            setErrorPassword("Password must be at least 8 characters long, including at least 1 letter and 1 number");
            return;
        }

        dispatch(authService({
            url: url,
            credentials: {
                email: login,
                password: password
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitForm();
    };

    const handleKeyDownPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitForm();
        }
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/', {replace: true});
        }
    }, [isAuth, navigate]);

    if (error && error !== "Incorrect login or password") {
        return <ErrorPage error={error}/>;
    }
    return (
        <div className={styles.container}>
            <form className={styles.form}
                  onSubmit={handleSubmit}>
                <h2 className={styles.title}>Авторизация</h2>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onFocus={() => {
                        clearLoginError();
                        dispatch(clearAuthError());
                    }
                    }
                    onChange={handleChangeLogin}
                    onBlur={validationLogin}
                    onKeyDown={handleKeyDown}
                    className={`${styles.input} ${errorLogin ? styles.errorBorder : ""}`}

                />
                {errorLogin && <span className="errorMessage">{errorLogin}</span>}
                {error === "Incorrect login or password" && <span>{error}</span>}
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onFocus={() => {
                        clearPasswordError();
                        dispatch(clearAuthError());
                    }
                    }
                    onChange={handleChangePassword}
                    onBlur={validationPassword}
                    onKeyDown={handleKeyDownPassword}
                    className={`${styles.input} ${errorPassword ? styles.errorBorder : ""}`}
                />
                {errorPassword && <span className="errorMessage">{errorPassword}</span>}
                <button
                    type="submit" className={styles.button}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default AuthPage;
