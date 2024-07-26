/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'Montserrat': ['Montserrat', 'sans-serif'],
    }
  },
  daisyui: {
    themes: [{light:{
      primary: "#3A5AFF",
      secondary: "#FFC43B",
      accent: "#FF3B53",
      neutral: "#F2F2F2",
      "base-100": "#979797",
      info: "#C2A5DF",
    }}],
  },
  plugins: [require("daisyui")],
}
