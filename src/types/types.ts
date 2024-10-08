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
    [formIds.displayAlpha]: string | null
}

export type FormErrors = {
    [formIds.label]?: string;
    [formIds.choices]?: string;
}

export type FormBuilderConfig = {
    type: 'input' | 'checkbox' | 'select' | 'textarea';
    id: keyof typeof formIds;
};
