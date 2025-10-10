import React, {ReactElement} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {setDifficulty} from "../../../store/slices/tasksDataSlice";
import CustomSelect from "../customSelect";
const DifficultyFilter = (): ReactElement => {
    const dataOptions: string[] = ['all', 'easy', 'medium', 'hard'];
    const dispatch = useAppDispatch();
    const difficulty = useAppSelector((state) => state.tasksData.difficulty);

    return (
        <CustomSelect
            className={'difficultySelect'}
            options={dataOptions}
            selected={difficulty}
            onChange={(optionValue) => dispatch(setDifficulty(optionValue))}
        />
    )
}


export default DifficultyFilter;