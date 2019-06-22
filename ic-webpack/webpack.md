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
