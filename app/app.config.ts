export default defineAppConfig({
  global: {
    picture: {
      dark: "https://avatars.githubusercontent.com/u/65247407?v=4",
      light: "https://avatars.githubusercontent.com/u/65247407?v=4",
      alt: "My profile picture",
    },
    meetingLink: "https://cal.com/",
    email: "lipesalomao99@gmail.com",
    available: true,
  },
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral",
    },
  },
  uiPro: {
    pageHero: {
      slots: {
        container: "py-18 sm:py-24 lg:py-32",
        title: "mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl",
        description:
          "mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted",
      },
    },
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: "i-skill-icons:linkedin",
        to: "https://www.linkedin.com/in/felipe-lippi-61b159199/",
        target: "_blank",
        "aria-label": "Felipe Leite on LinkedIn",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/Lippi99",
        target: "_blank",
        "aria-label": "Felipe Leite on GitHub",
      },
    ],
  },
});
