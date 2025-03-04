import React, {ReactElement, useEffect, useRef, useState} from 'react';
import styles from './RegisterPage.module.scss';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import registerService from "../../service/registerService";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useNavigate} from "react-router-dom";
import {clearRegistrationError} from "../../store/slices/registerSlice";
import ErrorPage from "../errorPage";

const RegisterPage = (): ReactElement => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [errorLogin, setErrorLogin] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // format: username, domain name, domain zone
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //min 8 characters and at least 1 letter and 1 number

    const passwordRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const url: string = 'http://localhost:8084/api/v1/auth/register';
    const error = useAppSelector((state) => state.registration.error);
    const isRegistered: boolean = useAppSelector((state) => state.registration.isRegistered);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(clearRegistrationError());
        if (!emailPattern.test(login)) {
            setErrorLogin("Invalid email address");
            return;
        }

        if (!passwordPattern.test(password)) {
            setErrorPassword("Password must be at least 8 characters long, including at least 1 letter and 1 number");
            return;
        }

        dispatch(registerService({
            url: url,
            credentials: {
                username: username,
                email: login,
                password: password,
                role: 'USER'
            }
        }));
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
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
        dispatch(clearRegistrationError());
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
    const handleKeyDownToLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            loginRef.current?.focus();
        }
    };

    useEffect(() => {
        if (isRegistered) {
            navigate('/', {replace: true});
        }
    }, [isRegistered, navigate]);

    if (error && error !== "This login is already registered") {
        return <ErrorPage error={error}/>;
    }
    return (

        <div className={styles.container}>
            <form className={styles.form}
                  onSubmit={handleSubmit}>
                <h2 className={styles.title}>Регистрация</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleChangeUsername}
                    onKeyDown={handleKeyDownToLogin}
                    className={styles.input}

                />
                <input
                    ref={loginRef}
                    type="text"
                    placeholder="Login"
                    value={login}
                    onFocus={() => {
                        clearLoginError();
                        dispatch(clearRegistrationError());
                    }}
                    onChange={handleChangeLogin}
                    onBlur={validationLogin}
                    onKeyDown={handleKeyDown}
                    className={`${styles.input} ${errorLogin ? styles.errorBorder : ""}`}

                />
                {errorLogin && <span className="errorMessage">{errorLogin}</span>}
                {error === "This login is already registered" && <span>{error}</span>}
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onFocus={clearPasswordError}
                    onChange={handleChangePassword}
                    onBlur={validationPassword}
                    className={`${styles.input} ${errorPassword ? styles.errorBorder : ""}`}
                />
                {errorPassword && <span className="errorMessage">{errorPassword}</span>}
                <button
                    type="submit" className={styles.button}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;