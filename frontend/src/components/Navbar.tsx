import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { Trophy, LogOut, Home, Target, BookOpen, Award, User } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAuthenticated) return null;

    const navLinks = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/challenges', label: 'Challenges', icon: Target },
        { to: '/lessons', label: 'Lessons', icon: BookOpen },
        { to: '/leaderboard', label: 'Leaderboard', icon: Award },
        { to: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto h-16 flex justify-between items-center">
                <Link to="/" className="text-2xl font-heading font-bold text-(--color-primary) tracking-tight flex items-center gap-2 hover:scale-105 transition-transform">
                    <div className="bg-(--color-primary) p-1.5 rounded-lg">
                        <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-700">Gamified<span className="text-(--color-primary)">Learn</span></span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${isActive
                                        ? 'bg-[var(--color-primary)] text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm">{link.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/398e4298a3b39ce566050e5c041949ef.svg" className="w-7 h-7" alt="streak" />
                            <span className="font-bold text-orange-500 group-hover:opacity-80">12</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b9e8d0463622.svg" className="w-7 h-7" alt="gems" />
                            <span className="font-bold text-[var(--color-secondary)] group-hover:opacity-80">540</span>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold shadow-md">
                                {user?.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-gray-700">{user}</span>
                        </div>
                        <Button variant="danger" size="sm" onClick={handleLogout}>
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
