import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ═══════════════════════════════════════════
           NEURAL 'G' — García Audit & Tech Strategy
           Regla 60-30-10:
             60% → white / soft-slate
             30% → oxford (Deep Oxford Blue)
             10% → accent (Emerald Green / Slate Blue)
        ═══════════════════════════════════════════ */

        // ── Primary: Deep Oxford Blue (#0A2540) — Autoridad y Rigor ──
        oxford: {
          50: '#e6edf5',
          100: '#c0d0e3',
          200: '#96b0cf',
          300: '#6b90bb',
          400: '#4b78ad',
          500: '#2b609f',
          600: '#1a4a7e',
          700: '#123660',
          800: '#0A2540', // ← Hero color
          900: '#071a2e',
          950: '#040f1b',
        },

        // ── Primary: Emerald Green (#059669) — Crecimiento y Validación ──
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981',
          600: '#059669', // ← Brand green
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },

        // ── Primary: Slate Blue (#6772E5) — Innovación Digital / IA ──
        sblue: {
          50: '#eef0fd',
          100: '#d5d9f8',
          200: '#b8bef3',
          300: '#9ba3ee',
          400: '#838de9',
          500: '#6772E5', // ← Brand blue
          600: '#5560d4',
          700: '#454ebf',
          800: '#373fa0',
          900: '#2c3383',
          950: '#1a1e52',
        },

        // ── Secondary: Backgrounds & Text ──
        soft: {
          slate: '#F8FAFC', // Fondo web / reportes
        },
        charcoal: '#1E293B',    // Cuerpo de texto
        coolgrey: '#E2E8F0',    // Líneas y divisores

        // ── Semantic: Power BI & Auditoría ──
        semantic: {
          success: '#10B981',  // Cumplimiento total
          danger: '#EF4444',  // Riesgo / Alerta
          warning: '#F59E0B',  // En revisión
          ai: '#8B5CF6',  // Violeta Eléctrico — IA
        },

        // ── Legacy aliases (compatibility) ──
        primary: {
          50: '#e6edf5',
          100: '#c0d0e3',
          200: '#96b0cf',
          300: '#6b90bb',
          400: '#4b78ad',
          500: '#2b609f',
          600: '#0A2540',
          700: '#071a2e',
          800: '#040f1b',
          900: '#030b12',
          950: '#020508',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Consolas', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(10, 37, 64, 0.08)',
        'glass-lg': '0 24px 48px 0 rgba(10, 37, 64, 0.12)',
        'elevation-1': '0 1px 3px 0 rgba(10, 37, 64, 0.08), 0 1px 2px 0 rgba(10, 37, 64, 0.04)',
        'elevation-2': '0 4px 6px -1px rgba(10, 37, 64, 0.08), 0 2px 4px -1px rgba(10, 37, 64, 0.04)',
        'elevation-3': '0 10px 15px -3px rgba(10, 37, 64, 0.08), 0 4px 6px -2px rgba(10, 37, 64, 0.03)',
        'oxford': '0 4px 14px 0 rgba(10, 37, 64, 0.25)',
        'emerald': '0 4px 14px 0 rgba(5, 150, 105, 0.25)',
        'sblue': '0 4px 14px 0 rgba(103, 114, 229, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'oxford-gradient': 'linear-gradient(135deg, #0A2540 0%, #123660 100%)',
        'brand-gradient': 'linear-gradient(135deg, #0A2540 0%, #059669 50%, #6772E5 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
