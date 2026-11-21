/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B1020',
        sidebar: '#111831',
        primary: {
          DEFAULT: '#7657F6',
          hover: '#6442E8',
          light: '#9178F8',
          subtle: 'rgba(118, 87, 246, 0.15)',
        },
        secondary: {
          DEFAULT: '#A78BFA',
          subtle: 'rgba(167, 139, 250, 0.15)',
        },
        accent: {
          DEFAULT: '#FFC857',
          hover: '#E5B144',
          subtle: 'rgba(255, 200, 87, 0.15)',
        },
        surface: {
          DEFAULT: '#171F3A',
          card: '#1A2342',
          hover: '#222D52',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        text: {
          DEFAULT: '#F8FAFC',
          muted: '#A5B0C5',
          dim: '#6B7A99',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(118, 87, 246, 0.4)',
        'glow-accent': '0 0 25px -5px rgba(255, 200, 87, 0.3)',
        'surface': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
