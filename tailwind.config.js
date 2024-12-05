module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#E2E8F0",
          secondary: "#CBD5E1",
          background: "#F8FAFC",
          text: "#1E293B",
        },
        dark: {
          primary: "#1E293B",
          secondary: "#4B5563",
          background: "#0F172A",
          text: "#F8FAFC",
        },
        custom: {
          primary: "#FFD700", // Oro
          secondary: "#FF6347", // Rojo tomate
          background: "#282C35", // Fondo oscuro personalizado
          text: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
