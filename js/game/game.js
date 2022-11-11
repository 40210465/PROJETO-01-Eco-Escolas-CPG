/* Import classes */
import { Container } from "./modules/Container.js";
import { Junk } from "./modules/Junk.js";
import { Player } from "./modules/Player.js";

document.querySelector(
  "title"
).innerText = `Junk King - ${localStorage.difficulty}`;

function startGame() {
  hasGameStarted = true;
  startBtn.disabled = true;
  leftBtn.disabled = false;
  rightBtn.disabled = false;

  // Game variables
  player = new Player();
  containers = [
    new Container("red", "battery"),
    new Container("blue", "paper"),
    new Container("green", "glass"),
    new Container("yellow", "plastic"),
  ];
  junk = false;
  currentSpeed = 1;

  updateScoreDOM();

  render();
}

function updateScoreDOM() {
  highScore.innerText = player.highScore;
  score.innerText = player.score;
  lives.innerText = player.lives;
}

function getNewJunk() {
  // get a random junk type
  const junkType =
    typesOfJunk[Math.floor(Math.random() * typesOfJunk.length)];

  // get a random location
  const xLocation =
    junkHorizontalPositions[
      Math.floor(Math.random() * junkHorizontalPositions.length)
    ];

  /* 0 -> initial Y location */
  return new Junk(
    junkType.color,
    junkType.type,
    xLocation,
    0,
    currentSpeed
  );
}

function moveJunk(key) {
  for (let i = 0; i < junkHorizontalPositions.length; i++) {
    if (junk.position.x === junkHorizontalPositions[i]) {
      if (key === "ArrowLeft") {
        junk.moveX(junkHorizontalPositions.at(i - 1));
        return;
      }
      if (key === "ArrowRight") {
        if (i === junkHorizontalPositions.length - 1) {
          junk.moveX(junkHorizontalPositions.at(0));
        } else {
          junk.moveX(junkHorizontalPositions.at(i + 1));
        }
        return;
      }
    }
  }
}

function render() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(0, 0, W, H);

  // draw the containers
  for (let i = 0; i < containers.length; i++) {
    ctx.fillStyle = containers[i].color;
    ctx.fillRect(
      containerGap + i * (containerWidth + containerGap),
      H - containerHeight,
      containerWidth,
      containerHeight
    );
  }

  // draw the junk
  // check if there's already a junk falling down
  if (!junk) junk = getNewJunk();

  // draw the junk
  ctx.fillStyle = junk.color;
  ctx.fillRect(junk.position.x, junk.position.y, junkWidth, junkHeight);

  // check if the junk reached one of the containers
  if (junk.position.y >= H - containerHeight - junkHeight / 2) {
    for (let i = 0; i < containers.length; i++) {
      if (junk.position.x === junkHorizontalPositions[i]) {
        if (junk.type === containers[i].type) {
          console.log("Correct!");

          containers[i].increaseQuantity();
          currentSpeed += 0.1;

          // update the score
          player.updateScore();
          if (player.score > player.highScore) player.updateHighScore();
        } else {
          console.log("Incorrect!");
          /* currentSpeed = 1; */
          player.decreaseLives();
        }

        // update the DOM
        updateScoreDOM();

        // check if the player lost
        if (player.checkIfLost()) {
          player.saveHighScore();
          return endGame();
        }

        junk = false;
        break;
      }
    }
  } else {
    // move the junk
    junk.moveY();
  }

  window.requestAnimationFrame(render);
}

function endGame() {
  hasGameStarted = false;
  startBtn.disabled = false;
  leftBtn.disabled = true;
  rightBtn.disabled = true;
  window.removeEventListener("keydown", moveJunk);
  console.log("Game Over!");
  const result = {
    score: player.score,
    highScore: player.highScore,
    battery: containers[0].quantity,
    paper: containers[1].quantity,
    glass: containers[2].quantity,
    plastic: containers[3].quantity,
  };
  console.log(result);
}

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

let hasGameStarted = false;
let player;
let containers;
let junk;
let currentSpeed;
const keys = ["ArrowLeft", "ArrowRight"];

const containerWidth = 80;
const containerHeight = 30;
const containerGap = 15;

const junkWidth = 50;
const junkHeight = 50;
const typesOfJunk = [
  { color: "red", type: "battery" },
  { color: "blue", type: "paper" },
  { color: "green", type: "glass" },
  { color: "yellow", type: "plastic" },
];

const junkHorizontalPositions = [
  containerGap + containerWidth / 2 - junkWidth / 2,
  containerGap * 2 + containerWidth * 1.5 - junkWidth / 2,
  containerGap * 3 + containerWidth * 2.5 - junkWidth / 2,
  containerGap * 4 + containerWidth * 3.5 - junkWidth / 2,
];

const startBtn = document.querySelector("#start-button");
const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");
const score = document.querySelector("#score");
const highScore = document.querySelector("#high-score");
const lives = document.querySelector("#lives");

startBtn.onclick = () => {
  startGame();
};

// Add event listener to move the player
window.addEventListener("keydown", (e) => {
  if (hasGameStarted && keys.includes(e.key)) {
    moveJunk(e.key);
  }
});

// Buttons used on touch screen devices
leftBtn.onclick = () => {
  if (hasGameStarted) moveJunk("ArrowLeft");
};

rightBtn.onclick = () => {
  if (hasGameStarted) moveJunk("ArrowRight");
};

leftBtn.disabled = true;
rightBtn.disabled = true;

// Draw in the canvas the title of the game (Junk King)
ctx.fillStyle = "black";
ctx.font = "30px Arial";
ctx.fillText("Junk King", W / 2 - 80, H / 2 - 100);
