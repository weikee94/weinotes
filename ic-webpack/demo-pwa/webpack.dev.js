const webpack = require("webpack");

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    hot: true
    // hotOnly: true
  },
  module: {
    rules: [
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
        test: /\.css$/,
        // 打包顺序-> postcss, sass, css, style 从下往上
        use: [
          // style-loader is used for 挂载
          "style-loader",
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
  // optimization: {
  //   // tree shaking example
  //   usedExports: true
  // },
};

// module.exports = merge(commonConfig, devConfig);
module.exports = devConfig;
