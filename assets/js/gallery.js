/**
 * BHOOMI DEVELOPERS — GALLERY / LIGHTBOX
 * ==========================================
 * Handles gallery image click → lightbox with keyboard nav
 */

const initGallery = () => {
  const galleryItems = document.querySelectorAll('.gallery-grid__item');
  if (!galleryItems.length) return;

  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg  = lightbox.querySelector('.lightbox__img');
  const closeBtn     = lightbox.querySelector('.lightbox__close');
  const prevBtn      = lightbox.querySelector('.lightbox__prev');
  const nextBtn      = lightbox.querySelector('.lightbox__next');
  const caption      = lightbox.querySelector('.lightbox__caption');

  let currentIndex = 0;
  let images = [];

  // Build image list from gallery items
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (!img) return;

    images.push({
      src: img.src,
      alt: img.alt || `Gallery image ${index + 1}`,
    });

    item.setAttribute('data-gallery-index', index);
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Open image ${index + 1}`);

    const openLightbox = () => {
      currentIndex = index;
      showImage(currentIndex);
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lightboxImg.focus();
    };

    item.addEventListener('click', openLightbox);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox();
      }
    });
  });

  if (!images.length) return;

  const showImage = (index) => {
    if (!images[index]) return;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    if (caption) caption.textContent = `${index + 1} / ${images.length}`;
    prevBtn.style.display = images.length <= 1 ? 'none' : '';
    nextBtn.style.display = images.length <= 1 ? 'none' : '';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const goPrev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  };

  const goNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn)  prevBtn.addEventListener('click', goPrev);
  if (nextBtn)  nextBtn.addEventListener('click', goNext);

  // Click backdrop to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   goPrev();
    if (e.key === 'ArrowRight')  goNext();
  });
};

// ── Render Gallery from project data ─────────────────────────

const renderGallery = (containerId, images) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!images || !images.length) {
    container.innerHTML = `
      <div class="img-placeholder" style="height:320px;border-radius:4px;border:1px solid var(--border)">
        <div style="text-align:center">
          <p style="margin-bottom:.5rem">Gallery images will appear here</p>
          <p style="font-size:.75rem;opacity:.6">Add image paths to the gallery array in assets/js/projects.js</p>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="gallery-grid">
      ${images.map((src, i) => `
        <div class="gallery-grid__item">
          <img src="${src}" alt="Brahmasthan gallery image ${i + 1}" loading="lazy">
          <div class="gallery-grid__overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
            </svg>
          </div>
        </div>`).join('')}
    </div>`;

  initGallery();
};

document.addEventListener('DOMContentLoaded', initGallery);
