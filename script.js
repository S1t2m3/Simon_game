let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

let buttons = ["yellow", "red", "purple", "green"];
let h2 = document.querySelector("h2");

// Start game
document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

// Flash for game
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 400);
}

// Flash for user
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 200);
}

// Level up
function levelUp() {
  userSeq = []; // reset user input
  level++;
  h2.textContent = `Level ${level}`;

  let randColor = buttons[Math.floor(Math.random() * buttons.length)];
  gameSeq.push(randColor);

  gameSeq.forEach((color, index) => {
  setTimeout(() => {
    let btn = document.querySelector(`.${color}`);
    gameFlash(btn);
  }, index * 600);
});
}

// Check answer
function checkAns() {
  let idx = userSeq.length - 1;

  if (userSeq[idx] === gameSeq[idx]) {
    // if user completed full sequence
    if (userSeq.length === gameSeq.length) {
      setTimeout(() => {
        levelUp();
      }, 1000);
    }
  } else {
    // Game over
    h2.textContent = `Game Over! Score: ${level}. Press any key to restart`;

    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "black";
    }, 200);

    reset();
  }
}

// Button press
function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  console.log("User Sequence:", userSeq);

  checkAns();
}

// Reset game
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

// Event listeners
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
