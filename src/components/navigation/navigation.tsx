import React, {ReactElement, useState} from "react";
import {Link} from "react-router-dom";

import styles from './Navigation.module.scss';
import {useAppSelector} from "../../hooks/useAppSelector";

interface ActiveMenu {
    hidden: true;
}

const Navigation = (): ReactElement => {

const isVisible = useAppSelector((state) => state.burgerMenu.isVisible);

    return (
        <div className={isVisible? styles.sidebarNavContainer : styles.hidden}>
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