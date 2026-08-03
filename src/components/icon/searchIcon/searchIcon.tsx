import React from "react";

import styles from './SearchIcon.module.scss';

interface SearchInputProps {
    hasCross: boolean;
    onSearch: () => void;
    onClear: () => void;
}

const SearchIcon: React.FC<SearchInputProps> = ({ onSearch, hasCross, onClear}) => {
    return (
        <button
            onClick={hasCross ? onClear : onSearch}
            className={styles.searchButton}>
            {hasCross ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="1.5em"
                    height="1.5em"
                    className={styles.searchIcon}
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
                    />
                </svg>
            ) : (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                focusable="false"
                width="1.5em"
                height="1.5em"
                className={styles.searchIcon}>
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M11 4.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 1.3a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4Zm6.24 9.69 3.19 3.2a.65.65 0 1 1-.92.92l-3.2-3.19a.65.65 0 0 1 .93-.93Z"
                />
            </svg> )
            }
        </button>
    )
}
export default SearchIcon;

