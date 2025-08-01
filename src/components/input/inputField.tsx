import React from 'react';
import styles from '../input/InputField.module.scss';


interface InputFieldProps {
    type: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autocomplete?: string;
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
    autocomplete,
    onBlur,
    onFocus,
    onKeyDown,
    error,
    inputRef,
}) => {
    return (
    <div className={styles.errorInputContainer}>
            <input
                ref={inputRef}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autocomplete}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                className={`${styles.input} ${error ? styles.errorBorder : ""}`}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
    );
});

export default InputField;