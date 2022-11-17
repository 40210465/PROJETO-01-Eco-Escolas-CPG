const playAudio = new Audio("../../assets/sounds/play button.mp3");
let page = 0;
let scoresPerPage = 5;
let currentFilter = document.querySelector("#filter").value;

function updateNextBtn(value) {
  if (value === "enable") {
    document.querySelector("#next-page").classList.remove("disabled");
    document.querySelector("#next-page").disabled = false;
  } else {
    document.querySelector("#next-page").classList.add("disabled");
    document.querySelector("#next-page").disabled = true;
  }
}

function updatePrevBtn(value) {
  if (value === "enable") {
    document.querySelector("#previous-page").classList.remove("disabled");
    document.querySelector("#previous-page").disabled = false;
  } else {
    document.querySelector("#previous-page").classList.add("disabled");
    document.querySelector("#previous-page").disabled = true;
  }
}

function loadAllScores(direction, filter) {
  let scores = localStorage.scores ? JSON.parse(localStorage.scores) : [];

  if (filter !== "all") {
    scores = scores.filter((score) => score.difficulty === filter);
  }

  if (scores.length === 0) {
    document.querySelector("tbody").innerHTML = `
    <tr>
      <td colspan='3' rowspan='2'
        style='text-align: center; font-size: 1.5rem;'
      >Nenhuma pontuação registada</td>
    </tr>`;

    updateNextBtn("disable");
    updatePrevBtn("disable");

    return;
  }

  document.querySelector("tbody").innerHTML = "";

  const sortedScores = scores.sort((a, b) => b.score - a.score);

  /* make an array with only "scoresPerPage" elements from sortedScores depending on the "page" */
  const scoresToDisplay = sortedScores.slice(
    page * scoresPerPage,
    page * scoresPerPage + scoresPerPage
  );

  for (let i = 0; i < scoresToDisplay.length; i++) {
    const score = scoresToDisplay[i];
    const scorePosition = page * scoresPerPage + i + 1;
    document.querySelector("tbody").innerHTML += `
    <tr class="${direction} table-data">
      <td>${scorePosition}</td>
      <td>${score.name}</td>
      <td>${score.score}</td>
    </tr>`;
  }

  setTimeout(() => {
    const animate = document.querySelectorAll(`.${direction}`);
    animate.forEach((element) => {
      element.classList.remove(`${direction}`);
    });
  }, 500);

  if (page === 0) {
    updatePrevBtn("disable");
  } else {
    updatePrevBtn("enable");
  }

  if (scoresToDisplay.length < scoresPerPage) {
    updateNextBtn("disable");
  } else {
    updateNextBtn("enable");
  }
}

document.querySelector("#next-page").addEventListener("click", () => {
  playAudio.play();
  page++;
  loadAllScores("animate-from-right", currentFilter);
});

document.querySelector("#previous-page").addEventListener("click", () => {
  playAudio.play();
  page--;
  loadAllScores("animate-from-left", currentFilter);
});

// when "document.querySelector("#filter").value" changes, the "change" event is triggered
document.querySelector("#filter").addEventListener("change", (e) => {
  playAudio.play();
  page = 0;
  currentFilter = e.target.value;
  loadAllScores("animate-from-right", currentFilter);
});

window.onload = loadAllScores("animate-from-left", currentFilter);
