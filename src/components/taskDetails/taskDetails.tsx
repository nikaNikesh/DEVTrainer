import React, {ReactElement, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Codemirror from "../codemirror";

import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {tasksSelectors} from "../../store/slices/tasksDataSlice";
import {clearTaskDetailsError} from "../../store/slices/taskDetailsSlice/taskDetailsSlice";
import {clearSolutionError} from "../../store/slices/solutionResponseSlice/solutionResponseSlice";
import {clearIsSent} from "../../store/slices/solutionResponseSlice/solutionResponseSlice";
import getTaskById from "../../service/taskService";
import {ERROR_MESSAGES} from "../../constants/errorMessages";
import sendService from "../../service/sendService";
import LanguageFilter from "../filters/languageFilter";

import styles from "./TaskDetails.module.scss";

const TaskDetails = (): ReactElement => {

    const {taskId} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const url: string = 'https://localhost:8443/api/v1/tasks';
    const idForTask: number = Number(taskId);
    const taskFromAdapter = useAppSelector((state) => tasksSelectors.selectById(state, idForTask));
    const taskFromServer = useAppSelector((state) => state.taskDetails.task);
    const isSent = useAppSelector((state) => state.serverResponse.isSent);
    const task = taskFromAdapter || taskFromServer;
    const error = useAppSelector((state) => state.taskDetails.error);
    const solutionError = useAppSelector((state) => state.taskDetails.error);

    useEffect(() => {
        if (
            taskId &&
            !Number.isNaN(idForTask) &&
            !taskFromAdapter) {
            dispatch(getTaskById(idForTask));
        }
    }, [taskId, idForTask, taskFromAdapter, dispatch]);

    useEffect(() => {
        if (error === ERROR_MESSAGES.UNAUTHORIZED) {
            navigate('/auth', {replace: true});

            dispatch(clearTaskDetailsError());

            return;
        }

        if (error) {
            navigate('/error', {
                state: {
                    errorMessage: error,
                },
            });

            dispatch(clearTaskDetailsError());
        }
    }, [error, navigate, dispatch]);

    useEffect(() => {
        if (!solutionError) {
            return;
        }

        if (solutionError === ERROR_MESSAGES.UNAUTHORIZED) {
            navigate("/auth", { replace: true });
        } else {
            navigate("/error", {
                state: {
                    errorMessage: solutionError,
                },
            });
        }

        dispatch(clearSolutionError());
    }, [solutionError, navigate, dispatch]);

    useEffect(() => {
        dispatch(clearIsSent());
    }, [taskId, dispatch]);

    const text: string[] = task ? task.descriptionOfTask
        .replace(/\\n/g, '\n')
        .split('\n') : [];


    return (
        <main className={styles.main}>
            <section className={styles.taskDetailsSection}>
                <h2 className={styles.taskDetailsTitle}>{task?.title}</h2>
                <div className={styles.taskDetailsContainer}>
                    {text.map((paragraph, index) => (
                        <p key={index} className={styles.condition}>{paragraph}</p>
                    ))}
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
                    {isSent && (
                        <span className={styles.successMessage}>
                            the task solution successfully submitted
                        </span>
                    )}
                    <button
                        className={styles.button}
                        onClick={() => {
                            const tasksSolutionState = localStorage.getItem(taskId!);

                            if (
                                taskId &&
                                !Number.isNaN(idForTask) &&
                                tasksSolutionState
                            ) {
                                dispatch(
                                    sendService({
                                        url,
                                        taskId: taskId,
                                        solution: tasksSolutionState,
                                    })
                                );
                            }
                        }}
                    >
                        submit
                    </button>
                </div>
            </section>
        </main>
    );
};

export default TaskDetails;