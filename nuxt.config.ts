import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/image", "@nuxt/scripts", "shadcn-nuxt", "@prisma/nuxt"],

  fonts: {
    provider: "google",
    families: [{ name: "DM Sans", weights: [200, 300, 400, 500, 600, 700, 800, 900] }]
  },

  app: {
    head: {
      script: [
        {
          innerHTML: `
                    if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                        document.documentElement.setAttribute("data-theme", "dark")
                        document.documentElement.classList.add("dark")
                    } else {
                        document.documentElement.removeAttribute("data-theme")
                        document.documentElement.classList.remove("dark")
                    }
                `,
          type: "text/javascript"
        }
      ]
    }
  },

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()]
  },

  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui"
  }
});