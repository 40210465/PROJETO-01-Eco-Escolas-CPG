export class Player {
  constructor() {
    this.score = 0;
    this.highScore = localStorage.highScore || 0;
    this.lives = 3;
  }

  updateScore() {
    this.score++;
  }

  updateHighScore() {
    this.highScore = this.score;
  }

  decreaseLives() {
    this.lives--;
  }

  saveHighScore() {
    localStorage.highScore = this.highScore;
  }

  checkIfLost() {
    return this.lives === 0;
  }
}
