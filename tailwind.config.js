/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {

    extend: {
      screens: {

        "1300px": "1300px",
        "1200px": "1200px",
        "1100px": "1110px",
        "1000px": "1000px",
        "800px": "800px",
        "500px": "500px",
        "400px": "400px",
        "300px": "300px"

      },
      colors: {
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" },
        body: { "gradient-one": "#062C2F", "gradient-two": "#09616A", "lightMode": "#AAD7D9" },
        c_color: { "colorOne": "#063134", "colorTwo": "#69D3DC", "colorThree": "#b7e2e6", "colorFour": "#008E80", "colorFive": "#009B7D", "colorSix": "#0D4549", "colorSeven": "#012027" }

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        "roboto": ["Roboto", "sans - serif"],
        "poppins": ["Poppins", "sans - serif"],
        'body': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        'sans': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      }
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require('tailwind-scrollbar-hide'),
    require('daisyui'),
  ],
}

// "lightMode": "#AAD7D9"