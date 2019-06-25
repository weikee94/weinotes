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

### Webpack Plugins (-D = --save-dev)

- plugins 会在某个时刻帮你做一些设定或事情
- htmlWebpackPlugin 会在打包结束后，生成一个 html 文件，并把生成 js 放到 html 里面

```js
npm install html-webpack-plugin -D

const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports ={
   plugins: [
    // html 模版
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
}
```

- cleanWebpackPlugin clean the old one before generate new one

```js
npm install clean-webpack-plugin -D

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports ={
   plugins: [
    // 打包之前先清除dist folder
    new CleanWebpackPlugin(),
  ],
}
```

### Entry and output basic setup

```js
// entry
module.exports = {
  entry: {
    main: "./src/index.js",
    sub: "./src/index.js"
  }
};

// output
module.exports = {
  output: {
    // 这个是给你加前面的path
    publicPath: "http://cdn.com",
    // 这个可以依据entry修改file名
    filename: "[name].js", //dest file name
    path: path.resolve(__dirname, "dist") //dest folder name
  }
};

// based on top settings it will generate below result
 <script type="text/javascript" src="http://cdn.com/main.js"></script>
 <script type="text/javascript" src="http://cdn.com/sub.js"></script>

```

### sourcemap setup

- sourcemap 解决打包出错提示源代码的位置

```js
// source map 会生成.map 文件
// inline 会把.map 合拼
// cheap 只管理业务代码, 会显示第几行错了
// module 会管除了业务代码，loader那些也一起

// production cheap-module-source-map
// development cheap-module-eval-source-map
module.exports = {
  devtool: "cheap-module-eval-source-map"
};
```

### webpack dev server

- build local server

```js
npm install webpack-dev-server -D
module.exports = {
  devServer: {
    // the folder to run the local host
    contentBase: "./dist",
    // open true means auto open browser and point to the localhost
    open: true
  }
};
```

### Hot Module Replacement (HMR)

- update css only replace component instead refresh entire page

```js
// index (enable hmr)
if (module.hot) {
  module.hot.accept("./number", () => {
    document.getElementById("number");
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}

const webpack = require("webpack");

module.exports = {
  devServer: {
    hot: true,
    hotOnly: true
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

### ES6 to ES5 for older browser support (use babel)

```js
npm install --save-dev babel-loader @babel/core
npm install @babel/preset-env --save-dev
npm install --save @babel/polyfill

// index.js
import "@babel/polyfill";

// webpack.config.js
module.exports ={
 module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                // polyfills are automatically imported when needed.
                // make the size smaller
                useBuiltIns: "usage"
              }
            ]
          ]
        }
      },
    ]
}
```
