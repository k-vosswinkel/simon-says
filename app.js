// Global Variables (eek - will look at fixing this later)
let gameArray = [];
let playerArray = [];

let reset = () => {
  // Reset the game array and player array; remove any messaging and allow button clicks
  gameArray = [];
  playerArray = [];
  $('#win').fadeTo("fast", 0);
  $('#lose').fadeTo("fast", 0);
  $('.colorButton, #start').prop('disabled', false)
}

// Define the play for each 'round'
let playRound = () => {
  // Start each round with an empty counter and player array; map our colors
  let i = 0;
  playerArray = []
  numToColor = {
    1: 'red',
    2: 'yellow',
    3: 'blue',
    4: 'green'
  }

  // Add a random number to gameArray, giving us the pattern to follow
  let randomNum = Math.floor(Math.random() * 4) + 1;
  gameArray.push(randomNum);

  // Increment the round
  $('#count').text(gameArray.length)

  // Play back our game array
  function myLoop() {
    // Highlight the selected button for a few moments
    setTimeout(() => {
      let currentColor = numToColor[gameArray[i]];
      $(`#${currentColor}`).addClass(currentColor)
      setTimeout(() => {
        $(`#${currentColor}`).removeClass(currentColor)
      }, 500)
      i++;

      if (i < gameArray.length) {
        myLoop();
      }
    }, 750);
  }

  myLoop();
}

// Start Button kicks off a round
$('#start').click(() => {
  playRound();
});

// Reset Button clears the game
$('#reset').click(reset)

// Listen to all color buttons for player input
$('.colorButton').click((button) => {
  let currentButton = button.target.id;
  let currentValue = Number(button.target.value);
  let currentIndex = playerArray.length;

  playerArray.push(currentValue)

  $(`#${currentButton}`).addClass(currentButton)

  setTimeout(() => {
    $(`#${currentButton}`).removeClass(`${currentButton}`)
  }, 500)

  if (currentValue !== gameArray[currentIndex]) {
    $('#lose').fadeTo("fast", 1)
    $('.colorButton, #start').prop('disabled', true)
  } else if (playerArray.length === 5) {
    $('#win').fadeTo("fast", 1)
    $('.colorButton, #start').prop('disabled', true)
  } else if (playerArray.length === gameArray.length) {
    setTimeout(() => {
      playRound();
    }, 750)
  }
})
