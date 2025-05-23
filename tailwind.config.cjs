/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        inconsolata: ["var(--font-inconsolata)"],
        oswald: ["var(--font-oswald)"],
        dmMono: "var(--font-dm-mono)",
        comfortaa: "var(--font-comfortaa)",
      },
      colors: {
        accent: "var(--accent)",
        light: "var(--light)",
        lighter: "var(--lighter)",
        darker: "var(--darker)",
        tabsbar: "var(--tabsbar)",
        menu: "var(--menu)",
        tabsBg: "var(--tabsBg)",
        sidebarBg: "var(--sidebarBg)",
        explorerBg: "var(--explorerBg)",
        activeTabText: "var(--activeTabText)",
        activeTabBg: "var(--activeTabBg)",
        activeExplorerTab: "var(--activeExplorerTab)",
        react: "var(--react)",
        reactHover: "var(--reactHover)",
        tailwind: "var(--tailwind)",
        tailwindHover: "var(--tailwindHover)",
        redux: "var(--redux)",
        reduxHover: "var(--reduxHover)",
        firebase: "var(--firebase)",
        firebaseHover: "var(--firebaseHover)",
        styled: "var(--styled)",
        styledHover: "var(--styledHover)",
        material: "var(--material)",
        materialHover: "var(--materialHover)",
        mysql: "var(--mysql)",
        mysqlHover: "var(--mysqlHover)",
        axios: "var(--axios)",
        axiosHover: "var(--axiosHover)",
        zustand: "var(--zustand)",
        zustandHover: "var(--zustandHover)",
        clerk: "var(--clerk)",
        clerkHover: "var(--clerkHover)",
        sanity: "var(--sanity)",
        sanityHover: "var(--sanityHover)",
        typescript: "var(--typescript)",
        typescriptHover: "var(--typescriptHover)",
      },
    },
  },
};
