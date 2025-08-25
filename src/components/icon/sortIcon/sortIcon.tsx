import React from "react";

import styles from './SortIcon.module.scss';

type SetterType = React.Dispatch<React.SetStateAction<'none' | 'asc' | 'desc'>>;

const sortIcon: React.FC<{ direction: 'none' | 'asc' | 'desc', setter: SetterType }> = ({direction, setter}) => {
    const toggleSort = (setter: React.Dispatch<React.SetStateAction<'none' | 'asc' | 'desc'>>) => {
        setter(prev => (prev === 'none' ? 'asc' : prev === 'asc' ? 'desc' : 'none'));
    };
    return (
        <button
                onClick={() => toggleSort(setter)}
                className={styles.button}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                focusable="false"
                className={styles.sortIcon}>

                {direction === 'asc' ? (
                    <path fill="currentColor"
                          fillRule="evenodd"
                          d="M6.03 12.44a.65.65 0 0 1-.21-.48c0-.16.05-.31.17-.44l5.49-6.04c.28-.31.76-.31 1.04 0l5.49 6.04c.24.27.22.68-.04.92a.65.65 0 0 1-.92-.04l-4.4-4.84v10.9c0 .35-.3.65-.65.65-.36 0-.65-.3-.65-.65V7.56l-4.4 4.84c-.24.26-.65.28-.92.04">
                    </path>
                ) : direction === 'desc' ? (
                    <path fill="currentColor"
                          fillRule="evenodd"
                          d="M5.82 11.5c0-.18.07-.35.21-.48.27-.24.68-.22.92.04l4.4 4.83V4.99c0-.35.29-.65.65-.65.35 0 .65.3.65.65v10.9l4.4-4.83a.65.65 0 0 1 .92-.04c.26.24.28.65.04.92l-5.49 6.04c-.28.31-.76.31-1.04 0l-5.49-6.04a.63.63 0 0 1-.17-.44">
                    </path>
                ) : (
                    <path fill="currentColor"
                          fillRule="evenodd"
                          d="M18.68 8.89c.14-.13.21-.3.21-.48 0-.16-.05-.31-.17-.44l-2.58-2.71a.7.7 0 0 0-1.04 0l-2.46 2.71c-.24.27-.22.68.04.92.27.24.68.23.92-.04l1.37-1.55c0 3.36.02 6.71.02 10.07 0 .36.29.65.65.65s.65-.29.65-.65l-.02-10.08 1.49 1.56c.24.26.65.28.92.04m-7.35 6.27c.14.13.21.3.21.48 0 .16-.05.31-.17.44l-2.58 2.71c-.28.31-.76.31-1.04 0l-2.46-2.71a.66.66 0 0 1 .04-.92.65.65 0 0 1 .92.04l1.37 1.55c0-3.36.02-6.71.02-10.07 0-.36.29-.65.65-.65s.65.29.65.65l-.01 10.07 1.48-1.55c.24-.26.65-.28.92-.04">
                    </path>
                )}
            </svg>
        </button>
    )
}
export default sortIcon;

