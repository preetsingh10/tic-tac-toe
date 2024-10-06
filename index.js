const main = document.querySelector(".main");
const winnerLine = document.querySelector(".winner-line");

const player1 = document.querySelector("#name1");
const player2 = document.querySelector("#name2");

const startGameButton = document.querySelector(".start-game-button");

const ticTacToe = (function () {
  let winner;
  let currentTurn;
  let player1Turn = "X"; // setting the intial player turn to X
  let player2Turn = "O"; // setting the intial player turn to O
  function gameBoard() {
    let row1 = [1, 2, 3];
    let row2 = [4, 5, 6];
    let row3 = [7, 8, 9];
    return {
      gameBoardArray: [row1, row2, row3],
    };
  }
  function gameBoardController(gameBoard, position, choice) {
    if (position <= 3) {
      // to check if it is in row 1
      const indexOfPosition = gameBoard[0].indexOf(position);
      if (
        gameBoard[0][indexOfPosition] === "X" ||
        gameBoard[0][indexOfPosition] === "O"
      ) {
        console.log("the postion is already taken");
      } else {
        gameBoard[0][indexOfPosition] = choice;
      }
    } else if (position >= 4 && position <= 6) {
      // to check if it is in row 2
      const indexOfPosition = gameBoard[1].indexOf(position);
      if (
        gameBoard[1][indexOfPosition] === "X" ||
        gameBoard[1][indexOfPosition] === "O"
      ) {
        console.log("the postion is already taken");
      } else {
        gameBoard[1][indexOfPosition] = choice;
      }
    } else {
      const indexOfPosition = gameBoard[2].indexOf(position);
      if (
        gameBoard[2][indexOfPosition] === "X" ||
        gameBoard[2][indexOfPosition] === "O"
      ) {
        console.log("the postion is already taken");
      } else {
        gameBoard[2][indexOfPosition] = choice;
      }
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
  //  CHECK HORIZONTALLY
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

  // check vertically
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

  // check diagonally
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
  player1Turn: ticTacToe.playerTurn,
  player2Turn: ticTacToe.player2Turn,
  currentTurn: ticTacToe.currentTurn,

  gameBoard: ticTacToe.gameBoard(),

  renderGameBoard: function () {
    main.innerHTML = " ";

    domLogic.gameBoard.gameBoardArray.forEach((row) => {
      row.forEach((arrayItem) => {
        const box = document.createElement("div");
        box.classList = "box";
        box.textContent = arrayItem;
        box.dataset.position = arrayItem;
        winnerLine.textContent = `${domLogic.player1Turn} turn`;
        box.addEventListener("click", () => {
          if (
            domLogic.currentTurn === "O" &&
            domLogic.currentTurn !== "finished"
          ) {
            ticTacToe.gameBoardController(
              domLogic.gameBoard.gameBoardArray,
              arrayItem,
              "O"
            );
            domLogic.renderGameBoard(); // to make the changes visible on screen, we are re rendering the whole game board
            domLogic.currentTurn = "X";
            winnerLine.textContent = `${domLogic.player1Turn} turn`;
          } else if (domLogic.currentTurn !== "finished") {
            ticTacToe.gameBoardController(
              domLogic.gameBoard.gameBoardArray,
              arrayItem,
              "X"
            );
            domLogic.renderGameBoard(); // to make the changes visible on screen, we are re rendering the whole game board
            domLogic.currentTurn = "O";
            winnerLine.textContent = `${domLogic.player2Turn} turn`;
          }
          if (checkWinner(domLogic.gameBoard)) {
            winnerLine.textContent = ` The Winner is ${
              checkWinner(domLogic.gameBoard) === "X"
                ? domLogic.player1Turn
                : domLogic.player2Turn
            }`;
            domLogic.currentTurn = "finished";
          }
          console.log(domLogic.gameBoard.gameBoardArray);
        });
        main.appendChild(box);
      });
    });
  },

  startGame: function () {
    main.innerHTML = " ";
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
