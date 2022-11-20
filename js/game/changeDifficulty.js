const btnAudio = new Audio("../../assets/sounds/play button.mp3");

const difficulties = [
  { name: "Fácil", value: "easy" },
  { name: "Normal", value: "normal" },
  { name: "Impossível", value: "impossible" },
];

const currentDifficulty = localStorage.difficulty || "easy";

document.querySelector("#difficulty-selected").innerText =
  difficulties.find(
    (difficulty) => difficulty.value === currentDifficulty
  ).name;

for (const difficulty of difficulties) {
  if (difficulty.value === currentDifficulty) {
    document.querySelector(".change-difficulty").innerHTML += `
      <button class="difficulty-selected" disabled>${difficulty.name}</button>
    `;
  } else {
    document.querySelector(".change-difficulty").innerHTML += `
      <button id="${difficulty.value}" class="difficulty-btns">${difficulty.name}</button>    
    `;
  }
}

document.querySelectorAll(".difficulty-btns").forEach((btn) => {
  btn.addEventListener("click", () => {
    btnAudio.play();
    localStorage.difficulty = btn.id;

    setTimeout(() => {
      location.reload();
    }, 150);
  });
});
