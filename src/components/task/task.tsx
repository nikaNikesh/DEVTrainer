import React, {ReactElement, useState, useEffect} from "react";
import getTasks from "../../service/service";
import './task.scss';


interface Task {
    tittle: string,
    taskDifficultyLevel: string,
    numberOfSolutions: number
}

interface TaskState {
    dataTask: Task[],
    currentPage: number,
    totalPage: number
}

interface isDisabled {
    isDisabledNext: boolean,
    isDisabledPrevious: boolean
}

const Task = (): ReactElement => {
    const pageSize: number = 5;
    const [state, setState] = useState<TaskState>({
        dataTask: [],
        currentPage: 0,
        totalPage: 0
    });

    const [isDisabled, setIsDisabled] = useState<isDisabled>({
        isDisabledNext: false,
        isDisabledPrevious: false
    });
    useEffect(() => {

        getTasks<TaskState>('http://192.168.3.13:8084/api/v1/tasks', state.currentPage)
            .then((data) => {
                setState((state: TaskState) => {
                    return {
                        ...state,
                        totalPage: data.totalPage,
                        dataTask: data.dataTask
                    };
                });
                const tasksPerPage = state.dataTask.length;
            })



    }, [state.currentPage]);

    let serialNumber: number = 1;

    const displayNextPage = () => {
            setState((state: TaskState) => {
                return {
                    ...state,
                    currentPage: state.currentPage + 1,
                };
            });
    }


    const displayPreviousPage = () => {
            setState((state: TaskState) => {
                return {
                    ...state,
                    currentPage: state.currentPage - 1,
                };
            });
    }
    return (
        <div>
            <table className="tasks-table">
                <caption>
                    <h2>Tasks</h2>
                </caption>
                <thead className="tasks-header">
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Difficulty</th>
                    <th>Solutions</th>
                </tr>
                </thead>
                <tbody>
                {state.dataTask.map((task: Task, index: number) => {
                    return (
                        <tr key={index}>
                            <td>{state.currentPage * pageSize + index + 1}</td>
                            <td>
                                <h3>{task.tittle}</h3>
                            </td>
                            <td>{task.taskDifficultyLevel}</td>
                            <td>{task.numberOfSolutions}</td>
                        </tr>)
                })}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={displayPreviousPage} disabled={state.currentPage === 0}>
                    Previous
                </button>
                <span>Page {state.currentPage + 1} of {state.totalPage}</span>
                <button onClick={displayNextPage} disabled={state.currentPage === state.totalPage + 1}>
                    Next
                </button>

            </div>
        </div>

    );
}

export default Task;

