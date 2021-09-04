// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: { path: ["./src/*"] },
    "postcss-px-to-viewport": {
      viewportWidth: 750, // viewportUnit: 'vmin',
      viewportUnit: "vw",
      minPixelValue: 1,
      fontViewportUnit: "vw",
      selectorBlackList: [".ignore-", ".hairlines", ".van-", ":root"],
      landscape: false,
      landscapeUnit: "vw", //横屏时使用的单位
      landscapeWidth: 1134, //横屏时使用的视口宽度
    },
  },
};
