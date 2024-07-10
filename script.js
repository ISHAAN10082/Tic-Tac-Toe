document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.getElementById('reset');
  const message = document.getElementById('message');
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let isGameActive = true;

  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  const handleCellClick = (e) => {
      const cell = e.target;
      const index = cell.getAttribute('data-index');

      if (board[index] !== '' || !isGameActive) {
          return;
      }

      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkResult();
      switchPlayer();
  };

  const switchPlayer = () => {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  const checkResult = () => {
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
          const [a, b, c] = winningConditions[i];
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              roundWon = true;
              break;
          }
      }

      if (roundWon) {
          message.textContent = `Player ${currentPlayer} wins!`;
          isGameActive = false;
          return;
      }

      if (!board.includes('')) {
          message.textContent = 'Draw!';
          isGameActive = false;
      }
  };

  const resetGame = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      isGameActive = true;
      currentPlayer = 'X';
      cells.forEach(cell => cell.textContent = '');
      message.textContent = '';
  };

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);
});
