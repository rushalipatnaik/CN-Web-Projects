

const words = ['javascript', 'programming', 'hangman', 'developer', 'openai', 'react' , 'node', 'express'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingAttempts = 6;

const wordDisplay = document.getElementById('wordDisplay');
const guessButton = document.getElementById('guessButton');
const hangman = document.querySelectorAll('.hangman > div');
const guessInput = document.getElementById('guessInput');
const guessesDisplay = document.getElementById('guesses');


function checkWin() {
  wordDisplay.innerHTML = 'Congratulations! You won!';
  setWinBackgroundColor();
}

function checkLoss() {
    wordDisplay.textContent = "Game over! You lost.";
    setLossBackgroundColor();
}

function showHangmanParts() {
  hangman.forEach((part, i) => {
    var x = 6-remainingAttempts;
    if(i<x){
      part.style.display='block';
    }
    else{
      part.style.display='none';
    }
  });
}

function setWinBackgroundColor() {
  guessInput.setAttribute("disabled", "");
  guessButton.setAttribute("disabled", "");
  document.body.style.backgroundColor = 'green';
}

function setLossBackgroundColor() {
  guessInput.setAttribute("disabled", "");
  guessButton.setAttribute("disabled", "");
  document.body.style.backgroundColor = 'red';
}


function updateDisplayedWord() {
  wordDisplay.textContent = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
}

function updateGuessesDisplay() {
  guessesDisplay.textContent = `${guessedLetters.join(', ')}`;
}


function guessLetter() {
  var input = guessInput.value;
  var lowerLetter = input.toLowerCase();

  if (lowerLetter && !guessedLetters.includes(lowerLetter)) {
    guessedLetters.push(lowerLetter);
    if (!selectedWord.includes(lowerLetter)) {
      remainingAttempts--;
      showHangmanParts();
    }
  }

  updateDisplayedWord();
  updateGuessesDisplay();
  
  guessInput.value = '';

  if (remainingAttempts <= 0 && !wordDisplay.textContent.includes('Congratulations')) {
    checkLoss();
    wordDisplay.textContent = "Game over! You lost.";
  }
  if (selectedWord==wordDisplay.toLowerCase()) {
    checkWin();
      wordDisplay.innerHTML = 'Congratulations! You won!';
  }

}

updateDisplayedWord();

guessButton.addEventListener('click', guessLetter);

guessInput.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    guessLetter();
  }
});