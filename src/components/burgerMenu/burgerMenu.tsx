import React, {ReactElement, useContext} from "react";
import {BurgerMenuContext, BurgerMenuType} from "../contexts/burgerMenuContext";

import styles from './BurgerMenu.module.scss';


const BurgerMenu = (): ReactElement => {
    const value: BurgerMenuType | undefined = useContext(BurgerMenuContext);
 return (
    <button className={styles.burgerButton} onClick={() => {value?.handleBurgerMenu(!value?.hiddenBurgerMenu)}}>
        <span></span>
    </button>
 );
}

export default BurgerMenu;