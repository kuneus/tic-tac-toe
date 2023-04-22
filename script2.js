const cells = document.getElementsByClassName('cell');
const resetBtn = document.getElementById('reset-btn');

const playGame = () => {
  // initial game conditions
  let turn = 0;
  let gameover = false;
  let playerOneWin = false;
  let playerTwoWin = false;
  let winningMark = null;

  let gameboard = [null, null, null, null, null, null, null, null, null];
  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const setWinningConditions = (arrNum1, arrNum2, arrNum3) => {
    // array is defined and returned in order to evaluate
    // truthiness of winning combination
    const winningConditions = [
      gameboard[arrNum1] === gameboard[arrNum2] &&
        gameboard[arrNum2] === gameboard[arrNum3],
    ];

    if (winningConditions[0] === true && cells[arrNum1].textContent === 'X') {
      // check truthiness of winning combo with X
      winningMark = 'X';
      return winningConditions[0];
    } else if (
      // check truthiness of winning combo with O
      winningConditions[0] === true &&
      cells[arrNum1].textContent === 'O'
    ) {
      winningMark = 'O';
      return winningConditions[0];
    }
  };

  const setPlayerWin = (cellOne, cellTwo, cellThree, mark) => {
    if (mark === 'X') {
      playerOneWin = true;
      console.log('Player 1 wins!!!11!');
    } else if (mark === 'O') {
      playerTwoWin = true;
      console.log('Player 2 wins!!!11!');
    }

    gameover = true;
    // change background color of the winning combination cells
    cells[cellOne].style.backgroundColor = 'gray';
    cells[cellTwo].style.backgroundColor = 'gray';
    cells[cellThree].style.backgroundColor = 'gray';
  };

  const checkWinner = () => {
    // iterate through array of winningCombos to find truthiness of each combo
    for (let i = 0; i <= 7; i++) {
      if (
        setWinningConditions(
          winningCombos[i][0],
          winningCombos[i][1],
          winningCombos[i][2],
        )
      ) {
        setPlayerWin(
          winningCombos[i][0],
          winningCombos[i][1],
          winningCombos[i][2],
          winningMark,
        );
      }
    }
  };

  const resetGame = () => {
    // reset gameboard array
    gameboard = [];
    for (let i = 0; i <= 8; i++) {
      gameboard.push(null);
    }
    // reset cell content and background
    Array.from(cells).forEach((cell) => {
      cell.textContent = '';
      cell.style.backgroundColor = 'black';
    });
    gameover = false;
    turn = 0;
    playerOneWin = false;
    playerTwoWin = false;
    winningMark = null;
  };

  const onClick = (i) => {
    // to prevent clicking on a cell more than once, or pause the game if a winner
    // has been declared or all cells are occupied
    if (cells[i].textContent !== '' || gameover === true || turn === 9) {
      return;
    } else {
      if (turn % 2 === 0) {
        // sets even turns and first turn as 'X'
        cells[i].textContent = 'X';
        gameboard[i] = 'X';
        turn++;
      } else if (turn % 2 !== 0) {
        // sets all odd turns as 'O'
        cells[i].textContent = 'O';
        gameboard[i] = 'O';
        turn++;
      }
      checkWinner();
    }
    // announce winner
  };

  const getCurrentTurn = () => {
    if (turn % 2 !== 0) {
      return playerTwo.playerName;
    } else if (turn % 2 === 0) {
      return playerOne.playerName;
    }
  };

  const getFinalConditions = () => {
    return { playerOneWin, playerTwoWin, turn, gameover, winningMark };
  };

  return { onClick, resetGame, getFinalConditions, getCurrentTurn };
};

let play = playGame();

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function () {
    play.onClick(i);
  });
}

resetBtn.addEventListener('click', () => {
  play.resetGame();
});

const playerFactory = (playerName, mark) => {
  return { playerName, mark };
};

const playerOne = playerFactory('player1', 'X');
const playerTwo = playerFactory('player2', 'O');

/*




getCurrentTurn()


playerfactory ()

event loop


*/
