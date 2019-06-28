const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        // 打包顺序-> postcss, sass, css, style 从下往上
        use: [
          // style-loader is used for 挂载
          // "style-loader",
          // 用minicss loader 替换style loader
          MiniCssExtractPlugin.loader,
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
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css"
    })
  ]
};

// module.exports = merge(commonConfig, prodConfig);

module.exports = prodConfig;
