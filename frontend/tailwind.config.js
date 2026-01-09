/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Poppins', 'Fredoka', 'sans-serif'],
                body: ['Inter', 'Nunito', 'sans-serif'],
                accent: ['Space Grotesk', 'monospace'],
            },
            colors: {
                primary: {
                    DEFAULT: 'hsl(220, 90%, 60%)',
                    dark: 'hsl(220, 90%, 45%)',
                    light: 'hsl(220, 90%, 75%)',
                    glow: 'hsla(220, 90%, 60%, 0.3)',
                },
                secondary: {
                    DEFAULT: 'hsl(280, 85%, 65%)',
                    dark: 'hsl(280, 85%, 50%)',
                    light: 'hsl(280, 85%, 80%)',
                },
                accent: {
                    DEFAULT: 'hsl(45, 95%, 60%)',
                    dark: 'hsl(45, 95%, 45%)',
                    light: 'hsl(45, 95%, 75%)',
                },
                success: {
                    DEFAULT: 'hsl(150, 75%, 50%)',
                    dark: 'hsl(150, 75%, 35%)',
                    light: 'hsl(150, 75%, 65%)',
                },
                danger: {
                    DEFAULT: 'hsl(10, 85%, 60%)',
                    dark: 'hsl(10, 85%, 45%)',
                    light: 'hsl(10, 85%, 75%)',
                },
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, hsl(220, 90%, 60%) 0%, hsl(280, 85%, 65%) 100%)',
                'gradient-accent': 'linear-gradient(135deg, hsl(45, 95%, 60%) 0%, hsl(30, 95%, 60%) 100%)',
                'gradient-success': 'linear-gradient(135deg, hsl(150, 75%, 50%) 0%, hsl(170, 75%, 50%) 100%)',
                'gradient-mesh': 'radial-gradient(at 0% 0%, hsl(220, 90%, 75%) 0px, transparent 50%), radial-gradient(at 100% 0%, hsl(280, 85%, 80%) 0px, transparent 50%), radial-gradient(at 100% 100%, hsl(45, 95%, 75%) 0px, transparent 50%), radial-gradient(at 0% 100%, hsl(150, 75%, 65%) 0px, transparent 50%)',
            },
            boxShadow: {
                'sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'md': '0 4px 16px rgba(0, 0, 0, 0.1)',
                'lg': '0 8px 32px rgba(0, 0, 0, 0.12)',
                'xl': '0 16px 48px rgba(0, 0, 0, 0.15)',
                '3d': '0 6px 0 rgba(0, 0, 0, 0.15)',
                'glow': '0 0 24px hsla(220, 90%, 60%, 0.3)',
                'glow-accent': '0 0 24px hsla(45, 95%, 60%, 0.4)',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'slide-up': 'slide-up 0.4s ease-out',
                'shake': 'shake 0.5s ease-in-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                'bounce-in': {
                    '0%': { opacity: '0', transform: 'scale(0.3)' },
                    '50%': { opacity: '1', transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)' },
                },
                'slide-up': {
                    'from': { opacity: '0', transform: 'translateY(30px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}

