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
        <div className="min-h-screen flex items-center justify-center bg-gradient-mesh relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
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
                    className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
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
                    className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-3xl"
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

            <div className="w-full max-w-md px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="inline-block mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Sparkles className="w-20 h-20 mx-auto text-accent drop-shadow-lg" />
                    </motion.div>
                    <h1 className="text-5xl font-bold gradient-text mb-2">Welcome Back!</h1>
                    <p className="text-lg text-gray-700 font-medium">Continue your learning adventure</p>
                </motion.div>

                {/* Login Card */}
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

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                New to the adventure?{' '}
                                <Link to="/register" className="text-primary font-bold hover:text-primary-dark transition-colors">
                                    Create Account
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
                    Join thousands of students learning together! 🚀
                </motion.p>
            </div>
        </div>
    );
};

