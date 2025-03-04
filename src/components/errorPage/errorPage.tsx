import React, {ReactElement} from 'react';
import styles from './ErrorPage.module.scss';

interface ErrorPageProps {
  error: string;
}

const ErrorPage: React.FC<ErrorPageProps>  = ( {error}): ReactElement => {
  return (
      <div className={styles.errorContainer}>
        <h1 className={styles.title}>{error}</h1>
      </div>
  );
};

export default ErrorPage;