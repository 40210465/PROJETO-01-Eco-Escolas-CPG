const sections = [...document.querySelectorAll("section")];

let currentSection = sections[0];

function updateArrowUp() {
  const currentScroll = window.pageYOffset;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (currentScroll >= sectionTop - sectionHeight / 3) {
      currentSection = section;
    }
  });

  document.querySelector(".hidden").classList.remove("hidden");

  document
    .querySelector(`a[href="#${currentSection.id}"]`)
    .classList.add("hidden");
}

window.onscroll = () => {
  updateArrowUp();
};
