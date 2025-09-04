import React, {ReactElement} from "react";
import {useRef} from 'react';
import {Link} from "react-router-dom";
import styles from "./Home.module.scss";
import HandshakeIcon from "@mui/icons-material/Handshake";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DevicesIcon from "@mui/icons-material/Devices";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";


const Home = (): ReactElement => {
    const startButtonRef = useRef<HTMLAnchorElement>(null);
    const handleScrollToStart = () => {
        if (startButtonRef.current) {
            startButtonRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <h1 className={styles.header}>Do you want</h1>
                <button className={styles.itemContainer}
                        onClick={() => handleScrollToStart()}>
                    <WorkIcon className={styles.icon}/>
                    <span className={styles.span}>to stay in demand?</span>
                </button>
                <button className={styles.itemContainer}
                         onClick={() => handleScrollToStart()}>
                    <PsychologyIcon className={styles.icon}/>
                    <span className={styles.span}>to improve your skills?</span>
                </button>
                <button className={styles.itemContainer}
                         onClick={() => handleScrollToStart()}>
                    <DevicesIcon className={styles.icon}/>
                    <span className={styles.span}>to study online now?</span>
                </button>
                <button className={styles.itemContainer}
                         onClick={() => handleScrollToStart()}>
                    <HandshakeIcon className={styles.icon}/>
                    <span className={styles.span}>to prepare for interviews?</span>
                </button>
                <button className={styles.itemContainer}
                         onClick={() => handleScrollToStart()}>
                    <TrendingUpIcon className={styles.icon}/>
                    <span className={styles.span}>to improve your qualifications?</span>
                </button>
            </section>
            <div className={styles.buttonContainer}>
                <Link to="/register/" className={styles.startButton} ref={startButtonRef}>
                    start now
                    <span></span>
                </Link>
            </div>
        </main>
    );
}
export default Home;