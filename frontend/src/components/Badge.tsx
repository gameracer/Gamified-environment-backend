import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BadgeProps {
    icon?: React.ReactNode;
    label: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    shine?: boolean;
    tooltip?: string;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    icon,
    label,
    variant = 'primary',
    size = 'md',
    shine = false,
    tooltip,
    className = '',
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    const variants = {
        primary: 'bg-gradient-primary text-white',
        secondary: 'bg-gradient-to-r from-secondary to-secondary-dark text-white',
        accent: 'bg-gradient-accent text-gray-800',
        success: 'bg-gradient-success text-white',
        danger: 'bg-gradient-to-r from-danger to-danger-dark text-white',
    };

    return (
        <div className="relative inline-block">
            <motion.div
                className={`
                    ${sizes[size]} ${variants[variant]} ${className}
                    rounded-full font-bold inline-flex items-center gap-1.5
                    shadow-md relative overflow-hidden
                `}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => tooltip && setShowTooltip(true)}
                onHoverEnd={() => setShowTooltip(false)}
            >
                {icon && <span className="flex-shrink-0">{icon}</span>}
                <span>{label}</span>

                {shine && (
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                        style={{ backgroundSize: '200% 100%' }}
                    />
                )}
            </motion.div>

            <AnimatePresence>
                {showTooltip && tooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50"
                    >
                        {tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
