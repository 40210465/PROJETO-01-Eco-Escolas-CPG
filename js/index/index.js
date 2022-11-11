const playBtns = document.querySelectorAll(".play-btns button");
const playAudio = new Audio("../../assets/sounds/play button.mp3");

playBtns.forEach((btn) => {
  console.log(btn.value);

  btn.addEventListener("click", (e) => {
    playAudio.play();

    localStorage.difficulty = e.target.value;

    // Wait a little so the audio may play
    setTimeout(() => {
      if (e.target.value === "impossible")
        window.location.href = "../../html/impossible.html";
      else window.location.href = "../../html/game.html";
    }, 150);
  });
});
