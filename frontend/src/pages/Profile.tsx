import React, {useEffect, useMemo, useState} from 'react';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useAuth } from '../context/AuthContext';
import {
    Trophy,

    Flame,

    Settings,
    LogOut,
    TrendingUp,
    Award,
    Gem
} from 'lucide-react';
import { motion } from 'framer-motion';
import type {UserProfile} from "../types/UserProfile.ts";
import {getCurrentUser} from "../services/UserService.ts";

export const Profile: React.FC = () => {
    const { logout } = useAuth();
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await getCurrentUser();
                setCurrentUser(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    if (loading)
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10">
                <Navbar />
                    <p>Loading...</p>;
            </div>)
    if (!currentUser) return (
            <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10">
                <Navbar />
                    <p>Failed to load profile.</p>;
            </div>)


    // 🔥 Calculate XP Progress
    const xpForNextLevel = currentUser?.level * 1000 || 1000;
    const progressPercent = currentUser
        ? Math.min((currentUser.xp / xpForNextLevel) * 100, 100)
        : 0;

    const unlockedBadges = currentUser?.badges?.length || 0;

    const roleColor =
        currentUser.role === "EDUCATOR"
            ? "text-purple-600"
            : "text-primary-400";


    if (!currentUser) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* ================= HEADER ================= */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="mb-8 relative overflow-hidden p-0 shadow-2xl rounded-3xl">
                        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-primary via-secondary to-accent" />

                        <div className="relative pt-24 pb-8 px-8">
                            <div className="flex flex-col md:flex-row items-center gap-8">

                                {/* Avatar */}
                                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-6xl shadow-2xl border-4 border-white">
                                    {currentUser.displayName.charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-4xl font-bold text-gray-800 mb-1">
                                        {currentUser.displayName}
                                    </h1>

                                    <p className={`font-bold mb-3 uppercase tracking-wide ${roleColor}`}>
                                        {currentUser.role}
                                    </p>

                                    {/* XP Progress */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Level {currentUser.level}</span>
                                            <span>{currentUser.xp} / {xpForNextLevel} XP</span>
                                        </div>

                                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercent}%` }}
                                                transition={{ duration: 1 }}
                                                className="h-full bg-gradient-to-r from-primary to-accent"
                                            />
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        <Badge label={`${currentUser.gems} Gems`} variant="secondary" icon={<Gem className="w-4 h-4" />} />
                                        <Badge label={`${currentUser.streak} Day Streak`} variant="danger" icon={<Flame className="w-4 h-4" />} />
                                        <Badge label={`${unlockedBadges} Badges`} variant="accent" icon={<Trophy className="w-4 h-4" />} />
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

                {/* ================= BODY ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT SIDE - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        <Card className="p-6 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-primary" />
                                Statistics
                            </h2>

                            <div className="space-y-4">

                                <StatRow label="Total XP" value={currentUser.xp} />
                                <StatRow label="Level" value={currentUser.level} />
                                <StatRow label="Gems" value={currentUser.gems} />
                                <StatRow label="Current Streak" value={`${currentUser.streak} days`} />

                            </div>
                        </Card>
                    </motion.div>

                    {/* RIGHT SIDE - Achievements */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card className="p-6 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Trophy className="w-8 h-8 text-accent" />
                                Achievements
                            </h2>

                            {currentUser.badges.length === 0 ? (
                                <p className="text-gray-500 text-center py-10">
                                    No badges earned yet. Complete challenges to unlock achievements!
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {currentUser.badges.map((badge: any) => (
                                        <div key={badge.id} className="text-center">
                                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-200 p-1 shadow-xl">
                                                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                                                    <Award className="w-16 h-16 text-gray-700" />
                                                </div>
                                            </div>
                                            <p className="font-bold text-sm text-gray-800 mt-3">{badge.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

/* ================= Reusable Stat Component ================= */

const StatRow = ({ label, value }: { label: string; value: any }) => (
    <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="font-bold text-xl text-primary">{value}</span>
    </div>
);
