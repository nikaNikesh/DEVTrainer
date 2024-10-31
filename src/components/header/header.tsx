import React, { ReactElement } from 'react';
import styles from './Header.module.scss';
import BurgerMenu from "../burgerMenu";

const Header = (): ReactElement => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>this is a header</h1>
      <BurgerMenu/>
    </header>
  );
}

export default Header;
