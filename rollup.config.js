import shebang from '@robmarr/rollup-plugin-shebang'


export default {
  input: ["src/index.js"],
  plugins: [
    shebang(),
  ],
};
