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
                console.log(data);
                setState((state: TaskState) => {
                    return {
                        ...state,
                        totalPage: data.totalPage,
                        dataTask: data.dataTask
                    };
                });
            })



    }, [state.currentPage]);

    let serialNumber: number = 1;

    const displayNextPage = () => {
        if (state.currentPage <= state.totalPage) {
            setState((state: TaskState) => {
                return {
                    ...state,
                    currentPage: state.currentPage + 1,
                };
            });
            setIsDisabled({
                ...isDisabled,
                isDisabledPrevious: false
            });
        } else {
            setIsDisabled({
                ...isDisabled,
                isDisabledNext: true
            });
        }
    }


    const displayPreviousPage = () => {
        if (state.currentPage > 0) {
            setState((state: TaskState) => {
                return {
                    ...state,
                    currentPage: state.currentPage - 1,
                };
            });
            setIsDisabled({
                ...isDisabled,
                isDisabledNext: false
            });
        }

        if (state.currentPage <= 0) {
            setIsDisabled({
                ...isDisabled,
                isDisabledPrevious: true
            });
        }
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
                    console.log(task);
                    return (
                        <tr key={index}>
                            <td>{serialNumber++}</td>
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
                <button onClick={displayPreviousPage} disabled={isDisabled.isDisabledPrevious}>
                    Previous
                </button>
                <span>Page of</span>
                <button onClick={displayNextPage} disabled={isDisabled.isDisabledNext}>
                    Next
                </button>

            </div>
        </div>

    );
}

export default Task;

