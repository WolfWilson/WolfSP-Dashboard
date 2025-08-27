/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'wolf-primary': '#3b82f6',    // blue-500
        'wolf-secondary': '#6b7280',  // gray-500
        'wolf-accent': '#10b981',     // emerald-500
        'wolf-background': '#f9fafb', // gray-50
        'wolf-surface': '#ffffff',    // white
        'wolf-error': '#ef4444',      // red-500
        'wolf-text-primary': '#1f2937', // gray-800
        'wolf-text-secondary': '#4b5563', // gray-600
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
