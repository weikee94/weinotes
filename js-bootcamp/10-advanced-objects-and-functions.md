### Constructor Functions

```js
// 1. Create a constructor function for the hangman game
// 2. Setup two attributes. One for the word itself. Another for the number of guesses allowed.
// 3. Create two instances of it and print both to the console.

const Hangman = function(word, numberGuess) {
  this.word = word;
  this.numberGuess = numberGuess;
};

const instanceOne = new Hangman("MacBook", 2);
const instanceTwo = new Hangman("Visual", 4);
console.log(instanceOne);
console.log(instanceTwo);
```

### Setting up Prototype Object

```js
Person.prototype.getBio = function() {
  let bio = `${this.firstName} is ${this.age}.`;
  this.likes.forEach(like => {
    bio += ` ${this.firstName} likes ${like}.`;
  });
  return bio;
};

Person.prototype.setName = function(fullName) {
  const names = fullName.split(" ");
  this.firstName = names[0];
  this.lastName = names[1];
};

const me = new Person("Lala", "Zee", 27, ["Biking"]);
me.setName("Zen log");
console.log(me.getBio());

const person2 = new Person("Zax", "Turner", 34, []);
console.log(person2.getBio());
```

### Prototypical Inheritance

```js
Person.prototype.getBio = function() {
  let bio = `${this.firstName} is ${this.age}.`;
  this.likes.forEach(like => {
    bio += ` ${this.firstName} likes ${like}.`;
  });
  return bio;
};

Person.prototype.setName = function(fullName) {
  const names = fullName.split(" ");
  this.firstName = names[0];
  this.lastName = names[1];
};

const me = new Person("Lala", "Zee", 27, ["Biking"]);
me.setName("Zen log");
console.log(me.getBio());

const person2 = new Person("Zax", "Turner", 34, []);
console.log(person2.getBio());
```

### Primitive and Objects
