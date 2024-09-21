import { formIds } from './appConstants';
import { FormBuilderConfig } from '../types/types';

export const form_builder_config: FormBuilderConfig[] = [
    { type: 'input', id: formIds.label },
    { type: 'checkbox', id: formIds.field_required },
    { type: 'input', id: formIds.defaultValue },
    { type: 'textarea', id: formIds.choices },
    { type: 'select', id: formIds.displayAlpha },
];