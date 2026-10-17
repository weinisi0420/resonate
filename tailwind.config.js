/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFAF3',
          100: '#FDF2E1', // Exact palette swatch #5
          200: '#F5E6D3',
          300: '#EBD4BC',
        },
        rose: {
          50: '#FDF6F6',
          100: '#F4D6D3', // Exact palette swatch #4
          200: '#F5B5B8', // Exact palette swatch #3
          300: '#EB99A7', // Exact palette swatch #2
          400: '#D87A8B',
          500: '#CB6375', // Exact palette swatch #1
          600: '#B64B5D',
          700: '#943646',
          800: '#712330',
          900: '#4D141E',
        },
        // Map terracotta to the new rose palette for full backwards-compatibility
        terracotta: {
          50: '#FDF6F6',
          100: '#F4D6D3',
          200: '#F5B5B8',
          300: '#EB99A7',
          400: '#CB6375',
          500: '#B64B5D',
          600: '#943646',
          700: '#712330',
          800: '#4D141E',
          900: '#2E0C12',
        },
        sage: {
          50: '#F0F6F2',
          100: '#DCEBE0',
          200: '#B9D7C2',
          300: '#9BC4A9',
          400: '#81B29A',
          500: '#5F9279',
          600: '#4A735F',
          700: '#385A49',
          800: '#274035',
          900: '#172821',
        },
        sand: {
          50: '#FDF9F2',
          100: '#F8EEDC',
          200: '#EEDCBD',
        },
        ink: {
          700: '#4A3538',
          800: '#321E22',
          900: '#221215',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(50, 30, 34, 0.08), 0 6px 24px -6px rgba(50, 30, 34, 0.05)',
        'soft-lg': '0 8px 28px -6px rgba(50, 30, 34, 0.12), 0 16px 48px -12px rgba(50, 30, 34, 0.08)',
        glow: '0 0 0 4px rgba(203, 99, 117, 0.18)',
        'glow-sage': '0 0 0 4px rgba(129, 178, 154, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out both',
        'slide-up': 'slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pop': 'pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'shimmer': 'shimmer 2.2s linear infinite',
        'bar': 'barGrow 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        barGrow: {
          '0%': { width: '0%' },
        },
      },
    },
  },
  plugins: [],
};
