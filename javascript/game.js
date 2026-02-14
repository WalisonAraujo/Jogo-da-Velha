// Variáveis principais do jogo
let board = ["", "", "", "", "", "", "", "", ""]; // tabuleiro (9 posições)
let playerTime = 0; // jogador atual (0 = O, 1 = X)
let symbols = ["o", "x"]; // símbolos dos jogadores
let gameOver = false; // indica se o jogo terminou
let escudo = "Escudo"; // nome do jogador O
let espada = "Espada"; // nome do jogador X

// Combinações vencedoras possíveis
let winStates = [
  [0, 1, 2], // linha superior
  [3, 4, 5], // linha do meio
  [6, 7, 8], // linha inferior
  [0, 3, 6], // coluna esquerda
  [1, 4, 7], // coluna do meio
  [2, 5, 8], // coluna direita
  [0, 4, 8], // diagonal principal
  [2, 4, 6], // diagonal secundária
];

// Processa uma jogada
function handleMove(position) {
  if (gameOver) return; // não permite jogada se jogo acabou

  if (board[position] == "") {
    board[position] = symbols[playerTime]; // marca jogada

    let winSeq = isWin();
    if (winSeq) {
      gameOver = true;
      return winSeq; // retorna sequência vencedora
    }

    if (isDraw()) {
      gameOver = true;
      return "draw"; // indica empate
    }

    // alterna jogador
    playerTime = playerTime == 0 ? 1 : 0;
  }
  return false;
}

// Verifica se há vencedor
function isWin() {
  for (let seq of winStates) {
    let [pos1, pos2, pos3] = seq;
    if (
      board[pos1] === board[pos2] &&
      board[pos1] === board[pos3] &&
      board[pos1] !== ""
    ) {
      return seq; // retorna sequência vencedora
    }
  }
  return null;
}

// Verifica se houve empate
function isDraw() {
  return board.every((cell) => cell !== "");
}

// Variáveis do placar
let scoreEscudo = 0;
let scoreEspada = 0;

// Atualiza placar conforme vencedor
function updateScore(winner) {
  if (winner === escudo) {
    scoreEscudo++;
    document.getElementById("scoreEscudo").textContent = scoreEscudo;
  } else if (winner === espada) {
    scoreEspada++;
    document.getElementById("scoreEspada").textContent = scoreEspada;
  }
}
