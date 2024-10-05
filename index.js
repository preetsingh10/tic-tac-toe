const main = document.querySelector(".main");
const winnerLine = document.querySelector(".winner-line");

const player1 = document.querySelector("#name1");
const player2 = document.querySelector("#name2");

const startGameButton = document.querySelector(".start-game-button");

const ticTacToe = (function () {
  let winner;
  let playerTurn = "X";
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

  function player(name) {
    let turn;
    return {
      name,
      turn,
    };
  }

  return {
    gameBoard,
    gameBoardController,
    player,
    winner,
    playerTurn,
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
  playerTurn: ticTacToe.playerTurn,

  gameBoard: ticTacToe.gameBoard(),

  renderGameBoard: function () {
    main.innerHTML = " ";

    domLogic.gameBoard.gameBoardArray.forEach((row) => {
      row.forEach((arrayItem) => {
        const box = document.createElement("div");
        box.classList = "box";
        box.textContent = arrayItem;
        box.dataset.position = arrayItem;

        box.addEventListener("click", () => {
          // setting the intial player turn to X
          if (domLogic.playerTurn === "O") {
            ticTacToe.gameBoardController(
              domLogic.gameBoard.gameBoardArray,
              arrayItem,
              "O"
            );
            domLogic.renderGameBoard(); // to make the changes visible on screen, we are re rendering the whole game board
            domLogic.playerTurn = "X";
          } else {
            ticTacToe.gameBoardController(
              domLogic.gameBoard.gameBoardArray,
              arrayItem,
              "X"
            );
            domLogic.renderGameBoard(); // to make the changes visible on screen, we are re rendering the whole game board
            domLogic.playerTurn = "O";
          }
          if (checkWinner(domLogic.gameBoard)) {
            winnerLine.textContent = ` The Winner is ${checkWinner(
              domLogic.gameBoard
            )}`;
          }
          console.log(domLogic.gameBoard.gameBoardArray);
        });
        main.appendChild(box);
      });
    });
  },

  startGame: function(){
    main.innerHTML = ' '
    domLogic.renderGameBoard()
  }
};

startGameButton.addEventListener('click', ()=>{
  domLogic.startGame()
})
// domLogic.startGame()
