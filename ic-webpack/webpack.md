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
    filename: "[name].js", //dest file name,
    chunkFilename: '[name].chunk.js',//main.js异步加载的间接的js文件。用来打包import('module')方法中引入的模块
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

// Prefetch (example need investigate more)
document.addEventListener("click", () => {
  import(/* webpackPrefetch: true */ "./click.js").then(({ default: func }) => {
    func();
  });
  // var element = document.createElement("div");
  // element.innerHTML = "lala";
  // document.body.appendChild(element);
});
```

### CSS bundle

```js
//抽离css文件
npm install --save-dev mini-css-extract-plugin
//压缩css文件
npm i optimize-css-assets-webpack-plugin -D

// package.json
{
    "sideEffects": ["*.css"] //除了css文件，其余的都TreeShaking
}

// webpack.prod.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        // 打包顺序-> postcss, sass, css, style 从下往上
        use: [
          // style-loader is used for 挂载
          // "style-loader"
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
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({
      filename: '[name].css',//直接引用的css文件
			chunkFilename: '[name].chunk.css'//间接引用的css文件
  })]
}

// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
}

```

### Shimming

```js
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery", //发现模块中有$字符串，就自动引入iquery,就可以用jquery
      _join: ["lodash", "join"] //_join代表lodash里的join方法
    })
  ]
};

// 如果想让每个js模块的this都指向window
// npm install imports-loader -D

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            //每个js模块的this都指向window
            loader: "imports-loader?this=>window"
          }
        ]
      }
    ]
  }
};
```

### Caching

```js
module.exports = {
  output: {
    filename: "[name].[contenthash].js", //源代码不变，hash值就不会变，解决浏览器缓存问题。打包上线时，用户只需要更新有变化的代码，没有变化的从浏览器缓存读取
    chunkFilename: "[name].[contenthash].js"
  }
};

module.exports = {
  optimization: {
    runtimeChunk: {
      //兼容老版本webpack4，把manifest打包到runtime里，不影响业务代码和第三方模块
      name: "runtime"
    }
  },
  performance: false //禁止提示性能上的一些问题
};
```

### Global Env

```js
// package.json
{
  "scripts": {
    "dev-build": "webpack --config ./build/webpack.common.js",
    "dev": "webpack-dev-server --config ./build/webpack.common.js",
    "build": "webpack --env.production --config ./build/webpack.common.js" //通过--env.production,把环境变量传进去
  },
}

// webpack.common.js
module.exports = (env) => {
	if(env && env.production) {//线上环境
		return merge(commonConfig, prodConfig);
	}else {//开发环境
		return merge(commonConfig, devConfig);
	}
}

```

### Library Bundle (demo-library)

```js
// webpack.config.js
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  externals: "lodash",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "library.js",
    library: "root", //支持通过<scritp src=ilibrary. js'></script> 标签引入，在全局变量增加一个root变量
    libraryTarget: "umd" //别人用的时候，通过任何形式引入库都可以，比如AMD，CMD，ES MODULE，Commonjs

    // library: 'root',//打包生成全局变量root
    // libraryTarget: 'this' //把全局变量root挂载到this上，可以填umd，this，window,global

    // externals: {
    // 	lodash:{
    // 		root：'_', //是用script标签引入进来的，必须在全局注入一个 _ 变量，下面的library才能正常执行
    // 		commonjs:'lodash',//在用commonjs规范引入是，名字必须是lodash
    // 	}

    // }
  }
};

// package.json
{
  "main": "./dist/library.js", //最终要给别人使用的
}

```

### Webpack PWA (demo-pwa)

- using service worker technique to enable us offline view

```js
//模拟服务器
npm i http-server -D
//添加 workbox-webpack-plugin 插件，然后调整 webpack.config.js 文件
npm install workbox-webpack-plugin --save-dev

// package.json
{
 "start": "http-server dist",//在dist目录下运行http-server服务
}

// webpack.prod.js
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
  plugins: [s
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		})
	],
}

// index.js initial service workers
console.log("hello, PWA");

if ("serviceWorker" in navigator) {
  //如果浏览器支持serviceWorker，就执行以下代码
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        //注册成功
        console.log("service-worker registed");
      })
      .catch(error => {
        //没注册成功
        console.log("service-worker register error");
      });
  });
}

```

### Webpack DevServer Proxy (demo-dev-proxy)

- setup proxy server for development

```js
//向服务器发送axios请求 (make request to server through axios)
npm i axios -D

// webpack.config.js
module.exports = {
  devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
	  proxy: { // 开发时方便接口转发，线上不用
      '/react/api': { // 访问 /react/api 时，代理到 target 上
				target: 'https://www.dell-lee.com',
        secure: false, // 如果访问https 要setting secure to false
        //对https协议的网址的请求的转发
        //   拦截，请求的是html,不走代理直接返回  /index.html文件
	      //   bypass: function(req, res, proxyOptions) {
        //    if (req.headers.accept.indexOf('html') !== -1) {
        //      console.log('Skipping proxy for browser request.');
        //     return '/index.html';
        //   }
        //   },
		    pathRewrite: {
					'header.json': 'demo.json' // when calling header.json actually get demo.json data
				},
				changeOrigin: true,// 解决网站对接口的限制
				headers: { // add headers config like login use case, cookies usage etc
					host: 'www.dell-lee.com',
				}
			}
		}
	}
}

```

### ESLint Webpack Setup (demo-eslint)

```js
// install eslint
npm i eslint -D
npm i babel-eslint -D
npm i eslint-loader -D

// 快速生成eslint配置
npx eslint --init

// .eslintrc.js
module.exports = {
	"extends": "airbnb", // 用的是airbnb standard
  "parser": "babel-eslint",
  "rules": {
    "react/prefer-stateless-function": 0, // allow disable statless function warning
    "react/jsx-filename-extension": 0
  },
  globals: {
    document: false // allow directly use document.getElementByID('root')
  }
};

// install plugins in vsc
module.exports = {
  devServer: {
	  overlay: true // when open browser it will show error information
	},
  rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader', 'eslint-loader'] // 先检查代码写的是否规范，在转换成es5
		}
  ]
}

```

### Webpack Optimization (demo-dll)

- 跟上技术的迭代（Node，Npm，Yarn) (constantly update used packages)
- 在尽可能少的模块上应用 Loader (use whatever need loader)
- Plugin 尽可能精简并确保可靠 (try use official plugin)
- resolve 参数合理配置
- 使用 DLLPlugin 提高打包速度 (third party only bundle one time)

```js
// Overall Process
// run npm run build:dll 生成对应的 XXX.dll.js 和 XXX.manifest.json 文件。
// 以后再执行 npm run build 或 npm run dev 时，就不用再node_modules查找对应模块进行分析，
// 直接用打包好的 XXX.dll.js就可以，节省打包速度。

// npm i add-asset-html-webpack-plugin --save
// create webpack.dll.js 文件：把第三方模块单独进行打包，生成一个vendors.dll.js 文件，all third party inside this file
// webpack.dll.js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    vendors: ["lodash"],
    react: ["react", "react-dom"],
    jquery: ["jquery"]
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../dll"),
    library: "[name]" //打包生成的库名，通过全局变量的形式暴露到全局
  },
  plugins: [
    new webpack.DllPlugin({
      //对暴露到全局的代码进行分析，生成vendors.manifest.json 的映射文件，
      name: "[name]",
      path: path.resolve(__dirname, "../dll/[name].manifest.json")
    })
  ]
};

// webpack.common.js
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const files = fs.readdirSync(path.resolve(__dirname, "../dll"));
files.forEach(file => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetHtmlWebpackPlugin({
        //将打包好的dll文件挂载到html中
        filepath: path.resolve(__dirname, "../dll", file)
      })
    );
  }
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        //分析第三方模块是否已经在dll文件里，如果里面有就不用再node_modules在分析打包了
        manifest: path.resolve(__dirname, "../dll", file)
      })
    );
  }
});

// package.json;
{
  "scripts": {
    "build:dll": "webpack --config ./build/webpack.dll.js"
  }
}

// webpack.dll.js
// DllPlugin插件： 用于打包出一个个动态连接库
// DllReferencePlugin: 在配置文件中引入DllPlugin插件打包好的动态连接库

module.exports = {
  mode: "production",
  entry: {
    vendors: ["lodash"], // lodash模块打包到一个动态连接库
    react: ["react", "react-dom"],
    jquery: ["jquery"]
  },
  output: {
    filename: "[name].dll.js", // 输出动态连接库的文件名称
    path: path.resolve(__dirname, "../dll"),
    library: "[name]" // 全局变量名称
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]", // 和output.library中一致，值就是输出的manifest.json中的 name值
      path: path.resolve(__dirname, "../dll/[name].manifest.json")
    })
  ]
};

// webpack.common.js
module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, "dist", "react.manifest.json"))
    })
  ]
};
```

- 控制包文件大小

```js
// 配置 Tree shaking，把用不到的代码去除掉。配置 SplitChunksPlugin
```

- thread-loader，parallel-webpack，happypack 多进程打包
- 合理使用 sourceMap
- 结合 stats 分析打包结果
- 开发环境内存编译
- 开发环境无用插件剔除
