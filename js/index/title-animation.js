const spans = document.querySelectorAll(".letter");

(function animTitle() {
  spans.forEach((span, idx) => {
    span.addEventListener("click", (e) => {});
    span.addEventListener("animationend", (e) => {
      e.target.classList.remove("active");
    });

    // Initial animation
    setTimeout(() => {
      span.classList.add("active");
    }, 550 * (idx + 1));
  });

  // animate from the beginning again
  setTimeout(() => {
    animTitle();
  }, 550 * (spans.length + 1));
})();
