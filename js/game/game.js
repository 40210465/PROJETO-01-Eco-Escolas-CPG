/* Import classes */
import { Container } from "./modules/Container.js";
import { Junk } from "./modules/Junk.js";
import { Player } from "./modules/Player.js";

function startGame() {
  hasGameStarted = true;
  startBtn.disabled = true;
  leftBtn.disabled = false;
  rightBtn.disabled = false;

  // Game variables
  player = new Player();
  containers = [
    new Container("battery"),
    new Container("paper"),
    new Container("glass"),
    new Container("plastic"),
  ];

  junk = false;
  currentSpeed = 1;

  updateScoreDOM();

  difficulties[currentDifficulty]();
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

function renderEasy() {
  // draw the background
  ctx.drawImage(backGroundImg, 0, 0, W, H);

  // check if there's already a junk falling down
  if (!junk) junk = getNewJunk();

  // render the junk image
  ctx.drawImage(
    junk.image,
    junk.position.x,
    junk.position.y,
    junkWidth,
    junkHeight
  );

  // check if the junk reached one of the containers
  if (junk.position.y >= H - containerHeight / 1.5) {
    for (let i = 0; i < containers.length; i++) {
      if (junk.position.x === junkHorizontalPositions[i]) {
        if (junk.type === containers[i].type) {
          console.log("Correct!");

          frame = [0, 0, 0, 0];

          containers[i].increaseQuantity();
          currentSpeed += 0.03;

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

  // draw the containers
  for (let i = 0; i < containers.length; i++) {
    // check if the junk is above the container
    if (junk) {
      if (junk.position.x === junkHorizontalPositions[i]) {
        if (junk.type === containers[i].type) {
          console.log("Junk is above the correct container");
          frame[i] =
            frame[i] < maxFrame / 2 - 1
              ? frame[i] + 0.5
              : maxFrame / 2 - 1;
        }
      } else {
        frame[i] = 0;
      }
    }

    ctx.drawImage(
      containers[i].image,
      0 + 230 * frame[i],
      0,
      210,
      400,
      containerGap + i * (containerWidth + containerGap),
      H - containerHeight,
      90,
      150
    );
  }

  window.requestAnimationFrame(renderEasy);
}

function renderNormal() {
  // draw the background
  ctx.drawImage(backGroundImg, 0, 0, W, H);

  // check if there's already a junk falling down
  if (!junk) junk = getNewJunk();

  // render the junk image
  ctx.drawImage(
    junk.image,
    junk.position.x,
    junk.position.y,
    junkWidth,
    junkHeight
  );

  if (junk.position.y >= H - containerHeight / 1.5) {
    for (let i = 0; i < containers.length; i++) {
      if (junk.position.x === junkHorizontalPositions[i]) {
        if (junk.type === containers[i].type) {
          console.log("Correct!");

          frame = [0, 0, 0, 0];

          containers[i].increaseQuantity();
          currentSpeed += 0.05;

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

  // draw the containers
  for (let i = 0; i < containers.length; i++) {
    // check if the junk is above the container
    if (junk) {
      if (junk.position.x === junkHorizontalPositions[i]) {
        // if it's close to the container
        if (junk.position.y >= H - containerHeight / 1.5 - 200) {
          console.log(
            "The junk is close to the container - Opening the container..."
          );
          frame[i] =
            frame[i] < maxFrame / 2 - 1
              ? frame[i] + 0.5
              : maxFrame / 2 - 1;
        }
      } else {
        frame[i] = 0;
      }
    }

    ctx.drawImage(
      containers[i].image,
      0 + 230 * frame[i],
      0,
      210,
      400,
      containerGap + i * (containerWidth + containerGap),
      H - containerHeight,
      90,
      150
    );
  }

  window.requestAnimationFrame(renderNormal);
}

function renderImpossible() {
  // draw the background
  ctx.drawImage(backGroundImg, 0, 0, W, H);

  // check if there's already a junk falling down
  if (!junk) junk = getNewJunk();

  // render the junk image
  ctx.drawImage(
    junk.image,
    junk.position.x,
    junk.position.y,
    junkWidth,
    junkHeight
  );

  if (currentFrame > 0) {
    currentFrame--;
    const randomContainers = containers;
  } else {
    // sort the containers randomly
    const randomContainers = containers.sort(() => Math.random() - 0.5);
    currentFrame = intervalFrames;
  }

  if (junk.position.y >= H - containerHeight / 1.5) {
    for (let i = 0; i < containers.length; i++) {
      if (junk.position.x === junkHorizontalPositions[i]) {
        if (junk.type === containers[i].type) {
          console.log("Correct!");

          // TODO
          frame = [0, 0, 0, 0];

          containers[i].increaseQuantity();
          currentSpeed += 0.07;

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

  // draw the containers
  for (let i = 0; i < containers.length; i++) {
    // check if the junk is above the container
    if (junk) {
      if (junk.position.x === junkHorizontalPositions[i]) {
        // if it's close to the container
        if (junk.position.y >= H - containerHeight / 1.5 - 350) {
          console.log(
            "The junk is close to the container - Opening the container..."
          );
          frame[i] =
            frame[i] < maxFrame / 2 - 1
              ? frame[i] + 0.5
              : maxFrame / 2 - 1;
        }
      } else {
        frame[i] = 0;
      }
    }

    ctx.drawImage(
      containers[i].image,
      0 + 230 * frame[i],
      0,
      210,
      400,
      containerGap + i * (containerWidth + containerGap),
      H - containerHeight,
      90,
      150
    );
  }

  window.requestAnimationFrame(renderImpossible);
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
const currentDifficulty = localStorage.difficulty || "easy";

const backGroundImg = new Image();
backGroundImg.src = "../../assets/bg.jpg";

let hasGameStarted = false;
let player;
let containers;
let junk;
let currentSpeed;
const keys = ["ArrowLeft", "ArrowRight"];
let frame = [0, 0, 0, 0];
const maxFrame = 6; // number of frames that the container image has

// impossible difficulty variables
const intervalFrames = 150;
let currentFrame = intervalFrames;

// container measurements
const containerWidth = 80;
const containerHeight = 120;
const containerGap = 14;

// junk measurements
const junkWidth = 70;
const junkHeight = 70;
const typesOfJunk = [
  { color: "red", type: "battery" },
  { color: "blue", type: "paper" },
  { color: "green", type: "glass" },
  { color: "yellow", type: "plastic" },
];

// junk horizontal positions
const junkHorizontalPositions = [
  containerGap + containerWidth / 2 - junkWidth / 2 + 4,
  containerGap * 2 + containerWidth * 1.5 - junkWidth / 2 + 4,
  containerGap * 3 + containerWidth * 2.5 - junkWidth / 2 + 4,
  containerGap * 4 + containerWidth * 3.5 - junkWidth / 2 + 4,
];

// Difficulty render functions
const difficulties = {
  easy: renderEasy,
  normal: renderNormal,
  impossible: renderImpossible,
};

// DOM elements
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
