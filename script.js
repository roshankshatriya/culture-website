/* ============================================================
   SANSKRITI — Indian Classical Arts | Main JavaScript
   ============================================================ */

(function () {
  "use strict";

  // ===== DOM ELEMENTS =====
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTop = document.getElementById("backToTop");
  const heroParticles = document.getElementById("heroParticles");

  // ===== HERO PARTICLES (home page only) =====
  if (heroParticles) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 4 + "s";
      p.style.animationDuration = 3 + Math.random() * 3 + "s";
      p.style.width = 2 + Math.random() * 4 + "px";
      p.style.height = p.style.width;
      heroParticles.appendChild(p);
    }
  }

  // ===== NAVBAR SCROLL =====
  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // ===== HAMBURGER MENU =====
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 200;
    sections.forEach(function (sec) {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (l) {
          l.classList.remove("active");
        });
        const activeLink = document.querySelector(
          '.nav-link[href="#' + id + '"]',
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }

  // ===== BACK TO TOP =====
  function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== SCROLL REVEAL (AOS-like) =====
  function revealOnScroll() {
    document.querySelectorAll("[data-aos]").forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add("aos-animate");
      }
    });
  }

  // ===== COMBINED SCROLL HANDLER =====
  let scrollTicking = false;
  window.addEventListener("scroll", function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        handleNavScroll();
        handleBackToTop();
        updateActiveNav();
        revealOnScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // Initial calls
  handleNavScroll();
  revealOnScroll();

  // ===== GALLERY FILTER (gallery page only) =====
  const galleryItems = document.querySelectorAll(".gallery-item");
  const filterBtns = document.querySelectorAll(".filter-btn");
  let visibleGalleryItems = [];

  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        galleryItems.forEach(function (item) {
          if (
            filter === "all" ||
            item.getAttribute("data-category") === filter
          ) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
        updateVisibleGallery();
      });
    });
  }

  function updateVisibleGallery() {
    visibleGalleryItems = Array.from(galleryItems).filter(function (item) {
      return !item.classList.contains("hidden");
    });
  }
  updateVisibleGallery();

  // ===== LIGHTBOX (gallery page only) =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let currentGalleryIndex = 0;

  if (galleryItems.length && lightbox) {
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        const img = item.querySelector("img");
        const caption = item.querySelector(".gallery-hover span");
        currentGalleryIndex = visibleGalleryItems.indexOf(item);
        openLightbox(img.src, caption ? caption.textContent : "");
      });
    });
  }

  function openLightbox(src, caption) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      currentGalleryIndex =
        (currentGalleryIndex - 1 + visibleGalleryItems.length) %
        visibleGalleryItems.length;
      const item = visibleGalleryItems[currentGalleryIndex];
      const img = item.querySelector("img");
      const caption = item.querySelector(".gallery-hover span");
      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption ? caption.textContent : "";
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", function (e) {
      e.stopPropagation();
      currentGalleryIndex =
        (currentGalleryIndex + 1) % visibleGalleryItems.length;
      const item = visibleGalleryItems[currentGalleryIndex];
      const img = item.querySelector("img");
      const caption = item.querySelector(".gallery-hover span");
      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption ? caption.textContent : "";
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lightboxPrev && lightboxPrev.click();
    if (e.key === "ArrowRight") lightboxNext && lightboxNext.click();
  });

  // ===== CONTACT FORM VALIDATION (contact page only) =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");

    function validateField(input, errorEl, validator) {
      const value = input.value.trim();
      const result = validator(value);
      if (result !== true) {
        errorEl.textContent = result;
        input.closest(".input-wrap").classList.add("error");
        return false;
      }
      errorEl.textContent = "";
      input.closest(".input-wrap").classList.remove("error");
      return true;
    }

    const validateName = (val) => {
      if (!val) return "Please enter your name.";
      if (val.length < 2) return "Name must be at least 2 characters.";
      return true;
    };
    const validateEmail = (val) => {
      if (!val) return "Please enter your email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
        return "Please enter a valid email address.";
      return true;
    };
    const validatePhone = (val) => {
      if (!val) return "Please enter your phone number.";
      const cleaned = val.replace(/[\s\-\(\)\+]/g, "");
      if (!/^\d{10,13}$/.test(cleaned))
        return "Please enter a valid phone number (10–13 digits).";
      return true;
    };
    const validateMessage = (val) => {
      if (!val) return "Please enter a message.";
      if (val.length < 10) return "Message must be at least 10 characters.";
      return true;
    };

    nameInput.addEventListener("blur", () =>
      validateField(nameInput, nameError, validateName),
    );
    emailInput.addEventListener("blur", () =>
      validateField(emailInput, emailError, validateEmail),
    );
    phoneInput.addEventListener("blur", () =>
      validateField(phoneInput, phoneError, validatePhone),
    );
    messageInput.addEventListener("blur", () =>
      validateField(messageInput, messageError, validateMessage),
    );

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      if (!validateField(nameInput, nameError, validateName)) isValid = false;
      if (!validateField(emailInput, emailError, validateEmail))
        isValid = false;
      if (!validateField(phoneInput, phoneError, validatePhone))
        isValid = false;
      if (!validateField(messageInput, messageError, validateMessage))
        isValid = false;

      if (isValid) {
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.querySelector(".btn-text").textContent = "Sending…";
        setTimeout(function () {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.querySelector(".btn-text").textContent = "Send Message";
          formSuccess.classList.add("show");
          setTimeout(() => formSuccess.classList.remove("show"), 5000);
        }, 1500);
      }
    });
  }

  // ===== LEARN MORE MODAL (dance page only) =====
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");
  const learnMoreBtns = document.querySelectorAll(".learn-more-btn");

  if (modalOverlay && learnMoreBtns.length) {
    const modalData = {
      bharatanatyam: {
        title: "Bharatanatyam",
        content:
          "<p>Bharatanatyam is one of the major forms of Indian classical dance that originated in Tamil Nadu. It is one of the oldest and most prestigious dance traditions in India, with origins dating back over 2,000 years.</p><p>The dance form is based on the Natya Shastra. It combines <strong>Nritta</strong> (pure dance), <strong>Nritya</strong> (expressive dance), and <strong>Natya</strong> (dramatic dance).</p><p>Key elements include elaborate hand gestures (mudras), rhythmic footwork (adavus), and facial expressions (abhinaya).</p>",
      },
      kathak: {
        title: "Kathak",
        content:
          "<p>Kathak originated from the storytelling bards of ancient northern India. It emphasises rhythmic foot movements, fast pirouettes (chakkar), and vivid storytelling.</p><p>Kathak evolved under both <strong>Hindu and Muslim</strong> patronage, developing across the Lucknow, Jaipur, and Benares gharanas.</p><p>Performances feature intricate footwork with ghungroos, expressive gestures, and graceful spins.</p>",
      },
      kuchipudi: {
        title: "Kuchipudi",
        content:
          "<p>Kuchipudi is a classical Indian dance form from Krishna district of Andhra Pradesh. It blends dance and drama to portray stories from Hindu epics.</p><p>Its most iconic element is the <strong>Tarangam</strong> — dancing on the rim of a brass plate while balancing a water pot on the head.</p><p>Modern Kuchipudi blends graceful hand gestures, eye movements, and rhythmic dancing with theatrical elements.</p>",
      },
    };

    learnMoreBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const key = btn.getAttribute("data-modal");
        const data = modalData[key];
        if (data) {
          modalContent.innerHTML = "<h3>" + data.title + "</h3>" + data.content;
          modalOverlay.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    function closeModal() {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalOverlay.classList.contains("active"))
        closeModal();
    });
  }

  // ===== HERO CAROUSEL =====
  const heroCarousel = document.getElementById("heroCarousel");
  if (heroCarousel) {
    const slides = heroCarousel.querySelectorAll(".carousel-slide");
    const dots = heroCarousel.querySelectorAll(".nav-dot");
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      slides[index].classList.add("active");
      dots[index].classList.add("active");
      currentSlide = index;
    }

    function nextSlide() {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function startAutoPlay() {
      carouselInterval = setInterval(nextSlide, 6000); // 6 seconds per slide
    }

    function stopAutoPlay() {
      clearInterval(carouselInterval);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        stopAutoPlay();
        startAutoPlay(); // Reset timer
      });
    });

    heroCarousel.addEventListener("mouseenter", stopAutoPlay);
    heroCarousel.addEventListener("mouseleave", startAutoPlay);

    // Initialize
    startAutoPlay();
  }

  // ===== TESTIMONIAL CAROUSEL =====
  function initTestimonialCarousel() {
    const track = document.querySelector(".testimonial-track");
    const container = document.querySelector(".testimonial-carousel-container");
    const dots = document.querySelectorAll(".testi-dot");
    if (!track || !container) return;

    const cards = Array.from(track.children);
    if (cards.length === 0) return;

    // Clone cards for infinite effect
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });

    let index = 0;
    let isPaused = false;
    const gap = 30; // Matches CSS gap
    const totalOriginalCards = cards.length;

    function getCardWidth() {
      return cards[0].offsetWidth + gap;
    }

    function updateDots(activeIdx) {
      const dotIndex = activeIdx % totalOriginalCards;
      dots.forEach((dot, i) => {
        if (i === dotIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    function moveCarousel() {
      if (isPaused) return;

      index++;
      const cardWidth = getCardWidth();
      track.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      track.style.transform = `translateX(-${index * cardWidth}px)`;

      updateDots(index);

      if (index >= totalOriginalCards) {
        setTimeout(() => {
          track.style.transition = "none";
          index = 0;
          track.style.transform = `translateX(0)`;
          updateDots(index);
        }, 800);
      }
    }

    let interval = setInterval(moveCarousel, 4000);

    container.addEventListener("mouseenter", () => (isPaused = true));
    container.addEventListener("mouseleave", () => (isPaused = false));

    // Dot navigation
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        index = i;
        track.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        track.style.transform = `translateX(-${index * getCardWidth()}px)`;
        updateDots(index);

        clearInterval(interval);
        interval = setInterval(moveCarousel, 4000);
      });
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      track.style.transition = "none";
      track.style.transform = `translateX(-${index * getCardWidth()}px)`;
    });
  }

  // Initialize all carousels
  initTestimonialCarousel();

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
