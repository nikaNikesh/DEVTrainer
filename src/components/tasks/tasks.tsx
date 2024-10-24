import React, {ReactElement} from "react";
import Task from "../task";
import styles from './Tasks.module.scss';

const Tasks = (): ReactElement => {


    return (

        <main className={styles.tasksMainContent}>
            <section className={styles.tasksSection}>
                <Task/>
            </section>
        </main>
    );
}

export default Tasks;


