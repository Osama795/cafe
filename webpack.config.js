const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
    entry: {
      app: "./src/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.js',
    },
    performance: {
      hints: false
    },
    module: {
    rules: [
        {
        test: /\.(sass|css|scss)$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../',
                }
            },
            "css-loader",
            "sass-loader",
            ],
        },
        
        {
            test: /\.(webp|png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: "images",
              }
            },
            ],
        },

        {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: "fonts",
              }
            },
            ],
        },

        {
            test: /\.html$/i,
            loader: 'html-loader',
        },

        {
          test: require.resolve("jquery"),
          loader: "expose-loader",
          options: {
            exposes: ["$", "jQuery"],
          },
        },
    ],
    
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/about.html",
        filename: "about.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/contact.html",
        filename: "contact.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/services.html",
        filename: "services.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/reviews.html",
        filename: "reviews.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/reservation.html",
        filename: "reservation.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/distributors.html",
        filename: "distributors.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/cappuccino-details.html",
        filename: "cappuccino-details.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/coffee-details.html",
        filename: "coffee-details.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/turkishCoffee-details.html",
        filename: "turkishCoffee-details.html"
        }),
        new HtmlWebpackPlugin({
        template: "./src/shoping-cart.html",
        filename: "shoping-cart.html"
        }),

        new MiniCssExtractPlugin({ filename: "css/style.css" })
    ],
};