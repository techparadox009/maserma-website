// Sticky Header Shadow & Size Toggle on Scroll
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("siteHeader");
  const scrollThreshold = 10;

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > scrollThreshold) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  }

  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

// Form Enhancements & Mobile Fullscreen Drawer
document.addEventListener("DOMContentLoaded", function () {
  var dateField = document.getElementById("dateField");
  var dateInput = document.getElementById("eventDate");

  if (dateField && dateInput) {
    dateField.addEventListener("click", function () {
      if (typeof dateInput.showPicker === "function") {
        try {
          dateInput.showPicker();
        } catch (e) {
          dateInput.focus();
        }
      } else {
        dateInput.focus();
      }
    });
  }

  var mobileCtaBtn = document.getElementById("mobileCtaBtn");
  var formCol = document.querySelector(".hero-form-col");
  var closeBtn = document.querySelector(".form-close-btn");

  function openMobileForm() {
    if (!formCol) return;
    formCol.classList.add("mobile-active");
    document.body.classList.add("mobile-form-open");
    var firstField = formCol.querySelector("input");
    if (firstField) firstField.focus({ preventScroll: true });
  }

  function closeMobileForm() {
    if (!formCol) return;
    formCol.classList.remove("mobile-active");
    document.body.classList.remove("mobile-form-open");
  }

  if (mobileCtaBtn) mobileCtaBtn.addEventListener("click", openMobileForm);
  if (closeBtn) closeBtn.addEventListener("click", closeMobileForm);
});

// Stat Counters Animation via Intersection Observer
document.addEventListener('DOMContentLoaded', function () {
  var counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  var duration = 1500;
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    var text = el.textContent.trim();
    var match = text.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    var targetValue = parseFloat(match[1].replace(/,/g, ''));
    var suffix = match[2];
    var hasDecimal = match[1].indexOf('.') !== -1;

    if (prefersReducedMotion || isNaN(targetValue)) {
      el.textContent = text;
      return;
    }

    var startTime = null;
    el.textContent = (hasDecimal ? '0.0' : '0') + suffix;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = targetValue * eased;

      el.textContent = (hasDecimal
        ? current.toFixed(1)
        : Math.round(current).toLocaleString()) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = (hasDecimal
          ? targetValue.toFixed(1)
          : targetValue.toLocaleString()) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }
});

// Testimonials Swiper Carousel Initialization
document.addEventListener('DOMContentLoaded', function () {
  if (typeof Swiper === 'undefined') return;

  new Swiper('.testimonials-swiper', {
    loop: true,
    spaceBetween: 24,
    grabCursor: true,
    slidesPerView: 1,
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 26
      }
    },
    pagination: {
      el: '.testi-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.testi-next',
      prevEl: '.testi-prev'
    }
  });
});