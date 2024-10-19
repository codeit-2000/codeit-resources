module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "/components",
            "@navigation": "/navigation",
            "@hooks": "/hooks",
            "@screens": "/screens",
            "@lib": "/lib",
            "@assets": "/assets",
          },
        },
      ],
    ],
  };
};
