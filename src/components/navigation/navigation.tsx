import React, {ReactElement} from "react";
import {Link} from "react-router-dom";

import styles from './Navigation.module.scss';

const Navigation = (): ReactElement => {
    return (
        <div className={styles.sidebarNavContainer}>
            <nav className={styles.nav}>
                <ul className={styles.siteNavList}>
                    <li className={styles.siteNavItem}>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className={styles.siteNavItem}>
                        <Link to={"tasks/"}>Tasks</Link>
                    </li>
                </ul>
            </nav>


        </div>

    );
}

export default Navigation;