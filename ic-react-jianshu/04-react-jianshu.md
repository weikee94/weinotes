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
