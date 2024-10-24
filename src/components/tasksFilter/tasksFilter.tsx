import React, { ReactElement, useId } from 'react';
import styles from './TasksFilter.module.scss';

interface TasksFilterProps {
   onSelectDifficulty: (newDifficulty: string) => void,
   difficultyFilter: string
}

const TasksFilter = ({onSelectDifficulty,difficultyFilter}: TasksFilterProps): ReactElement => {
    const difficultySelectId = useId();
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue: string = event.target.value;
        onSelectDifficulty(newValue);
    }

  return (
    <div className={styles.filterContainer}>
            <label htmlFor={difficultySelectId} className={styles.label}>difficulty</label>
                <select value={difficultyFilter} id={difficultySelectId} onChange={handleChange} className={styles.select}>
                    <option value="" className={styles.option}>all</option>
                    <option value="easy" className={styles.option}>easy</option>
                    <option value="medium" className={styles.option}>medium</option>
                    <option value="hard" className={styles.option}>hard</option>
                </select>
    </div>
  );
}

export default TasksFilter;