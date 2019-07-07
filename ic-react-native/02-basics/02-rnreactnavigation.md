### React-Navigation

###### there are seven types navigator

- createStackNavigator, 上方导航栏
- createBottomTabNavigator or createMaterialTopTabNavigator
- createBottomTabNavigator, 下方标签栏
- createMaterialTopTabNavigator
- createDrawerNavigator, 抽屉效果
- createSwitchNavigator

### Navigation Concept

- screen navigation prop, 通过 navigation 屏幕之间调度操作， 例如打开一个屏幕
- screen navigationOptions, 通过 navigationOptions 制定导航器显示屏幕的方式

### Navigation Props

- ref: able to get navigation by ref attributes
- onNavigationStateChange(prevState, newState, action)
- screenProps: can pass to child then child can access value by this.props.screenProps

### Navigation function

- navigate 跳转页面
- state 当前 state
- setParams 关闭路由 params
- goBack 关闭当前屏幕
- dispatch 向路由发一个 action
- addListener 订阅生命周期更新
- isFocused
- getParam 获取具有回退的特定参数
- dangerouslyGetParent 返回父导航器
