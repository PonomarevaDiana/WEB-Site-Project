let slideIndex = 0;
const slides = document.querySelector(".carousel-slide");
const images = document.querySelectorAll(".carousel-slide img");
const prevButton = document.querySelector(".carousel-control.prev");
const nextButton = document.querySelector(".carousel-control.next");
const indicatorsContainer = document.querySelector(".carousel-indicators");
let intervalId;

function createIndicators() {
  for (let i = 0; i < images.length; i++) {
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      goToSlide(i);
    });
    indicatorsContainer.appendChild(button);
  }
  updateIndicators();
}

function updateIndicators() {
  const buttons = document.querySelectorAll(".carousel-indicators button");
  buttons.forEach((button, index) => {
    if (index === slideIndex) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function goToSlide(index) {
  slideIndex = index;
  slides.style.transform = `translateX(-${
    slideIndex * (100 / images.length)
  }%)`;
  updateIndicators();
  resetInterval();
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % images.length;
  goToSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + images.length) % images.length;
  goToSlide(slideIndex);
}

function startCarousel() {
  intervalId = setInterval(nextSlide, 3000); // Меняем слайд каждые 3 секунды
}

function resetInterval() {
  clearInterval(intervalId);
  startCarousel();
}

createIndicators();
startCarousel();

document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".dropdown");
  if (!dropdown.contains(event.target)) {
    // Клик был вне меню, закрываем его
    document.querySelector(".dropdown-content").style.display = "none";
  }
});
