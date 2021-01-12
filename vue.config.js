/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-10-09 23:07:12
 * @LastEditTime: 2021-01-12 13:34:03
 */
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const WebpackBar = require("webpackbar");
const {
  publicPath,
  title,
  assetsDir,
  outputDir,
  lintOnSave,
  devPort,
} = require("./src/config");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    disableHostCheck: true,
    proxy: {
      "/service": {
        target: "http://106.14.36.72/",
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.transformAssetUrls = {
          avatar: "src",
        };
        return options;
      });
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "^": resolve("src/views"),
      },
    },
    plugins: [
      new WebpackBar({ name: title }),
      // new CompressionPlugin({
      //   test: /\.js$|\.css$|\.html$/,
      //   filename: "[path].gz[query]",
      //   algorithm: "gzip",
      //   minRatio: 0.8,
      //   threshold: 8192,
      // }),
    ],
  },
};
