### FLatList

- 跨平台
- 支持水平布局
- 支持下拉刷新
- 支持上拉加载

```js
<FlatList
  data={[{ key: "a" }]}
  renderItem={({ item }) => <Text>{item.key}</Text>}
/>
```
