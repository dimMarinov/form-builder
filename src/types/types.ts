import { formIds } from '../constants/appConstants'

export type SelectOption = {
    id: string
    label: string
}

export type FormData = {
    [formIds.label]: string
    [formIds.field_required]: boolean
    [formIds.defaultValue]: string
    [formIds.choices]: string[]
    [formIds.displayAlpha]: SelectOption | null
}

export type FormErrors = {
    label?: string;
    choices?: string;
}

export type FormBuilderConfig = {
    type: 'input' | 'checkbox' | 'select' | 'textarea';
    id: keyof typeof formIds;
};
