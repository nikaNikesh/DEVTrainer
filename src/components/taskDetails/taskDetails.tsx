import React, {ReactElement} from "react";
import {useParams} from "react-router-dom";
import Codemirror from "../codemirror";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import sendService from "../../service/sendService";

import styles from "./TaskDetails.module.scss";

const TaskDetails = (): ReactElement => {

    const {taskId} = useParams();
    const dispatch = useAppDispatch();
    const url: string = 'http://localhost:8084/api/v1/tasks';
    const tasksSolutionState = localStorage.getItem(taskId!);

    return (
        <main className={styles.main}>
            <section className={styles.taskDetailsSection}>
                <h2>Task Name</h2>
                <div className={styles.taskDetailsContainer}>
                    <p>Task ID: {taskId}</p>
                </div>
            </section>

            <section className={styles.solutionSection}>
                <h2>Your solution</h2>
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