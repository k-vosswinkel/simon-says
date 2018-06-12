// Global Variables (eek - will look at fixing this later)
let gameArray = [];
let playerArray = [];

let reset = () => {
  console.log('resetting')
  gameArray = [];
  playerArray = [];
  $('#win').fadeTo("fast", 0);
  $('#lose').fadeTo("fast", 0);
  $('.colorButton, #start').prop('disabled', false)
}

// Define the play for each 'round'
let playRound = () => {
  // Add one random number to our game's array and keep track of a counter for indexing; don't forget to start each round with an empty player array.
  let i = 0;
  playerArray = []
  let randomNum = Math.floor(Math.random() * 4) + 1;
  gameArray.push(randomNum);

  numToColor = {
    1: 'red',
    2: 'yellow',
    3: 'blue',
    4: 'green'
  }

  // Play back our game array
  function myLoop() {
    //change color of corresponding button; change it back
    setTimeout(() => {
      let currentColor = numToColor[gameArray[i]];
      $(`#${currentColor}`).addClass(currentColor)
      setTimeout(() => {
        console.log('removing color here')
        $(`#${currentColor}`).removeClass(currentColor)
      }, 500)
      i++;

      if (i < gameArray.length) {
        myLoop();
      }
    }, 750);
  }

  myLoop();
  console.log('game array: ', gameArray)
}

// Start Button
$('#start').click(() => {
  playRound();
});

// Reset Button
$('#reset').click(reset)

// All Color Buttons
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
  } else if (playerArray.length === 2) {
    $('#win').fadeTo("fast", 1)
    $('.colorButton, #start').prop('disabled', true)
  } else if (playerArray.length === gameArray.length) {
    playRound();
  }

  console.log("player array: ", playerArray)
})
