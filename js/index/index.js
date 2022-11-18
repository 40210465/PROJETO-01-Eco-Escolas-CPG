const playBtns = document.querySelectorAll(".play-btns button");
const playAudio = new Audio("../../assets/sounds/play button.mp3");

playBtns.forEach((btn) => {
  console.log(btn.value);

  btn.addEventListener("click", (e) => {
    playAudio.play();

    localStorage.difficulty = e.target.value;

    // Wait a little so the audio may play
    setTimeout(() => {
      window.location.href = "../../html/game.html";
    }, 200);
  });

  if (btn.value === "easy") {
    btn.addEventListener("mouseover", () => {
      document.querySelector(".content").classList.add("move-left");
    });
  } else if (btn.value === "impossible") {
    btn.addEventListener("mouseover", () => {
      document.querySelector(".content").classList.add("move-right");
    });
  } else {
    btn.addEventListener("mouseover", () => {
      document.querySelector(".content").classList.add("bigger");
    });
  }

  btn.addEventListener("mouseout", () => {
    document.querySelector(".content").classList.remove("move-left");
    document.querySelector(".content").classList.remove("move-right");
    document.querySelector(".content").classList.remove("bigger");
  });
});
