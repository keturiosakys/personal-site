module.exports = {
  darkMode: 'media',
  purge: {
    content: ["_site/**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    colors: {
      theme: "var(--background-theme)",
      blogEntry: "var(--background-blog-entry)",
      themeDark: "var(--dark-background-theme)",
      blogEntryDark: "var(--dark-background-blog-entry)",

      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      tertiary: "var(--color-tertiary)",
      primaryDark: "var(--dark-color-primary)",
      secondaryDark: "var(--dark-color-secondary)",
      tertiaryDark: "var(--dark-color-tertiary)",

      contentColor: "var(--color-content)",
      colorAccent: "var(--color-accent)",
      contentColorDark: "var(--dark-color-content)",
      colorAccentDark: "var(--dark-color-accent)"
    },
    extend: {
      borderWidth: ['hover', 'focus'],
    }
  },
  variants: {},
  plugins: [],
};
