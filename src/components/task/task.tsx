import React, {ReactElement, useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {tasksSelectors} from "../../store/slices/tasksDataSlice";
import {ERROR_MESSAGES} from "../../constants/errorMessages";
import {clearTasksError} from "../../store/slices/tasksDataSlice";

import getTasks from "../../service";

import InputField from "../input";
import Pagination from "../pagination/pagination";
import DifficultyFilter from "../filters/difficultyFilter";

import SearchIcon from "../icon/searchIcon/searchIcon";
import SortIcon from "../icon/sortIcon";
import styles from './Task.module.scss';


type SortDirection = 'none' | 'asc' | 'desc';

interface SortItem {
    key: 'name' | 'difficulty' | 'solutions';
    direction: SortDirection;
    setter: React.Dispatch<React.SetStateAction<SortDirection>>;
}

const Task = (): ReactElement => {
    const pageSize: number = 5;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentPage = useAppSelector((state) => state.tasksData.currentPage);
    const difficulty = useAppSelector((state) => state.tasksData.difficulty);
    const error = useAppSelector((state) => state.tasksData.error);
    const tasks = useAppSelector(tasksSelectors.selectAll);

    const [sortName, setSortName] = useState<'none' | 'asc' | 'desc'>('none');
    const [sortDifficulty, setSortDifficulty] = useState<'none' | 'asc' | 'desc'>('none');
    const [sortSolutions, setSortSolutions] = useState<'none' | 'asc' | 'desc'>('none');
    const [searchValue, setSearchValue] = useState<string>('');

    const searchValueRef = React.useRef<HTMLInputElement>(null);
    const hasCross: boolean = searchValue.trim().length > 0;

    const sortConfig: SortItem[] = [
        {key: 'name', direction: sortName, setter: setSortName},
        {key: 'difficulty', direction: sortDifficulty, setter: setSortDifficulty},
        {key: 'solutions', direction: sortSolutions, setter: setSortSolutions}
    ];

    useEffect(() => {
        dispatch(getTasks({
            currentPage,
            pageSize,
            difficulty,
            searchValue,
            sortName,
            sortDifficulty,
            sortSolutions,
        }));
    }, [
        dispatch,
        currentPage,
        pageSize,
        difficulty,
        searchValue,
        sortName,
        sortDifficulty,
        sortSolutions,
    ]);

    useEffect(() => {
        if (error === ERROR_MESSAGES.UNAUTHORIZED) {
            navigate('/auth', {replace: true});

            dispatch(clearTasksError());

            return;
        }

        if (error) {
            navigate('/error', {
                state: {
                    errorMessage: error,
                },
            });

            dispatch(clearTasksError());
        }
    }, [error, navigate, dispatch]);

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

    const handleClearValue = () => {
        if (searchValueRef.current) {
            searchValueRef.current.value = '';
        }
        setSearchValue('');
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
                                            <SearchIcon hasCross={hasCross}
                                                        onSearch={handleSearchUpdate}
                                                        onClear={handleClearValue}
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

