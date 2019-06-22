// var avatar = require("./avatar.jpg");
// console.log(avatar);
// console.log("webpack init");

// var img = new Image();
// img.src = avatar;
// img.classList.add("avatar");

// var root = document.getElementById("root");
// root.append(img);
// import "./index.scss"; 这个相当于在全局引入所有的component会被影响
import style from "./index.scss"; // 模块化打包
import avatar from "./avatar.jpg";
import createAvatar from "./createAvatar";

createAvatar();

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);

var root = document.getElementById("root");
root.append(img);
