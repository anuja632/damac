const slidesWrapper = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const slidesPerView = 3;
let index = slidesPerView; // start from first real slide
let autoplayInterval;

// Clone first & last slides for infinite loop
const totalSlides = slideItems.length;
for (let i = 0; i < slidesPerView; i++) {
  const firstClone = slideItems[i].cloneNode(true);
  const lastClone = slideItems[totalSlides - 1 - i].cloneNode(true);
  slidesWrapper.appendChild(firstClone);
  slidesWrapper.insertBefore(lastClone, slidesWrapper.firstChild);
}

// Updated slides after cloning
const allSlides = document.querySelectorAll('.slide');
const totalClones = allSlides.length;

// Set initial position
slidesWrapper.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;

function moveToSlide() {
  slidesWrapper.style.transition = 'transform 0.5s ease-in-out';
  slidesWrapper.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;
}

function goNext() {
  index++;
  moveToSlide();

  // Reset if we reach end
  if (index >= totalSlides + slidesPerView) {
    setTimeout(() => {
      slidesWrapper.style.transition = 'none';
      index = slidesPerView;
      slidesWrapper.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;
    }, 500);
  }
}

function goPrev() {
  index--;
  moveToSlide();

  // Reset if we reach beginning
  if (index < slidesPerView) {
    setTimeout(() => {
      slidesWrapper.style.transition = 'none';
      index = totalSlides;
      slidesWrapper.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;
    }, 500);
  }
}

// Button listeners
nextBtn.addEventListener('click', () => {
  goNext();
  restartAutoplay();
});

prevBtn.addEventListener('click', () => {
  goPrev();
  restartAutoplay();
});

// Autoplay
function startAutoplay() {
  autoplayInterval = setInterval(goNext, 3000); // every 3 seconds
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// Start autoplay on load
startAutoplay();

// Optional: Pause autoplay on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopAutoplay);
sliderContainer.addEventListener('mouseleave', startAutoplay);






const video = document.getElementById('video');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const container = document.getElementById('videoContainer');

function togglePlay() {
  if (video.paused) {
    video.play();
    container.classList.add('playing');
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    video.pause();
    container.classList.remove('playing');
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
}

// Click on button
playBtn.addEventListener('click', togglePlay);

// Click on video itself
video.addEventListener('click', togglePlay);

// Reset icon when video ends
video.addEventListener('ended', () => {
  container.classList.remove('playing');
  playIcon.classList.remove('fa-pause');
  playIcon.classList.add('fa-play');
});

    const hero = document.getElementById("hero");
  const bottomBanner = document.getElementById("bottomBanner");

  function toggleBanner() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom <= 0) {
      bottomBanner.classList.add("show");
    } else {
      bottomBanner.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleBanner);
   // Select the navbar
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if(window.scrollY > 50){ // scroll distance to trigger background
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  // Select all elements with class "contact"
const contactButtons = document.querySelectorAll('.contact');
const popupForm = document.getElementById('popupForm');
const closeBtn = document.querySelector('.close-btn');

// Open popup when any "contact" button is clicked
contactButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default behavior
    popupForm.style.display = 'flex';
  });
});

// Close popup on X click
closeBtn.addEventListener('click', () => {
  popupForm.style.display = 'none';
});

// Close popup on clicking outside the content
window.addEventListener('click', (e) => {
  if (e.target === popupForm) {
    popupForm.style.display = 'none';
  }
});

// Automatically open popup every 15 seconds
window.addEventListener('load', () => {
  // Initial popup after 15 seconds
  setTimeout(() => {
    popupForm.style.display = 'flex';
  }, 15000);

  // Repeat every 15 seconds
  setInterval(() => {
    popupForm.style.display = 'flex';
  }, 15000);
});
