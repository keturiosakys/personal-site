module.exports = {
  darkMode: "media",
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
        themeDark: "var(--dark-background-theme)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        primaryDark: "var(--dark-color-primary)",
        secondaryDark: "var(--dark-color-secondary)",
        tertiaryDark: "var(--dark-color-tertiary)",

        contentColor: "var(--color-content)",
        colorAccent: "var(--color-accent)",

        colorMarker: "var(--color-marker)",
        contentColorDark: "var(--dark-color-content)",
        colorAccentDark: "var(--dark-color-accent)",
        colorMarkerDark: "var(--dark-color-marker)",
      },
    },
  },
  variants: {},
  plugins: [],
};
