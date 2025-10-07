import React, {ReactElement} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {onChangeLanguage} from "../../../store/slices/codemirrorSlice";
import CustomSelect from "../customSelect";

const LanguageFilter = (): ReactElement => {
    const dataOptions: string[] = ['javascript', 'java', 'python', 'c++'];
    const dispatch = useAppDispatch();
    const language = useAppSelector((state) => state.codemirror.language);

    return (
        <CustomSelect
            className={'languageSelect'}
            options={dataOptions}
            selected={language}
            onChange={(optionValue) => dispatch(onChangeLanguage(optionValue))}
        />
    )
}
export default LanguageFilter;