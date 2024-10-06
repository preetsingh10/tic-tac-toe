const main = document.querySelector(".main");
const winnerLine = document.querySelector(".winner-line");

const player1 = document.querySelector("#name1");
const player2 = document.querySelector("#name2");

const startGameButton = document.querySelector(".start-game-button");

const ticTacToe = (function () {
  let winner;
  let currentTurn;
  let player1Turn = "X"; // setting the initial player turn to X
  let player2Turn = "O"; // setting the initial player turn to O

  function gameBoard() {
    let row1 = ["", "", ""];
    let row2 = ["", "", ""];
    let row3 = ["", "", ""];
    return {
      gameBoardArray: [row1, row2, row3],
    };
  }

  function gameBoardController(gameBoardArray, row, col, choice) {
    if (gameBoardArray[row][col] === "") { // Check if cell is empty
      gameBoardArray[row][col] = choice;
    } else {
      console.log("The position is already taken");
    }
    domLogic.renderGameBoard(); // Move this to update the UI immediately after making a move
  }

  return {
    gameBoard,
    gameBoardController,
    winner,
    currentTurn,
    player1Turn,
    player2Turn,
  };
})();

function checkWinner(gameBoard) {
  // Check horizontally
  for (let i = 0; i < 3; i++) {
    if (gameBoard.gameBoardArray[i][0] && 
        gameBoard.gameBoardArray[i][0] === gameBoard.gameBoardArray[i][1] && 
        gameBoard.gameBoardArray[i][1] === gameBoard.gameBoardArray[i][2]) {
      return gameBoard.gameBoardArray[i][0];
    }
  }

  // Check vertically
  for (let i = 0; i < 3; i++) {
    if (gameBoard.gameBoardArray[0][i] && 
        gameBoard.gameBoardArray[0][i] === gameBoard.gameBoardArray[1][i] && 
        gameBoard.gameBoardArray[1][i] === gameBoard.gameBoardArray[2][i]) {
      return gameBoard.gameBoardArray[0][i];
    }
  }

  // Check diagonally
  if (gameBoard.gameBoardArray[0][0] && 
      gameBoard.gameBoardArray[0][0] === gameBoard.gameBoardArray[1][1] && 
      gameBoard.gameBoardArray[1][1] === gameBoard.gameBoardArray[2][2]) {
    return gameBoard.gameBoardArray[0][0];
  }
  if (gameBoard.gameBoardArray[0][2] && 
      gameBoard.gameBoardArray[0][2] === gameBoard.gameBoardArray[1][1] && 
      gameBoard.gameBoardArray[1][1] === gameBoard.gameBoardArray[2][0]) {
    return gameBoard.gameBoardArray[0][2];
  }

  return null; // Return null if no winner
}

const domLogic = {
  player1Turn: ticTacToe.player1Turn,
  player2Turn: ticTacToe.player2Turn,
  currentTurn: ticTacToe.currentTurn,

  gameBoard: ticTacToe.gameBoard(),

  renderGameBoard: function () {
    main.innerHTML = ""; // Clear the board before rendering

    domLogic.gameBoard.gameBoardArray.forEach((row, rowIndex) => {
      row.forEach((arrayItem, colIndex) => {
        const box = document.createElement("div");
        box.classList = "box";
        box.textContent = arrayItem; // Display the current item (X or O)
        box.dataset.row = rowIndex;
        box.dataset.col = colIndex;

        box.addEventListener("click", () => {
          // Only allow clicking if the game is not finished
          if (domLogic.currentTurn !== "finished") {
            const currentPlayer = domLogic.currentTurn === "O" ? "O" : "X"; // Determine current player

            ticTacToe.gameBoardController(
              domLogic.gameBoard.gameBoardArray,
              rowIndex,
              colIndex,
              currentPlayer
            );

            // Change the turn only after a successful move
            if (currentPlayer === "X") {
              domLogic.currentTurn = "O"; // Switch to O
              winnerLine.textContent = `${domLogic.player2Turn} turn`;
            } else {
              domLogic.currentTurn = "X"; // Switch to X
              winnerLine.textContent = `${domLogic.player1Turn} turn`;
            }

            // Check for a winner after each move
            const winner = checkWinner(domLogic.gameBoard);
            if (winner) {
              winnerLine.textContent = `The Winner is ${winner === "X" ? domLogic.player1Turn : domLogic.player2Turn}`;
              domLogic.currentTurn = "finished"; // End the game
            }

            domLogic.renderGameBoard(); // Re-render the board to show updates
          }
        });

        main.appendChild(box);
      });
    });
  },

  startGame: function () {
    main.innerHTML = ""; // Clear the board at the start
    domLogic.player1Turn = player1.value;
    domLogic.player2Turn = player2.value;
    if (domLogic.player1Turn !== "" && domLogic.player2Turn !== "") {
      domLogic.currentTurn = "X"; // Set current turn to X when starting the game
      winnerLine.textContent = `${domLogic.player1Turn} turn`; // Indicate whose turn it is
      domLogic.renderGameBoard(); // Render the game board
    }
  },
};

startGameButton.addEventListener("click", () => {
  domLogic.startGame();
});