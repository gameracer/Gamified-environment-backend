import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { Trophy, Medal, Crown, Zap, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
    rank: number;
    username: string;
    displayName: string;
    xp: number;
    level: number;
    avatar: string;
    isCurrentUser?: boolean;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, username: "user10", displayName: "Player 10", xp: 1000, level: 10, avatar: "avatar4" },
    { rank: 2, username: "user9", displayName: "Player 9", xp: 900, level: 9, avatar: "avatar3" },
    { rank: 3, username: "user8", displayName: "Player 8", xp: 800, level: 8, avatar: "avatar2" },
    { rank: 4, username: "user7", displayName: "Player 7", xp: 700, level: 7, avatar: "avatar1" },
    { rank: 5, username: "user6", displayName: "Player 6", xp: 600, level: 6, avatar: "avatar6", isCurrentUser: true },
    { rank: 6, username: "user5", displayName: "Player 5", xp: 500, level: 5, avatar: "avatar5" },
    { rank: 7, username: "user4", displayName: "Player 4", xp: 400, level: 4, avatar: "avatar4" },
    { rank: 8, username: "user3", displayName: "Player 3", xp: 300, level: 3, avatar: "avatar3" },
    { rank: 9, username: "user2", displayName: "Player 2", xp: 200, level: 2, avatar: "avatar2" },
    { rank: 10, username: "user1", displayName: "Player 1", xp: 100, level: 1, avatar: "avatar1" },
];

export const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [timeframe, setTimeframe] = useState('ALL_TIME');

    useEffect(() => {
        // TODO: Fetch from API
        setLeaderboard(MOCK_LEADERBOARD);
    }, [timeframe]);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="w-10 h-10 text-yellow-500 fill-current drop-shadow-lg" />;
        if (rank === 2) return <Medal className="w-9 h-9 text-gray-400 fill-current drop-shadow-md" />;
        if (rank === 3) return <Medal className="w-8 h-8 text-amber-600 fill-current drop-shadow-md" />;
        return null;
    };

    const getRankGradient = (rank: number) => {
        if (rank === 1) return 'from-yellow-100 via-yellow-50 to-white';
        if (rank === 2) return 'from-gray-100 via-gray-50 to-white';
        if (rank === 3) return 'from-amber-100 via-amber-50 to-white';
        return 'from-white to-gray-50';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary-light/10 to-accent-light/10">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="bg-gradient-to-r from-secondary to-secondary-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="relative z-10 text-center">
                            <Trophy className="w-16 h-16 mx-auto mb-4" />
                            <h1 className="text-5xl font-bold mb-2">Leaderboard</h1>
                            <p className="text-lg opacity-90">Compete with eco-warriors worldwide!</p>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10">
                            <TrendingUp className="w-64 h-64 transform rotate-12" />
                        </div>
                    </div>
                </motion.div>

                {/* Timeframe Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center gap-3 mb-8"
                >
                    {['DAILY', 'WEEKLY', 'ALL_TIME'].map((tf) => (
                        <motion.button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-4 rounded-xl font-bold transition-all ${timeframe === tf
                                    ? 'bg-gradient-secondary text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                                }`}
                        >
                            {tf.replace('_', ' ')}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Leaderboard List */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {leaderboard.map((entry, index) => (
                        <motion.div
                            key={entry.username}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative"
                        >
                            <Card className={`flex items-center gap-4 p-5 bg-gradient-to-r ${getRankGradient(entry.rank)} ${entry.isCurrentUser ? 'ring-4 ring-primary/50 scale-105 shadow-2xl' : 'shadow-md'
                                } transition-all duration-300 hover:shadow-xl group`}>
                                {/* Rank */}
                                <div className="flex items-center justify-center w-20">
                                    {getRankIcon(entry.rank) || (
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                            <span className="text-xl font-bold text-gray-600">#{entry.rank}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform">
                                    {entry.displayName.charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                                        {entry.displayName}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Award className="w-4 h-4 text-accent" />
                                        <p className="text-sm font-bold text-gray-600">Level {entry.level}</p>
                                    </div>
                                </div>

                                {/* XP */}
                                <div className="text-right">
                                    <div className="flex items-center gap-2 text-accent font-bold text-2xl">
                                        <Zap className="w-6 h-6 fill-current" />
                                        <span>{entry.xp.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 font-bold mt-1">XP</p>
                                </div>

                                {entry.isCurrentUser && (
                                    <div className="absolute -top-3 -right-3 bg-gradient-primary text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                                        YOU
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
