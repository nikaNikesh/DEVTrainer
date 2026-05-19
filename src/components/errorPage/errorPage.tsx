import React, { ReactElement } from 'react';
import styles from './ErrorPage.module.scss';

type Props = {
    message?: string
}

const ErrorPage = ({message}: Props): ReactElement => {

    return (
        <main className={styles.main}>
            <div className={styles.errorContainer}>
                <h1 className={styles.title}>
                    {message || "Something went wrong"}
                </h1>
            </div>
        </main>
    );
};

export default ErrorPage;