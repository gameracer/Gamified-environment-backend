import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    progress: number; // 0-100
    showPercentage?: boolean;
    variant?: 'primary' | 'accent' | 'success';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    showPercentage = true,
    variant = 'primary',
    size = 'md',
    className = '',
}) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    const heights = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
    };

    const variants = {
        primary: 'bg-gradient-primary shadow-glow',
        accent: 'bg-gradient-accent shadow-glow-accent',
        success: 'bg-gradient-success',
    };

    return (
        <div className={`w-full ${className}`}>
            <div className={`w-full ${heights[size]} bg-gray-200 rounded-full overflow-hidden relative`}>
                <motion.div
                    className={`${heights[size]} ${variants[variant]} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${clampedProgress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>
            {showPercentage && (
                <div className="text-right mt-1">
                    <span className="text-sm font-bold text-gray-600">{Math.round(clampedProgress)}%</span>
                </div>
            )}
        </div>
    );
};
