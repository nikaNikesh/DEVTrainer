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
    const url: string = 'https://localhost:8443/api/v1/tasks';
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector((state) => state.tasksData.currentPage);
    const difficulty = useAppSelector((state) => state.tasksData.difficulty);
    const totalPage = useAppSelector((state) => state.tasksData.totalPage);
    const dataTasks = useAppSelector((state) => state.tasksData.dataTask);

    const [sortName, setSortName] = useState<'none' | 'asc' | 'desc'>('none');
    const [sortDifficulty, setSortDifficulty] = useState<'none' | 'asc' | 'desc'>('none');
    const [sortSolutions, setSortSolutions] = useState<'none' | 'asc' | 'desc'>('none');


    useEffect(() => {
        dispatch(getTasks({
            url: url,
            page: currentPage,
            size: pageSize,
            difficulty: difficulty,
            sort: [
                {
                    name: 'name',
                    direction: sortName
                },
                {
                    name: 'difficulty',
                    direction: sortDifficulty
                },
                {
                    name: 'solutions',
                    direction: sortSolutions
                }
            ]
        }));
    }, [currentPage, difficulty, sortName, sortDifficulty, sortSolutions]);

    const toggleSortName = () => {

        setSortName(prev => {
            switch (prev) {
                case "none":
                    return "asc";
                case "asc":
                    return "desc";
                case "desc":
                    return "none";
                default:
                    return prev;
            }
        })
    }

    const toggleSortDifficulty = () => {

        setSortDifficulty(prev => {
            switch (prev) {
                case "none":
                    return "asc";
                case "asc":
                    return "desc";
                case "desc":
                    return "none";
                default:
                    return prev;
            }
        })
    }

    const toggleSortSolutions = () => {

        setSortSolutions(prev => {
            switch (prev) {
                case "none":
                    return "asc";
                case "asc":
                    return "desc";
                case "desc":
                    return "none";
                default:
                    return prev;
            }
        })
    }


    return (

        <main className={styles.tasksMainContent}>
            <CustomTasksFilter/>
            <div className={styles.taskCards}>
                <div className={styles.taskCardItem}>
                    <span role="columnheader" className={`${styles.NO} ${styles.thead}`}>NO</span>
                    <span role="columnheader" className={`${styles.name} ${styles.thead}`}>
                        Name
                        <svg xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24"
                             focusable="false"
                             width="1.5em"
                             height="1.5em"
                             className="sc-kbdlSk cURHFe"
                             onClick={() => toggleSortName()}>

                             {sortName === 'asc' ? (
                                 <path fill="currentColor"
                                       fillRule="evenodd"
                                       d="M6.03 12.44a.65.65 0 0 1-.21-.48c0-.16.05-.31.17-.44l5.49-6.04c.28-.31.76-.31 1.04 0l5.49 6.04c.24.27.22.68-.04.92a.65.65 0 0 1-.92-.04l-4.4-4.84v10.9c0 .35-.3.65-.65.65-.36 0-.65-.3-.65-.65V7.56l-4.4 4.84c-.24.26-.65.28-.92.04">
                                 </path>
                             ) : sortName === 'desc' ? (
                                 <path
                                     fill="currentColor"
                                     d="M5.82 11.5c0-.18.07-.35.21-.48.27-.24.68-.22.92.04l4.4 4.83V4.99c0-.35.29-.65.65-.65.35 0 .65.3.65.65v10.9l4.4-4.83a.65.65 0 0 1 .92-.04c.26.24.28.65.04.92l-5.49 6.04c-.28.31-.76.31-1.04 0l-5.49-6.04a.63.63 0 0 1-.17-.44">
                                 </path>
                             ) : (
                                 <path
                                     fill="currentColor"
                                     fillRule="evenodd"
                                     d="M18.68 8.89c.14-.13.21-.3.21-.48 0-.16-.05-.31-.17-.44l-2.58-2.71a.7.7 0 0 0-1.04 0l-2.46 2.71c-.24.27-.22.68.04.92.27.24.68.23.92-.04l1.37-1.55c0 3.36.02 6.71.02 10.07 0 .36.29.65.65.65s.65-.29.65-.65l-.02-10.08 1.49 1.56c.24.26.65.28.92.04m-7.35 6.27c.14.13.21.3.21.48 0 .16-.05.31-.17.44l-2.58 2.71c-.28.31-.76.31-1.04 0l-2.46-2.71a.66.66 0 0 1 .04-.92.65.65 0 0 1 .92.04l1.37 1.55c0-3.36.02-6.71.02-10.07 0-.36.29-.65.65-.65s.65.29.65.65l-.01 10.07 1.48-1.55c.24-.26.65-.28.92-.04">
                                 </path>)}
                        </svg>
                    </span>
                    <span role="columnheader" className={`${styles.difficulty} ${styles.thead}`}>
                    Dif
                     <svg xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          focusable="false"
                          width="1.5em"
                          height="1.5em"
                          className="sc-kbdlSk cURHFe"
                          onClick={() => toggleSortDifficulty()}>

                             {sortDifficulty === 'asc' ? (
                                 <path fill="currentColor"
                                       fillRule="evenodd"
                                       d="M6.03 12.44a.65.65 0 0 1-.21-.48c0-.16.05-.31.17-.44l5.49-6.04c.28-.31.76-.31 1.04 0l5.49 6.04c.24.27.22.68-.04.92a.65.65 0 0 1-.92-.04l-4.4-4.84v10.9c0 .35-.3.65-.65.65-.36 0-.65-.3-.65-.65V7.56l-4.4 4.84c-.24.26-.65.28-.92.04">
                                 </path>
                             ) : sortDifficulty === 'desc' ? (
                                 <path
                                     fill="currentColor"
                                     d="M5.82 11.5c0-.18.07-.35.21-.48.27-.24.68-.22.92.04l4.4 4.83V4.99c0-.35.29-.65.65-.65.35 0 .65.3.65.65v10.9l4.4-4.83a.65.65 0 0 1 .92-.04c.26.24.28.65.04.92l-5.49 6.04c-.28.31-.76.31-1.04 0l-5.49-6.04a.63.63 0 0 1-.17-.44">
                                 </path>
                             ) : (
                                 <path
                                     fill="currentColor"
                                     fillRule="evenodd"
                                     d="M18.68 8.89c.14-.13.21-.3.21-.48 0-.16-.05-.31-.17-.44l-2.58-2.71a.7.7 0 0 0-1.04 0l-2.46 2.71c-.24.27-.22.68.04.92.27.24.68.23.92-.04l1.37-1.55c0 3.36.02 6.71.02 10.07 0 .36.29.65.65.65s.65-.29.65-.65l-.02-10.08 1.49 1.56c.24.26.65.28.92.04m-7.35 6.27c.14.13.21.3.21.48 0 .16-.05.31-.17.44l-2.58 2.71c-.28.31-.76.31-1.04 0l-2.46-2.71a.66.66 0 0 1 .04-.92.65.65 0 0 1 .92.04l1.37 1.55c0-3.36.02-6.71.02-10.07 0-.36.29-.65.65-.65s.65.29.65.65l-.01 10.07 1.48-1.55c.24-.26.65-.28.92-.04">
                                 </path>)}
                        </svg>
                    </span>
                    <span role="columnheader" className={`${styles.solutions} ${styles.thead}`}>
                    Sol
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         focusable="false"
                         width="1.5em"
                         height="1.5em"
                         className="sc-kbdlSk cURHFe"
                         onClick={() => toggleSortSolutions()}>

                             {sortSolutions === 'asc' ? (
                                 <path fill="currentColor"
                                       fillRule="evenodd"
                                       d="M6.03 12.44a.65.65 0 0 1-.21-.48c0-.16.05-.31.17-.44l5.49-6.04c.28-.31.76-.31 1.04 0l5.49 6.04c.24.27.22.68-.04.92a.65.65 0 0 1-.92-.04l-4.4-4.84v10.9c0 .35-.3.65-.65.65-.36 0-.65-.3-.65-.65V7.56l-4.4 4.84c-.24.26-.65.28-.92.04">
                                 </path>
                             ) : sortSolutions === 'desc' ? (
                                 <path
                                     fill="currentColor"
                                     d="M5.82 11.5c0-.18.07-.35.21-.48.27-.24.68-.22.92.04l4.4 4.83V4.99c0-.35.29-.65.65-.65.35 0 .65.3.65.65v10.9l4.4-4.83a.65.65 0 0 1 .92-.04c.26.24.28.65.04.92l-5.49 6.04c-.28.31-.76.31-1.04 0l-5.49-6.04a.63.63 0 0 1-.17-.44">
                                 </path>
                             ) : (
                                 <path
                                     fill="currentColor"
                                     fillRule="evenodd"
                                     d="M18.68 8.89c.14-.13.21-.3.21-.48 0-.16-.05-.31-.17-.44l-2.58-2.71a.7.7 0 0 0-1.04 0l-2.46 2.71c-.24.27-.22.68.04.92.27.24.68.23.92-.04l1.37-1.55c0 3.36.02 6.71.02 10.07 0 .36.29.65.65.65s.65-.29.65-.65l-.02-10.08 1.49 1.56c.24.26.65.28.92.04m-7.35 6.27c.14.13.21.3.21.48 0 .16-.05.31-.17.44l-2.58 2.71c-.28.31-.76.31-1.04 0l-2.46-2.71a.66.66 0 0 1 .04-.92.65.65 0 0 1 .92.04l1.37 1.55c0-3.36.02-6.71.02-10.07 0-.36.29-.65.65-.65s.65.29.65.65l-.01 10.07 1.48-1.55c.24-.26.65-.28.92-.04">
                                 </path>)}
                        </svg>
                    </span>
                </div>

                {dataTasks.map((task: Task, index: number) => {
                    return (
                        <div className={styles.taskCardItem}>
                            <span className={styles.NO}>{currentPage * pageSize + index + 1}</span>
                            <h2 className={styles.name}>
                                <Link to={`/tasks/${task.id}`} className={styles.link}>{task.title}</Link>
                            </h2>
                            <span className={styles.difficulty}>{task.difficulty}</span>
                            <span className={styles.solutions}>{task.numberOfSolutions}</span>
                        </div>
                    )
                })}
            </div>

            <div className={styles.pagination}>
                <button className={styles.arrowPrev} onClick={() => dispatch(prevPage())}
                        disabled={currentPage === 0}></button>
                <span>Page: <span className={styles.selectedPage}>{currentPage + 1}</span> of {totalPage}</span>
                <button className={styles.arrowNext} onClick={() => dispatch(nextPage())}
                        disabled={currentPage === totalPage - 1}></button>
            </div>

            <span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam blanditiis ea eius error eum incidunt numquam quaerat ratione tempore! Asperiores error molestias, perferendis quis quisquam temporibus vel veritatis! Alias, sunt?</span><span>Beatae consequatur consequuntur eligendi iusto minima modi mollitia nostrum recusandae totam. Accusamus alias aliquid, aut ea excepturi impedit laboriosam molestiae nihil odio officiis porro qui quisquam reiciendis repellendus reprehenderit repudiandae.</span><span>Cum est ipsa quidem quos repellat sint sunt voluptate voluptatem! Consequatur dicta dolor ducimus expedita fuga impedit libero minima molestiae porro quidem quo, rerum suscipit ullam voluptate, voluptatem voluptatibus voluptatum!</span><span>Accusantium ducimus impedit ipsum magnam nostrum provident qui quisquam. Accusamus alias animi aperiam assumenda, dicta doloremque dolores et exercitationem expedita iste mollitia numquam obcaecati pariatur quaerat quidem repellendus sunt unde?</span><span>A accusamus adipisci aperiam assumenda corporis cum doloribus ea enim error, et exercitationem, hic labore natus nemo provident quam recusandae tempore vel velit voluptatum? Adipisci expedita laudantium quas ullam veniam!</span><span>A assumenda consequatur cum dolor itaque labore laudantium nesciunt quae quisquam sit! Assumenda atque, cumque, deleniti expedita fugit ipsam nesciunt nostrum perspiciatis placeat, saepe sunt vel voluptates! Excepturi, iure placeat.</span><span>Consequuntur cum cumque cupiditate dolore doloremque eum eveniet excepturi fugit ipsum laborum magnam minima molestiae molestias nemo neque quaerat, qui quod reprehenderit, saepe sunt. Beatae cumque dolorem eum nemo veniam.</span><span>Adipisci dolor enim inventore iusto laborum, laudantium provident sequi vitae. Dignissimos non odio sit tempora vel! Culpa exercitationem, ipsa magnam minima molestias mollitia non officiis quo rem rerum ullam ut.</span><span>Aliquid animi aspernatur atque beatae cupiditate est et eveniet explicabo, hic ipsa iste laboriosam laborum, non nulla obcaecati, qui sunt tempora! Aut dolorum eaque nesciunt qui tenetur. Exercitationem reprehenderit, sapiente?</span><span>A aliquid animi assumenda, blanditiis deleniti dignissimos distinctio est facilis fuga fugit harum illo incidunt ipsam iusto magni, modi mollitia nihil numquam quae reprehenderit sed sit tempora voluptate. Qui, quis?</span><span>Doloremque eius incidunt iusto omnis quis. Accusantium commodi culpa, cupiditate deleniti dicta dignissimos dolore doloribus ea eum laboriosam necessitatibus obcaecati odio perspiciatis quasi quidem quis ut voluptate voluptatem voluptatibus voluptatum?</span><span>Animi architecto asperiores corporis deserunt dolorem ea eaque eligendi eos esse eveniet explicabo ipsa minima modi molestias nam necessitatibus nihil nostrum odit officiis quisquam, quos ratione, rem tenetur veritatis voluptas!</span><span>Assumenda, commodi distinctio dolor illo illum in necessitatibus nemo quae quisquam voluptates! Ad at eos et fugiat iure labore mollitia officia porro quis voluptatibus? Animi dicta dignissimos ipsum quidem quis.</span><span>Assumenda aut beatae enim fugiat maiores minus, numquam quidem repellat reprehenderit soluta. Alias, asperiores eum fuga illo ipsum iusto libero molestiae, nam nihil optio placeat quibusdam recusandae rerum sunt, totam.</span><span>Amet animi consequatur corporis dolor doloribus, dolorum ducimus esse facere fugit iure, laborum minima molestiae mollitia odit optio quidem reiciendis repellendus rerum sapiente vel. Aut magnam minima quibusdam! Debitis, doloribus!</span><span>Debitis deserunt enim et eveniet fuga nam numquam quas similique ullam. Amet debitis odit quo sed veniam. Beatae consectetur dolor doloremque expedita itaque laboriosam neque officia officiis, optio quisquam temporibus?</span><span>Atque doloribus excepturi fuga id illum in ipsam laborum molestias nemo nesciunt pariatur possimus quod quos ratione, sapiente sunt totam! Accusamus aut dolorem ducimus illo labore minus possimus vel vero?</span><span>Enim est fugiat ipsa ipsam laborum odio provident quidem quis velit voluptatibus. Atque nemo perspiciatis placeat tempore temporibus? Animi ea id impedit laborum natus odio omnis perferendis quibusdam rerum vel.</span><span>Ab, dolore ducimus ex explicabo id iusto magnam, maiores nihil, nostrum porro rem sed sunt voluptate! Aliquid, culpa cupiditate dignissimos est inventore, iure obcaecati, perferendis perspiciatis rem repellendus sapiente totam?</span><span>Accusantium cupiditate deserunt dolor ea eaque earum eos esse explicabo fuga, inventore iure iusto minima necessitatibus neque nostrum, perspiciatis ratione repudiandae rerum sapiente sed, temporibus velit voluptas. Obcaecati, sequi, similique?</span></span>
        </main>

    );
}

export default Task;

