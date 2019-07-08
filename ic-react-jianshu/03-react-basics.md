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
  content: PropTypes.arrayOf(PropTypes.number, PropTypes.string), // 可以是string or number
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
