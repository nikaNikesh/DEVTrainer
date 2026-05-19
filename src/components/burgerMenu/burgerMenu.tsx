import React, { ReactElement } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toggleBurgerMenu } from "../../store/slices/burgerMenuSlice";

import styles from './BurgerMenu.module.scss';

const BurgerMenu = (): ReactElement => {
    const dispatch = useAppDispatch();
    const isVisible = useAppSelector((state) => state.burgerMenu.isVisible);
    return (
        <button className={styles.burgerButton}
                onClick={() => dispatch(toggleBurgerMenu())}>
            <span className={isVisible ? styles.active : ''}></span>
        </button>
    );
}

export default BurgerMenu;