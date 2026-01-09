import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = true,
    glow = false,
    glass = false,
}) => {
    return (
        <motion.div
            className={`
                ${glass ? 'glass' : 'bg-white'}
                rounded-2xl shadow-md
                ${hover ? 'hover:shadow-lg transition-all duration-300' : ''}
                ${glow ? 'shadow-glow' : ''}
                ${className}
            `}
            whileHover={hover ? { y: -4 } : {}}
        >
            {children}
        </motion.div>
    );
};
