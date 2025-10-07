import React, {ReactElement, useState, useEffect} from "react";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";

import styles from './Task.module.scss';

import getTasks from "../../service";
import {Link} from "react-router-dom";
import SortIcon from "../icon/sortIcon";
import InputField from "../input";
import SearchIcon from "../icon/searchIcon/searchIcon";
import Pagination from "../pagination/pagination";
import {tasksSelectors} from "../../store/slices/tasksDataSlice";
import DifficultyFilter from "../filters/difficultyFilter";

interface Task {
    id: number,
    title: string,
    difficulty: string,
    numberOfSolutions: number
}

type SortDirection = 'none' | 'asc' | 'desc';

interface SortItem {
    key: 'name' | 'difficulty' | 'solutions';
    direction: SortDirection;
    setter: React.Dispatch<React.SetStateAction<SortDirection>>;
}

const Task = (): ReactElement => {
    const pageSize: number = 5;
    const url: string = 'https://localhost:8443/api/v1/tasks';
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector((state) => state.tasksData.currentPage);
    const difficulty = useAppSelector((state) => state.tasksData.difficulty);
    const tasks = useAppSelector(tasksSelectors.selectAll);

    const [sortName, setSortName] = useState<'none' | 'asc' | 'desc'>('none');
    const [sortDifficulty, setSortDifficulty] = useState<'none' | 'asc' | 'desc'>('none');
    const [sortSolutions, setSortSolutions] = useState<'none' | 'asc' | 'desc'>('none');
    const [searchValue, setSearchValue] = useState<string>('');

    const searchValueRef = React.useRef<HTMLInputElement>(null);


    const sortConfig: SortItem[] = [
        {key: 'name', direction: sortName, setter: setSortName},
        {key: 'difficulty', direction: sortDifficulty, setter: setSortDifficulty},
        {key: 'solutions', direction: sortSolutions, setter: setSortSolutions}
    ];

    useEffect(() => {
        dispatch(getTasks({
            url: url,
            page: currentPage,
            size: pageSize,
            difficulty: difficulty,
            /*sort: [
                {
                    name: 'name',
                    direction: sortName
                },
                {
                    name: 'difficulty',
                    direction: sortDifficulty
                },
                {
                    name: 'solutions',
                    direction: sortSolutions
                }
            ]*/
        }));
    }, [currentPage, difficulty, sortName, sortDifficulty, sortSolutions, searchValue]);

    const handleSearchUpdate = () => {
        if (searchValueRef.current) {
            setSearchValue(searchValueRef.current.value);
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchValueRef.current) {
            setSearchValue(searchValueRef.current.value);
        }
    };

    return (
        <main className={styles.tasksMainContent}>
            <div className={styles.taskCards}>
                <div className={styles.taskCardItem}>
                    <span role="columnheader" className={`${styles.NO} ${styles.thead}`}> </span>
                    {sortConfig.map(({key, direction, setter}) => {
                        return (
                            <span key={key} role="columnheader" className={`${styles[key]} ${styles.thead}`}>
                                {key === 'name' && (
                                    <>
                                        <DifficultyFilter/>
                                        <div className={styles.inputContainer}>
                                            <InputField
                                                type='search'
                                                placeholder='Search'
                                                onKeyDown={handleKeyDown}
                                                inputRef={searchValueRef}
                                            />
                                            <SearchIcon handleSearchUpdate={handleSearchUpdate}
                                            />
                                        </div>
                                    </>
                                )
                                }
                                <SortIcon direction={direction}
                                          setter={setter}
                                />
                            </span>
                        )
                    })
                    }
                </div>

                {tasks.map((task, index) => {
                    return (
                        <div key={task.id} className={styles.taskCardItem}>
                            <span className={styles.NO}>{currentPage * pageSize + index + 1}</span>
                            <h2 className={styles.name}>
                                <Link to={`/tasks/${task.id}`} className={styles.link}>{task.title}</Link>
                            </h2>
                            <span className={styles.difficulty}>{task.difficulty}</span>
                            <span className={styles.solutions}>{task.numberOfSolutions}</span>
                        </div>
                    )
                })}
            </div>
            <Pagination/>
        </main>
    );
}

export default Task;

