const slidesWrapper = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const sliderContainer = document.querySelector('.slider-container');

let originalSlides = [...slideItems]; // keep original slides
let slidesPerView = updateSlidesPerView();
let index = slidesPerView;
let autoplayInterval;
let autoplaySpeed = updateAutoplaySpeed();

// Responsive slides per view
function updateSlidesPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

// Dynamic autoplay speed
function updateAutoplaySpeed() {
  // if (window.innerWidth <= 600) return 18000;
  if (window.innerWidth <= 992) return 4000;
  return 7000;
}

// Setup clones for infinite loop
function setupClones() {
  slidesWrapper.innerHTML = '';
  const totalSlides = originalSlides.length;

  // Clone last n slides at start
  for (let i = totalSlides - slidesPerView; i < totalSlides; i++) {
    slidesWrapper.appendChild(originalSlides[i].cloneNode(true));
  }

  // Append original slides
  originalSlides.forEach(slide => slidesWrapper.appendChild(slide.cloneNode(true)));

  // Clone first n slides at end
  for (let i = 0; i < slidesPerView; i++) {
    slidesWrapper.appendChild(originalSlides[i].cloneNode(true));
  }
}

// Move slider to current index
function moveToSlide(transition = true) {
  slidesWrapper.style.transition = transition ? 'transform 0.8s ease-in-out' : 'none';
  slidesWrapper.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;
}

// Next / Prev
function goNext() {
  index++;
  moveToSlide();
  if (index >= originalSlides.length + slidesPerView) {
    setTimeout(() => {
      index = slidesPerView;
      moveToSlide(false);
    }, 800);
  }
}

function goPrev() {
  index--;
  moveToSlide();
  if (index < slidesPerView) {
    setTimeout(() => {
      index = originalSlides.length;
      moveToSlide(false);
    }, 800);
  }
}

// Autoplay
function startAutoplay() { autoplayInterval = setInterval(goNext, autoplaySpeed); }
function stopAutoplay() { clearInterval(autoplayInterval); }
function restartAutoplay() { stopAutoplay(); startAutoplay(); }

// Initialize slider
function initSlider() {
  slidesPerView = updateSlidesPerView();
  autoplaySpeed = updateAutoplaySpeed();
  setupClones();
  index = slidesPerView;
  moveToSlide(false);
  restartAutoplay();
}

// Event listeners
nextBtn.addEventListener('click', () => { goNext(); restartAutoplay(); });
prevBtn.addEventListener('click', () => { goPrev(); restartAutoplay(); });

sliderContainer.addEventListener('mouseenter', stopAutoplay);
sliderContainer.addEventListener('mouseleave', startAutoplay);

window.addEventListener('resize', () => { stopAutoplay(); initSlider(); });

// Start slider
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

  
// -------- Handle Form Submission with Validation --------
function handleForm(formId) {
  const form = document.getElementById(formId);
  const message = form.querySelector('#formMessage') || document.createElement('div');
  message.id = "formMessage";
  message.style.color = "green";
  message.style.marginTop = "10px";
  message.style.fontWeight = "600";
  message.style.display = "none";
  form.appendChild(message);

  // Find phone input in this form
  const phoneInput = form.querySelector('.phone');
  let iti;
  if (phoneInput) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: "ae",
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
    });
  }

  // Create error message for phone
  const errorMsg = document.createElement("div");
  errorMsg.style.color = "red";
  errorMsg.style.fontSize = "13px";
  errorMsg.style.marginTop = "5px";
  errorMsg.style.display = "none";
  phoneInput.insertAdjacentElement("afterend", errorMsg);

  // Form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // always prevent default first

    let countryName = '';
    if (phoneInput && iti) {
      const countryData = iti.getSelectedCountryData();
      const fullNumber = iti.getNumber();
      const dialCode = "+" + countryData.dialCode;
      countryName = countryData.name; // ✅ country name

      // reset styles
      phoneInput.style.borderColor = "";
      errorMsg.style.display = "none";
      message.style.display = "none";

      // validation
      if (!iti.isValidNumber() || !fullNumber.startsWith(dialCode)) {
        phoneInput.style.borderColor = "red";
        errorMsg.textContent = "Please enter a valid phone number.";
        errorMsg.style.display = "block";
        return false; // ❌ stop form submission
      }

      // ✅ valid number
      phoneInput.value = fullNumber;
    }

    // --- SEND FORM VIA FETCH ---
    const formData = new FormData(form);
    // Add country name to form data
    formData.append('country_name', countryName);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          message.textContent = "Thank you! We’ll get back to you soon.";
          message.style.color = "green";
          message.style.display = "block";
          form.reset();
              // Redirect manually
    const nextPage = form.querySelector('input[name="_next"]').value;
    window.location.href = nextPage;
        } else {
          message.textContent = "Oops! Something went wrong.";
          message.style.color = "red";
          message.style.display = "block";
        }
      })
      .catch(() => {
        message.textContent = "Oops! Something went wrong.";
        message.style.color = "red";
        message.style.display = "block";
      });
  });

  // Clear phone error when typing
  phoneInput.addEventListener('input', () => {
    phoneInput.style.borderColor = "";
    errorMsg.style.display = "none";
  });
}

// Apply to both forms
handleForm('contactPopupFrm');
handleForm('contactfrm');

// -------- Popup Behaviour --------
const contactButtons = document.querySelectorAll('.contact');
const popupForm = document.getElementById('popupForm');
const closeBtn = document.querySelector('.close-btn');

contactButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    popupForm.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => popupForm.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === popupForm) popupForm.style.display = 'none';
});

// -------- Auto Popup --------
window.addEventListener('load', () => {
  const firstDelay = 5000;          // 5s
  const repeatDelay = 7 * 60 * 1000; // 7 min

  setTimeout(() => {
    popupForm.style.display = 'flex';
    setInterval(() => popupForm.style.display = 'flex', repeatDelay);
  }, firstDelay);
});
