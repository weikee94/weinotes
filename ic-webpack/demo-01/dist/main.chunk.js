(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _a_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71);
/* harmony import */ var _a_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_a_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _b_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72);
/* harmony import */ var _b_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_b_css__WEBPACK_IMPORTED_MODULE_3__);


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
document.addEventListener("click", function () {
  __webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, 73)).then(function (_ref) {
    var func = _ref["default"];
    func();
  });
}); // Part Five CSS bundle




/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[36,1,2]],[3]]);
//# sourceMappingURL=main.chunk.js.map