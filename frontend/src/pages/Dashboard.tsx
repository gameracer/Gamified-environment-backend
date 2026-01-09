import React from 'react';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Trophy, Flame, Zap, BookOpen, Star, Target, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-secondary-light/10">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="bg-gradient-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold mb-2">Welcome back, Champion! 🎉</h1>
                            <p className="text-lg opacity-90">You're on fire! Keep up the amazing work.</p>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute right-0 top-0 opacity-10">
                            <Trophy className="w-64 h-64 transform rotate-12" />
                        </div>
                        <div className="absolute left-10 bottom-0 opacity-10">
                            <Star className="w-32 h-32" />
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="p-6 bg-gradient-to-br from-accent-light to-accent hover:shadow-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="bg-white/30 p-3 rounded-xl">
                                    <Flame className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-3xl font-bold text-white">12</span>
                            </div>
                            <h3 className="text-white font-bold text-lg">Day Streak</h3>
                            <p className="text-white/80 text-sm">Keep it going!</p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-6 bg-gradient-primary hover:shadow-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="bg-white/30 p-3 rounded-xl">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-3xl font-bold text-white">1,450</span>
                            </div>
                            <h3 className="text-white font-bold text-lg">Total XP</h3>
                            <p className="text-white/80 text-sm">+250 this week</p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="p-6 bg-gradient-success hover:shadow-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="bg-white/30 p-3 rounded-xl">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-3xl font-bold text-white">8/12</span>
                            </div>
                            <h3 className="text-white font-bold text-lg">Lessons Done</h3>
                            <p className="text-white/80 text-sm">67% complete</p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="p-6 bg-gradient-to-br from-secondary to-secondary-dark hover:shadow-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="bg-white/30 p-3 rounded-xl">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-3xl font-bold text-white">5</span>
                            </div>
                            <h3 className="text-white font-bold text-lg">Badges Earned</h3>
                            <p className="text-white/80 text-sm">3 more to unlock</p>
                        </Card>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Current Progress */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Current Unit */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">Current Unit</h2>
                                    <Badge
                                        label="In Progress"
                                        variant="primary"
                                        icon={<TrendingUp className="w-4 h-4" />}
                                    />
                                </div>

                                <div className="bg-gradient-to-r from-primary-light/20 to-secondary-light/20 rounded-2xl p-6 mb-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Unit 1: Getting Started</h3>
                                    <p className="text-gray-600 mb-4">Master the fundamentals and build a strong foundation</p>

                                    <ProgressBar progress={67} variant="primary" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant="primary"
                                        icon={<BookOpen className="w-5 h-5" />}
                                        className="w-full"
                                    >
                                        Continue Learning
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        icon={<Trophy className="w-5 h-5" />}
                                        className="w-full"
                                    >
                                        View Challenges
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Card className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: BookOpen, label: 'Lessons', color: 'from-primary to-primary-dark' },
                                        { icon: Trophy, label: 'Challenges', color: 'from-accent to-accent-dark' },
                                        { icon: TrendingUp, label: 'Leaderboard', color: 'from-secondary to-secondary-dark' },
                                        { icon: Award, label: 'Achievements', color: 'from-success to-success-dark' },
                                    ].map((action, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`bg-gradient-to-br ${action.color} p-6 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-shadow`}
                                        >
                                            <action.icon className="w-8 h-8 text-white mb-2" />
                                            <p className="text-white font-bold">{action.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Daily Streak */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Card className="p-6 border-2 border-accent/30">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-xl text-gray-700">Daily Streak</h3>
                                    <div className="flex items-center gap-1">
                                        <Flame className="w-6 h-6 text-accent fill-current animate-pulse-glow" />
                                        <span className="font-bold text-2xl text-accent">12</span>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-2">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <span className="text-xs font-bold text-gray-400">{day}</span>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${i < 4
                                                    ? 'bg-accent text-white scale-110 shadow-md'
                                                    : 'bg-gray-100 text-gray-300'
                                                }`}>
                                                {i < 4 ? <Zap className="w-5 h-5 fill-current" /> : ''}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* League */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Card className="p-6 border-2 border-primary/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-primary/20 p-3 rounded-xl">
                                        <Trophy className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-700">Silver League</h3>
                                        <p className="text-xs text-gray-500 font-bold uppercase">Top 10 advance</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${i === 1 ? 'bg-accent/10 border border-accent/30' : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`font-bold w-6 text-center ${i === 1 ? 'text-accent' : 'text-gray-400'
                                                    }`}>
                                                    {i}
                                                </span>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 1 ? 'bg-accent/20 text-accent' : 'bg-gray-200 text-gray-500'
                                                    }`}>
                                                    P{i}
                                                </div>
                                                <span className={`font-bold text-sm ${i === 1 ? 'text-gray-800' : 'text-gray-600'
                                                    }`}>
                                                    Player {i}
                                                </span>
                                            </div>
                                            <span className="font-bold text-xs text-gray-400">
                                                {1500 - (i * 50)} XP
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="primary" size="sm" className="w-full mt-4">
                                    View Full League
                                </Button>
                            </Card>
                        </motion.div>

                        {/* Motivational Tip */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <Card className="p-6 bg-gradient-to-br from-success-light/20 to-primary-light/20 border-2 border-success/30">
                                <div className="flex items-start gap-3">
                                    <div className="bg-success/20 p-2 rounded-lg">
                                        <Star className="w-6 h-6 text-success" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-1">Pro Tip!</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Complete lessons daily to maintain your streak and earn bonus XP! 🌟
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

