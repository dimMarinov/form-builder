const formIds = {
    label: 'label',
    field_required: 'field_required',
    defaultValue: 'defaultValue',
    displayAlpha: 'displayAlpha',
    choices: 'choices',
} as const;

const sortTypes = {
    alphaAscending: 'alphaAscending',
    alphaDescending: 'alphaDescending'
};

const typesOfControl = {
    textArea: 'textArea',
    input: 'input',
    select: 'select',
    checkbox: 'checkbox'
};

const localStorageKeys = {
    formData: "formData"
}

export { formIds, typesOfControl, sortTypes, localStorageKeys };