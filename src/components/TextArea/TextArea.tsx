import React from 'react';
import './TextArea.css';

const TextArea = ({
    id,
    name,
    value,
    onChange,
    label,
    placeholder,
    error,
}: OwnProps): JSX.Element => {
    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event);
    };

    return (
        <div className='textarea-wrapper'>
            {label && <label htmlFor={id}>{label}</label>}
            <div className='input-wrapper'>
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleOnChange}
                    placeholder={placeholder}
                />
                {!!error && <p className='error-message'>{error}</p>}
            </div>
        </div>
    );
};

interface OwnProps {
    id: string;
    name: string;
    value: string;
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    error?: string;
}

export default TextArea;
