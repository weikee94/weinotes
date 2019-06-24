const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path"); // 用来找path

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  module: {
    rules: [
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
        test: /\.scss$/,
        // 打包顺序-> postcss, sass, css, style 从下往上
        use: [
          // style-loader is used for 挂载
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // 为了解决import scss in scss file,
              // 如果不加import loaders
              // 会直接执行 css skip sass and postcss loader
              importLoaders: 2
              // 模块化引入css
              // modules: true
            }
          },
          "sass-loader",
          // help us add prefix: -m, -webkit, etc ...
          "postcss-loader"
        ]
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
  output: {
    filename: "bundle.js", //dest file name
    path: path.resolve(__dirname, "dist") //dest folder name
  }
};
