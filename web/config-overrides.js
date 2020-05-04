const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TreatPlugin = require("treat/webpack-plugin");

module.exports = function override(config, env) {
  const isEnvDevelopment = env === "development";

  config.plugins.push(
    new TreatPlugin({
      outputLoaders: [
        isEnvDevelopment
          ? require.resolve("style-loader")
          : MiniCssExtractPlugin.loader,
      ],
    })
  );

  return config;
};
