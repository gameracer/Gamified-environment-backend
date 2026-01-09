import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, Check, Crown } from 'lucide-react';

interface LevelNode {
    id: number;
    title: string;
    status: 'locked' | 'active' | 'completed';
    x: number; // Percentage position (0-100)
}

const levels: LevelNode[] = [
    { id: 1, title: "Basics", status: 'completed', x: 50 },
    { id: 2, title: "Forests", status: 'completed', x: 35 },
    { id: 3, title: "Oceans", status: 'active', x: 65 },
    { id: 4, title: "Recycling", status: 'locked', x: 45 },
    { id: 5, title: "Energy", status: 'locked', x: 55 },
    { id: 6, title: "Climate", status: 'locked', x: 40 },
];

export const LearningPath: React.FC = () => {
    return (
        <div className="flex flex-col items-center py-8 relative w-full max-w-md mx-auto min-h-[600px]">
            {/* Winding Path SVG */}
            <svg className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none" preserveAspectRatio="none">
                <path
                    d="M 200 40 C 200 80, 140 100, 140 140 C 140 180, 260 200, 260 240 C 260 280, 180 300, 180 340 C 180 380, 220 400, 220 440 C 220 480, 160 500, 160 540"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>

            {levels.map((level, index) => (
                <motion.div
                    key={level.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute"
                    style={{ top: `${index * 100 + 40}px`, left: `${level.x}%`, transform: 'translateX(-50%)' }}
                >
                    <LevelButton level={level} />

                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-32 text-center z-20">
                        <span className={`font-heading font-bold text-sm px-3 py-1 rounded-xl shadow-sm backdrop-blur-sm border ${level.status === 'active' ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary-dark)]' : 'bg-white/90 text-gray-600 border-gray-100'}`}>
                            {level.title}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const LevelButton: React.FC<{ level: LevelNode }> = ({ level }) => {
    const getStyles = () => {
        switch (level.status) {
            case 'completed':
                return "bg-[var(--color-accent)] border-[var(--color-accent-dark)]";
            case 'active':
                return "bg-[var(--color-primary)] border-[var(--color-primary-dark)] ring-4 ring-[var(--color-primary-light)]/30";
            case 'locked':
                return "bg-gray-200 border-gray-300";
        }
    };

    return (
        <motion.button
            className={`w-20 h-20 rounded-full border-b-[6px] flex items-center justify-center shadow-xl relative z-10 transition-transform ${getStyles()}`}
            whileHover={level.status !== 'locked' ? { scale: 1.1, translateY: -4 } : {}}
            whileTap={level.status !== 'locked' ? { scale: 0.95, translateY: 0, borderBottomWidth: '0px', marginTop: '6px' } : {}}
        >
            {level.status === 'completed' && <Check className="w-10 h-10 text-white drop-shadow-md" strokeWidth={4} />}
            {level.status === 'active' && <Star className="w-10 h-10 text-white fill-current drop-shadow-md" />}
            {level.status === 'locked' && <Lock className="w-8 h-8 text-gray-400" />}

            {/* Crown for active level */}
            {level.status === 'active' && (
                <motion.div
                    className="absolute -top-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <div className="bg-white p-1.5 rounded-full shadow-md border border-gray-100">
                        <Crown className="w-6 h-6 text-[var(--color-accent)] fill-current" />
                    </div>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white mx-auto mt-1" />
                </motion.div>
            )}
        </motion.button>
    );
};
