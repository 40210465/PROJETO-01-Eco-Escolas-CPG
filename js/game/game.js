/* Import classes */
import { Container } from "./modules/Container.js";
import { Junk } from "./modules/Junk.js";
import { Player } from "./modules/Player.js";
import { submitScore } from "./submitScore.js";

function drawText(text) {
  ctx.fillStyle = "#1673fd";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "white";
  ctx.font = "50px Courier New";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 10;
  ctx.fillText(text, W / 2 - 135, H / 2 - 100);
}

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
  currentSpeed = 3;

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
        // play the sound
        junk.sound.play();

        if (junk.type === containers[i].type) {
          console.log("Correct!");

          frame = [0, 0, 0, 0];

          containers[i].increaseQuantity();
          currentSpeed += currentSpeed === maxSpeed ? 0 : 0.03;

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
        // play the sound
        junk.sound.play();

        if (junk.type === containers[i].type) {
          console.log("Correct!");

          frame = [0, 0, 0, 0];

          containers[i].increaseQuantity();
          currentSpeed += currentSpeed === maxSpeed ? 0 : 0.05;

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
  } else {
    // sort the containers randomly
    containers.sort(() => Math.random() - 0.5);
    currentFrame = intervalFrames;
  }

  if (junk.position.y >= H - containerHeight / 1.5) {
    for (let i = 0; i < containers.length; i++) {
      if (junk.position.x === junkHorizontalPositions[i]) {
        // play the sound
        junk.sound.play();

        if (junk.type === containers[i].type) {
          console.log("Correct!");

          frame = [0, 0, 0, 0];

          containers[i].increaseQuantity();
          currentSpeed += currentSpeed === maxSpeed ? 0 : 0.07;

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

  // update score modal
  scoreModal.innerText = player.highScore;
  document.querySelector("#name").value = playerName;

  // if score >= highScore, show the modal
  if (result.score >= result.highScore) {
    modal.classList.add("show-modal");
  }

  drawText("Game Over!");
}

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;
const currentDifficulty = localStorage.difficulty || "easy";

// Assets
const backGroundImg = new Image();
backGroundImg.src = "../../assets/bg.jpg";
const playSound = new Audio("../../assets/sounds/play button.mp3");
const gameMusic = new Audio("../../assets/sounds/gameMusic.mp3")
gameMusic.volume = 0.075;

let hasGameStarted = false;
let player;
let playerName = localStorage.playerName || "";
let containers;
let junk;
let currentSpeed;
const keys = ["ArrowLeft", "ArrowRight"];
let frame = [0, 0, 0, 0];
const maxFrame = 6; // number of frames that the container image has
const maxSpeed = 4;

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
const modal = document.querySelector("#modal");
const scoreModal = document.querySelector("#modal-score");
const closeModal = document.querySelector("#close");
const submitForm = document.querySelector("#submit-score");

startBtn.onclick = () => {
  playSound.play();
  gameMusic.play()
  startGame();
  pauseButton.style.visibility  = "visible"
  smile()
};

// Add event listener to move the player
window.addEventListener("keydown", (e) => {
  if (hasGameStarted && keys.includes(e.key)) {
    playSound.play();
    moveJunk(e.key);
  }
});

// Buttons used on touch screen devices
leftBtn.onclick = () => {
  if (hasGameStarted) {
    playSound.play();
    moveJunk("ArrowLeft");
  }
};

rightBtn.onclick = () => {
  if (hasGameStarted) {
    playSound.play();
    moveJunk("ArrowRight");
  }
};

// Submit the score Form
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const difficulty = currentDifficulty;
  const name = document.querySelector("#name").value;
  const score = scoreModal.innerText;

  document.querySelector("#message").innerText = submitScore(
    difficulty,
    name,
    score
  );
});

leftBtn.disabled = true;
rightBtn.disabled = true;

closeModal.onclick = () => {
  modal.classList.remove("show-modal");
  document.querySelector("#message").innerText = "";
};

// Draw in the canvas the title of the game (Junk King) with a text shadow
drawText("Junk King");

// smile animation

const smileCanvas = document.querySelector("#status-canvas");
const smileCtx = smileCanvas.getContext("2d");


function smile() {
  smileCtx.clearRect(0, 0, smileCanvas.width, smileCanvas.height)
  
  let timer;
    smileCtx.lineWidth = 20;
    smileCtx.fillStyle = "yellow";
    smileCtx.strokeStyle = "black";

    let velY = 2;
    let posYpc = 400; 
    let posY = 280;   
    let inicialEyeAngleLeft = 210;
    let inicialEyeAngleRight = 290;
    let eyeLength = 130

    if (timer == undefined)
      timer = window.setInterval(renderSmile, 1000/30);
    
      function renderSmile() {
      
      smileCtx.clearRect(0, 0, smileCanvas.width, smileCanvas.height);

      // Face
      smileCtx.beginPath();
      smileCtx.arc(250, 263, 180, 0, 2 * Math.PI);
      smileCtx.stroke();
      smileCtx.fill();

       //eyes
      smileCtx.beginPath();
      smileCtx.moveTo(220, eyeLength);
      smileCtx.lineTo(inicialEyeAngleLeft, 200);
      smileCtx.moveTo(280, eyeLength);
      smileCtx.lineTo(inicialEyeAngleRight, 200);
      smileCtx.stroke();

      //mouth
      smileCtx.beginPath();
      smileCtx.moveTo(150, posY);
      smileCtx.quadraticCurveTo(250, posYpc, 350, posY);
      smileCtx.stroke();
      
      
      //UPDATES
      posY += velY;
      eyeLength += 0.5 * velY
      inicialEyeAngleLeft +=  0.2 * velY
      inicialEyeAngleRight -= 0.2 * velY
      posYpc -= 4 * velY;
      
        let playerLives = document.querySelector("#lives").innerHTML;

      if (playerLives == 1){
          velY = 1
          smileCtx.fillStyle = "red"
        if (posY > 325 || posY < 150){
          velY = 0
        }
      }
      
      if (playerLives == 2){
          velY = 1
          smileCtx.fillStyle = "orange"
        if (posY > 303 || posY < 250){
          velY = 0
        }
      }
      if (playerLives == 3){
        velY = 0
      }

      if (playerLives == 0) {
        smileCtx.clearRect(0, 0, smileCanvas.width, smileCanvas.height);
      }
    }
    
}

let pauseButton = document.querySelector("#mute")
let playButton = document.querySelector("#play")

pauseButton.addEventListener("click", function() {
  gameMusic.pause();
  pauseButton.style.visibility  = "hidden"
  playButton.style.visibility = "visible"
})


playButton.addEventListener("click", function() {
  gameMusic.play()
  pauseButton.style.visibility  = "visible"
  playButton.style.visibility = "hidden"
})

