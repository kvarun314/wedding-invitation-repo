// Wedding invitation - single page with photo carousel
// GitHub Pages ready

(function () {
  'use strict';

  // ----- Hero photo carousel (multiple photos with fade transitions) -----
  var slides = document.querySelectorAll('.hero-slide');
  var dotsContainer = document.querySelector('.hero-dots');
  var current = 0;
  var interval = 4500; // ms between transitions
  var timer = null;

  function loadHeroImageIfNeeded(slideEl) {
    var img = slideEl ? slideEl.querySelector('img[data-src]') : null;
    if (img && img.getAttribute('data-src')) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');
    }
  }

  function goToSlide(index) {
    if (!slides.length) return;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    current = index;
    loadHeroImageIfNeeded(slides[current]);
    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === current);
    });
    if (dotsContainer) {
      var dots = dotsContainer.querySelectorAll('.hero-dot');
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function startCarousel() {
    if (timer) clearInterval(timer);
    if (slides.length <= 1) return;
    timer = setInterval(nextSlide, interval);
  }

  if (slides.length) {
    goToSlide(0);
    // Preload remaining hero images after first paint (keeps initial load to one image)
    var preloadRest = function () {
      for (var i = 1; i < slides.length; i++) {
        loadHeroImageIfNeeded(slides[i]);
      }
    };
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(preloadRest, { timeout: 1500 });
    } else {
      setTimeout(preloadRest, 400);
    }
    slides.forEach(function (_, i) {
      if (!dotsContainer) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hero-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Go to photo ' + (i + 1));
      btn.addEventListener('click', function () {
        goToSlide(i);
        startCarousel(); // reset timer
      });
      dotsContainer.appendChild(btn);
    });
    if (slides.length > 1) startCarousel();
  }

  // ----- Google Drive video: poster thumbnail + click to play -----
  document.querySelectorAll('.media-item.video').forEach(function (wrap) {
    var poster = wrap.querySelector('.video-poster');
    var playBtn = wrap.querySelector('.video-play-btn');
    var embedWrap = wrap.querySelector('.video-embed-wrap');
    var iframe = embedWrap ? embedWrap.querySelector('iframe[data-src]') : null;

    if (poster && poster.getAttribute('data-drive-thumb')) {
      poster.addEventListener('error', function () {
        poster.setAttribute('src', poster.getAttribute('data-drive-thumb'));
      });
    }

    if (playBtn && embedWrap && iframe) {
      function playVideo() {
        wrap.classList.add('is-playing');
        embedWrap.removeAttribute('hidden');
        var src = iframe.getAttribute('data-src');
        if (src) {
          iframe.setAttribute('src', src);
          iframe.removeAttribute('data-src');
        }
      }
      playBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        playVideo();
      });
      wrap.addEventListener('click', function (e) {
        if (e.target === playBtn || playBtn.contains(e.target)) return;
        if (!wrap.classList.contains('is-playing')) {
          e.preventDefault();
          playVideo();
        }
      });
    }
  });

  // ----- Placeholders when images fail to load -----
  document.querySelectorAll('.hero-placeholder, .media-placeholder').forEach(function (el) {
    if (el.classList.contains('visible')) return;
    var img = el.previousElementSibling;
    if (img && img.tagName === 'IMG' && !img.complete) {
      img.addEventListener('error', function () {
        el.classList.add('visible');
        el.style.display = 'block';
      });
    }
  });

  // ----- Countdown to wedding day (April 20) -----
  var weddingDate = new Date('2026-04-20T00:00:00');
  var elDays = document.getElementById('countdown-days');
  var elHours = document.getElementById('countdown-hours');
  var elMins = document.getElementById('countdown-mins');
  var elSecs = document.getElementById('countdown-secs');

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function updateCountdown() {
    var now = new Date();
    var diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      if (elDays) elDays.textContent = '0';
      if (elHours) elHours.textContent = '00';
      if (elMins) elMins.textContent = '00';
      if (elSecs) elSecs.textContent = '00';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = days;
    if (elHours) elHours.textContent = pad(hours);
    if (elMins) elMins.textContent = pad(mins);
    if (elSecs) elSecs.textContent = pad(secs);
  }

  if (elDays && elHours && elMins && elSecs) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ----- Smooth scroll for #details (anchor already works with scroll-behavior: smooth) -----
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === '#') return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        e.preventDefault();
      }
    });
  });
})();
