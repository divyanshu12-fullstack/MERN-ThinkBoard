import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 157, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 255, 157, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(125% 125% at 50% 10%, #000 60%, rgba(0, 255, 157, 0.25) 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(0, 255, 157, 0.1) 0%, rgba(0, 255, 157, 0.05) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(0, 255, 157, 0.4), transparent)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 157, 0.3)',
        'glow-strong': '0 0 30px rgba(0, 255, 157, 0.5)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 30px rgba(0, 255, 157, 0.2)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest"],
  },
};