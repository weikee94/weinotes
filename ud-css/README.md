### CSS

> Before starting project you can either use normalize.css to reset or write yourself

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7;
  color: #777;
}
```

### Clip Path and Linear Gradient

```css
.header {
  height: 95vh;
  background-image: linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.81),
      rgba(40, 180, 133, 0.81)
    ), url("../img/hero.jpg");
  background-size: cover;
  background-position: top;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}
```
