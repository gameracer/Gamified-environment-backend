import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon,
    iconPosition = 'left',
    loading = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "font-heading font-bold rounded-xl transition-all focus:outline-none relative overflow-hidden inline-flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-gradient-primary text-white shadow-lg hover:shadow-xl border-b-4 border-primary-dark",
        secondary: "bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-lg hover:shadow-xl border-b-4 border-secondary-dark",
        accent: "bg-gradient-accent text-gray-800 shadow-lg hover:shadow-xl border-b-4 border-accent-dark",
        danger: "bg-gradient-to-r from-danger to-danger-dark text-white shadow-lg hover:shadow-xl border-b-4 border-danger-dark",
        success: "bg-gradient-success text-white shadow-lg hover:shadow-xl border-b-4 border-success-dark",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const width = fullWidth ? "w-full" : "";
    const isDisabled = disabled || loading;

    return (
        <motion.button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className} ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isDisabled ? { scale: 0.98, y: 0 } : {}}
            disabled={isDisabled}
            {...props}
        >
            {/* Shimmer Effect */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                    <LoadingSpinner size="sm" variant={variant === 'accent' ? 'primary' : 'accent'} />
                ) : (
                    <>
                        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
                        {children}
                        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
                    </>
                )}
            </span>
        </motion.button>
    );
};

