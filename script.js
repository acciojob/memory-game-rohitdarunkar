const board = document.getElementById("game-board");
const triesText = document.getElementById("tries");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let tries = 0;
let matches = 0;

function startGame(level) {
  board.innerHTML = "";
  tries = 0;
  matches = 0;
  triesText.innerText = "Tries: 0";

  let totalTiles;

  if (level === "easy") totalTiles = 8;
  if (level === "medium") totalTiles = 16;
  if (level === "hard") totalTiles = 24;

  // SET GRID
  if (totalTiles === 8) {
    board.style.gridTemplateColumns = "repeat(4, 100px)";
  } else if (totalTiles === 16) {
    board.style.gridTemplateColumns = "repeat(4, 100px)";
  } else {
    board.style.gridTemplateColumns = "repeat(4, 100px)";
  }

  const numbers = [];

  for (let i = 1; i <= totalTiles / 2; i++) {
    numbers.push(i);
    numbers.push(i);
  }

  shuffle(numbers);

  numbers.forEach(num => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = num;
    card.innerText = "";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

// SHUFFLE
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// FLIP LOGIC
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  tries++;
  triesText.innerText = "Tries: " + tries;

  checkMatch();
}

// MATCH CHECK
function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matches++;

    resetBoard();

    if (matches === document.querySelectorAll(".card").length / 2) {
      setTimeout(() => alert("You Won! 🎉"), 300);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      firstCard.innerText = "";
      secondCard.innerText = "";

      resetBoard();
    }, 800);
  }
}

// RESET TURN
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}