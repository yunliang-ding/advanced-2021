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
        test: /app.router.js/,
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
