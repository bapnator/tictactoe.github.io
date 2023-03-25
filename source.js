let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Constantes para los posibles mensajes de estado
const playerXWins = "Jugador X gana!";
const playerOWins = "Jugador O gana!";
const tie = "Empate";

// Función para cambiar de jugador
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Función para verificar si un jugador ha ganado
function checkForWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }
  return false;
}

// Función para verificar si el tablero está lleno
function checkForTie() {
  return !gameState.includes("");
}

// Función para mostrar un mensaje de estado
function displayMessage(message) {
  document.getElementById("message").textContent = message;
}

// Función para mostrar el tablero en la pantalla
function displayBoard() {
  for (let i = 0; i < gameState.length; i++) {
    document.getElementById(i.toString()).textContent = gameState[i];
  }
}

// Función para reiniciar el juego
function restartGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  displayBoard();
  displayMessage("");
}

// Evento para manejar los clics de los cuadrados
document.querySelectorAll(".square").forEach(square => {
  square.addEventListener("click", () => {
    const squareId = square.getAttribute("id");
    if (gameState[squareId] || checkForWinner()) {
      return;
    }
    gameState[squareId] = currentPlayer;
    displayBoard();
    if (checkForWinner()) {
      const message = currentPlayer === "X" ? playerXWins : playerOWins;
      displayMessage(message);
    } else if (checkForTie()) {
      displayMessage(tie);
    } else {
      changePlayer();
    }
  });
});

// Evento para manejar el botón de reinicio
document.getElementById("restart").addEventListener("click", restartGame);

// Mostrar el tablero inicial
displayBoard();
