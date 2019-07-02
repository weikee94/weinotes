### Tech

```js
--- React-navigation
--- Redux
--- Fetch
--- AsyncStorage
--- FlatList
--- Self Defined Component
--- Offline
--- Native Modules
--- Code Push
--- Native SDK
--- Plugins
--- Office Component
```

### Open Developer Menu

```js
Android simulator -> use command + m open developer menu
IOS simulator -> use command + d open developer menu

Real Device -> hand shaking to open developer menu
```

### Warning

```js
// We can use below code to disable warning message on simulator
console.disableYellowBox = true;
console.ignoredYellowBox = ["Warning: ..."];
```

### Chrome Developer Tools

```js
Element -> check current page html and css element
Network -> check http request details message, response, header etc
Source -> check current page source
Timeline -> check execution, render time etc
Profiles -> check cpu execution time, cpu message etc
Resource -> check current page request source documents, html css and etc
Audits -> for improve frontend rendering speed details message
Console -> used to display message which you put inside your code or testing
```

### How to use chrome debugger react native

```js
1. in developer menu click debug js remotely, normally chrome will open 'http://localhost:8081/debugger-ui'
2. Command + Option + I on Mac to open developer console

```

### Debug on real device

```js
IOS -> open 'RCTWebSocketExecutor.m' file, change localhost to your computer ip, then on developer menu click debug js remotely

Android -> connect phone to computer by usb, then use adb command [ adb reverse tcp:8081 tcp:8081 ]

- make sure computer and phone using same network

```
