// components/FullScreenSpinner.tsx
import React, {ReactElement} from 'react';
import styles from './FullScreenSpinner.module.scss';

const FullScreenSpinner = (): ReactElement => {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
                <p>Loading...</p>
        </div>
    );
};

export default FullScreenSpinner;