import React from 'react';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useAuth } from '../context/AuthContext';
import { Trophy, Zap, Flame, Star, Settings, LogOut, User, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_BADGES = [
    { id: 1, name: "First Steps", description: "Complete your first lesson", tier: "BRONZE", unlocked: true },
    { id: 2, name: "Quick Learner", description: "Complete 5 lessons", tier: "SILVER", unlocked: true },
    { id: 3, name: "Knowledge Master", description: "Complete all lessons in a module", tier: "GOLD", unlocked: false },
    { id: 4, name: "Challenge Accepted", description: "Complete your first challenge", tier: "BRONZE", unlocked: true },
    { id: 5, name: "Eco Warrior", description: "Complete 10 challenges", tier: "SILVER", unlocked: false },
    { id: 6, name: "Planet Protector", description: "Complete 25 challenges", tier: "GOLD", unlocked: false },
];

export const Profile: React.FC = () => {
    const { user, logout } = useAuth();

    const getBadgeGradient = (tier: string) => {
        switch (tier) {
            case 'BRONZE': return 'from-amber-700 via-amber-500 to-amber-300';
            case 'SILVER': return 'from-gray-500 via-gray-300 to-gray-100';
            case 'GOLD': return 'from-yellow-600 via-yellow-400 to-yellow-200';
            case 'DIAMOND': return 'from-cyan-500 via-blue-400 to-purple-400';
            default: return 'from-gray-400 to-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="mb-8 relative overflow-hidden p-0">
                        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-primary via-secondary to-accent" />
                        <div className="relative pt-24 pb-8 px-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Avatar */}
                                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-6xl shadow-2xl border-4 border-white">
                                    {user?.charAt(0).toUpperCase()}
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-4xl font-bold text-gray-800 mb-3">{user}</h1>
                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        <Badge label="Level 6" variant="primary" icon={<Star className="w-4 h-4" />} />
                                        <Badge label="600 XP" variant="accent" icon={<Zap className="w-4 h-4" />} />
                                        <Badge label="12 Day Streak" variant="danger" icon={<Flame className="w-4 h-4" />} />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Button variant="secondary" size="md" icon={<Settings className="w-5 h-5" />}>
                                        Settings
                                    </Button>
                                    <Button variant="danger" size="md" onClick={logout} icon={<LogOut className="w-5 h-5" />}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-primary" />
                                Statistics
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { label: 'Lessons Completed', value: '12', gradient: 'from-primary to-primary-dark' },
                                    { label: 'Challenges Done', value: '5', gradient: 'from-accent to-accent-dark' },
                                    { label: 'Badges Earned', value: '3 / 6', gradient: 'from-secondary to-secondary-dark' },
                                    { label: 'Global Rank', value: '#5', gradient: 'from-success to-success-dark' },
                                ].map((stat, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                                        <span className="text-gray-600 font-medium">{stat.label}</span>
                                        <span className={`font-bold text-xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                            <div className="space-y-4 text-sm">
                                {[
                                    { text: 'Completed "Energy Conservation"', time: '2 hours ago', color: 'bg-primary' },
                                    { text: 'Earned "Quick Learner" badge', time: '1 day ago', color: 'bg-accent' },
                                    { text: 'Completed "Plant a Tree" challenge', time: '2 days ago', color: 'bg-secondary' },
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className={`w-3 h-3 rounded-full ${activity.color} mt-1.5`} />
                                        <div>
                                            <p className="font-bold text-gray-700">{activity.text}</p>
                                            <p className="text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card className="p-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Trophy className="w-8 h-8 text-accent" />
                                Achievements
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {MOCK_BADGES.map((badge, index) => (
                                    <motion.div
                                        key={badge.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className={`relative ${!badge.unlocked ? 'opacity-60' : ''}`}
                                    >
                                        <div className={`aspect-square rounded-2xl bg-gradient-to-br ${getBadgeGradient(badge.tier)} p-1 shadow-xl hover:scale-105 transition-transform`}>
                                            <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                                                <Award className={`w-16 h-16 ${badge.unlocked ? 'text-gray-700' : 'text-gray-300'}`} />
                                            </div>
                                        </div>
                                        <div className="mt-3 text-center">
                                            <p className="font-bold text-sm text-gray-800">{badge.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                                        </div>
                                        {!badge.unlocked && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-black/60 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm">
                                                    Locked
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
