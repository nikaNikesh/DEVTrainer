import React, {ReactElement, useState, useEffect} from "react";
import getTasks from "../../service/service";
import './task.scss';


interface Task {
    tittle: number,
    taskDifficultyLevel: number,
    numberOfSolutions: number
}

const Task = (): ReactElement => {
    const [dataTask, setDataTask] = useState<Task[]>([]);
    useEffect(() => {

        getTasks<Task[]>('http://192.168.3.13:8084/api/v1/tasks', 0)
            .then((data) => {
                console.log(data);
                setDataTask(data);
            });


    }, []);

    let serialNumber: number = 1;

    return (

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
            {dataTask.map((task, index) => {
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

    );
}

export default Task;

