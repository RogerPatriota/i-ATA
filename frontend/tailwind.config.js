// tailwind.config.js
/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      liter: ['Liter', 'serif'],
    },
    keyframe: {
      progress: {
        '0%': { width: '0%' },
        '100%': { width: '100%' }, 
      },
    },
    animation: {
      progress: 'progress 1s ease-in',
    }
  },
};
export const plugins = [
  require('daisyui')
];