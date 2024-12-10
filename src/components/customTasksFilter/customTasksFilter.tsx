import React, {ReactElement, useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {setDifficulty} from "../../store/slices/tasksDataSlice";

import styles from './CustomTasksFilter.module.scss';

const CustomTasksFilter = (): ReactElement => {
    const dataOptions: string[] = ['all', 'easy', 'medium', 'hard'];
    const [isOpenOptions, setOpenOptions] = useState<boolean>(false);
    const selectContainerRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const difficultyFilter = useAppSelector((state) => state.tasksData.difficulty);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(selectContainerRef.current && !selectContainerRef.current.contains(event.target as Node)) {
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
        <div className={styles.selectContainer} ref={selectContainerRef}>
            <div className={`${styles.labelSelect} ${isOpenOptions ? styles.active : '' }`} onClick={() => {
                return setOpenOptions(!isOpenOptions);
            }}>
                {difficultyFilter}
            </div>
            <ul className={`${styles.select} ${isOpenOptions ? '' : styles.hidden}`}>
                {dataOptions.map((nameOption) => (
                    <li className={styles.option} key={nameOption}
                        onClick={() => {
                            dispatch(setDifficulty(nameOption));
                            setOpenOptions(!isOpenOptions);
                        }}
                    >
                        {nameOption}
                    </li>)
                )}
            </ul>
        </div>
    )
}

export default CustomTasksFilter;