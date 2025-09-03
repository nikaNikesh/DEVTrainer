import React, {ReactElement} from "react";
import {Link} from "react-router-dom";
import styles from "./Home.module.scss";
import HandshakeIcon from "@mui/icons-material/Handshake";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DevicesIcon from "@mui/icons-material/Devices";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";


const Home = (): ReactElement => {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <h1 className={styles.header}>Do you want</h1>
                <Link to="/register/" className={styles.itemContainer}>
                    <WorkIcon className={styles.icon}/>
                    <span className={styles.span}>to stay in demand?</span>
                </Link>
                <Link to="/register/" className={styles.itemContainer}>
                    <PsychologyIcon className={styles.icon}/>
                    <span className={styles.span}>to improve your skills?</span>
                </Link>
                <Link to="/register/" className={styles.itemContainer}>
                    <DevicesIcon className={styles.icon}/>
                    <span className={styles.span}>to study online now?</span>
                </Link>
                <Link to="/register/" className={styles.itemContainer}>
                    <HandshakeIcon className={styles.icon}/>
                    <span className={styles.span}>to prepare for interviews?</span>
                </Link>
                <Link to="/register/" className={styles.itemContainer}>
                    <TrendingUpIcon className={styles.icon}/>
                    <span className={styles.span}>to improve your qualifications?</span>
                </Link>
            </section>
            <div className={styles.buttonContainer}>
                <Link to="/register/" className={styles.startButton}>
                    start now
                    <span></span>
                </Link>
            </div>
        </main>
    );
}

export default Home;