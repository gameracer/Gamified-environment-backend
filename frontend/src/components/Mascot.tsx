import React from 'react';
import { motion } from 'framer-motion';

export const Mascot: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <motion.div
            className={`relative w-32 h-32 ${className}`}
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <motion.circle
                    cx="100" cy="100" r="80"
                    fill="hsl(150, 80%, 45%)"
                    stroke="hsl(150, 80%, 30%)"
                    strokeWidth="8"
                />
                {/* Belly */}
                <circle cx="100" cy="120" r="50" fill="hsl(150, 80%, 85%)" />

                {/* Eyes */}
                <g transform="translate(0, -10)">
                    <motion.circle
                        cx="70" cy="80" r="25" fill="white" stroke="hsl(150, 80%, 30%)" strokeWidth="4"
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.2 }}
                    />
                    <motion.circle
                        cx="130" cy="80" r="25" fill="white" stroke="hsl(150, 80%, 30%)" strokeWidth="4"
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.2 }}
                    />
                    <circle cx="70" cy="80" r="10" fill="black" />
                    <circle cx="130" cy="80" r="10" fill="black" />
                </g>

                {/* Beak */}
                <motion.path
                    d="M 90 110 L 110 110 L 100 130 Z"
                    fill="hsl(45, 90%, 60%)"
                    stroke="hsl(45, 90%, 40%)"
                    strokeWidth="4"
                />

                {/* Wings */}
                <motion.path
                    d="M 20 100 Q 10 130 40 140"
                    stroke="hsl(150, 80%, 30%)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    style={{ originX: "40px", originY: "100px" }}
                />
                <motion.path
                    d="M 180 100 Q 190 130 160 140"
                    stroke="hsl(150, 80%, 30%)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    style={{ originX: "160px", originY: "100px" }}
                />
            </svg>
        </motion.div>
    );
};
