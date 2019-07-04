### Width and Height

> a component height and width decide how big the size look on the screen
> in react native, we use flexbox to do the entire layout

### 像素无关

> 运行在 android, view width and height is 100dp each. 运行在 ios, view width and height is 100pt each. This units will make sure the layout stretch or resize the same on different dpi phone.

```js
<View style={width: 100, height: 100, margin:40}>
    <Text style={fontSize: 16}>Size</Text>
</View>
```

### React Native FlexBox vs Web FlexBox

- flexDirection: React Native default flexDirection is 'column'; Web default flexDirection is 'row'
- alignItems: React Native default alignItems: 'stretch'; Web default alignItems: 'flex-start'
- flex: React Native only accept one params, while Web accept multiple params
- not support: align-content, flex-basis, order, flex-flow, flex-grow, flex-shrink

### 父视图属性

- flexDirection: row(左到右), column(上到下默认), row-reverse, column-reverse
- flexWrap: wrap, nowrap
  > flexWrap 定义了子元素在父视图是否允许多行排列默认为 nowrap
- justifyContent: flex-start, flex-end, center, space-between, space-around
  > justifyContent 取决于 flexDirection 默认为 flex-start (决定子组件空间大小)
- alignItems: flex-start, flex-end, center, stretch (如果子组件有高度就不会拉伸)
  > alignItems (Y 轴空间布局)

### 子视图属性

- alignSelf: auto, flex-start, flex-end, center, stretch
  > alignSelf 默认为 auto, 会继承父组件 alignItems 属性, 如果设置就会 override
- flex number
  > 默认为 0, 定义可伸缩能力
