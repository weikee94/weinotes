const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");

const commonConfig = {
  entry: {
    main: "./src/index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // placeholder 占位符
            name: "[name].[ext]",
            outputPath: "images/",
            limit: 2048 // 大过这个size 生成在images folder 里面
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: "file-loader"
        }
      }
    ]
  },
  plugins: [
    // 打包之前先清除dist folder
    new CleanWebpackPlugin(),
    // html 模版
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
  optimization: {
    // tree shaking example
    usedExports: true,
    splitChunks: {
      chunks: "all"
    },
    runtimeChunk: {
      //兼容老版本webpack4，把manifest打包到runtime里，不影响业务代码和第三方模块
      name: "runtime"
    }
  },
  output: {
    // publicPath: "http://cdn.com",
    filename: "[name].[contenthash].js", //dest file name,
    chunkFilename: "[name].chunk.js", //main.js异步加载的间接的js文件。用来打包import('module')方法中引入的模块
    path: path.resolve(__dirname, "dist") //dest folder name
  }
};

module.exports = env => {
  if (env && env.production) {
    //线上环境
    return merge(commonConfig, prodConfig);
  } else {
    //开发环境
    return merge(commonConfig, devConfig);
  }
};
