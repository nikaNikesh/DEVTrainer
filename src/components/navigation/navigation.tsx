import React, {ReactElement, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {closeBurgerMenu} from "../../store/slices/burgerMenuSlice";
import {openModal} from "../../store/slices/modalWindowSlice";

import styles from './Navigation.module.scss';

const Navigation = (): ReactElement => {

    const isVisible = useAppSelector((state) => state.burgerMenu.isVisible);
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(closeBurgerMenu());
    }, [dispatch, location]);

    return (
        <div className={`${styles.sidebarNavContainer} ${!isVisible ? styles.hidden : ''}`}>
            <nav className={styles.nav}>
                <ul className={styles.siteNavList}>
                    <li className={styles.siteNavItem}>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className={isAuth ? styles.siteNavItem : styles.hidden}>
                        <Link to={"tasks/"}>Tasks</Link>
                    </li>
                    {isAuth ? (
                        <li
                            className={styles.siteNavItem}>
                            <button
                                className={styles.button}
                                onClick={() => {
                                    dispatch(openModal())
                                }}>
                                Log out
                            </button>
                        </li>
                    ) : (
                        <li className={styles.siteNavItem}>
                            <Link to={"auth/"}>Log in</Link>
                        </li>)
                    }
                    <li className={isAuth ? styles.hidden : styles.siteNavItem}>
                        <Link to={"register/"}>Sign up</Link>
                    </li>
                </ul>
            </nav>
        </div>

    );
}

export default Navigation;