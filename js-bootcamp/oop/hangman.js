// 1. Create a constructor function for the hangman game
// 2. Setup two attributes. One for the word itself. Another for the number of guesses allowed.
// 3. Create two instances of it and print both to the console.

// 1. Set up the word instance property as an array of lower case letters.
// 2. Set up another instance property to store guessed letters.
// 3. Create a method that gives you the word puzzle back.

// No guesses? -> ***
// Guessed 'c', 'b', and 't' ? => c*t

const Hangman = function(word, numberGuess, letterGuess) {
  this.word = word.toLowerCase();
  this.numberGuess = numberGuess;
  this.letterGuess = letterGuess;
};

Hangman.prototype.getPuzzleBack = function() {
  let wordArray = this.word.split("");
  let returnAns = "";
  wordArray.forEach(word => {
    if (this.letterGuess.includes(word) || word === " ") {
      returnAns += word;
    } else {
      returnAns += "*";
    }
  });

  return returnAns;
};

const instanceOne = new Hangman("MacBook", 2, "mac");
const instanceTwo = new Hangman("Visual", 4);
console.log(instanceOne.getPuzzleBack());
console.log(instanceTwo);
