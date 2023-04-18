const cells = document.getElementsByClassName('cell');

const gameboardObj = {
  gameboard: [null, null, null, null, null, null, null, null, null],
  turn: 0,
  getCurrentTurn: () => {
    if (gameboardObj.turn === 0) {
      return playerOne.playerName;
    } else if (gameboardObj.turn % 2 !== 0) {
      return playerTwo.playerName;
    } else if (gameboardObj.turn % 2 === 0) {
      return playerOne.playerName;
    }
  },
  addTurn: () => {
    gameboardObj.turn++;
  },
  checkWinner: () => {
    // logic for checking for winner
    if (
      (gameboardObj.gameboard[0] === 'X' &&
        gameboardObj.gameboard[1] === 'X' &&
        gameboardObj.gameboard[2] === 'X') ||
      (gameboardObj.gameboard[3] === 'X' &&
        gameboardObj.gameboard[4] === 'X' &&
        gameboardObj.gameboard[5] === 'X') ||
      (gameboardObj.gameboard[6] === 'X' &&
        gameboardObj.gameboard[7] === 'X' &&
        gameboardObj.gameboard[8] === 'X') ||
      (gameboardObj.gameboard[0] === 'X' &&
        gameboardObj.gameboard[3] === 'X' &&
        gameboardObj.gameboard[6] === 'X') ||
      (gameboardObj.gameboard[1] === 'X' &&
        gameboardObj.gameboard[4] === 'X' &&
        gameboardObj.gameboard[7] === 'X') ||
      (gameboardObj.gameboard[2] === 'X' &&
        gameboardObj.gameboard[5] === 'X' &&
        gameboardObj.gameboard[8] === 'X') ||
      (gameboardObj.gameboard[0] === 'X' &&
        gameboardObj.gameboard[4] === 'X' &&
        gameboardObj.gameboard[8] === 'X') ||
      (gameboardObj.gameboard[2] === 'X' &&
        gameboardObj.gameboard[4] === 'X' &&
        gameboardObj.gameboard[6] === 'X')
    ) {
      console.log('player 1 wins!');
    } else if (
      (gameboardObj.gameboard[0] === 'O' &&
        gameboardObj.gameboard[1] === 'O' &&
        gameboardObj.gameboard[2] === 'O') ||
      (gameboardObj.gameboard[3] === 'O' &&
        gameboardObj.gameboard[4] === 'O' &&
        gameboardObj.gameboard[5] === 'O') ||
      (gameboardObj.gameboard[6] === 'O' &&
        gameboardObj.gameboard[7] === 'O' &&
        gameboardObj.gameboard[8] === '') ||
      (gameboardObj.gameboard[0] === 'O' &&
        gameboardObj.gameboard[3] === 'O' &&
        gameboardObj.gameboard[6] === 'O') ||
      (gameboardObj.gameboard[1] === 'O' &&
        gameboardObj.gameboard[4] === 'O' &&
        gameboardObj.gameboard[7] === 'O') ||
      (gameboardObj.gameboard[2] === 'O' &&
        gameboardObj.gameboard[5] === 'O' &&
        gameboardObj.gameboard[8] === 'O') ||
      (gameboardObj.gameboard[0] === 'O' &&
        gameboardObj.gameboard[4] === 'O' &&
        gameboardObj.gameboard[8] === 'O') ||
      (gameboardObj.gameboard[2] === 'O' &&
        gameboardObj.gameboard[4] === 'O' &&
        gameboardObj.gameboard[6] === 'O')
    ) {
      console.log('player 2 wins!');
    }
  },
};

const playerFactory = (playerName, mark) => {
  return { playerName, mark };
};

const playerOne = playerFactory('player1', 'X');
const playerTwo = playerFactory('player2', 'O');

// event listener loop for each grid cell
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function () {
    // to prevent clicking on a cell more than once
    if (cells[i].textContent !== '') {
      return;
    } else {
      // prevent further action once all cells have been occupied
      if (gameboardObj.turn === 9) {
        return;
      } else if (gameboardObj.turn % 2 === 0) {
        // sets even turns and first turn as 'X'
        cells[i].textContent = 'X';
        gameboardObj.gameboard[i] = 'X';
        gameboardObj.addTurn();
      } else if (gameboardObj.turn % 2 !== 0) {
        // sets all odd turns as 'O'
        cells[i].textContent = 'O';
        gameboardObj.gameboard[i] = 'O';
        gameboardObj.addTurn();
      }

      gameboardObj.checkWinner();

      //execute function to check if winner with each click
    }

    // logic for checking for winner after each click
    // if 3 in a row horizontally, vertically, or diagonally, stop game
    // announce winner
    // if turns === 9, end game in tie
    // logic for preventing clicking in same box
  });
}

/* pseudocode

create gameboard object with gameboard array inside
- update gameboard array with eventlistener for player pick

create players object with players inside
  - each player is assigned a mark. Push mark to gamebaord array when clicking spot


create object to control flow of the game:
need function to switch player turns

create function to render contents of gameboard array to the webpage

create function to allow players to add marks to specific spot on board

create function to check for the game winner by looking for 3 in a row or if 
all board spots are populated
    - 3 in a row horizontally, vertically, or diagonally

display message to the winner of the game

create button to reset the game

optional:  create AI opponent and allow user to choose to play against AI or 
another player


*/

// Instructions

// You’re going to store the gameboard as an array inside of a
// Gameboard object, so start there! Your players are also
// going to be stored in objects, and you’re probably going
// to want an object to control the flow of the game itself.

// Your main goal here is to have as little global code as possible.

// Try tucking everything away inside of a module or factory.
// Rule of thumb: if you only ever need ONE of something
// (gameBoard, displayController), use a module. If you need
// multiples of something (players!), create them with factories.

// Set up your HTML and write a JavaScript function that will render
// the contents of the gameboard array to the webpage (for now
// you can just manually fill in the array with "X"s and "O"s)

// Build the functions that allow players to add marks to a specific
// spot on the board, and then tie it to the DOM, letting players
// click on the gameboard to place their marker. Don’t forget the
// logic that keeps players from playing in spots that are already
// taken!

// Think carefully about where each bit of logic should reside. Each
// little piece of functionality should be able to fit in the game,
// player or gameboard objects. Take care to put them in “logical”
// places. Spending a little time brainstorming here can make your
// life much easier later!

// If you’re having trouble, Building a house from the inside out is a
// great article that lays out a highly applicable example of how
// you might organize your code for this project.
// Build the logic that checks for when the game is over! Should check
// for 3-in-a-row and a tie.

// Clean up the interface to allow players to put in their names,
// include a button to start/restart the game and add a display
// element that congratulates the winning player!

// Optional - If you’re feeling ambitious create an AI so that a player
// can play against the computer!

// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is
// possible to create an unbeatable AI using the minimax algorithm
// (read about it here, some googling will help you out with this one)
// If you get this running definitely come show it off in the chatroom.
// It’s quite an accomplishment!
