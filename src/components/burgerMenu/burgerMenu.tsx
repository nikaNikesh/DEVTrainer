import React, {ReactElement} from "react";

import styles from './BurgerMenu.module.scss';


const BurgerMenu = (): ReactElement => {
 return (
    <button className={styles.burgerButton}>
        <span></span>
    </button>
 );
}

export default BurgerMenu;