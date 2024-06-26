/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  printWidth: 100,
  arrowParens: "avoid",
  experimentalTernaries: true,
}

export default config
