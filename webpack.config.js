const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const routerwebpackplugin = require("./plugins/router-webpack-plugin.js");
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  resolveLoader: {
    modules: ["./node_modules", "./loaders"],
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            limit: 1024 * 3, //图片大于阈值 不会转base64,小于会转base64
          },
        },
      },
      {
        test: /\.(woff|woff2|svg|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /router.auto.js/,
        use: [
          {
            loader: "router-loader",
            options: {
              useDir: "docs",
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: "raw-loader",
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
    // open: true,
    port: 8080,
  },
  plugins: [
    new routerwebpackplugin({
      useDir: "docs",
    }),
    new htmlwebpackplugin({
      template: path.join(__dirname, `./view/index.html`),
      filename: `index.html`,
      chunks: "index",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
};
