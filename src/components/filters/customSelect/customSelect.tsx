import React, {ReactElement, useEffect, useRef, useState} from "react";

import styles from './CustomSelect.module.scss';

interface SelectProps {
    options: string[],
    selected: string,
    onChange: (optionValue: string) => void,
    className?: string;
}

const CustomSelect = ({ options, selected, onChange, className }: SelectProps): ReactElement => {
    const [isOpenOptions, setOpenOptions] = useState<boolean>(false);
    const selectContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (selectContainerRef.current && !selectContainerRef.current.contains(event.target as Node)) {
                    setOpenOptions(false);
                }
            }
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside)
            };
        },
        [])

    return (
        <div className={`${styles.selectContainer} ${className ? styles[className] : ''}`} ref={selectContainerRef}>
            <div className={`${styles.labelSelect} ${isOpenOptions ? styles.active : ''}`} onClick={() => {
                return setOpenOptions(!isOpenOptions);
            }}>
                {selected}
            </div>
            <ul className={`${styles.select} ${isOpenOptions ? '' : styles.hidden}`}>
                {options.map((nameOption) => (
                    <li className={styles.option}
                        key={nameOption}
                        onClick={() => {
                            onChange(nameOption);
                            setOpenOptions(false);
                        }}
                    >
                        {nameOption}
                    </li>)
                )}
            </ul>
        </div>
    )
}

export default CustomSelect;