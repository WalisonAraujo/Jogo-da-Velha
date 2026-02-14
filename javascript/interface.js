// Eventos dos botões de controle
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("resetBtn").addEventListener("click", restart);

// Inicia o jogo adicionando eventos de clique nas células
function startGame() {
  document
    .querySelectorAll(".square")
    .forEach((square) => square.addEventListener("click", handleClick));
}

// Lida com o clique em uma célula
function handleClick(event) {
  const position = event.target.id;
  let result = handleMove(position); // chama lógica do jogo

  updateSquare(position); // atualiza visual da célula

  // Verifica resultado da jogada
  if (result) {
    if (result === "draw") {
      document.getElementById("ganhador").textContent =
        "O Jogo Acabou - Empate!";
    } else {
      const vencedor = playerTime === 0 ? escudo : espada;
      document.getElementById("ganhador").textContent =
        `O Jogo Acabou - O vencedor foi (${vencedor})`;
      updateScore(vencedor); // atualiza placar

      // Destaca células vencedoras com animação
      result.forEach((pos) => {
        document.getElementById(pos).classList.add("winner");
      });
    }
  }
}

// Atualiza visual de uma célula (adiciona símbolo do jogador)
function updateSquare(position) {
  const square = document.getElementById(position);
  square.className = "square"; // reseta classes
  if (board[position]) {
    square.classList.add(board[position]); // adiciona 'o' ou 'x'
  }
}

// Reinicia o jogo (limpa tabuleiro, placar e estado)
function restart() {
  board.fill("");
  playerTime = 0;
  gameOver = false;
  document.getElementById("ganhador").textContent = "";

  document.querySelectorAll(".square").forEach((square) => {
    square.className = "square";
    square.style.backgroundColor = "rgb(61, 152, 194)";
  });

  startGame(); // reativa eventos
}
