module.exports = {
  darkMode: "false",
  purge: {
    content: ["_site/**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    extend: {
      colors: {
        theme: "var(--background-theme)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",

        contentColor: "var(--color-content)",
        colorAccent: "var(--color-accent)",

        colorMarker: "var(--color-marker)",
      },
    },
  },
  variants: {},
  plugins: [],
};
