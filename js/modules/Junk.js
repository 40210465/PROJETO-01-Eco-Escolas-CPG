export class Junk {
  constructor(color, type, xPosition, yPosition, speed) {
    this.color = color;
    this.type = type;
    this.position = { x: xPosition, y: yPosition };
    this.speed = speed;
  }

  moveY() {
    this.position.y += this.speed;
  }

  moveX(newXPosition) {
    this.position.x = newXPosition;
  }
}
