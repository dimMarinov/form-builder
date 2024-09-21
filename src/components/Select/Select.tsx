import { ChangeEvent, ReactNode } from 'react';
import { SelectOption } from '../../types/types';
import './Select.css';

const Select = ({ id, value, options, onChange, label, name, disabled }: OwnProps): JSX.Element => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        onChange?.(event);
    };

    return (
        <div className="select-container">
            {label && (
                <label className='label-select' htmlFor={id}>
                    {label}
                </label>
            )}
            <select disabled={disabled} className='select' name={name} id={id} value={value} onChange={handleSelectChange}>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span className="select-arrow" />
        </div>
    );
};

interface OwnProps {
    id: string;
    value: string;
    label?: ReactNode;
    options: SelectOption[];
    name: string;
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default Select;
