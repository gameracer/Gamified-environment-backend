import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Lock, Check, Star, ChevronRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { fetchLessons, completeLesson } from '../services/LessonService';
import type { Lesson } from '../types/Lesson';
import { useNavigate } from 'react-router-dom';

export const Lessons: React.FC = () => {

    const { token } = useAuth();
    const navigate = useNavigate();

    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    const moduleId = 1; // 🔥 You can make this dynamic later

    useEffect(() => {
        async function load() {
            try {
                if (!token) return;
                const data = await fetchLessons(moduleId, token);
                setLessons(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [token]);

    async function handleComplete(lessonId: number) {
        if (!token) return;

        await completeLesson(lessonId, token);

        // Refresh lessons
        const updated = await fetchLessons(moduleId, token);
        setLessons(updated);
    }

    const completedCount = lessons.filter(l => l.completed).length;
    const totalCount = lessons.length;
    const progressPercent =
        totalCount === 0 ? 0 :
            Math.round((completedCount / totalCount) * 100);

    if (loading) return <div className="p-10">Loading lessons...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-success-light/10">
            <Navbar />
            <div className="container mx-auto px-4 py-8">

                {/* Hero */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                    <div className="bg-gradient-primary rounded-3xl p-8 text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-2">
                            <GraduationCap className="w-10 h-10" />
                            <h1 className="text-4xl font-bold">Learning Path</h1>
                        </div>
                        <ProgressBar progress={progressPercent} variant="success" />
                    </div>
                </motion.div>

                {/* Lessons */}
                <div className="space-y-4">
                    {lessons.map((lesson, index) => (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className={`flex items-center gap-6 p-6 transition-all duration-300 
                                ${lesson.locked ? 'opacity-60' : 'hover:shadow-2xl cursor-pointer'}`}>

                                {/* Icon */}
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg
                                    ${lesson.completed
                                    ? 'bg-green-500'
                                    : lesson.locked
                                        ? 'bg-gray-300'
                                        : 'bg-primary'
                                }`}>
                                    {lesson.completed && <Check className="w-8 h-8 text-white" />}
                                    {lesson.locked && <Lock className="w-8 h-8 text-gray-400" />}
                                    {!lesson.completed && !lesson.locked &&
                                        <Star className="w-8 h-8 text-white fill-current" />}
                                </div>

                                {/* Content */}
                                <div
                                    className="flex-1"
                                    onClick={() =>
                                        !lesson.locked &&
                                        navigate(`/lesson/${lesson.id}`)
                                    }
                                >
                                    <h3 className="text-2xl font-bold">
                                        {lesson.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {lesson.description}
                                    </p>
                                </div>

                                {/* XP + Action */}
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 font-bold">
                                            Reward
                                        </div>
                                        <div className="text-xl font-bold text-accent">
                                            {lesson.xpReward} XP
                                        </div>
                                    </div>

                                    {!lesson.locked && (
                                        <Button
                                            variant={lesson.completed ? "secondary" : "primary"}
                                            onClick={() =>
                                                lesson.completed
                                                    ? navigate(`/lesson/${lesson.id}`)
                                                    : handleComplete(lesson.id)
                                            }
                                            icon={<ChevronRight className="w-5 h-5" />}
                                        >
                                            {lesson.completed ? "Review" : "Complete"}
                                        </Button>
                                    )}
                                </div>

                            </Card>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};
