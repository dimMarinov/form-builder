import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/Input/Input';

describe('Input Component', () => {
    test('renders with label and placeholder', () => {
        render(<Input type="text" id="input-1" label="Username" placeholder="Enter your username" />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
    });

    test('displays value correctly', () => {
        render(<Input type="text" id="input-2" value="Test Value" />);
        expect(screen.getByDisplayValue(/test value/i)).toBeInTheDocument();
    });

    test('handles onChange event', () => {
        const handleChange = jest.fn();
        render(<Input type="text" id="input-3" onChange={handleChange} />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'New Value' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('does not call onChange when disabled', () => {
        const handleChange = jest.fn();
        render(<Input type="text" id="input-4" onChange={handleChange} disabled />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'New Value' } });
        expect(handleChange).not.toHaveBeenCalled();
    });

    test('displays error message when error prop is provided', () => {
        render(<Input type="text" id="input-5" error="This field is required" />);
        expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });

    test('renders as disabled when disabled prop is true', () => {
        render(<Input type="text" id="input-6" disabled />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeDisabled();
    });
});
