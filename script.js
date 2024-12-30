window.onload = function () {
  const carousel = document.querySelector(".carousel");
  const cards = document.querySelectorAll(".carousel-card");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");
  const dotContainer = document.createElement("div");
  dotContainer.classList.add("dot-indicators");
  document.querySelector(".carousel-container").appendChild(dotContainer);

  let currentIndex = 0;
  const visibleCards = 3;
  const totalCards = cards.length;

  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
    dotContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");

  function updateCarousel() {
    const offset = -currentIndex * (100 / visibleCards);
    carousel.style.transform = `translateX(${offset}%)`;

    cards.forEach((card, index) => {
      card.classList.remove("active");
      if (index === currentIndex) {
        card.classList.add("active");
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentIndex) {
        dot.classList.add("active");
      }
    });
  }

  rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  });

  leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
  });

  let autoRotate = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }, 3000);

  carousel.addEventListener("mouseover", () => clearInterval(autoRotate));
  carousel.addEventListener("mouseout", () => {
    autoRotate = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCarousel();
    }, 3000);
  });

  updateCarousel();
};
