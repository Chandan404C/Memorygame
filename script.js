const emojis = ['🍕','🚀','🎧','🌈','🎮','🎲','🧩','🍩'];
let cards = [];
let flippedCards = [];
let score = 0;
let timer;
let timeLeft = 60;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = '';
  const allEmojis = shuffle([...emojis, ...emojis]); // 8 pairs

  cards = [];

  allEmojis.forEach((emoji, i) => {
    const col = document.createElement("div");
    col.className = "col-3 col-md-2";
    
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.innerHTML = "";
    card.addEventListener("click", flipCard);
    
    col.appendChild(card);
    board.appendChild(col);
    cards.push(card);
  });
}

function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 2) return;

  this.classList.add("flipped");
  this.innerHTML = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    score++;
    document.getElementById("score").innerText = score;
    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerHTML = "";
      card2.innerHTML = "";
      flippedCards = [];
    }, 500);
  }
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  document.getElementById("timer").innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      alert("⏰ Time's up! Your Score: " + score);
    }
  }, 1000);
}

function startGame() {
  score = 0;
  document.getElementById("score").innerText = 0;
  flippedCards = [];
  createBoard();
  startTimer();

  // Restart music
  const music = document.getElementById("bgMusic");
  music.pause();
  music.currentTime = 0;
  music.play();
}

window.onload = startGame;
