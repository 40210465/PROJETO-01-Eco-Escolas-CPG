const difficulties = document.querySelectorAll(".difficulty-card");

const values = {
  Fácil: "easy",
  Normal: "normal",
  Impossível: "impossible",
};

difficulties.forEach((difficulty) => {
  const option = values[difficulty.querySelector("h3").textContent];

  difficulty.addEventListener("click", () => {
    localStorage.difficulty = option;

    // Wait a little so the audio may play
    setTimeout(() => {
      window.location.href = "../../html/game.html";
    }, 200);
  });
});
