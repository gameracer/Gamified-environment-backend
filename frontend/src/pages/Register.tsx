import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Rocket, User, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await api.register({ username, password, displayName });

            // Celebration confetti!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            login(data.token, username);
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-mesh relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-10 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
                    animate={{
                        y: [0, -40, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-10 left-20 w-40 h-40 bg-success/20 rounded-full blur-3xl"
                    animate={{
                        y: [0, 40, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5
                    }}
                />
                <motion.div
                    className="absolute top-1/3 left-1/4 w-28 h-28 bg-primary/20 rounded-full blur-3xl"
                    animate={{
                        x: [-30, 30, -30],
                        y: [-30, 30, -30],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2.5
                    }}
                />
            </div>

            <div className="w-full max-w-md px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="inline-block mb-4 relative"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Rocket className="w-20 h-20 mx-auto text-accent drop-shadow-lg" />
                        <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-8 h-8 text-primary" />
                        </motion.div>
                    </motion.div>
                    <h1 className="text-5xl font-bold gradient-text mb-2">Join the Adventure!</h1>
                    <p className="text-lg text-gray-700 font-medium">Create your learning hero profile</p>
                </motion.div>

                {/* Register Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card glass className="p-8 backdrop-blur-xl">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-danger/10 border-2 border-danger/30 text-danger p-4 rounded-xl font-bold text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <Input
                                label="Username"
                                placeholder="Choose your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={loading}
                                icon={<User className="w-5 h-5" />}
                                required
                            />

                            <Input
                                label="Display Name"
                                placeholder="How should we call you?"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                disabled={loading}
                                icon={<Sparkles className="w-5 h-5" />}
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Create a secure password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                icon={<Lock className="w-5 h-5" />}
                                required
                            />

                            <Button
                                variant="success"
                                type="submit"
                                fullWidth
                                size="lg"
                                className="mt-2"
                                loading={loading}
                                icon={<Rocket className="w-5 h-5" />}
                                iconPosition="right"
                            >
                                {loading ? 'Creating Account...' : 'Start Learning!'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary font-bold hover:text-primary-dark transition-colors">
                                    Login Here
                                </Link>
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Footer */}
                <motion.p
                    className="text-center mt-6 text-gray-600 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Start your journey to becoming a learning champion! 🎯
                </motion.p>
            </div>
        </div>
    );
};

