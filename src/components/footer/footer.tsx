import React, { ReactElement } from 'react';
import styles from './Footer.module.scss';

const Footer = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <span>this is a footer</span>
    </footer>
  );
}

export default Footer;