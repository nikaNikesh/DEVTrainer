import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
                                         children,
                                         size = 'medium',
                                         loading = false,
                                         className,
                                         ...props
                                       }) => {
  return (
      <button
          className={`${styles.button} ${styles[size]} ${className ?? ''}`}
          disabled={loading || props.disabled}
          {...props}
      >
          {loading ? (
              <>
                  Loading
                  <span className={styles.spinner} />
              </>
          ) : (
              children
          )}
      </button>
  );
};

export default Button;