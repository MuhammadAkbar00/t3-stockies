/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@acme/tailwind-config")],
  plugins: [require("@tailwindcss/line-clamp")],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#412586",
        "light-gray": "#f2f2f2",
        "light-green": "#4DC33A",
        "light-green-background": "#4DC33A33",
      },
    },
  },
};
