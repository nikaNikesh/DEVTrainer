import styles from './SearchIcon.module.scss';
import React from "react";

type SearchInputProps = {
    handleSearchUpdate: () => void;
};

const SearchIcon: React.FC<SearchInputProps> = ({handleSearchUpdate}) => {
    return (
        <button
            onClick={() => handleSearchUpdate()}
            className={styles.searchButton}>
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
            </svg>
        </button>
    )
}
export default SearchIcon;

