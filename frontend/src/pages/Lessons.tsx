import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { BookOpen, Lock, Check, Star, ChevronRight, GraduationCap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Lesson {
    id: number;
    title: string;
    description: string;
    moduleTitle: string;
    xpReward: number;
    completed?: boolean;
    locked?: boolean;
}

const MOCK_LESSONS: Lesson[] = [
    { id: 1, title: "What is Sustainability?", description: "Learn the fundamentals of sustainable living", moduleTitle: "The Green Beginning", xpReward: 25, completed: true },
    { id: 2, title: "Reduce, Reuse, Recycle", description: "Master the 3 R's of waste management", moduleTitle: "The Green Beginning", xpReward: 25, completed: true },
    { id: 3, title: "Energy Conservation", description: "Discover ways to save energy at home", moduleTitle: "The Green Beginning", xpReward: 25 },
    { id: 4, title: "Water Conservation", description: "Learn to conserve our most precious resource", moduleTitle: "The Green Beginning", xpReward: 25, locked: true },
    { id: 5, title: "Forest Ecosystems", description: "Understand how forests support life", moduleTitle: "Forests & Wildlife", xpReward: 25, locked: true },
    { id: 6, title: "Deforestation Impact", description: "Learn about the effects of losing forests", moduleTitle: "Forests & Wildlife", xpReward: 25, locked: true },
];

export const Lessons: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedModule, setSelectedModule] = useState('ALL');

    useEffect(() => {
        // TODO: Fetch from API
        setLessons(MOCK_LESSONS);
    }, []);

    const modules = ['ALL', ...Array.from(new Set(lessons.map(l => l.moduleTitle)))];

    const filteredLessons = selectedModule === 'ALL'
        ? lessons
        : lessons.filter(l => l.moduleTitle === selectedModule);

    const completedCount = lessons.filter(l => l.completed).length;
    const totalCount = lessons.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100);

    const getLessonIcon = (lesson: Lesson) => {
        if (lesson.completed) return <Check className="w-7 h-7 text-white" strokeWidth={3} />;
        if (lesson.locked) return <Lock className="w-7 h-7 text-gray-400" />;
        return <Star className="w-7 h-7 text-white fill-current" />;
    };

    const getLessonStyle = (lesson: Lesson) => {
        if (lesson.completed) return 'bg-gradient-to-br from-success to-success-dark';
        if (lesson.locked) return 'bg-gray-300';
        return 'bg-gradient-primary shadow-glow';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-success-light/10">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <GraduationCap className="w-12 h-12" />
                                <h1 className="text-5xl font-bold">Learning Path</h1>
                            </div>
                            <p className="text-lg opacity-90 mb-4">Master environmental knowledge, one lesson at a time!</p>
                            <ProgressBar progress={progressPercent} variant="success" />
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10">
                            <BookOpen className="w-64 h-64 transform rotate-12" />
                        </div>
                    </div>
                </motion.div>

                {/* Module Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-3 mb-8 overflow-x-auto pb-2"
                >
                    {modules.map((module) => (
                        <motion.button
                            key={module}
                            onClick={() => setSelectedModule(module)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all ${selectedModule === module
                                    ? 'bg-gradient-primary text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                                }`}
                        >
                            {module}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Lessons List */}
                <div className="space-y-4">
                    {filteredLessons.map((lesson, index) => (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className={`flex items-center gap-6 p-6 ${lesson.locked ? 'opacity-60' : 'hover:shadow-2xl cursor-pointer'
                                } transition-all duration-300 group`}>
                                {/* Icon */}
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${getLessonStyle(lesson)}`}>
                                    {getLessonIcon(lesson)}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Sparkles className="w-4 h-4 text-primary" />
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{lesson.moduleTitle}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">
                                        {lesson.title}
                                    </h3>
                                    <p className="text-gray-600">{lesson.description}</p>
                                </div>

                                {/* XP & Action */}
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 font-bold">Reward</div>
                                        <div className="text-2xl font-bold text-accent">{lesson.xpReward} XP</div>
                                    </div>
                                    {!lesson.locked && (
                                        <Button
                                            variant={lesson.completed ? "secondary" : "primary"}
                                            size="md"
                                            icon={<ChevronRight className="w-5 h-5" />}
                                            iconPosition="right"
                                        >
                                            {lesson.completed ? 'Review' : 'Start'}
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredLessons.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No lessons found</h3>
                        <p className="text-gray-500 text-lg">Select a different module to see lessons!</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

