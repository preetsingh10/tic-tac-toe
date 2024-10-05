const main = document.querySelector(".main");
const winnerLine = document.querySelector('.winner-line')
const ticTacToe = (function () {
  let winner;
  function gameBoard() {
    let row1 = [1, 2, 3];
    let row2 = [4, 5, 6];
    let row3 = [7, 8,9];
    return {
      gameBoardArray: [row1, row2, row3],
    };
  }
  function gameBoardController(gameBoard, position, choice) {
    if (position <= 3) {
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
      const indexOfPosition = gameBoard[1].indexOf(position);
      gameBoard[1][indexOfPosition] = choice;
    } else {
      const indexOfPosition = gameBoard[2].indexOf(position);
      gameBoard[2][indexOfPosition] = choice;
    }

    domLogic.renderGameBoard();
  }

  function player(name) {
    let turn;
    return {
      name,
     turn
    };
  }

  return {
    gameBoard,
    gameBoardController,
    player,
    winner,
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

// function gameBoardConsoleDisplay(gameBoard) {
//   for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
//     console.log(gameBoard.gameBoardArray[i]);
//   }
// }

// function startGame() {
//   const gameBoard = ticTacToe.gameBoard();

//   while (!gameBoard.winner) {
//     console.log(
//       "============================= Tic Tac Toe ===================="
//     );
//     if (checkWinner(gameBoard)) {
//       break;
//     }
//     gameBoardConsoleDisplay(gameBoard);

//     const player1_position = prompt("'X' your position: ");
//     ticTacToe.gameBoardController(
//       gameBoard.gameBoardArray,
//       parseInt(player1_position),
//       "X"
//     );
//     gameBoardConsoleDisplay(gameBoard);
//     if (checkWinner(gameBoard)) {
//       break;
//     }

//     const player2_position = prompt(" 'O' your position: ");
//     ticTacToe.gameBoardController(
//       gameBoard.gameBoardArray,
//       parseInt(player2_position),
//       "O"
//     );
//     gameBoardConsoleDisplay(gameBoard);
//     if (checkWinner(gameBoard)) {
//       break;
//     }
//   }

//   console.log("The Winner is ", gameBoard.winner);
// }

const domLogic = {

  gameBoard: ticTacToe.gameBoard(),

  renderGameBoard: function () {

    main.innerHTML = " ";
   
    domLogic.gameBoard.gameBoardArray.forEach((row) => {
      
      row.forEach((arrayItem) => {
        const box = document.createElement("div");
        box.classList = "box";
        box.textContent = arrayItem
        box.dataset.position = arrayItem
      
        box.addEventListener('click',()=>{

          let playerTurn; // setting the intial player turn to X
          if(playerTurn === 'O'){
            ticTacToe.gameBoardController(domLogic.gameBoard.gameBoardArray,arrayItem,'O')
            domLogic.renderGameBoard(); // to make the changes visible on screen, we are re rendering the whole game board
            playerTurn = 'X' 
          }
          else{
            ticTacToe.gameBoardController(domLogic.gameBoard.gameBoardArray,arrayItem,'X')
            domLogic.renderGameBoard(); // to make the changes visible on screen, we are re rendering the whole game board
            playerTurn = 'O' 
          }
          if(checkWinner(domLogic.gameBoard)){
            winnerLine.textContent = ` The Winner is ${checkWinner(domLogic.gameBoard)}`

          }
          console.log(domLogic.gameBoard.gameBoardArray)
        })
        main.appendChild(box);
      });
    });
  },

  gameBoardController: function(gameBoard,position,value){
  },

  
    // console.log("The Winner is ", domLogic.gameBoard.winner);
}  
domLogic.renderGameBoard();
// domLogic.startGame()
