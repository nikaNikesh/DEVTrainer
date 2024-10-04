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
            <label htmlFor={difficultySelectId}>difficulty</label>
                <select value={difficultyFilter} id={difficultySelectId} onChange={handleChange}>
                    <option value="">all</option>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
    </div>
  );
}

export default TasksFilter;