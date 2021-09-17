// vue.config.js
module.exports = {
  pages: {
    index: {
      entry: "examples/main.ts",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  css: {
    sourceMap: true
  }
};
