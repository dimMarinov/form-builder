import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonEnums } from '../../components/Button/Button';

describe('Button Component', () => {
    test('renders with default props', () => {
        render(<Button>Default Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /default button/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).not.toBeDisabled();
    });

    test('renders with custom class', () => {
        render(<Button customClass="my-custom-class">Custom Class Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /custom class button/i });
        expect(buttonElement).toHaveClass('my-custom-class');
    });

    test('renders with loading state', () => {
        render(<Button loading>Loading Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /loading button/i });
        expect(buttonElement).toBeDisabled();
        expect(screen.getByText(/loading button/i)).toHaveStyle('opacity: 0.5');
        expect(screen.getByRole('button', { name: /loading button/i }).querySelector('.loading-spinner')).toBeInTheDocument();
    });

    test('triggers onClick event', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Clickable Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /clickable button/i });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders as disabled when disabled prop is true', () => {
        render(<Button disabled>Disabled Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /disabled button/i });
        expect(buttonElement).toBeDisabled();
    });

    test('renders with different types and variants', () => {
        render(<Button type={ButtonEnums.type.secondary} variant={ButtonEnums.variant.outlined}>Styled Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /styled button/i });
        expect(buttonElement).toHaveClass('secondary');
        expect(buttonElement).toHaveClass('outlined');
    });
});
