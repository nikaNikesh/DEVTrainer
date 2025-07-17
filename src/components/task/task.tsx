import React, {ReactElement, useState, useEffect} from "react";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {nextPage, prevPage} from "../../store/slices/tasksDataSlice";

import styles from './Task.module.scss';

import getTasks from "../../service";
import CustomTasksFilter from "../customTasksFilter";
import {Link} from "react-router-dom";
import SortIcon from "../icon/sortIcon";

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
    const totalPage = useAppSelector((state) => state.tasksData.totalPage);
    const dataTasks = useAppSelector((state) => state.tasksData.dataTask);

    const [sortName, setSortName] = useState<'none' | 'asc' | 'desc'>('none');
    const [sortDifficulty, setSortDifficulty] = useState<'none' | 'asc' | 'desc'>('none');
    const [sortSolutions, setSortSolutions] = useState<'none' | 'asc' | 'desc'>('none');

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
            sort: [
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
            ]
        }));
    }, [currentPage, difficulty, sortName, sortDifficulty, sortSolutions]);

    return (
        <main className={styles.tasksMainContent}>
            <CustomTasksFilter/>
            <div className={styles.taskCards}>
                <div className={styles.taskCardItem}>
                    <span role="columnheader" className={`${styles.NO} ${styles.thead}`}> </span>
                    {sortConfig.map(({key, direction, setter}) => {
                        return (
                            <span role="columnheader" className={`${styles[key]} ${styles.thead}`}>
                                        <SortIcon direction={direction}
                                                  setter={setter}
                                        />
                                </span>
                        )
                    })
                    }
                </div>

                {dataTasks.map((task: Task, index: number) => {
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

            <div className={styles.pagination}>
                <button className={styles.arrowPrev} onClick={() => dispatch(prevPage())}
                        disabled={currentPage === 0}></button>
                <span>Page: <span className={styles.selectedPage}>{currentPage + 1}</span> of {totalPage}</span>
                <button className={styles.arrowNext} onClick={() => dispatch(nextPage())}
                        disabled={currentPage === totalPage - 1}></button>
            </div>
        </main>
    );
}

export default Task;

