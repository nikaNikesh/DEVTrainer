import React, { ReactElement } from 'react';
import styles from './TasksFilter.module.scss';

const TasksFilter = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <span>this is a footer</span>
    </footer>
  );
}

export default TasksFilter;