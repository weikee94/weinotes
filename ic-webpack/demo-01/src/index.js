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
import number from "./number";
import "./style.css";

createAvatar();

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);

var root = document.getElementById("root");
root.append(img);

var btn = document.createElement("button");
btn.innerHTML = "add new";
document.body.appendChild(btn);

btn.onclick = function() {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};

number();

const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map(item => {
  console.log(item);
});

if (module.hot) {
  module.hot.accept("./number", () => {
    document.getElementById("number");
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}

import { add } from "./math";

add(1, 7);
