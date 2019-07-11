### StyleComponent

> createGlobalStyle 制定全局样式

```js
import { createGlobalStyle } from "styled-components";

createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;
```

### Reset CSS or using normalize css (prefer using normalize css)

> 制定各个浏览器的默认值

```css
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
```

### Styled Component Example

```js
import logoPic from "../../statics/logo.png";

export const Logo = styled.a.attrs({
  href: "/"
})`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 56px;
  background: url(${logoPic});
  background-size: contain;
`;
```

###### CSS Gain

> normally when u have width with 160px and padding 20px, the entire layout should be 200px but with box-sizing border-box, it will fixed at 160px instead.

```css
.search {
  width: 160px;
  padding: 0 20px;
  box-sizing: border-box;
}
```

### IconFont (图标)

> need css, eot, svg, ttf, woff

### mapDispatchToProps (es5 vs es6)

```js
// es6
const mapDispatchToProps = dispatch => {
  return {
    handleInputFocus: () => {
      const action = {
        type: "search_focus"
      };
      dispatch(action);
    }
  };
};

// es5
const mapDispatchToProps = dispatch => {
  return {
    handleInputBlur() {
      const action = {
        type: "search_blur"
      };
      dispatch(action);
    }
  };
};
```

### Reducer

```js
const defaultState = {
  focused: false
};

export default (state = defaultState, action) => {
  if (action.type === "search_focus") {
    return {
      focused: true
    };
  }
  if (action.type === "search_blur") {
    return {
      focused: false
    };
  }
  return state;
};
```

### CombineReducers

```js
import { combineReducers } from "redux";
import headerReducer from "../common/header/store/reducer";

const reducer = combineReducers({
  header: headerReducer
});

export default reducer;
```

### Immutable js 不可改变对象

```js
// index.js (use .get)

const mapStateToProps = state => {
  return {
    focused: state.header.get("focused")
  };
};

// reducer.js
import * as constants from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
  focused: false
});

export default (state = defaultState, action) => {
  if (action.type === constants.SEARCH_FOCUS) {
    // immutable 对象的set方法会结合之前immutable对象的值和设置的值
    // 返回一个全新对象
    return state.set("focused", true);
    // 下面这个方法是直接修改之前对象的state
    // return {
    //   focused: true
    // };
  }
  if (action.type === constants.SEARCH_BLUR) {
    return state.set("focused", false);
    // return {
    //   focused: false
    // };
  }
  return state;
};
```

### Redux-Immutable

> combineReducers from redux-immutable

```js
// reducer.js
import { combineReducers } from "redux-immutable";
import { reducer as headerReducer } from "../common/header/store";

const reducer = combineReducers({
  header: headerReducer
});

export default reducer;

// index.js (method one)
const mapStateToProps = state => {
  return {
    focused: state.get("header").get("focused")
  };
};

// index.js (method two)
const mapStateToProps = state => {
  return {
    focused: state.getIn(["header", "focused"])
  };
};
```

### Redux-thunk

```js
// without redux thunk we only able return object
export const searchBlur = () => ({
  type: constants.SEARCH_BLUR
});

// with redux thunk we able to return a function instead of object
export const getList = () => {
  return dispatch => {
    console.log(123);
  };
};
```
