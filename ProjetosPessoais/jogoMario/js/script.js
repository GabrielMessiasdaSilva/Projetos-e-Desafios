const homem = document.querySelector('.homem');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
const gameOverImage = document.createElement('img');
gameOverImage.src = './imagens/gamer-over.png';
gameOverImage.classList.add('game-over');
let isGameOver = false;

const jump = () => {
  if (isGameOver) {
    restartGame();
    return;
  }

  homem.classList.add('jump');
  setTimeout(() => {
    homem.classList.remove('jump');
  }, 500);
};

const checkCollision = () => {
  const pipePosition = pipe.offsetLeft;
  const homemPosition = parseInt(window.getComputedStyle(homem).bottom.replace('px', ''));

  console.log(homemPosition);

  if (pipePosition <= 120 && pipePosition > 0 && homemPosition < 80) {
    isGameOver = true;
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    pipe.style.animation = 'none';
    homem.style.left = `${homemPosition}px`;

    gameOverImage.style.display = 'block';
    gameBoard.appendChild(gameOverImage);

    gameBoard.removeEventListener('click', jump);
    gameBoard.addEventListener('click', restartGame);
  }
};

const restartGame = () => {
  isGameOver = false;
  homem.src = './imagens/homem.gif';
  homem.style.width = '150px';
  homem.style.marginLeft = '';

  pipe.style.animation = 'pipe-animation 1.5s infinite linear';
  gameOverImage.style.display = 'none';

  gameBoard.removeEventListener('click', restartGame);
  gameBoard.addEventListener('click', jump);
};

const gameLoop = setInterval(() => {
  if (!isGameOver) {
    checkCollision();
  }
}, 10);

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 32) {
    jump();
  }
});

gameBoard.addEventListener('click', jump);
