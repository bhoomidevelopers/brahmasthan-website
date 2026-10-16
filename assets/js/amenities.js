/**
 * BRAHMASTHAN — AMENITIES SLIDER
 * =================================
 * Renders and controls the amenities showcase section.
 *
 * ─── HOW TO EDIT ───────────────────────────────────────────────
 * Only edit the `amenitiesData` array below.
 * You can add, remove, or reorder categories freely.
 * Each category has: number, title, image, alt, items[].
 * ───────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  // ==========================================
  // EDIT AMENITIES DATA HERE
  // ==========================================

  const amenitiesData = [
    {
      number: "01",
      title: "Indoor Amenities",
      image: "../assets/images/brahmasthan/amenities-indoor.jpg",
      alt: "Indoor amenities at Brahmasthan",
      items: [
        "Reception",
        "Gymnasium",
        "Board Games",
        "Cloud Kitchen",
        "Multipurpose / Banquet Hall",
        "Indoor Badminton Court",
        "Guest Room",
        "Foosball",
        "Billiard / Snookers",
        "Library",
        "Table Tennis",
        "Dispensary"
      ]
    },
    {
      number: "02",
      title: "Outdoor Amenities",
      image: "../assets/images/brahmasthan/amenities-outdoor.jpg",
      alt: "Outdoor amenities at Brahmasthan",
      items: [
        "Children's Play Area",
        "Cricket Practice Net",
        "Jogging / Walking Track",
        "Senior Seating Area",
        "Tennis Court",
        "Yoga / Meditation",
        "Party Lawn with Bar",
        "EV Charging Provision",
        "Basketball Court",
        "Swimming Pool",
        "Amphitheatre",
        "Temple"
      ]
    },
    {
      number: "03",
      title: "Third Category",
      image: "../assets/images/brahmasthan/amenities-third.jpg",
      alt: "Brahmasthan amenities",
      items: [
        "Edit Amenity",
        "Edit Amenity",
        "Edit Amenity"
      ]
    }
  ];

  // ── Build slides from data ──────────────────────────────────────
  const total = amenitiesData.length;

  function buildSlides() {
    const slider = document.getElementById('brahma-amenities-slider');
    if (!slider) return;

    slider.innerHTML = amenitiesData.map(function (cat, idx) {
      const itemsHTML = cat.items.map(function (item) {
        return '<div class="brahma-amenities-item">' + item + '</div>';
      }).join('');

      return (
        '<div class="brahma-amenities-slide' + (idx === 0 ? ' brahma-amenities-slide--active' : '') + '" ' +
        'role="tabpanel" aria-label="' + cat.title + '" data-brahma-slide="' + idx + '">' +
        '<div class="brahma-amenities-slide-inner">' +

        '<div class="brahma-amenities-img-col">' +
        '<div class="brahma-amenities-img-wrap">' +
        '<img class="brahma-amenities-img" src="' + cat.image + '" alt="' + cat.alt + '" loading="lazy">' +
        '</div>' +
        '</div>' +

        '<div class="brahma-amenities-cat-row">' +
        '<span class="brahma-amenities-cat-num" aria-hidden="true">' + cat.number + '</span>' +
        '<h3 class="brahma-amenities-cat-title">' + cat.title + '</h3>' +
        '</div>' +

        '<div class="brahma-amenities-items-col">' +
        '<div class="brahma-amenities-items-grid">' +
        itemsHTML +
        '</div>' +
        '</div>' +

        '</div>' +
        '</div>'
      );
    }).join('');
  }

  // ── Slider state ────────────────────────────────────────────────
  var currentIdx = 0;
  var isAnimating = false;

  function updateIndicator() {
    var indicator = document.getElementById('brahma-amenities-indicator');
    if (!indicator) return;
    var current = String(currentIdx + 1).padStart(2, '0');
    var tot = String(total).padStart(2, '0');
    indicator.textContent = current + ' / ' + tot;
  }

  function goTo(newIdx) {
    if (isAnimating || newIdx === currentIdx) return;
    isAnimating = true;

    var slides = document.querySelectorAll('[data-brahma-slide]');
    var leaving = slides[currentIdx];
    var entering = slides[newIdx];

    if (!leaving || !entering) {
      isAnimating = false;
      return;
    }

    // Mark leaving
    leaving.classList.remove('brahma-amenities-slide--active');
    leaving.classList.add('brahma-amenities-slide--leaving');

    // Mark entering
    entering.classList.add('brahma-amenities-slide--entering');

    currentIdx = newIdx;
    updateIndicator();

    // Cleanup after animation
    setTimeout(function () {
      leaving.classList.remove('brahma-amenities-slide--leaving');
      entering.classList.remove('brahma-amenities-slide--entering');
      entering.classList.add('brahma-amenities-slide--active');
      isAnimating = false;
    }, 460);
  }

  function goNext() {
    goTo((currentIdx + 1) % total);
  }

  function goPrev() {
    goTo((currentIdx - 1 + total) % total);
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    buildSlides();
    updateIndicator();

    var prevBtn = document.getElementById('brahma-amenities-prev');
    var nextBtn = document.getElementById('brahma-amenities-next');

    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', goNext);

    // Keyboard navigation
    var section = document.querySelector('.brahma-amenities-section');
    if (section) {
      section.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
