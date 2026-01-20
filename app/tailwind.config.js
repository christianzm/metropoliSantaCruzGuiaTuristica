// tailwind.config.js
module.exports = {
  // ... tu configuración existente
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.8s ease-out'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Muy útil para estilizar texto desde CMS
  ],
}

// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        'spain-red': '#D83131',
        'spain-yellow': '#F4B400',
        'spain-blue': '#1A73E8',
        'dark-gray': '#333333',
        'off-white': '#F8F5F2',
      },
      fontFamily: {
        // Agrega aquí las fuentes si las importas en tu proyecto
        'montserrat': ['Montserrat', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
}