import { ReactNode } from 'react';
import './Input.css';

const Input = ({
    type,
    id,
    name,
    value,
    onChange,
    placeholder,
    disabled,
    label,
    error
}: OwnProps): JSX.Element => {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange?.(event);
    };

    return (
        <div className="input-container">
            {label && (
                <label htmlFor={id}>
                    {label}
                </label>
            )}
            <div className='input-wrapper'>
                <input
                    className='input'
                    id={id}
                    name={name}
                    type='text'
                    value={value}
                    onChange={disabled ? undefined : handleOnChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {!!error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

interface OwnProps {
    type: string;
    id: string;
    name?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    label?: ReactNode;
    error?: string;
}

export default Input;
