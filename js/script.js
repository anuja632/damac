const swiper = new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: { slidesPerView: 1 },
    992: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
});


  const video = document.getElementById('video');
  const playBtn = document.getElementById('playBtn');
  const container = document.getElementById('videoContainer');

  playBtn.addEventListener('click', () => {
    if(video.paused) {
      video.play();
      container.classList.add('playing');
    } else {
      video.pause();
      container.classList.remove('playing');
    }
  });

  // Pause video if clicked on video itself
  video.addEventListener('click', () => {
    if(video.paused) {
      video.play();
      container.classList.add('playing');
    } else {
      video.pause();
      container.classList.remove('playing');
    }
  });

  // Show play button when video ends
  video.addEventListener('ended', () => {
    container.classList.remove('playing');
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

// Automatically open popup 5 minutes (300000 ms) after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    popupForm.style.display = 'flex';
  }, 300000); // 300000 ms = 5 minutes
});
