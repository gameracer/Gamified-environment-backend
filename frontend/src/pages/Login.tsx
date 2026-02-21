import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Sparkles, User, Lock } from 'lucide-react';
// import { motion } from 'framer-motion';

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
            login(data.token, data.user, data.role);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-mesh font-body">

            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-10">
                    <Sparkles aria-hidden className="w-14 h-14 mx-auto text-accent mb-4" />

                    <h1 className="text-3xl font-heading font-extrabold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-gray-700">
                        Continue your learning adventure
                    </p>
                </div>

                <Card className="p-6 sm:p-8 rounded-2xl shadow-xl bg-white/90 backdrop-blur-xs">

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {error && (
                            <div
                                role="alert"
                                aria-live="assertive"
                                className="bg-danger/10 border border-danger/30 text-danger p-3 rounded-lg text-sm text-center"
                            >
                                {error}
                            </div>
                        )}

                        <Input
                            autoFocus
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            icon={<User className="w-5 h-5" />}
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            icon={<Lock className="w-5 h-5" />}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            disabled={loading}
                            className="bg-gradient-primary shadow-glow active:scale-95 transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-700 text-sm">
                            New here?{" "}
                            <Link
                                to="/register"
                                className="text-primary font-semibold hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>

                </Card>

                <p className="text-center mt-8 text-gray-600 text-sm">
                    Join thousands of students learning together 🚀
                </p>

            </div>
        </div>
    );
};

