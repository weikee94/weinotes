// Part One
// var avatar = require("./avatar.jpg");
// console.log(avatar);
// console.log("webpack init");

// var img = new Image();
// img.src = avatar;
// img.classList.add("avatar");

// var root = document.getElementById("root");
// root.append(img);
// import "./index.scss"; 这个相当于在全局引入所有的component会被影响

// Part Two
// import style from "./index.scss"; // 模块化打包
// import avatar from "./avatar.jpg";
// import createAvatar from "./createAvatar";
// import number from "./number";
// import "./style.css";

// createAvatar();

// var img = new Image();
// img.src = avatar;
// img.classList.add(style.avatar);

// var root = document.getElementById("root");
// root.append(img);

// var btn = document.createElement("button");
// btn.innerHTML = "add new";
// document.body.appendChild(btn);

// btn.onclick = function() {
//   var div = document.createElement("div");
//   div.innerHTML = "item";
//   document.body.appendChild(div);
// };

// number();

// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map(item => {
//   console.log(item);
// });

// if (module.hot) {
//   module.hot.accept("./number", () => {
//     document.getElementById("number");
//     document.body.removeChild(document.getElementById("number"));
//     number();
//   });
// }

// import { add } from "./math";

// add(1, 7);

// function getComponent() {
//   return import(/* webpackChunkName:"lodash" */ "lodash").then(
//     ({ default: _ }) => {
//       var element = document.createElement("div");
//       element.innerHTML = _.join(["a", "b"], "-");
//       return element;
//     }
//   );
// }
// getComponent().then(element => {
//   document.body.appendChild(element);
// });

// Part Three
// lazy loading

// function getComponent() {
//   return import(/* webpackChunkName:"lodash" */ "lodash").then(
//     ({ default: _ }) => {
//       var element = document.createElement("div");
//       element.innerHTML = _.join(["a", "b"], "-");
//       return element;
//     }
//   );
// }

// async function getComponent() {
//   const { default: _ } = await import(/* webpackChunkName:"lodash" */ "lodash");
//   var element = document.createElement("div");
//   element.innerHTML = _.join(["a", "b"], "-");
//   return element;
// }

// document.addEventListener("click", () => {
//   getComponent().then(element => {
//     document.body.appendChild(element);
//   });
// });

// Part Four Prefetching
document.addEventListener("click", () => {
  import(/* webpackPrefetch: true */ "./click.js").then(({ default: func }) => {
    func();
  });
});

// Part Five CSS bundle
import "./a.css";
import "./b.css";
