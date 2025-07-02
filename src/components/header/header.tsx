import React, {ReactElement} from 'react';
import styles from './Header.module.scss';
import BurgerMenu from "../burgerMenu";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = (): ReactElement => {
    return (
        <header className={styles.header}>
             <Link to="/" className={styles.logoContainer}>
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
