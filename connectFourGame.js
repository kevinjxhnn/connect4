const readline = require("readline");

const board = []; // building a 6 x 7 board (same dimension as the board shown via the link shared)
const numRows = 6;
const numCols = 7;
const player1 = "X";
const player2 = "O";

// Creating the board
function createBoard() {
  for (let i = 0; i < numRows; i++) {
    const rowArray = Array(numCols).fill(" ");
    board.push(rowArray);
  }
}

function printBoard() {
  for (let i = 0; i < numRows; i++) {
    console.log(board[i].join(" | "));
  }
  const numDashes = 4 * numCols - 1;
  console.log("-".repeat(numDashes));
  console.log(" 1  2   3   4   5   6   7     <--- COLUMN NUMBERS");
}

function checkIfPlayerHasWon(player) {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // Checking horizontally
      if (
        col <= numCols - 4 &&
        board[row][col] == player &&
        board[row][col + 1] == player &&
        board[row][col + 2] == player &&
        board[row][col + 3] == player
      ) {
        return true;
      }

      // Checking vertically
      if (
        row <= numRows - 4 &&
        board[row][col] == player &&
        board[row + 1][col] == player &&
        board[row + 2][col] == player &&
        board[row + 3][col] == player
      ) {
        return true;
      }

      // Checking diagonally to the right
      if (
        col <= numCols - 4 &&
        row <= numRows - 4 &&
        board[row][col] == player &&
        board[row + 1][col + 1] == player &&
        board[row + 2][col + 2] == player &&
        board[row + 3][col + 3] == player
      ) {
        return true;
      }

      // Checking diagonally to the left
      if (
        col >= 3 &&
        row <= numRows - 4 &&
        board[row][col] === player &&
        board[row + 1][col - 1] == player &&
        board[row + 2][col - 2] == player &&
        board[row + 3][col - 3] == player
      ) {
        return true;
      }
    }
  }

  return false;
}

// Adding the player's move to the board
function addPlayerPiece(player, col) {
  for (let row = numRows - 1; row >= 0; row--) {
    if (board[row][col] == " ") {
      board[row][col] = player;
      break;
    }
  }
}

// Checking if every cell if filled. If yes, then it is a tie.
function isBoardFull(board) {
  return board.every((row) => {
    return row.every((cell) => {
      return cell != " ";
    });
  });
}

// To read the players input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentPlayer = player1;

createBoard();

// Main function to run the game
function runGame() {
  printBoard();
  rl.question(
    `Player "${currentPlayer}", enter a column between (1 - 7) to place your piece: `,
    (choice) => {
      const colIndex = choice - 1;

      if (choice > 0 && choice < 8) {
        addPlayerPiece(currentPlayer, colIndex);

        if (checkIfPlayerHasWon(currentPlayer)) {
          printBoard();

          console.log(`Player "${currentPlayer}" has won!`);
          rl.close();
        } else if (isBoardFull(board)) {
          printBoard();
          console.log("It is a tie!");
          rl.close();
        } else {
          currentPlayer = currentPlayer == player1 ? player2 : player1;
          runGame();
        }
      } else {
        console.log("Invalid move, there are only columns between 1 to 7");
        runGame();
      }
    }
  );
}

runGame();
