import React, {ReactElement, useState, useEffect} from "react";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {nextPage, prevPage} from "../../store/slices/tasksDataSlice";

import styles from './Task.module.scss';

import getTasks from "../../service";
import CustomTasksFilter from "../customTasksFilter";
import {Link} from "react-router-dom";


interface Task {
    id: number,
    title: string,
    difficulty: string,
    numberOfSolutions: number
}

const Task = (): ReactElement => {
    const pageSize: number = 5;
    const url: string = 'http://localhost:8084/api/v1/tasks';
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector((state) => state.tasksData.currentPage);
    const difficulty = useAppSelector((state) => state.tasksData.difficulty);
    const totalPage = useAppSelector((state) => state.tasksData.totalPage);
    const dataTasks = useAppSelector((state) => state.tasksData.dataTask);



    useEffect(() => {
                dispatch(getTasks({url: url, page: currentPage, size: pageSize, difficulty: difficulty}));
    }, [currentPage, difficulty]);

    return (
        <div>
           <CustomTasksFilter/>
            <table className={styles.tasksTable}>
                <caption>
                    <h2>Tasks</h2>
                </caption>
                <thead className={styles.tasksHeader}>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Difficulty</th>
                    <th>Solutions</th>
                </tr>
                </thead>
                <tbody>
                {dataTasks.map((task: Task, index: number) => {
                    return (
                        <tr key={index}>
                            <td>{currentPage * pageSize + index + 1}</td>
                            <td>
                                <h3>
                                    <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                                </h3>
                            </td>
                            <td>{task.difficulty}</td>
                            <td>{task.numberOfSolutions}</td>
                        </tr>)
                })}

                </tbody>
            </table>

            <div className={styles.pagination}>
                <button onClick={() => dispatch(prevPage())} disabled={currentPage === 0}>
                    Previous
                </button>
                <span>Page {currentPage + 1} of {totalPage}</span>
                <button onClick={() => dispatch(nextPage())} disabled={currentPage === totalPage - 1}>
                    Next
                </button>

            </div>

            <span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam blanditiis ea eius error eum incidunt numquam quaerat ratione tempore! Asperiores error molestias, perferendis quis quisquam temporibus vel veritatis! Alias, sunt?</span><span>Beatae consequatur consequuntur eligendi iusto minima modi mollitia nostrum recusandae totam. Accusamus alias aliquid, aut ea excepturi impedit laboriosam molestiae nihil odio officiis porro qui quisquam reiciendis repellendus reprehenderit repudiandae.</span><span>Cum est ipsa quidem quos repellat sint sunt voluptate voluptatem! Consequatur dicta dolor ducimus expedita fuga impedit libero minima molestiae porro quidem quo, rerum suscipit ullam voluptate, voluptatem voluptatibus voluptatum!</span><span>Accusantium ducimus impedit ipsum magnam nostrum provident qui quisquam. Accusamus alias animi aperiam assumenda, dicta doloremque dolores et exercitationem expedita iste mollitia numquam obcaecati pariatur quaerat quidem repellendus sunt unde?</span><span>A accusamus adipisci aperiam assumenda corporis cum doloribus ea enim error, et exercitationem, hic labore natus nemo provident quam recusandae tempore vel velit voluptatum? Adipisci expedita laudantium quas ullam veniam!</span><span>A assumenda consequatur cum dolor itaque labore laudantium nesciunt quae quisquam sit! Assumenda atque, cumque, deleniti expedita fugit ipsam nesciunt nostrum perspiciatis placeat, saepe sunt vel voluptates! Excepturi, iure placeat.</span><span>Consequuntur cum cumque cupiditate dolore doloremque eum eveniet excepturi fugit ipsum laborum magnam minima molestiae molestias nemo neque quaerat, qui quod reprehenderit, saepe sunt. Beatae cumque dolorem eum nemo veniam.</span><span>Adipisci dolor enim inventore iusto laborum, laudantium provident sequi vitae. Dignissimos non odio sit tempora vel! Culpa exercitationem, ipsa magnam minima molestias mollitia non officiis quo rem rerum ullam ut.</span><span>Aliquid animi aspernatur atque beatae cupiditate est et eveniet explicabo, hic ipsa iste laboriosam laborum, non nulla obcaecati, qui sunt tempora! Aut dolorum eaque nesciunt qui tenetur. Exercitationem reprehenderit, sapiente?</span><span>A aliquid animi assumenda, blanditiis deleniti dignissimos distinctio est facilis fuga fugit harum illo incidunt ipsam iusto magni, modi mollitia nihil numquam quae reprehenderit sed sit tempora voluptate. Qui, quis?</span><span>Doloremque eius incidunt iusto omnis quis. Accusantium commodi culpa, cupiditate deleniti dicta dignissimos dolore doloribus ea eum laboriosam necessitatibus obcaecati odio perspiciatis quasi quidem quis ut voluptate voluptatem voluptatibus voluptatum?</span><span>Animi architecto asperiores corporis deserunt dolorem ea eaque eligendi eos esse eveniet explicabo ipsa minima modi molestias nam necessitatibus nihil nostrum odit officiis quisquam, quos ratione, rem tenetur veritatis voluptas!</span><span>Assumenda, commodi distinctio dolor illo illum in necessitatibus nemo quae quisquam voluptates! Ad at eos et fugiat iure labore mollitia officia porro quis voluptatibus? Animi dicta dignissimos ipsum quidem quis.</span><span>Assumenda aut beatae enim fugiat maiores minus, numquam quidem repellat reprehenderit soluta. Alias, asperiores eum fuga illo ipsum iusto libero molestiae, nam nihil optio placeat quibusdam recusandae rerum sunt, totam.</span><span>Amet animi consequatur corporis dolor doloribus, dolorum ducimus esse facere fugit iure, laborum minima molestiae mollitia odit optio quidem reiciendis repellendus rerum sapiente vel. Aut magnam minima quibusdam! Debitis, doloribus!</span><span>Debitis deserunt enim et eveniet fuga nam numquam quas similique ullam. Amet debitis odit quo sed veniam. Beatae consectetur dolor doloremque expedita itaque laboriosam neque officia officiis, optio quisquam temporibus?</span><span>Atque doloribus excepturi fuga id illum in ipsam laborum molestias nemo nesciunt pariatur possimus quod quos ratione, sapiente sunt totam! Accusamus aut dolorem ducimus illo labore minus possimus vel vero?</span><span>Enim est fugiat ipsa ipsam laborum odio provident quidem quis velit voluptatibus. Atque nemo perspiciatis placeat tempore temporibus? Animi ea id impedit laborum natus odio omnis perferendis quibusdam rerum vel.</span><span>Ab, dolore ducimus ex explicabo id iusto magnam, maiores nihil, nostrum porro rem sed sunt voluptate! Aliquid, culpa cupiditate dignissimos est inventore, iure obcaecati, perferendis perspiciatis rem repellendus sapiente totam?</span><span>Accusantium cupiditate deserunt dolor ea eaque earum eos esse explicabo fuga, inventore iure iusto minima necessitatibus neque nostrum, perspiciatis ratione repudiandae rerum sapiente sed, temporibus velit voluptas. Obcaecati, sequi, similique?</span></span>
        </div>

    );
}

export default Task;

