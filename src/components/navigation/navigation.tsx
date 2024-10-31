import React, {ReactElement, useState} from "react";
import {Link} from "react-router-dom";

import styles from './Navigation.module.scss';

interface ActiveMenu {
    hidden: true;
}

const Navigation = (): ReactElement => {

const [hiddenMenu, setActiveMenu] = useState<boolean>(true);

const toggleActiveMenu = (hiddenMenu: boolean) => {
    setActiveMenu(!hiddenMenu);
}
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