// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'Salon': "url('./assets/Salon.jpg')",
        'SalonInterior': "url('./assets/SalonInterior.jpg')",
      },
      fontFamily: {
        body: ['Montserrat']
      }
    },
  },
  plugins: [],
};
