const cells = document.getElementsByClassName('cell');

const gameboardObj = {
  gameboard: [null, null, null, null, null, null, null, null, null],
  setWinningConditions: (num, mark) => {
    // array is defined and returned in order to evaluate
    // truthiness of each winning combination
    // each combination also checks for a single matching cell's text content
    // to determine which mark is placed within the winning combination
    const winningConditions = [
      gameboardObj.gameboard[0] === gameboardObj.gameboard[1] &&
        gameboardObj.gameboard[1] === gameboardObj.gameboard[2] &&
        gameboardObj.gameboard[2] !== null &&
        cells[num].textContent === mark,
      gameboardObj.gameboard[3] === gameboardObj.gameboard[4] &&
        gameboardObj.gameboard[4] === gameboardObj.gameboard[5] &&
        gameboardObj.gameboard[5] !== null &&
        cells[num].textContent === mark,
      gameboardObj.gameboard[6] === gameboardObj.gameboard[7] &&
        gameboardObj.gameboard[7] === gameboardObj.gameboard[8] &&
        gameboardObj.gameboard[8] !== null &&
        cells[num].textContent === mark,
      gameboardObj.gameboard[0] === gameboardObj.gameboard[3] &&
        gameboardObj.gameboard[3] === gameboardObj.gameboard[6] &&
        gameboardObj.gameboard[6] !== null &&
        cells[num].textContent === mark,
      gameboardObj.gameboard[1] === gameboardObj.gameboard[4] &&
        gameboardObj.gameboard[4] === gameboardObj.gameboard[7] &&
        gameboardObj.gameboard[7] !== null &&
        cells[num].textContent === mark,
      gameboardObj.gameboard[2] === gameboardObj.gameboard[5] &&
        gameboardObj.gameboard[5] === gameboardObj.gameboard[8] &&
        gameboardObj.gameboard[8] !== null &&
        cells[num].textContent === mark,
      gameboardObj.gameboard[0] === gameboardObj.gameboard[4] &&
        gameboardObj.gameboard[4] === gameboardObj.gameboard[8] &&
        gameboardObj.gameboard[8] !== null &&
        cells[num].textContent === mark,
      gameboardObj.gameboard[2] === gameboardObj.gameboard[4] &&
        gameboardObj.gameboard[4] === gameboardObj.gameboard[6] &&
        gameboardObj.gameboard[6] !== null &&
        cells[num].textContent === mark,
    ];

    return winningConditions;
  },
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
  gameover: false,
  playerOneWin: false,
  playerTwoWin: false,
  // setPlayerOneWin: () => {
  //   gameboardObj.playerOneWin = true;
  //   gameboardObj.gameover = true;
  //   console.log('player 1 wins!!!11!');
  // },
  setPlayerTwoWin: () => {
    gameboardObj.playerTwoWin = true;
    gameboardObj.gameover = true;
    console.log('player 2 wins!!!@!@!');
  },
  setPlayerOneWin: (arg, a, b, c) => {
    // use arg playerOne or playerTwo
    if (arg === 'p1') {
      gameboardObj.playerOneWin = true;
      console.log('Player 1 wins!!!11!');
    } else if (arg === 'p2') {
      gameboardObj.playerTwoWin = true;
      console.log('Player 2 wins!!!11!');
    }

    gameboardObj.gameover = true;
    cells[a].style.backgroundColor = 'gray';
    cells[b].style.backgroundColor = 'gray';
    cells[c].style.backgroundColor = 'gray';
  },
  checkWinner: () => {
    // logic for checking for winning combination
    if (
      // check setWinningConditions() for 'X'
      gameboardObj.setWinningConditions(0, 'X')[0]
    ) {
      gameboardObj.setPlayerOneWin('p1', 0, 1, 2);
    } else if (gameboardObj.setWinningConditions(3, 'X')[1]) {
      gameboardObj.setPlayerOneWin('p1', 3, 4, 5);
    } else if (gameboardObj.setWinningConditions(6, 'X')[2]) {
      gameboardObj.setPlayerOneWin('p1', 6, 7, 8);
    } else if (gameboardObj.setWinningConditions(0, 'X')[3]) {
      gameboardObj.setPlayerOneWin('p1', 0, 3, 6);
    } else if (gameboardObj.setWinningConditions(1, 'X')[4]) {
      gameboardObj.setPlayerOneWin('p1', 1, 4, 7);
    } else if (gameboardObj.setWinningConditions(2, 'X')[5]) {
      gameboardObj.setPlayerOneWin('p1', 2, 5, 8);
    } else if (gameboardObj.setWinningConditions(0, 'X')[6]) {
      gameboardObj.setPlayerOneWin('p1', 0, 4, 8);
    } else if (gameboardObj.setWinningConditions(2, 'X')[7]) {
      gameboardObj.setPlayerOneWin('p1', 2, 4, 6);
    } else if (
      // check setWinningConditions() for 'O'
      gameboardObj.setWinningConditions(0, 'O')[0]
    ) {
      gameboardObj.setPlayerOneWin('p2', 0, 1, 2);
    } else if (gameboardObj.setWinningConditions(3, 'O')[1]) {
      gameboardObj.setPlayerOneWin('p2', 3, 4, 5);
    } else if (gameboardObj.setWinningConditions(6, 'O')[2]) {
      gameboardObj.setPlayerOneWin('p2', 6, 7, 8);
    } else if (gameboardObj.setWinningConditions(0, 'O')[3]) {
      gameboardObj.setPlayerOneWin('p2', 0, 3, 6);
    } else if (gameboardObj.setWinningConditions(1, 'O')[4]) {
      gameboardObj.setPlayerOneWin('p2', 1, 4, 7);
    } else if (gameboardObj.setWinningConditions(2, 'O')[5]) {
      gameboardObj.setPlayerOneWin('p2', 2, 5, 8);
    } else if (gameboardObj.setWinningConditions(0, 'O')[6]) {
      gameboardObj.setPlayerOneWin('p2', 0, 4, 8);
    } else if (gameboardObj.setWinningConditions(2, 'O')[7]) {
      gameboardObj.setPlayerOneWin('p2', 2, 4, 6);
    }
  },
  // NOTE 4/18:  consider reducing above code by creating a function for setting
  // bg color change and calling that function instead of writing it over and over again
  // OR consider combining win conditions with respective bg color change into an object

  resetGame: () => {
    if (gameboardObj.gameover === true) {
      gameboardObj.gameboard = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      Array.from(cells).forEach((cell) => {
        cell.textContent = '';
        cell.style.backgroundColor = 'black';
      });
      gameboardObj.gameover = false;
      gameboardObj.turn = 0;
      gameboardObj.playerOneWin = false;
      gameboardObj.playerTwoWin = false;
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
    // to prevent clicking on a cell more than once, or pause the game if a winner
    // has been declared or all cells are occupied
    if (
      cells[i].textContent !== '' ||
      gameboardObj.gameover === true ||
      gameboardObj.turn === 9
    ) {
      return;
    } else {
      // prevent further action once all cells have been occupied
      if (gameboardObj.turn % 2 === 0) {
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
      // gameboardObj.resetGame();
    }

    // announce winner
  });
}

const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', gameboardObj.resetGame);

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
