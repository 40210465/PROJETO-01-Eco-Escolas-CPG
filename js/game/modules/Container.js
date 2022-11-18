const values = {
  battery: {
    image: "../../../assets/containers/container_vermelho.png",
    color: "red",
  },
  paper: {
    image: "../../../assets/containers/container_azul.png",
    color: "blue",
  },
  glass: {
    image: "../../../assets/containers/container_verde.png",
    color: "green",
  },
  plastic: {
    image: "../../../assets/containers/container_amarelo.png",
    color: "yellow",
  },
};

function loadImage(source) {
  const image = new Image();
  image.src = source;
  return image;
}

export class Container {
  constructor(type) {
    this.color = values[type].color;
    this.type = type;
    this.quantity = 0;
    this.image = loadImage(values[type].image);
  }

  increaseQuantity() {
    this.quantity++;
  }

  resetQuantity() {
    this.quantity = 0;
  }
}
