/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false // 禁用默认样式，避免与 Ant Design 冲突[7](@ref)
  }
}

