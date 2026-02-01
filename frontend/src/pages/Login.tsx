import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Sparkles, User, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await api.login({ username, password });
            login(data.token, username);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-mesh relative overflow-hidden py-12 px-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-40 h-40 bg-primary/25 rounded-full blur-3xl"
                    animate={{
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/25 rounded-full blur-3xl"
                    animate={{
                        y: [0, 30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/3 w-28 h-28 bg-accent/25 rounded-full blur-3xl"
                    animate={{
                        x: [-20, 20, -20],
                        y: [-20, 20, -20],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="inline-block mb-5"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Sparkles className="w-20 h-20 mx-auto text-accent drop-shadow-[0_4px_20px_rgba(251,191,36,0.4)]" />
                    </motion.div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text mb-2 tracking-tight">Welcome Back!</h1>
                    <p className="text-base sm:text-lg text-gray-600 font-medium">Continue your learning adventure</p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card glass className="p-6 sm:p-8 rounded-2xl shadow-xl border border-white/50">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl font-semibold text-center text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <Input
                                label="Username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={loading}
                                icon={<User className="w-5 h-5" />}
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                icon={<Lock className="w-5 h-5" />}
                                required
                            />

                            <Button
                                variant="primary"
                                type="submit"
                                fullWidth
                                size="lg"
                                className="mt-2"
                                loading={loading}
                                icon={<ArrowRight className="w-5 h-5" />}
                                iconPosition="right"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-200/80 text-center">
                            <p className="text-gray-600 text-sm">
                                New to the adventure?{' '}
                                <Link
                                    to="/register"
                                    className="text-primary font-bold hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-1 py-0.5 transition-colors"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Footer */}
                <motion.p
                    className="text-center mt-8 text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Join thousands of students learning together! 🚀
                </motion.p>
            </div>
        </div>
    );
};

