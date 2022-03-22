/*Game function
-player must guess a number between a min and max
- player gets a certain amount of guesses
- notify player of guesses remaining
- notify the play of the correct answer if loose
- let player choose to play again
*/

// game values 
let min = 1,
  max = 10,
  // TO MAKE THE WINNING NUMBER A RANDOM NUMBER, WE HAVE TO GIVE IT FUNCTION 
  // winningNum = 2
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;
    
// UI element 
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

  // assign UI min and max 
  // what ever that is in the game value should show in the UI 
minNum.textContent = min;
maxNum.textContent = max;

// PLAY AGAIN EVENT LISTENER 
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})

// LISTEN FOR A GUESS 
guessBtn.addEventListener('click', function () {
  // pass as a string 
  // console.log(guessInput.value);
  // pass as a number 
  let guess = parseInt(guessInput.value);
  // console.log(guess);

  // validate 
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // check if won 
  if (guess === winningNum) {
    // game over - won 
    gameOver(true, `${winningNum} is correct. You win!`);

  // // disable input 
  //   guessInput.disabled = true;
  //   // change border color 
  //   guessInput.style.borderColor = 'green';
  //   // set message 
  //   setMessage(`${winningNum} is correct. You win!`, 'green');
  }else{
    // wrong number 
    guessesLeft -= 1;
    // which can also be writting as 
    // guessesLeft = guessesLeft - 1

    if (guessesLeft === 0) {
      // game over- lost
      gameOver(`Game Over, you lost. The correct number was ${winningNum}`);
    // // disable input 
    // guessInput.disabled = true;
    // // change border color 
    // guessInput.style.borderColor = 'red';
    // // set message 
    // setMessage(`Game Over, you lost. The correct number was ${winningNum}`, 'red');
    } else {
      // game continue - answer wrong 

      // tell user its the wrong number 
      guessInput.style.borderColor = 'red';

      // clear input 
      guessInput.value = '';

      // tell user its the wrong number 
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// GAME OVER - would take in two parameters 

function gameOver(won, msg) {
  // we used a conditional operator call turnery 
  let color;
  won === true ? color = 'green' : color = 'red';
  // disable input 
  guessInput.disabled = true;
  // change border color 
  guessInput.style.borderColor = color;
  // set text color 
   message.style.color = color;
  // set message 
  setMessage(msg);

  // PLAY AGAIN
  guessBtn.value = 'play again';

  // apend a class : after the page loads
  guessBtn.className += 'play-again';
}

// GET WINNING NUMBER 
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
  
  // (max-min)+min a random decimal between 1 and 10 
  // math.floor is added to round it off to a whole number 
}

// create function for set message 
function setMessage(msg, color) {
  // set in the <p> with the class of msg 
  message.textContent = msg
  message.style.color = color;
}