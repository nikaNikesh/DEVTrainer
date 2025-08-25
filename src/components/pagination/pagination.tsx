import React, {ReactElement} from "react";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {nextPage, prevPage} from "../../store/slices/tasksDataSlice";

import styles from './Pagination.module.scss';
const Pagination = (): ReactElement => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.tasksData.currentPage);
    const totalPage = useAppSelector((state) => state.tasksData.totalPage);

    return (
            <div className={styles.pagination}>
                <button className={styles.arrowPrev} onClick={() => dispatch(prevPage())}
                        disabled={currentPage === 0}></button>
                <span>Page: <span className={styles.selectedPage}>{currentPage + 1}</span> of {totalPage}</span>
                <button className={styles.arrowNext} onClick={() => dispatch(nextPage())}
                        disabled={currentPage === totalPage - 1}></button>
            </div>
    );
}

export default Pagination;

