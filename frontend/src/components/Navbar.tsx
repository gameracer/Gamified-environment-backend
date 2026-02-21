import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./Button";
import {
    Trophy,
    LogOut,
    Home,
    Target,
    BookOpen,
    Award,
    User,
    Menu,
    X,
} from "lucide-react";

export const Navbar: React.FC = () => {
    const {role, user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!isAuthenticated) return null;


    const navLinks = [
        { to: "/", label: "Home", icon: Home },
        { to: "/challenges", label: "Challenges", icon: Target },
        { to: "/lessons", label: "Lessons", icon: BookOpen },
        { to: "/leaderboard", label: "Leaderboard", icon: Award },
        { to: "/profile", label: "Profile", icon: User },
        ...(role === "EDUCATOR" || role === "ADMIN"
            ? [{ to: "/educator", label: "Manage", icon: BookOpen }]
            : [])
    ];

    return (
        <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto h-16 flex justify-between items-center px-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-heading font-bold tracking-tight flex items-center gap-2"
                >
                    <div className="bg-primary p-1.5 rounded-lg">
                        <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-700">
            Seedling<span className="text-primary">Learn</span>
          </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.to;

                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition
                  ${
                                    isActive
                                        ? "bg-primary text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm">{link.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">

                    {/* User */}
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold shadow-md">
                            {user?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-gray-700">{user}</span>
                    </div>

                    <Button variant="danger" size="sm" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                    </Button>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden ml-2"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden border-t bg-white shadow-md">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.to;

                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 px-6 py-4 font-bold
                  ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
};
