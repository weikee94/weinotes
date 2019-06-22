### 引入模式

```js
// es module
import Header from "./header.js";
export default Header;

// common js
var Header = require("./header.js");
module.exports = Header;
```

### 环境搭建

- npm install webpack webpack-cli -g (全局安装)
- npx webpack -v (显示当前目录 webpack version)
- npm info webpack (npm info history)

### 配置文件

- webpack.config.js (默认文件名字)
- 如果不要用默认名字，可以用 webpack --config thenameuwant.js

### What is Loader

- npm install file-loader -D (用在图片)
- npm install url-loader -D (差别就是图片可以已 base64 直接打包在 bundle, 推荐使用这个)

```js
// example using file loader handle image
module.exports = {
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif)$/,
          use: {
            loader: "url-loader",
            options: {
              // 其他配置
              // placeholder 占位符
              name: "[name].[ext]",
              outputPath: "images/",
              limit: 2048 // 大过这个size 生成在images folder 里面
            }
          }
        }
      ];
    }
}

// scss loader
module.exports = {
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
        modules: true
      }
    },
    "sass-loader",
    // help us add prefix: -m, -webkit, etc ...
    "postcss-loader"
  ]
}

// postcss.config.js 加前缀
module.exports = {
  plugins: [require("autoprefixer")]
};

// 字体加载
module.exports = {
  test: /\.(eot|ttf|svg|woff|woff2)$/,
  use: {
    loader: "file-loader"
  }
}

```
