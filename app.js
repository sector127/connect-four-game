"use-strict";

const player1 = "red";
const player2 = "yellow";

const player1ScoreEl = document.getElementById("player-1-score");
const player2ScoreEl = document.getElementById("player-2-score");
const winner = document.getElementById("winner");
const currentTurnEl = document.getElementById("current-turn");
const timerEl = document.getElementById("timer");
const playAgainBtn = document.getElementById("play-again-btn");
const restartBtn = document.getElementById("restart");

let scores = {
  player1: 0,
  player2: 0,
};

localScores = JSON.parse(localStorage.getItem("scores"));
if (localScores) scores = localScores;

player1ScoreEl.innerText = scores.player1;
player2ScoreEl.innerText = scores.player2;

let seconds = 30;
let currentPlayer = player1;
let gameOver = false;
let gameBoard;
const ROWS = 6;
const COLUMNS = 7;
let currentColumn = [];

const timer = () => {
  setInterval(() => {
    timerEl.innerText = `${seconds}s`;
    seconds--;
    if (seconds == 0 && currentPlayer == player1) {
      currentPlayer = player2;
      currentTurnEl.innerText = "PLAYER 2'S TURN";
      document.documentElement.style.setProperty("--my-var", "#ffce67");
      seconds = 30;
    }
    if (seconds == 0 && currentPlayer == player2) {
      currentPlayer = player1;
      currentTurnEl.innerText = "PLAYER 1'S TURN";
      document.documentElement.style.setProperty("--my-var", "#fd6687");

      seconds = 30;
    }
  }, 1000);
};

window.onload = function () {
  initGeme();
};

const setLocalStorage = () => {
  localStorage.setItem("scores", JSON.stringify(scores));
};

const restart = () => {
  localStorage.removeItem("scores");
  location.reload();
};

restartBtn.addEventListener("click", () => {
  restart();
});

const initGeme = () => {
  gameBoard = [];
  currentColumn = [5, 5, 5, 5, 5, 5, 5];
  timer();

  for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLUMNS; c++) {
      row.push(" ");
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("game-board").append(tile);
    }
    gameBoard.push(row);
  }
};

playAgainBtn.addEventListener("click", () => {
  location.reload();
});

const setPiece = function () {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currentColumn[c];

  if (r < 0) {
    return;
  }

  gameBoard[r][c] = currentPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currentPlayer == player1) {
    tile.classList.add("red-dot");
    currentPlayer = player2;
    currentTurnEl.innerText = "PLAYER 2'S TURN";
    document.documentElement.style.setProperty("--my-var", "#ffce67");
    seconds = 30;
  } else {
    tile.classList.add("yellow-dot");
    currentPlayer = player1;
    currentTurnEl.innerText = "PLAYER 1'S TURN";
    document.documentElement.style.setProperty("--my-var", "#fd6687");
    seconds = 30;
  }

  r -= 1;
  currentColumn[c] = r;

  checkWinner();
};

const checkWinner = () => {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (gameBoard[r][c] != " ") {
        if (
          gameBoard[r][c] == gameBoard[r][c + 1] &&
          gameBoard[r][c + 1] == gameBoard[r][c + 2] &&
          gameBoard[r][c + 2] == gameBoard[r][c + 3]
        ) {
          document
            .getElementById(r.toString() + "-" + c.toString())
            .classList.add("winner-ring");
          document
            .getElementById(r.toString() + "-" + (c + 1).toString())
            .classList.add("winner-ring");
          document
            .getElementById(r.toString() + "-" + (c + 2).toString())
            .classList.add("winner-ring");
          document
            .getElementById(r.toString() + "-" + (c + 3).toString())
            .classList.add("winner-ring");
          setWinner(r, c);
          return;
        }
      }
    }
  }

  for (let c = 0; c < COLUMNS; c++) {
    for (let r = 0; r < ROWS - 3; r++) {
      if (gameBoard[r][c] != " ") {
        if (
          gameBoard[r][c] == gameBoard[r + 1][c] &&
          gameBoard[r + 1][c] == gameBoard[r + 2][c] &&
          gameBoard[r + 2][c] == gameBoard[r + 3][c]
        ) {
          document
            .getElementById(r.toString() + "-" + c.toString())
            .classList.add("winner-ring");
          document
            .getElementById((r + 1).toString() + "-" + c.toString())
            .classList.add("winner-ring");
          document
            .getElementById((r + 2).toString() + "-" + c.toString())
            .classList.add("winner-ring");
          document
            .getElementById((r + 3).toString() + "-" + c.toString())
            .classList.add("winner-ring");
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // diagonal1
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (gameBoard[r][c] != " ") {
        if (
          gameBoard[r][c] == gameBoard[r + 1][c + 1] &&
          gameBoard[r + 1][c + 1] == gameBoard[r + 2][c + 2] &&
          gameBoard[r + 2][c + 2] == gameBoard[r + 3][c + 3]
        ) {
          document
            .getElementById(r.toString() + "-" + c.toString())
            .classList.add("winner-ring");
          document
            .getElementById((r + 1).toString() + "-" + (c + 1).toString())
            .classList.add("winner-ring");
          document
            .getElementById((r + 2).toString() + "-" + (c + 2).toString())
            .classList.add("winner-ring");
          document
            .getElementById((r + 3).toString() + "-" + (c + 3).toString())
            .classList.add("winner-ring");
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // diagonal2
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (gameBoard[r][c] != " ") {
        if (
          gameBoard[r][c] == gameBoard[r - 1][c + 1] &&
          gameBoard[r - 1][c + 1] == gameBoard[r - 2][c + 2] &&
          gameBoard[r - 2][c + 2] == gameBoard[r - 3][c + 3]
        ) {
          document
            .getElementById(r.toString() + "-" + c.toString())
            .classList.add("winner-ring");
          document
            .getElementById((r - 1).toString() + "-" + (c + 1).toString())
            .classList.add("winner-ring");
          document
            .getElementById((r - 2).toString() + "-" + (c + 2).toString())
            .classList.add("winner-ring");
          document
            .getElementById((r - 3).toString() + "-" + (c + 3).toString())
            .classList.add("winner-ring");
          setWinner(r, c);
          return;
        }
      }
    }
  }
};

const setWinner = (r, c) => {
  gameOver = true;
  document.getElementById("turn").classList.add("hidden");
  if (gameBoard[r][c] == player1) {
    scores.player1++;
    player1ScoreEl.innerText = scores.player1;
    winner.classList.remove("hidden");
    winner.style.backgroundColor = "#fd6687";
    setLocalStorage();
  } else if (gameBoard[r][c] == player2) {
    scores.player2++;
    player2ScoreEl.innerText = scores.player2;
    winner.classList.remove("hidden");
    winner.style.backgroundColor = "#ffce67";
    setLocalStorage();
  }
};
