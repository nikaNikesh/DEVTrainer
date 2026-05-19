import React, {ReactElement} from 'react';
import { Link } from "react-router-dom";

import { useAppSelector } from "../../hooks/useAppSelector";

import BurgerMenu from "../burgerMenu";

import logo from "../../assets/logo.png";
import styles from './Header.module.scss';
const Header = (): ReactElement => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    return (
        <header className={styles.header}>
            <Link to={isAuth ? "/tasks" : "/"} className={styles.logoContainer}>
                <img src={logo} alt="company logo" className={styles.logo}/>
            </Link>
            <div className={styles.content}>
                <h1 className={styles.h1}>DEVTrainer</h1>
                <BurgerMenu/>
            </div>
        </header>
    );
}

export default Header;
