const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AutoLoadImagePlugin = require("./plugins/auto-load-image-plugin.js");
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
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../image",
            outputPath: "image",
            limit: 100, //图片大于阈值 不会转base64,小于会转base64
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../image",
            outputPath: "image",
            limit: 1024 * 3, //图片大于阈值 不会转base64,小于会转base64
          },
        },
      },
      {
        test: /\.image$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../static",
            outputPath: "static",
            limit: 100
          },
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            limit: 100, //图片大于阈值 不会转base64,小于会转base64
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../", // 资源路径需要从css文件夹跳出去
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
    new AutoLoadImagePlugin({
      dir: "public",
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
