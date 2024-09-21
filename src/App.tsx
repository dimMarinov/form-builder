import { useEffect, useState } from 'react';
import './App.css';
import FormBuilder from './modules/FormBuilder/FormBuilder';
import fieldService from './services/formService';
import { formIds, sortTypes, localStorageKeys } from './constants/appConstants';
import { SelectOption, FormData } from './types/types';
import { getItemFromLocalStorage } from './utils/utils';

const sortingtOptions: SelectOption[] = [
  { id: sortTypes.alphaAscending, label: 'Choices in Alphabetical Asc' },
  { id: sortTypes.alphaDescending, label: 'Choices in Alphabetical Desc' }
];


const initialValuesOfForm = {
  [formIds.label]: '',
  [formIds.field_required]: false,
  [formIds.defaultValue]: '',
  [formIds.choices]: [],
  [formIds.displayAlpha]: sortingtOptions[0]
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialValuesOfForm)

  useEffect(() => {
    const savedDataFromStorage = JSON.parse(getItemFromLocalStorage(localStorageKeys.formData) ?? 'null');

    if (savedDataFromStorage) {
      setFormData(savedDataFromStorage)
    } else {
      const apiRes = fieldService.getField(1)
      const stateData: FormData = {
        [formIds.label]: apiRes?.label ?? initialValuesOfForm[formIds.label],
        [formIds.field_required]: apiRes?.required ?? initialValuesOfForm[formIds.field_required],
        [formIds.defaultValue]: apiRes?.default ?? initialValuesOfForm[formIds.defaultValue],
        [formIds.choices]: apiRes?.choices ?? initialValuesOfForm[formIds.choices],
        [formIds.displayAlpha]:  (apiRes?.displayAlpha ? sortingtOptions[0] : sortingtOptions[1]) ?? initialValuesOfForm[formIds.displayAlpha]
      }
      setFormData(stateData)
    }
  }, []);

  return (
    <FormBuilder sortingtOptions={sortingtOptions} data={formData}/>
  )
}

export default App;
