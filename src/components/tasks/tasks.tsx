import React, {ReactElement} from "react";
import Task from "../task/task";
import './tasks.scss';

const Tasks = (): ReactElement => {


    return (

        <main className="tasks-main-content">
            <section className="tasks-section">
                <Task/>
            </section>
        </main>
    );
}

export default Tasks;


