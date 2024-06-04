import React, {ReactElement} from "react";
import './tasks.scss';

const Tasks = (): ReactElement => {
    return (
        <main className="main-content">
            <section className="tasks-section">
                <h2>Tasks</h2>
                <div className="tasks-container">
                    <article className="task-article">
                        <h3>Task 1</h3>
                    </article>
                    <article className="task-article">
                        <h3>Task 2</h3>
                    </article>
                    <article className="task-article">
                        <h3>Task 3</h3>
                    </article>
                </div>
            </section>
        </main>

    );
}

export default Tasks;