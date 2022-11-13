//TODO: Remove after testing
/* localStorage.scores = JSON.stringify([
  {
    name: "Player 1",
    score: 100,
  },
  {
    name: "Player 2",
    score: 200,
  },
  {
    name: "Player 3",
    score: 300,
  },
  {
    name: "Player 4",
    score: 400,
  },
  {
    name: "Player 5",
    score: 500,
  },
  {
    name: "Player 6",
    score: 600,
  },
  {
    name: "Player 7",
    score: 700,
  },
  {
    name: "Player 8",
    score: 800,
  },
  {
    name: "Player 9",
    score: 900,
  },
  {
    name: "Player 10",
    score: 1000,
  },
  {
    name: "Player 11",
    score: 1100,
  },
  {
    name: "Player 12",
    score: 1200,
  },
  {
    name: "Player 13",
    score: 1300,
  },
  {
    name: "Player 14",
    score: 1400,
  },
  {
    name: "Player 15",
    score: 1500,
  },
  {
    name: "Player 16",
    score: 1600,
  },
  {
    name: "Player 17",
    score: 1700,
  },
  {
    name: "Player 18",
    score: 1800,
  },

  {
    name: "Player 19",
    score: 1900,
  },
  {
    name: "Player 20",
    score: 2000,
  },
  {
    name: "Player 21",
    score: 2100,
  },
  {
    name: "Player 22",
    score: 2200,
  },
]); */

const playAudio = new Audio("../../assets/sounds/play button.mp3");
let page = 0;
let scoresPerPage = 5;

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

function loadLeaderBoard() {
  const scores = localStorage.scores
    ? JSON.parse(localStorage.scores)
    : [];

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
    <tr>
      <td>${scorePosition}</td>
      <td>${score.name}</td>
      <td>${score.score}</td>
    </tr>`;
  }

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
  loadLeaderBoard();
});

document.querySelector("#previous-page").addEventListener("click", () => {
  playAudio.play();
  page--;
  loadLeaderBoard();
});

window.onload = loadLeaderBoard();
