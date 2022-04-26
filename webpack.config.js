const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "production",

  devServer: {
    watchFiles: ["./src/*"],
    open: true,
    hot: true,
  },

  output: {
    filename: "main.js",
    clean: true,
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /style\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /style\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: false,
          minimize: true,
        },
      },
      {
        test: /\.(png|svg|jpg|gif|webp)%/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "style.css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets/",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};
