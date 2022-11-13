const madeByElements = [
  document.querySelector("#made-by-description"),
  ...document.querySelectorAll(".member"),
  document.querySelector(".github-rep"),
];

const whatIsElements = [
  document.querySelector("#what-is-description"),
  document.querySelector("#what-is-img"),
];

document.querySelector("#go-up-arrow").addEventListener("click", () => {
  madeByElements.forEach((element) => {
    element.classList.remove("show-up");
  });

  whatIsElements.forEach((element) => {
    element.classList.remove("show-up");
  });
});

document.querySelector("#made-by-link").addEventListener("click", () => {
  madeByElements.forEach((element) => {
    element.classList.add("show-up");
  });

  whatIsElements.forEach((element) => {
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
});
