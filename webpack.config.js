/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");
const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    !withModules
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: !isProd
                ? "[path][name]__[local]"
                : "[hash:base64]",
            },
          },
        },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  target: !isProd ? "web" : "browserslist",
  entry: path.join(srcPath, "index.tsx"),
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  output: {
    path: buildPath,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
      favicon: "./src/styles/svg/logo.svg",
    }),
    new TsCheckerPlugin(),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: "[name]-[hash].css",
      }),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },

  devServer: {
    host: "localhost",
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },

  resolve: {
    extensions: [".tsx", ".jsx", ".js", ".ts"],
    alias: {
      components: path.join(srcPath, "components"),
      config: path.join(srcPath, "config"),
      styles: path.join(srcPath, "styles"),
      utils: path.join(srcPath, "utils"),
      models: path.join(srcPath, "models"),
      "@variables": path.join(srcPath, "styles/variables.scss"),
      "@mixins": path.join(srcPath, "styles/mixins.scss"),
      hooks: path.join(srcPath, "hooks"),
      pages: path.join(srcPath, "pages"),
      store: path.join(srcPath, "store"),
    },
  },
};
