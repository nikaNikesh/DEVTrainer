import React from 'react';
import styles from '../authPage/AuthPage.module.scss';

interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    error?: string;
    inputRef?: React.Ref<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = React.memo(({
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    error,
    inputRef,
}) => {
    return (
        <>
            <input
                ref={inputRef}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                className={`${styles.input} ${error ? styles.errorBorder : ""}`}
            />
            {error && <span className="errorMessage">{error}</span>}
        </>
    );
});

export default InputField;