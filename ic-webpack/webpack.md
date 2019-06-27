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

### Preset-React

```js
npm install --save-dev @babel/preset-react

// .babelrc
{
  "presets": [
    "@babel/preset-react"
  ]
}

// example if u have two preset
// it will read start from below c->b->a
{
  "presets": [
    "@babel/preset-a",
    "@babel/preset-b",
    "@babel/preset-c"
  ]
}
```

### Tree Shaking

- only extract used modules
- only support es module, not support commonJS
- update setting in packagejson sideEffects (polyfill and css no need tree shaking)
- in production no need setup optimization for tree shaking it will add by default

```js
// math.js
const add = {};
const minus = {};

// index.js
add(); // when go to bundle u still can find minus have been bundled

// Tree shaking implementation
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true
  }
};
// package.json
{
  // can accept array
  // sideEffects: ["@babel/poly-fill","*.css"]
  "sideEffects": false,
}
```

### Development vs Production Bundling Setting

- seperate dev and prod.js
- npm install webpack-merge -D

```js
// package json update command
{
  "scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    "prod": "webpack --config webpack.prod.js"
  }
}

// webpack.prod.js
const merge = require("webpack-merge");
// 共用的放这里
const commonConfig = require("./webpack.common.js");

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map"
};

module.exports = merge(commonConfig, prodConfig);

```

### Code splitting

```js
// lets say business logic is 1mb, third party is 1mb
// it will bundle to main.js (total 2mb)
// when we update business logic, user need reload (2mb)
// but with code splitting
// we bundle two js file one(business logic), one(third party)
// when we update business logic, since thiry party remain same
// user only need reload (1mb which is business logic js file)
// example
module.exports = {
  entry: {
    businesslogic: './src/index.js',
    thirdparty: './src/thirdparty.js'
  }
}

// two way doing code splitting
// sync method: setting optimization in webpack.common.js
// webpack setting enable code splitting
module.exports = {
   optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
}

// async method: return import (not need do any changes)
function getComponent() {
  return import('lodash').then(({ default: _ }) => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['a', 'b'], '-');
    return element;
  })
}
getComponent().then(element => {
  document.body.appendChild(element)
})

// package.json (写这个目的是可以产出打包文件)
{
  "scripts": {
    "dev-build": "webpack --config webpack.dev.js",
  }
}

// webpack.common.js 想要回去上一级目录
module.exports = {
  output: {
    path: path.resolve(__dirname, "../dist"); // 意思是去dist上一级
  }
}

// 遇到cleanwebpack plugin show skipping error
module.exports = {
  plugins: [
    // 打包之前先清除dist folder
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../') // 这个意思是把root设成上一级再清除该级下的dist folder
    }),
  ],
}

// used for dynamic import
npm install babel-plugin-dynamic-import-webpack -D
// babelrc
{
  "plugins": ["dynamic-import-webpack"]
}

```

### Split chunks plugins

```js
// official dynamic import plugin
npm install --save-dev @babel/plugin-syntax-dynamic-import

// babelrc
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}

// index.js inside that webpackChunkName is how u define the file name
function getComponent() {
  return import(/* webpackChunkName:"lodash" */ "lodash").then(
    ({ default: _ }) => {
      var element = document.createElement("div");
      element.innerHTML = _.join(["a", "b"], "-");
      return element;
    }
  );
}

// webpack.common.js
module.exports = {
  optimization: {
    splitChunks: {
      // chunks: "all", // 异步同步都适用
      // chunks: "initial", // 同步
      chunks: "async", // 异步
      minSize: 30000, // 这个表示大过30kb就分割代码
      minChunks: 1, // 至少用一次就分割
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~", // 文件连接符号
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        // 当档案同时符合vendors default will based on priority decide using which one -10 > -20
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 引入的库是在node modules 会调用这个
          priority: -10 // 会生成 vendors~lodash.js
          filename: 'vendors.js' // 会生成vendors.js
        },
        default: { // 不在node modules去这里
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
          // a.js import c from 'c'
          // b.js import c from 'c'
          // 如果a模块引入c, b模块也同样使用, 就不必再引入多一次
        }
      }
    }
  },
}
```

### Lazy Loading

- by import to implement lazy loading

```js
// use es6 promise
function getComponent() {
  return import(/* webpackChunkName:"lodash" */ "lodash").then(
    ({ default: _ }) => {
      var element = document.createElement("div");
      element.innerHTML = _.join(["a", "b"], "-");
      return element;
    }
  );
}

// use es7 async await
async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName:"lodash" */ "lodash");
  var element = document.createElement("div");
  element.innerHTML = _.join(["a", "b"], "-");
  return element;
}

// vendors file get loaded when u click on the page
document.addEventListener("click", () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  });
});
```

### Webpack analyse, Preloading, Prefetching

```js
// package.json (this will generate json file which contain the
// result based on analyse on ur webpack file)
{
  "scripts": {
    "dev-build": "webpack --profile --json > stats.json --config webpack.dev.js"
  }
}

// option one
// webpack-bundle-analyzer

// option two
// put ur json file to here http://webpack.github.com/analyse for more details

// option three
// https://alexkuz.github.io/webpack-chart/
```
