const madeByElements = [
  document.querySelector("#made-by-description"),
  ...document.querySelectorAll(".member"),
  document.querySelector(".github-rep"),
];

const whatIsElements = [
  document.querySelector("#what-is-description"),
  document.querySelector("#what-is-img"),
];

const howToPlayElements = [document.querySelector("#tutorial-section")];

document.querySelector("#go-up-arrow").addEventListener("click", () => {
  madeByElements.forEach((element) => {
    element.classList.remove("show-up");
  });

  whatIsElements.forEach((element) => {
    element.classList.remove("show-up");
  });

  howToPlayElements.forEach((element) => {
    element.classList.remove("show-up");
  });
});

document
  .querySelector("#learn-play-link")
  .addEventListener("click", () => {
    madeByElements.forEach((element) => {
      element.classList.remove("show-up");
    });

    whatIsElements.forEach((element) => {
      element.classList.remove("show-up");
    });

    howToPlayElements.forEach((element) => {
      element.classList.add("show-up");
    });
  });

document.querySelector("#made-by-link").addEventListener("click", () => {
  madeByElements.forEach((element) => {
    element.classList.add("show-up");
  });

  whatIsElements.forEach((element) => {
    element.classList.remove("show-up");
  });

  howToPlayElements.forEach((element) => {
    element.classList.remove("show-up");
  });
});

document.querySelector("#what-is-link").addEventListener("click", () => {
  madeByElements.forEach((element) => {
    element.classList.remove("show-up");
  });

  whatIsElements.forEach((element) => {
    element.classList.add("show-up");
  });

  howToPlayElements.forEach((element) => {
    element.classList.remove("show-up");
  });
});
