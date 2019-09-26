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

### Center Anything

```css
.text-box {
  position: absolute;
  /* top and left is relative to parent element */
  top: 40%;
  left: 50%;
  /* translate that percentage is element itself */
  transform: translate(-50%, -50%);
}
```

### CSS Animation (@keyframes and animation property)

```css
.heading-primary {
  color: #fff;
  text-transform: uppercase;

  /* quick fix for the element jumping */
  backface-visibility: hidden;
}

.heading-primary-sub {
  display: block;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 17.4px;

  /* one line version */
  animation: moveInRight 1s ease-out;

  /*
  animation-name: moveInLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 3s;
  animation-iteration-count: 3;
  */
}

@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  80% {
    transform: translateX(10px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }

  80% {
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
```

### Pseudo-elements ::after

> :this is what we called pseudo class

```css
.btn:link,
.btn:visited {
  text-transform: uppercase;
  text-decoration: none;
  padding: 15px 40px;
  display: inline-block;
  border-radius: 100px;

  /* transition state need to specify in initial state */
  transition: all 0.2s ease-out;
}

.btn:hover {
  transform: translateY(-3px);
  /* xposition yposition blur color */
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
```

> ::after, content and display is a must attributes to have

```css
.btn::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s ease-out;
}

.btn-white::after {
  background-color: #fff;
}

.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

.btn-animated {
  /* animation name, animation duration, animation timing function, animation delay */
  animation: moveInTop 1s ease-out 0.25s;

  /* this will automatically apply the styles to zero percent before the animation starts */
  animation-fill-mode: backwards;
}
```