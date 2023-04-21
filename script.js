const cells = document.getElementsByClassName('cell');

const gameboardObj = {
  // array representing tic tac toe tiles
  gameboard: [null, null, null, null, null, null, null, null, null],

  setWinningConditions: (arrNum1, arrNum2, arrNum3) => {
    // array is defined and returned in order to evaluate
    // truthiness of winning combination
    // each combination also checks for a single matching cell's text content
    // to determine which mark is placed within the winning combination

    const winningConditions = [
      // check truthiness of winning combo with X
      gameboardObj.gameboard[arrNum1] === gameboardObj.gameboard[arrNum2] &&
        gameboardObj.gameboard[arrNum2] === gameboardObj.gameboard[arrNum3] &&
        cells[arrNum1].textContent === 'X',
      // check truthiness of winning combo with O
      gameboardObj.gameboard[arrNum1] === gameboardObj.gameboard[arrNum2] &&
        gameboardObj.gameboard[arrNum2] === gameboardObj.gameboard[arrNum3] &&
        cells[arrNum1].textContent === 'O',
    ];

    if (winningConditions[0] === true) {
      gameboardObj.winningMark = 'X';
      console.log('this worked');
      return winningConditions[0];
    } else if (winningConditions[1] === true) {
      gameboardObj.winningMark = 'O';
      console.log('this worked too!!');
      return winningConditions[1];
    }
  },
  turn: 0,
  getCurrentTurn: () => {
    if (gameboardObj.turn % 2 !== 0) {
      return playerTwo.playerName;
    } else if (gameboardObj.turn % 2 === 0) {
      return playerOne.playerName;
    }
  },
  gameover: false,
  playerOneWin: false,
  playerTwoWin: false,
  winningMark: null,

  // checks which player won based on argument provided
  setPlayerWin: (cellOne, cellTwo, cellThree, mark) => {
    if (mark === 'X') {
      gameboardObj.playerOneWin = true;
      console.log('Player 1 wins!!!11!');
    } else if (mark === 'O') {
      gameboardObj.playerTwoWin = true;
      console.log('Player 2 wins!!!11!');
    }

    gameboardObj.gameover = true;

    // change background color of the winning combination cells
    cells[cellOne].style.backgroundColor = 'gray';
    cells[cellTwo].style.backgroundColor = 'gray';
    cells[cellThree].style.backgroundColor = 'gray';
  },
  winningCombos: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  checkWinner: () => {
    // iterate through array of winningCombos to find truthiness of each combo
    for (let i = 0; i <= 7; i++) {
      if (
        gameboardObj.setWinningConditions(
          gameboardObj.winningCombos[i][0],
          gameboardObj.winningCombos[i][1],
          gameboardObj.winningCombos[i][2],
        )
      ) {
        gameboardObj.setPlayerWin(
          gameboardObj.winningCombos[i][0],
          gameboardObj.winningCombos[i][1],
          gameboardObj.winningCombos[i][2],
          gameboardObj.winningMark,
        );
      }
    }
  },

  resetGame: () => {
    // reset gameboard array
    gameboardObj.gameboard = [];
    for (let i = 0; i <= 8; i++) {
      gameboardObj.gameboard.push(null);
    }
    // reset cell content and background
    Array.from(cells).forEach((cell) => {
      cell.textContent = '';
      cell.style.backgroundColor = 'black';
    });
    gameboardObj.gameover = false;
    gameboardObj.turn = 0;
    gameboardObj.playerOneWin = false;
    gameboardObj.playerTwoWin = false;
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
    // to prevent clicking on a cell more than once, or pause the game if a winner
    // has been declared or all cells are occupied
    if (
      cells[i].textContent !== '' ||
      gameboardObj.gameover === true ||
      gameboardObj.turn === 9
    ) {
      return;
    } else {
      if (gameboardObj.turn % 2 === 0) {
        // sets even turns and first turn as 'X'
        cells[i].textContent = 'X';
        gameboardObj.gameboard[i] = 'X';
        gameboardObj.turn++;
      } else if (gameboardObj.turn % 2 !== 0) {
        // sets all odd turns as 'O'
        cells[i].textContent = 'O';
        gameboardObj.gameboard[i] = 'O';
        gameboardObj.turn++;
      }

      gameboardObj.checkWinner();
    }

    // announce winner
  });
}

const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', gameboardObj.resetGame);

/* pseudocode

create function to check for the game winner by looking for 3 in a row or if 
all board spots are populated
    - 3 in a row horizontally, vertically, or diagonally
    ******* figure out how to write mathematical formula to identify all 
    possible iterations****

display message to the winner of the game

function to check if there is a tie

Add elements to allow 2 players to enter their names


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
// you might organize your code for gameboardObj project.
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
// (read about it here, some googling will help you out with gameboardObj one)
// If you get gameboardObj running definitely come show it off in the chatroom.
// It’s quite an accomplishment!
