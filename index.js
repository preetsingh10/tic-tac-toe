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
    domLogic.renderGameBoard();
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
  if (
    gameBoard.gameBoardArray[0][0] === gameBoard.gameBoardArray[0][2] &&
    gameBoard.gameBoardArray[0][1] === gameBoard.gameBoardArray[0][2]
  ) {
    gameBoard.winner = gameBoard.gameBoardArray[0][2];
    return gameBoard.winner;
  } else if (
    gameBoard.gameBoardArray[1][0] === gameBoard.gameBoardArray[1][2] &&
    gameBoard.gameBoardArray[1][1] === gameBoard.gameBoardArray[1][2]
  ) {
    gameBoard.winner = gameBoard.gameBoardArray[1][2];
    return gameBoard.winner;
  } else if (
    gameBoard.gameBoardArray[2][0] === gameBoard.gameBoardArray[2][2] &&
    gameBoard.gameBoardArray[2][1] === gameBoard.gameBoardArray[2][2]
  ) {
    gameBoard.winner = gameBoard.gameBoardArray[2][2];
    return gameBoard.winner;
  }

  // Check vertically
  else if (
    gameBoard.gameBoardArray[0][0] === gameBoard.gameBoardArray[2][0] &&
    gameBoard.gameBoardArray[1][0] === gameBoard.gameBoardArray[2][0]
  ) {
    gameBoard.winner = gameBoard.gameBoardArray[2][0];
    return gameBoard.winner;
  } else if (
    gameBoard.gameBoardArray[0][1] === gameBoard.gameBoardArray[2][1] &&
    gameBoard.gameBoardArray[1][1] === gameBoard.gameBoardArray[2][1]
  ) {
    gameBoard.winner = gameBoard.gameBoardArray[2][1];
    return gameBoard.winner;
  } else if (
    gameBoard.gameBoardArray[0][2] === gameBoard.gameBoardArray[2][2] &&
    gameBoard.gameBoardArray[1][2] === gameBoard.gameBoardArray[2][2]
  ) {
    gameBoard.winner = gameBoard.gameBoardArray[2][2];
    return gameBoard.winner;
  }

  // Check diagonally
  else if (
    gameBoard.gameBoardArray[0][0] === gameBoard.gameBoardArray[1][1] &&
    gameBoard.gameBoardArray[2][2] === gameBoard.gameBoardArray[1][1]
  ) {
    gameBoard.winner = gameBoard.gameBoardArray[1][1];
    return gameBoard.winner;
  } else if (
    gameBoard.gameBoardArray[0][2] === gameBoard.gameBoardArray[1][1] &&
    gameBoard.gameBoardArray[2][0] === gameBoard.gameBoardArray[1][1]
  ) {
    gameBoard.winner = gameBoard.gameBoardArray[2][0];
    return gameBoard.winner;
  }
}

const domLogic = {
  player1Turn: ticTacToe.player1Turn,
  player2Turn: ticTacToe.player2Turn,
  currentTurn: ticTacToe.currentTurn,

  gameBoard: ticTacToe.gameBoard(),

  renderGameBoard: function () {
    main.innerHTML = "";

    domLogic.gameBoard.gameBoardArray.forEach((row, rowIndex) => {
      row.forEach((arrayItem, colIndex) => {
        const box = document.createElement("div");
        box.classList = "box";
        box.textContent = arrayItem;
        box.dataset.row = rowIndex;
        box.dataset.col = colIndex;

        box.addEventListener("click", () => {
          if (domLogic.currentTurn === "O" && domLogic.currentTurn !== "finished") {
            ticTacToe.gameBoardController(
              domLogic.gameBoard.gameBoardArray,
              rowIndex,
              colIndex,
              "O"
            );
            domLogic.currentTurn = "X";
            winnerLine.textContent = `${domLogic.player1Turn} turn`;
          } else if (domLogic.currentTurn !== "finished") {
            ticTacToe.gameBoardController(
              domLogic.gameBoard.gameBoardArray,
              rowIndex,
              colIndex,
              "X"
            );
            domLogic.currentTurn = "O";
            winnerLine.textContent = `${domLogic.player2Turn} turn`;
          }

          if (checkWinner(domLogic.gameBoard)) {
            winnerLine.textContent = `The Winner is ${
              checkWinner(domLogic.gameBoard) === "X"
                ? domLogic.player1Turn
                : domLogic.player2Turn
            }`;
            domLogic.currentTurn = "finished";
          }
          domLogic.renderGameBoard(); // Re-render the board to show updates
        });

        main.appendChild(box);
      });
    });
  },

  startGame: function () {
    main.innerHTML = "";
    domLogic.player1Turn = player1.value;
    domLogic.player2Turn = player2.value;
    if (domLogic.player1Turn !== "" && domLogic.player2Turn !== "") {
      domLogic.renderGameBoard();
    }
  },
};

startGameButton.addEventListener("click", () => {
  domLogic.startGame();
});