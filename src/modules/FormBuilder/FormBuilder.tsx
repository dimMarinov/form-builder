import { useEffect, useState, ChangeEvent, useCallback, useRef, ReactNode, Fragment } from 'react';
import './FormBuilder.css';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Checkbox from '../../components/Checkbox/Checkbox';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';
import { SelectOption, FormData, FormErrors, FormBuilderConfig } from '../../types/types';
import { formIds, localStorageKeys } from '../../constants/appConstants';
import { form_builder_config } from '../../constants/formBuilderConfig';
import { setItemToLocalStorage, removeFromLocalStorage, debounce } from '../../utils/utils';
import fieldService from '../../services/formService';

interface OwnProps {
    sortingtOptions: SelectOption[];
    data: FormData;
}

const FormBuilder = ({ sortingtOptions, data }: OwnProps) => {
    const [formData, setFormData] = useState<FormData>(data);
    const [errors, setErrors] = useState<FormErrors>({
        [formIds.label]: '',
        [formIds.choices]: ''
    });
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    // store reference to the debounce functio
    const debouncedSetItemToLocalStorage = useRef(
        debounce((key: string, value: string) => {
            setItemToLocalStorage(key, value);
        }, 500)
    );

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const validateFields = (formData: FormData) => {
        const newErrors: FormErrors = {};

        if (!formData[formIds.label]) {
            newErrors.label = 'Label is required';
        }

        const choices = formData.choices;
        const uniqueChoices = new Set(choices);
        if (choices.length !== uniqueChoices.size) {
            newErrors.choices = 'Duplicate choices are not allowed';
        }

        if (choices.length > 50) {
            newErrors.choices = 'You cannot have more than 50 choices';
        }

        return newErrors;
    }

    useEffect(() => {
        const validateField = () => {
            const newErrors: FormErrors = validateFields(formData);

            if (Object.keys(newErrors).length > 0) {
                setDisableSubmit(true);
                setErrors(newErrors);
            } else {
                setDisableSubmit(false);
                setErrors({});
            }
        };

        validateField();
    }, [formData]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, type, value } = event.target;

        setFormData((prevData) => {
            let newData;

            if (type === 'checkbox') {
                const { checked } = event.target as HTMLInputElement;
                newData = { ...prevData, [name]: checked };
            } else if (event.target instanceof HTMLSelectElement) {
                newData = { ...prevData, [name]: value };
            } else if (event.target instanceof HTMLTextAreaElement) {
                const choices = value.split('\n');
                newData = { ...prevData, [name]: [...choices] };
            } else {
                newData = { ...prevData, [name]: value };
            }

            debouncedSetItemToLocalStorage.current(localStorageKeys.formData, JSON.stringify(newData));

            return newData;
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        const newErrors: FormErrors = validateFields(formData);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const choices = formData.choices;

        const saveData = {
            ...formData,
            [formIds.choices]: choices.includes(formData[formIds.defaultValue]) ? choices : [...choices, formData[formIds.defaultValue]]
        }

        setFormData(saveData);

        setErrors({});

        try {
            const response = await fieldService.saveField(formData);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            removeFromLocalStorage(localStorageKeys.formData)
            const data = await response.json();
            console.log("Save successful:", data);
        } catch (error) {
            // Handle the error
        } finally {
            setLoading(false);
        }
        setLoading(false);
    };

    const handleCancel = useCallback(() => {
        setItemToLocalStorage(localStorageKeys.formData, JSON.stringify(data));
        setFormData(data);
    }, [data]);

    const renderControl = (controlConfig: FormBuilderConfig): ReactNode => {
        let control = null

        if (controlConfig.type === 'input') {
            control = <div className="form-group">
                <Input
                    disabled={loading}
                    onChange={handleChange}
                    value={formData[controlConfig.id] as string}
                    label="Label"
                    type="text"
                    id={controlConfig.id}
                    name={controlConfig.id}
                    error={(errors && (controlConfig.id === formIds.label)) ? errors.label : ''}
                />
            </div>
        } else if (controlConfig.type === 'checkbox') {
            control = <div className="form-group checkbox-group">
                <div className='checkbox-group-label'>
                    Type
                </div>
                <div className='checkbox-group-control'>
                    <span className='multi-select-separator'>Multi-select</span>
                    <Checkbox
                        disabled={loading}
                        onChange={handleChange}
                        id={controlConfig.id}
                        name={controlConfig.id}
                        checked={formData[controlConfig.id] as boolean}
                        label="A value is required"
                    />
                </div>
            </div>
        } else if (controlConfig.type === 'select') {
            control = <div className="form-group">
                <Select
                    disabled={loading}
                    name={controlConfig.id}
                    onChange={handleChange}
                    label="Order"
                    options={sortingtOptions}
                    id={controlConfig.id}
                    value={formData[controlConfig.id] as string}
                />
            </div>
        } else if (controlConfig.type === 'textarea') {
            control = <div className="form-group">
                <TextArea
                    disabled={loading}
                    id={controlConfig.id}
                    name={controlConfig.id}
                    value={formData.choices.join('\n')} // Join array into a string for the TextArea
                    onChange={handleChange}
                    label="Choices"
                    placeholder="Enter choices, one per line"
                    error={errors.choices ? errors.choices : ''}
                />
            </div>
        }
        return control;
    }

    return (
        <div className='form-builder-wrapper'>
            <h3 className='form-builder-title'>Form Builder</h3>
            <div className='form-builder-container'>
                <form className="form">
                    {form_builder_config.map((control: FormBuilderConfig) => (
                        <Fragment key={control.id}>
                            {renderControl(control)}
                        </Fragment>
                    ))}

                    <div className='button-group'>
                        <Button
                            onClick={handleSubmit}
                            type="primary"
                            title="Submit Form"
                            disabled={disableSubmit}
                            loading={loading}
                        >
                            Submit
                        </Button>
                        <span className='buttons-separator'>or</span>
                        <Button
                            onClick={handleCancel}
                            customClass="red-text"
                            title="Cancel"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormBuilder;
