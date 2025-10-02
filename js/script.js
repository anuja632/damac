const slidesWrapper = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let slidesPerView = updateSlidesPerView();
let index = slidesPerView;
let autoplayInterval;

// Function to get slidesPerView based on screen width
function updateSlidesPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

// Clone slides for infinite loop
function setupClones() {
  slidesWrapper.innerHTML = ''; // clear current slides
  const totalSlides = slideItems.length;
  
  // Clone last n slides at start
  for (let i = totalSlides - slidesPerView; i < totalSlides; i++) {
    const clone = slideItems[i].cloneNode(true);
    slidesWrapper.appendChild(clone);
  }

  // Append original slides
  slideItems.forEach(slide => slidesWrapper.appendChild(slide.cloneNode(true)));

  // Clone first n slides at end
  for (let i = 0; i < slidesPerView; i++) {
    const clone = slideItems[i].cloneNode(true);
    slidesWrapper.appendChild(clone);
  }
}

// Move slider to current index
function moveToSlide(transition = true) {
slidesWrapper.style.transition = transition ? 'transform 0.8s ease-in-out' : 'none';
  slidesWrapper.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;
}

// Next / Prev logic
function goNext() {
  index++;
  moveToSlide();
  if (index >= slideItems.length + slidesPerView) {
    setTimeout(() => {
      index = slidesPerView;
      moveToSlide(false);
    }, 500);
  }
}

function goPrev() {
  index--;
  moveToSlide();
  if (index < slidesPerView) {
    setTimeout(() => {
      index = slideItems.length;
      moveToSlide(false);
    }, 500);
  }
}

// Autoplay
function startAutoplay() { autoplayInterval = setInterval(goNext, 5000); } // 5s
function stopAutoplay() { clearInterval(autoplayInterval); }
function restartAutoplay() { stopAutoplay(); startAutoplay(); }

// Initialize slider
function initSlider() {
  slidesPerView = updateSlidesPerView();
  setupClones();
  index = slidesPerView;
  moveToSlide(false);
  startAutoplay();
}

nextBtn.addEventListener('click', () => { goNext(); restartAutoplay(); });
prevBtn.addEventListener('click', () => { goPrev(); restartAutoplay(); });

// Pause on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopAutoplay);
sliderContainer.addEventListener('mouseleave', startAutoplay);

// Responsive update on resize
window.addEventListener('resize', () => {
  initSlider(); // reinitialize slider with new slidesPerView
});

// Start
initSlider();



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


// Function to handle form submission
function handleForm(formId) {
  const form = document.getElementById(formId);
  const message = form.querySelector('#formMessage') || document.createElement('div');
  message.id = "formMessage";
  message.style.color = "green";
  message.style.marginTop = "10px";
  message.style.fontWeight = "600";
  form.appendChild(message);

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent default submit
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        message.textContent = "Thank you! We’ll get back to you soon.";
        message.style.display = "block";
        form.reset();
      } else {
        message.textContent = "Oops! Something went wrong.";
        message.style.color = "red";
        message.style.display = "block";
      }
    }).catch(() => {
      message.textContent = "Oops! Something went wrong.";
      message.style.color = "red";
      message.style.display = "block";
    });
  });
}

// Apply to both forms
handleForm('contactPopupFrm');
handleForm('contactfrm');
const contactButtons = document.querySelectorAll('.contact'); // buttons that open popup
const popupForm = document.getElementById('popupForm');
const closeBtn = document.querySelector('.close-btn');

contactButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    popupForm.style.display = 'flex';
  });
});
closeBtn.addEventListener('click', () => popupForm.style.display = 'none');
window.addEventListener('click', e => { if(e.target === popupForm) popupForm.style.display = 'none'; });

// Auto popup every 15 seconds
window.addEventListener('load', () => {
  setTimeout(() => popupForm.style.display = 'flex', 15000);
  setInterval(() => popupForm.style.display = 'flex', 15000);
});

// ----- Initialize intl-tel-input for all phone inputs -----
const phoneInputs = document.querySelectorAll('.phone');
phoneInputs.forEach(input => {
  const iti = window.intlTelInput(input, {
    initialCountry: "ae",
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
  });

  // Validate phone & redirect on submit
  input.form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Update phone value
    if(iti.isValidNumber()) {
      input.value = iti.getNumber();
    }

    // Alert and redirect
    alert("Thank you! We’ll get back to you soon.");
    window.location.href = "thankyou.html";

    // Optionally submit form to FormSubmit
    // input.form.submit();
  });
});