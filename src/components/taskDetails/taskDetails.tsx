import React, {ReactElement} from "react";
import {useParams} from "react-router-dom";

import styles from "./TaskDetails.module.scss";


const TaskDetails = (): ReactElement => {

    const {taskId} = useParams();
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
    erdfghjkl
    <pre>
gghghgjhjhkjhkljhjhk

    </pre>

                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>submit</button>
                </div>
            </section>
        </main>
    );
};

export default TaskDetails;