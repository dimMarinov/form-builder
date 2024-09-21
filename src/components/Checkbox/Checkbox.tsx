import './Checkbox.css';

const Checkbox = ({ id, name, checked, label, onChange }: OwnProps): JSX.Element => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange?.(event);
    };

    return (
        <div className="checkbox-container">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <label className='label' htmlFor={id}>{label}</label>
        </div>
    );
};

interface OwnProps {
    id: string;
    name: string;
    checked: boolean;
    label: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

export default Checkbox;
