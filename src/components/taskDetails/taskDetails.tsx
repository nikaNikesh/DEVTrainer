import React, {ReactElement} from "react";
import {useParams} from "react-router-dom";
import Codemirror from "../codemirror";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import sendService from "../../service/sendService";

import styles from "./TaskDetails.module.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {tasksSelectors} from "../../store/slices/tasksDataSlice";
import LanguageFilter from "../filters/languageFilter";

const TaskDetails = (): ReactElement => {

    const {taskId} = useParams();
    const dispatch = useAppDispatch();
    const url: string = 'https://localhost:8443/api/v1/tasks';
    const tasksSolutionState = localStorage.getItem(taskId!);
    const idForTask: number = Number(taskId);
    const task = useAppSelector((state) => tasksSelectors.selectById(state, idForTask));
    const [condition, example] = task ? task.descriptionOfTask.split(/example:/i) : ["", ""];


    return (
        <main className={styles.main}>
            <section className={styles.taskDetailsSection}>
                <h2 className={styles.taskDetailsTitle}>{task.title}</h2>
                <div className={styles.taskDetailsContainer}>
                    <p className={condition}>{condition}</p>
                    {example && (
                        <>
                            <p className={styles.exampleTitle}>Example:</p>
                            <p className={styles.example}>{example}</p>
                        </>
                    )}
                </div>
            </section>

            <section className={styles.solutionSection}>
                <div className={styles.solutionTitleContainer}>
                    <h2 className={styles.solutionTitle}>Your solution</h2>
                    <LanguageFilter/>
                </div>
                <div className={styles.solutionContainer}>
                    <Codemirror
                        onChange={
                            (id: string, solution: string) => {
                                localStorage.setItem(id, solution);
                            }
                        }
                        id={taskId!}/>
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={
                            () => {
                                if (taskId && tasksSolutionState) {
                                    dispatch(sendService({url: url, id: taskId, solution: tasksSolutionState}));
                                }
                            }
                        }
                    >
                        submit
                    </button>
                </div>
            </section>
        </main>
    );
};

export default TaskDetails;