import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};
const Button: React.FC<ButtonProps> = ({
  children,
  size = 'medium',
  ...props
}) => {
  const buttonClass = `${styles.button}  ${styles[size]}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;