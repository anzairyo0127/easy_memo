import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isDev = process.env.NODE_ENV === "development";

const base: Configuration = {
  mode: isDev ? "development" : "production",
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    filename: "[name].js",
    assetModuleFilename: "images/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: isDev },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(bmp|ico|gif|jpe?g|png|ttf|eot|woff?2?)$/,
        type: "asset/resource",
      },
      {
        test: /\.ejs$/,
        use: [
          "html-loader",
          "ejs-plain-loader"
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  devtool: isDev ? "inline-source-map" : false,
};

const main: Configuration = {
  ...base,
  target: "electron-main",
  entry: {
    main: "./src/main/main.ts",
  },
};

const preload: Configuration = {
  ...base,
  target: "electron-preload",
  entry: {
    preload: "./src/preloads/preload.ts",
  },
};

const renderer: Configuration = {
  ...base,
  target: "web",
  entry: {
    renderer: "./src/render/renderer.tsx",
  },
  plugins: [
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      template: "./src/render/view/index.ejs",
      minify: !isDev,
      inject: "body",
      filename: "index.html",
      scriptLoading: "blocking",
    }),
  ],
};

export default [main, preload, renderer, ];
