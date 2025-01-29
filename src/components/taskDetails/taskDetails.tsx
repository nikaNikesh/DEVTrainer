import React, {ReactElement} from "react";
import {useParams} from "react-router-dom";
import Codemirror from "../codemirror";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setSolution} from "../../store/slices/tasksSolutionSlice";
import sendService from "../../service/sendService";

import styles from "./TaskDetails.module.scss";
import {useAppSelector} from "../../hooks/useAppSelector";

const TaskDetails = (): ReactElement => {

    const {taskId} = useParams();
    const dispatch = useAppDispatch();
    const url: string = 'http://localhost:8084/api/v1/tasks';
    const tasksSolutionState = useAppSelector(state => state.tasksSolution[Number(taskId)]);

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
                            (id: number, solution: string) => {
                                dispatch(setSolution({key: id, value: solution}))
                            }
                        }
                        id={Number(taskId)}/>
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={
                            () => {
                                if (taskId) {
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