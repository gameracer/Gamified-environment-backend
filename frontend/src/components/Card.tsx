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
    const hasCustomBg = className.includes('bg-gradient-') || className.includes('from-') || /\bbg-(primary|accent|success|secondary|white\/|black\/|gray-)/.test(className);
    const baseBg = glass ? 'glass' : hasCustomBg ? '' : 'bg-white';
    const hasPadding = /\bp[xy]?-|^p-|\sp-/.test(className);
    return (
        <motion.div
            className={`
                card-base
                flex flex-col gap-4
                ${!hasPadding ? 'p-6' : ''}
                ${baseBg}
                ${!glass && !hasCustomBg ? 'shadow-md' : ''}
                rounded-2xl overflow-hidden
                ${!glass && hover ? 'hover:shadow-xl transition-all duration-300' : ''}
                ${glass ? 'shadow-xl' : ''}
                ${glow ? 'shadow-glow' : ''}
                ${className}
            `}
            whileHover={hover ? { y: -4 } : {}}
        >
            {children}
        </motion.div>
    );
};
