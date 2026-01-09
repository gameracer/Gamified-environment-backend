import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Search, Trophy, Zap, Flame, Target, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Challenge {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    xpReward: number;
    completed?: boolean;
}

const MOCK_CHALLENGES: Challenge[] = [
    { id: 1, title: "Plastic-Free Week", description: "Avoid single-use plastics for 7 days", difficulty: "MEDIUM", xpReward: 100 },
    { id: 2, title: "Plant a Tree", description: "Plant and care for a tree in your community", difficulty: "EASY", xpReward: 50 },
    { id: 3, title: "Energy Saver", description: "Reduce electricity usage by 20% this month", difficulty: "HARD", xpReward: 200 },
    { id: 4, title: "Water Warrior", description: "Save 50 liters of water daily for a week", difficulty: "MEDIUM", xpReward: 100 },
    { id: 5, title: "Recycle Champion", description: "Properly recycle 100 items", difficulty: "EASY", xpReward: 50 },
    { id: 6, title: "Bike to School", description: "Use bicycle instead of car for a week", difficulty: "MEDIUM", xpReward: 100 },
    { id: 7, title: "Compost Master", description: "Start a compost bin and maintain it for a month", difficulty: "HARD", xpReward: 200 },
    { id: 8, title: "Beach Cleanup", description: "Collect 10kg of trash from a beach or park", difficulty: "MEDIUM", xpReward: 150 },
];

export const Challenges: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState('ALL');

    useEffect(() => {
        // TODO: Fetch from API
        setChallenges(MOCK_CHALLENGES);
    }, []);

    const filteredChallenges = challenges.filter(challenge => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterDifficulty === 'ALL' || challenge.difficulty === filterDifficulty;
        return matchesSearch && matchesFilter;
    });

    const getDifficultyVariant = (difficulty: string): "success" | "accent" | "danger" => {
        switch (difficulty) {
            case 'EASY': return 'success';
            case 'MEDIUM': return 'accent';
            case 'HARD': return 'danger';
            default: return 'accent';
        }
    };

    const getDifficultyGradient = (difficulty: string) => {
        switch (difficulty) {
            case 'EASY': return 'from-success-light to-success';
            case 'MEDIUM': return 'from-accent-light to-accent';
            case 'HARD': return 'from-danger-light to-danger';
            default: return 'from-gray-200 to-gray-300';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-accent-light/10 to-primary-light/10">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="bg-gradient-to-r from-accent to-accent-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <Target className="w-12 h-12" />
                                <h1 className="text-5xl font-bold">Eco Challenges</h1>
                            </div>
                            <p className="text-lg opacity-90">Take on challenges, make a difference, earn rewards!</p>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10">
                            <Trophy className="w-64 h-64 transform rotate-12" />
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-4 mb-8"
                >
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search challenges..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-all bg-white shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((difficulty) => (
                            <motion.button
                                key={difficulty}
                                onClick={() => setFilterDifficulty(difficulty)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-4 rounded-xl font-bold transition-all ${filterDifficulty === difficulty
                                        ? 'bg-gradient-primary text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                                    }`}
                            >
                                {difficulty}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Challenges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChallenges.map((challenge, index) => (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="h-full flex flex-col p-6 hover:shadow-2xl transition-all duration-300 group">
                                {/* Header with Trophy */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getDifficultyGradient(challenge.difficulty)} shadow-md`}>
                                        <Trophy className="w-8 h-8 text-white" />
                                    </div>
                                    <Badge
                                        label={challenge.difficulty}
                                        variant={getDifficultyVariant(challenge.difficulty)}
                                        icon={<Sparkles className="w-3 h-3" />}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-accent transition-colors">
                                    {challenge.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 mb-4 flex-1 leading-relaxed">
                                    {challenge.description}
                                </p>

                                {/* XP Reward */}
                                <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-accent-light/20 to-primary-light/20 rounded-xl">
                                    <span className="text-sm font-bold text-gray-600">Reward</span>
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-accent fill-current" />
                                        <span className="text-xl font-bold text-accent">{challenge.xpReward} XP</span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Button
                                    variant="primary"
                                    fullWidth
                                    size="md"
                                    icon={<Award className="w-5 h-5" />}
                                    className="group-hover:scale-105 transition-transform"
                                >
                                    Start Challenge
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredChallenges.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Flame className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No challenges found</h3>
                        <p className="text-gray-500 text-lg">Try adjusting your filters to see more challenges!</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

