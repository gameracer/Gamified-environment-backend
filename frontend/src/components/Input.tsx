import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    success?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    success,
    icon,
    iconPosition = 'left',
    type = 'text',
    className = '',
    disabled,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const hasValue = props.value !== undefined && props.value !== '';

    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    return (
        <div className={`relative ${className}`}>
            {/* Input Container */}
            <div className="relative">
                {/* Icon Left */}
                {icon && iconPosition === 'left' && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                        {icon}
                    </div>
                )}

                {/* Input Field */}
                <input
                    type={inputType}
                    className={`
                        w-full px-4 py-3.5 pt-6
                        ${icon && iconPosition === 'left' ? 'pl-12' : ''}
                        ${icon && iconPosition === 'right' ? 'pr-12' : ''}
                        ${isPasswordField ? 'pr-12' : ''}
                        bg-white border-2 rounded-xl
                        font-body text-base text-gray-800
                        transition-all duration-200
                        focus:outline-none
                        ${error ? 'border-danger focus:border-danger' : success ? 'border-success focus:border-success' : 'border-gray-200 focus:border-primary'}
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                        ${error ? 'animate-shake' : ''}
                    `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    {...props}
                />

                {/* Floating Label */}
                <motion.label
                    className={`
                        absolute left-4 pointer-events-none
                        font-body font-medium
                        transition-all duration-200
                        ${icon && iconPosition === 'left' ? 'left-12' : 'left-4'}
                        ${isFocused || hasValue ? 'top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'}
                        ${error ? 'text-danger' : success ? 'text-success' : isFocused ? 'text-primary' : 'text-gray-500'}
                    `}
                    animate={{
                        fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
                        top: isFocused || hasValue ? '0.5rem' : '50%',
                    }}
                >
                    {label}
                </motion.label>

                {/* Icon Right / Password Toggle / Status Icons */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {success && !error && (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                    )}
                    {error && (
                        <AlertCircle className="w-5 h-5 text-danger" />
                    )}
                    {isPasswordField && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    )}
                    {icon && iconPosition === 'right' && !isPasswordField && (
                        <div className="text-gray-400">
                            {icon}
                        </div>
                    )}
                </div>

                {/* Focus Ring */}
                {isFocused && !error && (
                    <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    />
                )}
            </div>

            {/* Error Message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-sm font-medium text-danger flex items-center gap-1"
                >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </motion.p>
            )}
        </div>
    );
};
