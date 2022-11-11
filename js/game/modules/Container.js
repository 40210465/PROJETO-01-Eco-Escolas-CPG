export class Container {
  constructor(color, type) {
    this.color = color;
    this.type = type;
    this.quantity = 0;
  }

  increaseQuantity() {
    this.quantity++;
  }

  resetQuantity() {
    this.quantity = 0;
  }
}
