import React, {ReactElement, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {BurgerMenuType, BurgerMenuContext} from "../contexts/burgerMenuContext";

import styles from './Navigation.module.scss';

interface ActiveMenu {
    hidden: true;
}

const Navigation = (): ReactElement => {

    const activeMenu: BurgerMenuType | undefined = useContext(BurgerMenuContext);
/*const [hiddenMenu, setActiveMenu] = useState<boolean>(true);

const toggleActiveMenu = (hiddenMenu: boolean) => {
    setActiveMenu(!hiddenMenu);
}*/
    return (
        <div className={`${styles.sidebarNavContainer} ${activeMenu?.hiddenBurgerMenu ? styles.hidden : ''}`}>
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