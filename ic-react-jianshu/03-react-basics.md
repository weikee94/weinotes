### 光标

> when u click insert mouse will direactly point to input element there.

```js
<div>
  <label htmlFor="insertArea">insert</label>
  <input id="insertArea" />
</div>
```

### display html

```js
<li dangerouslySetInnerHtml={{ __html: item }} />
```

### ES6 VS ES5

```js
// es 6 with arrow
handleInputChange = e => {
  this.setState({
    inputValue: e.target.value
  });
};

// traditional es 5
handleBtnClick() {
  this.setState({
    list: [...this.state.list, this.state.inputValue],
    inputValue: ""
  });
}
```

### Setstate

```js
//old
handleInputChange = e => {
  this.setState({
    inputValue: e.target.value
  });
};

//new
handleInputChange = e => {
  const val = e.target.value;
  this.setState(() => ({
    inputValue: val
  }));
};
```

### PropTypes and DefaultProps

> PropTypes 校验 DefaultProps 默认值

```js
TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 可以是string or number
  deleteItem: PropTypes.func,
  index: PropTypes.number
};

TodoItem.defaultProps = {
  test: "Hello World"
};
```

### Props, State, Render

> 当组件的 state or props changed, render function will execute again
> 当父组件的 render 函数被执行时,它的子组件 render 函数将被重新运行

### SetState 误区

> Because setstate is asynchronous, it doesnt execute immediately, so when u console the length of ul will always less 1. The correct way to do is pass the console as second arguments which is a callback. It will execute after the setstate finished.

```js
// 错误
handleBtnClick = () => {
  this.setState(prevState => ({
    list: [...prevState.list, prevState.inputValue],
    inputValue: ""
  }));
  console.log(this.ul.querySelectorAll("div").length);
};
//正确
handleBtnClick = () => {
  this.setState(
    prevState => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ""
    }),
    () => {
      console.log(this.ul.querySelectorAll("div").length);
    }
  );
};
```

### Ref Usage

> use ref to manipulate dom

```js
<input
  id="insertArea"
  className="input"
  value={this.state.inputValue}
  onChange={this.handleInputChange}
  ref={input => {
    this.input = input; // 这里把this.input 绑定到当前input
  }}
/>;

handleInputChange = e => {
  const val = this.input.value; // 所以这里可以用this.input 来access
  this.setState(() => ({
    inputValue: val
  }));
};
```

### React Lifecycle

> 某一个时刻组件会自动调用执行的函数

###### Mounting

```js
// 在组件即将被挂载到页面的时刻执行
componentWillMount() {
  console.log("componentWillMount");
}

render() {
  console.log("render");
}

// 组件被挂载后自动被执行
componentDidMount() {
  console.log("componentDidMount");
}
```

###### Updating

```js
// 组件被更新前会自动执行
shouldComponentUpdate() {
  console.log("shouldComponentUpdate");
  return true;
}

// 组件被更新前会自动执行, 在shouldComponentUpdate之后执行
componentWillUpdate() {
  console.log("componentWillUpdate");
}

// 组件更新完成后会执行
componentDidUpdate() {
  console.log("componentDidUpdate");
}

static getDerivedStateFromProps(props, state) {
  console.log("getDerivedStateFromProps");
  return null;
}
```

###### Unmounting

```js
// 当组件即将被剔除会被执行
componentWillUnmount() {
  console.log("child componentWillUnmount");
}
```

### Lifecycle Usage Example

> 这可以避免当父组件重新渲染的时候子组件重新渲染，子组件可以根据 current props or state comapre to next props or state 决定要不要更新

```js
shouldComponentUpdate(nextProps, nextState) {
  if (nextProps.content !== this.props.content) {
    return true;
  }
  return false;
}
```

### React CSS transition animation

```css
.show {
  opacity: 1;
  transition: all 1s ease-in;
}

.hide {
  opacity: 0;
  transition: all 1s ease-in;
}

/** by keyframes */
.hide {
  animation: hide-item 2s ease-in forwards;
}

@keyframes hide-item {
  0% {
    opacity: 1;
    color: red;
  }
  50% {
    opacity: 0.5;
    color: green;
  }
  100% {
    opacity: 0;
    color: blue;
  }
}
```

### React CSS transition group

```js
import { CSSTransition } from "react-transition-group";

<CSSTransition
  in={this.state.show}
  timeout={1000}
  classNames="fade"
  unmountOnExit
  onEnter={el => {
    el.style.color = "blue";
  }}
  appear={true}
>
  <div>App</div>
</CSSTransition>;

// if u want to include both transition group have the effect
<TransitionGroup>
  {this.state.list.map((item, index) => {
    return (
      <CSSTransition
        in={this.state.show}
        timeout={1000}
        classNames="fade"
        unmountOnExit
        onEnter={el => {
          el.style.color = "blue";
        }}
        appear={true}
      >
        <div>App</div>
      </CSSTransition>
    );
  })}
</TransitionGroup>;
```
