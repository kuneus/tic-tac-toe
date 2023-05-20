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
  let humanMark = null;
  let aiMark = null;
  let ai = { difficulty: null, mark: null };

  const xWinDisplay = document.getElementById('player-1-wincount');
  const oWinDisplay = document.getElementById('player-2-wincount');

  // gameboard array to correspond to tic tac toe tiles
  let gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
    if (turn === 0 && compModeBtn.value === 'easy') {
      ai.difficulty = 'easy';

      // if computer is first turn, initiate computer choice
      if (displayPlayerOne.textContent === 'COMPUTER') {
        setTimeout(() => {
          getComputerChoice('X');
        }, 500);
      }
    } else if (turn === 0 && compModeBtn.value === 'hard') {
      ai.difficulty = 'hard';
    } else if (turn === 0) {
      ai.difficulty = null;
    }

    // keeps track of mark for human vs AI players
    if (ai.difficulty !== null) {
      if (displayPlayerOne.textContent === 'COMPUTER') {
        aiMark = 'X';
        humanMark = 'O';
      } else if (displayPlayerTwo.textContent === 'COMPUTER') {
        aiMark = 'O';
        humanMark = 'X';
      }
    }

    // announce tie game
    if (turn === 9 && playerOneWin === false && playerTwoWin === false) {
      // turn isn't updating
      gameover = true;
      announceWinner.textContent = 'Tie! Try again.';
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
      gameboard.push(i);
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
    if (
      cells[i].textContent === 'X' ||
      cells[i].textContent === 'O' ||
      gameover === true ||
      turn === 9
    ) {
      // to prevent repeated clicking on cell, or pause the game
      // if a winner has been declared or all cells are occupied
      return;
    } else {
      if (turn % 2 === 0) {
        // sets even turns and first turn as 'X'
        cells[i].textContent = 'X';
        gameboard[i] = 'X';
      } else if (turn % 2 !== 0) {
        // sets all odd turns as 'O'
        cells[i].textContent = 'O';
        gameboard[i] = 'O';
      }
      turn++;
      checkWinner();
      getCurrentTurn();

      // initiate computer's turn
      //   **** HARD MORE:  add conditional for checking computer difficulty ****
      if (ai.difficulty !== null && gameover === false) {
        setTimeout(() => {
          getComputerChoice(aiMark);
        }, 300);
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

  // computer turn
  const getComputerChoice = (mark) => {
    let cellArray = Array.from(cells);

    if (ai.difficulty === 'easy') {
      for (let i = 0; i < 100; i++) {
        // retrieve random index from array for easy computer choice
        let computerCellChoice =
          cellArray[Math.floor(Math.random() * cellArray.length)];
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
    } else if (ai.difficulty === 'hard') {
      let bestSpot = minimax(gameboard, aiMark);

      if (cells[bestSpot] !== undefined) {
        console.log('CHECK cells[bestSpot]: ' + cells[bestSpot]);
        if (cells[bestSpot].textContent === '') {
          cells[bestSpot].textContent = mark;
          gameboard[bestSpot] = mark;
          turn++;
        }
      }
    }

    checkWinner();
    getCurrentTurn();
  };

  // find avialable index in gameboard array
  const availIndexes = (board) => {
    return board.filter((cell) => cell !== 'O' && cell !== 'X');
  };

  // check winning conditions for minimax fn
  const mmWinConditions = (arrNum1, arrNum2, arrNum3, playerMark, newBoard) => {
    // array is defined and returned in order to evaluate
    // truthiness of winning combination
    const winningConditions = [
      newBoard[arrNum1] === newBoard[arrNum2] &&
        newBoard[arrNum2] === newBoard[arrNum3],
    ];

    if (winningConditions[0] === true && newBoard[arrNum1] === playerMark) {
      // check truthiness of winning combo with player's mark
      return true;
    } else {
      return false;
    }
  };

  const aiWinLoop = (playerMark, newBoard) => {
    // iterate through array of winningCombos to find winning combo
    for (let i = 0; i <= 7; i++) {
      if (
        mmWinConditions(
          winningCombos[i][0],
          winningCombos[i][1],
          winningCombos[i][2],
          playerMark,
          newBoard,
        )
      ) {
        return true;
      }
    }
  };

  let fc = 0;

  // function for computer hard mode
  const minimax = (newBoard, player) => {
    fc++;

    console.log('FUNCTION COUNT: ' + fc);

    // available cells
    let openCells = availIndexes(newBoard);

    // checks the terminal states from the loop below for win/loss/tie
    if (aiWinLoop(humanMark, newBoard)) {
      console.log('CHECK: human mark win');
      return { score: -10 };
    } else if (aiWinLoop(aiMark, newBoard)) {
      console.log('CHECK: aiMark win');
      return { score: 10 };
    } else if (openCells.length === 0) {
      console.log('CHECK: tie!');
      return { score: 0 };
    }

    console.log('current gameboard array:  ' + newBoard);

    // array for available moves on the board
    let moves = [];

    for (let i = 0; i < openCells.length; i++) {
      // create object for each and store the index of that spot
      let move = {};
      move.index = newBoard[openCells[i]];

      // set the empty spot to the current player's mark
      newBoard[openCells[i]] = player;
      console.log('CHECK: current mark:  ' + player);
      console.log('current gameboard array after insertion:  ' + newBoard);

      // collect the score resulted from calling minimax on the
      // opponent of the current player
      if (player === aiMark) {
        let result = minimax(newBoard, humanMark);
        if (result !== undefined) {
          move.score = result.score; // **** some, but not all, scores are returning undefined ****
        }
      } else if (player === humanMark) {
        let result = minimax(newBoard, aiMark);
        if (result !== undefined) {
          move.score = result.score;
        }
      }
      console.log('move.score: ' + move.score);

      // reset the spot to empty
      newBoard[openCells[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

    console.log('CHECK: moves.length:  ' + moves.length);
    let bestMove;
    if (player === aiMark) {
      // for AI move, loop over the moves and choose the move with the highest score
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        console.log('moves[i].score:  ' + moves[i].score);
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
      console.log('CHECK aiBestScore = ' + bestScore);
    } else {
      // loop over the moves and choose the move with the lowest score if player is human
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        console.log('moves[i].score:  ' + moves[i].score);
        if (moves[i] < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
      console.log('CHECK huBestScore = ' + bestScore);
    }
    // return the best move from the moves array by selecting the best move index

    if (moves[bestMove] !== undefined) {
      console.log('CHECK: moves[bestMove].index:  ' + moves[bestMove].index);
      return moves[bestMove].index;
    }
  };

  // let bestSpot = minimax(gameboard, aiMark);

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

// DOM elements
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
const compModeBtn = document.getElementById('computer-mode');

// exit introduction display and transition to game display
startBtn.addEventListener('click', () => {
  if (playerOneInput.value === '') {
    playerOneInput.value = 'Player One';
  }

  if (playerTwoInput.value === '') {
    playerTwoInput.value = 'Player Two';
  }

  if (compModeBtn.value === 'easy' || compModeBtn.value === 'hard') {
    // code to initiate AI opponent
    // check if easy or hard
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

/* TO-DO

optional:  create AI opponent and allow user to choose to play against AI or 
another player


*/

/*

Context:  project assignment is creating tic-tac-toe with vanilla Javascript. I have essentially finished the project,
with the exception of one final problem:  building an unbeatable AI opponent using the minimax function. 

There seems to be a few issues with my minimax function (line 328), but the most glaring one I'm running into is that
the function is returning an undefined score only some of the times, while other times, it properly returns the correct
score.See lines 365 - 373 in the if/else block within the loop, where I left a comment stating the undefined error.

When you run the game and open the console log, select 'hard' AI and make the first move. In the console log, you'll see
that move.score occasionally returns undefined (line 376, 391, or 402). What SHOULD be happening is that every time a terminal state
is reached and one of the players wins or there is a tie, a score is returned to the previous function call's loop where
it is stored. 

I've inserted several console logs throughout the code to try to debug the issue and can't seem to understand why
this is happening or where it's exactly occurring and if that is the only issue. The function call also seems to be
called an absurd amount of times (50k+) which definitely doesn't seem to be right and takes way too long to execute. 

*/
