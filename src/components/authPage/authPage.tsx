import React, {ReactElement, useRef, useState} from 'react';
import styles from './AuthPage.module.scss';

const AuthPage = (): ReactElement => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [errorLogin, setErrorLogin] = useState<string>("");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // format: username, domain name, domain zone
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //min 8 characters and at least 1 letter and 1 number

    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
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

    return (
        <div className={styles.container}>
            <form className={styles.form}
                  onSubmit={handleSubmit}>
                <h2 className={styles.title}>Авторизация</h2>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onFocus={clearLoginError}
                    onChange={handleChangeLogin}
                    onBlur={validationLogin}
                    onKeyDown={handleKeyDown}
                    className={`${styles.input} ${errorLogin ? styles.errorBorder : ""}`}

                />
                {errorLogin && <span className="errorMessage">{errorLogin}</span>}
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onFocus={clearPasswordError}
                    onChange={handleChangePassword}
                    onBlur={validationPassword}
                    className={`${styles.input} ${errorPassword ? styles.errorBorder : ""}`}
                />
                {errorPassword && <span className="errorMessage">{errorPassword}</span>}
                <button type="submit" className={styles.button}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default AuthPage;