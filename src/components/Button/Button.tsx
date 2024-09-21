import React, { ReactNode } from 'react';
import './Button.css'; // Import the CSS file

export const ButtonEnums = {
    type: {
        primary: 'primary',
        secondary: 'secondary'
    },
    variant: {
        default: 'default',
        outlined: 'outlined',
        text: 'text'
    }
} as const;

const Button = ({
    id,
    children,
    onClick,
    disabled,
    type = ButtonEnums.type.primary,
    variant = ButtonEnums.variant.default,
    title,
    customClass,
    loading = false
}: OwnProps) => {
    const className = `
        btn
        ${type}
        ${variant}
        ${disabled || loading ? 'btn-disabled' : ''}
        ${customClass || ''}
    `;

    return (
        <button
            type="button"
            id={id}
            className={className.trim()}
            onClick={onClick}
            disabled={disabled || loading}
            title={title}
        >
            <div className="button-content" style={{ opacity: loading ? 0.5 : 1 }}>
                {children}
            </div>
            {loading && <span className="loading-spinner"></span>} {/* Show spinner when loading */}
        </button>
    );
};

interface OwnProps {
    id?: string;
    children?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean; // Add loading as a prop
    type?: keyof typeof ButtonEnums.type;
    variant?: keyof typeof ButtonEnums.variant;
    title?: string;
    customClass?: string;
}

export default Button;
