/* eslint-disable ts/no-require-imports */
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['12px', '20px'],
        sm: ['14px', '22px'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        signUpForm: {
          '0%': { transform: 'translateX(16px)' },
          '100%': { transform: 'translateX(332px)' },
        },
        signInForm: {
          '0%': { transform: 'translateX(332px)' },
          '100%': { transform: 'translateX(16px)' },
        },
        signUpLogo: {
          '0%': { transform: 'translateX(332px)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' },
          '90%': { boxShadow: '0 4px 16px rgba(0,0,0,0.3)' },
          '100%': { transform: 'translateX(16px)', boxShadow: 'none' },
        },
        signInLogo: {
          '0%': { transform: 'translateX(16px)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' },
          '90%': { boxShadow: '0 4px 16px rgba(0,0,0,0.3)' },
          '100%': { transform: 'translateX(332px)', boxShadow: 'none' },
        },
      },
      animation: {
        signInForm: 'signInForm 0.5s ease-in-out forwards',
        signUpForm: 'signUpForm 0.5s ease-in-out forwards',
        signInLogo: 'signInLogo 0.5s ease-in-out forwards',
        signUpLogo: 'signUpLogo 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
