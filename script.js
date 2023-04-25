const cells = document.getElementsByClassName('cell');
const playerFactory = (playerName, mark) => {
  return { playerName, mark };
};

const playGame = () => {
  // set initial game conditions
  let turn = 0;
  let gameover = false;
  let playerOneWin = false;
  let playerTwoWin = false;
  let winningMark = null;
  let playerOneWinCount = 0;
  let playerTwoWinCount = 0;
  let easyComputerMode = false;
  let hardComputerMode = false;

  const xWinDisplay = document.getElementById('player-1-wincount');
  const oWinDisplay = document.getElementById('player-2-wincount');

  // gameboard array to correspond to tic tac toe tiles
  let gameboard = [null, null, null, null, null, null, null, null, null];

  // array of all possible winning combinations
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

  // identify player turn by highlighting name
  const getCurrentTurn = () => {
    // turn off highlight if gameover or when all cells occupied
    if (turn === 9 || gameover === true) {
      highlightO.style.border = 'none';
      highlightO.style.boxShadow = 'none';
      highlightX.style.border = 'none';
      highlightX.style.boxShadow = 'none';
      switchBtn.style.display = 'initial';
    } else if (turn % 2 !== 0) {
      highlightO.style.border = 'solid 1px var(--highlight-name)';
      highlightO.style.boxShadow = '0px 0px 10px var(--highlight-name)';
      highlightX.style.border = 'none';
      highlightX.style.boxShadow = 'none';
      switchBtn.style.display = 'none';
    } else if (turn % 2 === 0) {
      highlightX.style.border = 'solid 1px var(--highlight-name)';
      highlightX.style.boxShadow = '0px 0px 10px var(--highlight-name)';
      highlightO.style.border = 'none';
      highlightO.style.boxShadow = 'none';
      switchBtn.style.display = 'none';
    }

    // check if AI is selected during transition from intro to game display
    if (turn === 0 && compBtn.checked) {
      easyComputerMode = true;
      // if computer is first turn, initiate computer choice
      if (displayPlayerOne.textContent === 'COMPUTER') {
        setTimeout(() => {
          getComputerChoice('X');
        }, 500);
      }
    } else if (turn === 0) {
      easyComputerMode = false;
    }
  };

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

  // designate the winning player
  const setPlayerWin = (cellOne, cellTwo, cellThree, mark) => {
    if (mark === 'X') {
      playerOneWin = true;
      playerOneWinCount++;
      xWinDisplay.textContent = playerOneWinCount;
      announceWinner.textContent = `${playerOneInput.value} wins the round!`;
    } else if (mark === 'O') {
      playerTwoWin = true;
      playerTwoWinCount++;
      oWinDisplay.textContent = playerTwoWinCount;
      announceWinner.textContent = `${playerTwoInput.value} wins the round!`;
    }

    gameover = true;
    // change background color of the winning combination cells
    cells[cellOne].style.backgroundColor = 'var(--highlight-green)';
    cells[cellOne].style.color = 'var(--red-font-color)';
    cells[cellTwo].style.backgroundColor = 'var(--highlight-green)';
    cells[cellTwo].style.color = 'var(--red-font-color)';
    cells[cellThree].style.backgroundColor = 'var(--highlight-green)';
    cells[cellThree].style.color = 'var(--red-font-color)';
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
      cell.style.color = 'white';
    });

    // reset to initial round conditions but keep score
    gameover = false;
    turn = 0;
    playerOneWin = false;
    playerTwoWin = false;
    winningMark = null;
    announceWinner.textContent = '';
  };

  // reset score for a new game
  const resetScore = () => {
    playerOneWinCount = 0;
    playerTwoWinCount = 0;
    xWinDisplay.textContent = playerOneWinCount;
    oWinDisplay.textContent = playerOneWinCount;
  };

  const onClick = (i) => {
    if (cells[i].textContent !== '' || gameover === true || turn === 9) {
      // to prevent repeated clicking on cell, or pause the game
      // if a winner has been declared or all cells are occupied
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
      getCurrentTurn();

      // initiate computer's turn
      //   **** HARD MORE:  add conditional for checking computer difficulty****
      if (easyComputerMode === true) {
        if (displayPlayerOne.textContent === 'COMPUTER') {
          // computer is player one
          setTimeout(() => {
            getComputerChoice('X');
          }, 300);
        } else if (displayPlayerTwo.textContent === 'COMPUTER') {
          // computer is player two

          setTimeout(() => {
            getComputerChoice('O');
          }, 300);
        }

        checkWinner();
        getCurrentTurn();
      }

      // announce tie game
      if (turn === 9 && playerOneWin === false && playerTwoWin === false) {
        gameover = true;
        announceWinner.textContent = 'Tie! Try again.';
      }
    }
  };

  // switch markers between players and carry over score
  const switchMarkers = () => {
    let playerOne = playerFactory(`${playerOneInput.value}`, 'X');
    let playerTwo = playerFactory(`${playerTwoInput.value}`, 'O');
    let newPlayerOneWinCount = playerOneWinCount;
    let newPlayerTwoWinCount = playerTwoWinCount;
    playerOne.mark = 'O';
    playerTwo.mark = 'X';

    displayPlayerOne.textContent = playerTwo.playerName;
    displayPlayerTwo.textContent = playerOne.playerName;
    xWinDisplay.textContent = newPlayerTwoWinCount;
    oWinDisplay.textContent = newPlayerOneWinCount;
    playerOneWinCount = newPlayerTwoWinCount;
    playerTwoWinCount = newPlayerOneWinCount;
    playerOneInput.value = playerTwo.playerName;
    playerTwoInput.value = playerOne.playerName;

    resetGame();
    getCurrentTurn();
  };

  // retrieve random index from array for easy computer choice
  const computerEasy = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // computer turn
  // **** HARD MORE:  switch computerEasy function invocation below to hard mode function ***
  const getComputerChoice = (mark) => {
    let cellArray = Array.from(cells);

    for (let i = 0; i < 100; i++) {
      let computerCellChoice = computerEasy(cellArray);
      // Continue to next iteration if current cell is occupied until open cell is identified.
      if (computerCellChoice.textContent !== '') {
        continue;
      } else if (gameover === true || turn === 9) {
        break;
      } else if (computerCellChoice.textContent === '') {
        computerCellChoice.textContent = mark;
        let cellIndex = cellArray.indexOf(computerCellChoice);
        gameboard[cellIndex] = mark;
        turn++;
        break;
      }
    }
  };

  // no purpose yet
  const getFinalConditions = () => {
    return { playerOneWin, playerTwoWin, turn, gameover, winningMark };
  };

  return {
    onClick,
    resetGame,
    getFinalConditions,
    getCurrentTurn,
    resetScore,
    switchMarkers,
    getComputerChoice,
  };
};

let play = playGame();

for (let i = 0; i < cells.length; i++) {
  // call playGame function with click of each cell
  cells[i].addEventListener('click', function () {
    play.onClick(i);
  });

  // add hover effect for each cell
  cells[i].addEventListener('mouseover', function () {
    if (play.getFinalConditions().gameover === false) {
      cells[i].style.backgroundColor = 'var(--highlight-green)';
    }
  });
  cells[i].addEventListener('mouseout', function () {
    if (play.getFinalConditions().gameover === false)
      cells[i].style.backgroundColor = '';
  });
}

const newRound = document.getElementById('new-round');
const newGame = document.getElementById('new-game');
const playerOneInput = document.getElementById('player-1');
const playerTwoInput = document.getElementById('player-2');
const displayPlayerOne = document.getElementById('mark-X');
const displayPlayerTwo = document.getElementById('mark-O');
const announceWinner = document.getElementById('announce-winner-container');
const highlightX = document.getElementById('highlight-X');
const highlightO = document.getElementById('highlight-O');
const startBtn = document.getElementById('start-btn');
const newGameContainer = document.getElementById('new-game-container');
const gameContainer = document.getElementById('game-container');
const switchBtn = document.getElementById('switch-markers');
const compBtn = document.getElementById('computerCheck');

// exit introduction display and transition to game display
startBtn.addEventListener('click', () => {
  if (playerOneInput.value === '') {
    playerOneInput.value = 'Player One';
  }

  if (playerTwoInput.value === '') {
    playerTwoInput.value = 'Player Two';
  }

  if (compBtn.checked) {
    // code to input AI opponent
    playerTwoInput.value = 'COMPUTER';
  }

  newGameContainer.style.display = 'none';
  gameContainer.style.display = 'flex';
  gameContainer.style.flexDirection = 'column';
  displayPlayerOne.textContent = playerOneInput.value;
  displayPlayerTwo.textContent = playerTwoInput.value;

  // highlights player X to identify first turn
  play.getCurrentTurn();
});

// start a new round of TTT while keeping the score
newRound.addEventListener('click', () => {
  play.resetGame();
  play.getCurrentTurn();
  switchBtn.style.display = 'initial';
});

// allow players to switch markers while keeping score the same
switchBtn.addEventListener('click', () => {
  play.switchMarkers();
});

// exit back to intro display and resets the game and score
newGame.addEventListener('click', () => {
  play.resetGame();
  play.resetScore();
  newGameContainer.style.display = 'flex';
  gameContainer.style.display = 'none';
  playerOneInput.value = '';
  playerTwoInput.value = '';
});

/* pseudocode

optional:  create AI opponent and allow user to choose to play against AI or 
another player

*/
