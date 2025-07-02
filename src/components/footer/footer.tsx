import React, {ReactElement} from 'react';
import styles from './Footer.module.scss';
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = (): ReactElement => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <Link to="/" className={styles.logoContainer}>
                    <img src={logo} alt="company logo" className={styles.logo}/>
                    <span className={styles.name}>
                    DEVTrainer
                </span>
                </Link>
                <span className={styles.copyright}>
                    Copyright © 2025 DEVTrainer. All rights reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer;