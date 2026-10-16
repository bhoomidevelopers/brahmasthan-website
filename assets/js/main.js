/**
 * BHOOMI DEVELOPERS — MAIN JAVASCRIPT
 * =====================================
 * Navigation · Scroll effects · Animations · Mobile menu · Forms
 */

// ── Utility ──────────────────────────────────────────────────

function $(selector, scope = document) {
  return scope.querySelector(selector);
}

function $$(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

// ── Navigation ───────────────────────────────────────────────

const initNav = () => {
  const nav = $('.nav');
  if (!nav) return;

  const hamburger = $('.nav__hamburger');
  const mobileMenu = $('.nav__mobile');
  const mobileLinks = $$('.nav__mobile-link');
  const isHeroPage = nav.classList.contains('nav--dark-transparent');

  // Scroll effect
  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.remove('nav--transparent', 'nav--dark-transparent');
      nav.classList.add('nav--solid');
      if (hamburger) {
        $$('.nav__hamburger-line', hamburger).forEach(l => {
          l.style.backgroundColor = 'var(--text-primary)';
        });
      }
    } else {
      nav.classList.remove('nav--solid');
      if (isHeroPage) {
        nav.classList.add('nav--dark-transparent');
      } else {
        nav.classList.add('nav--transparent');
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active link highlighting
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  $$('.nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = href.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
    if (linkPath && currentPath.endsWith(linkPath)) {
      link.classList.add('is-active');
    }
  });
};

// ── Scroll Reveal ─────────────────────────────────────────────

const initScrollReveal = () => {
  const elements = $$('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
};

// ── Form Validation & WhatsApp Submission ────────────────────

const isValidIndianMobile = (num) => {
  const cleaned = num.replace(/[\s\-\(\)]/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
};

const cleanPhone = (num) => num.replace(/[\s\-\(\)]/g, '');

const buildWhatsAppUrl = (number, message) => {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

const initEnquiryForms = () => {
  $$('[data-enquiry-form]').forEach(form => {
    const nameInput    = form.querySelector('[data-field="name"]');
    const phoneInput   = form.querySelector('[data-field="phone"]');
    const nameError    = form.querySelector('[data-error="name"]');
    const phoneError   = form.querySelector('[data-error="phone"]');
    const successMsg   = form.querySelector('[data-success]');
    const formBody     = form.querySelector('[data-form-body]');
    const projectSlug  = form.dataset.project || null;

    if (!nameInput || !phoneInput) return;

    const showError = (input, errorEl, msg) => {
      input.classList.add('is-error');
      if (errorEl) { errorEl.textContent = msg; errorEl.classList.add('is-visible'); }
    };

    const clearError = (input, errorEl) => {
      input.classList.remove('is-error');
      if (errorEl) errorEl.classList.remove('is-visible');
    };

    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    phoneInput.addEventListener('input', () => clearError(phoneInput, phoneError));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name  = nameInput.value.trim();
      const phone = phoneInput.value.trim();

      if (!name) {
        showError(nameInput, nameError, 'Please enter your name.');
        valid = false;
      }

      if (!phone) {
        showError(phoneInput, phoneError, 'Please enter your mobile number.');
        valid = false;
      } else if (!isValidIndianMobile(phone)) {
        showError(phoneInput, phoneError, 'Please enter a valid 10-digit Indian mobile number.');
        valid = false;
      }

      if (!valid) return;

      // Build WhatsApp message
      let message;
      const project = PROJECTS ? PROJECTS.find(p => p.slug === projectSlug) : null;

      if (project && project.whatsappMessage) {
        message = project.whatsappMessage(name, cleanPhone(phone));
      } else {
        message = `Hi Bhoomi Developers, I'm interested in your projects. My name is ${name} and my contact number is ${phone}. Please share more details.`;
      }

      const url = buildWhatsAppUrl(BHOOMI_CONFIG.whatsappNumber, message);

      // Show success state
      if (formBody && successMsg) {
        formBody.style.display = 'none';
        successMsg.classList.add('is-visible');
      }

      // Open WhatsApp
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 400);
    });
  });
};

// ── Contact Form (with optional message field) ──────────────

const initContactForm = () => {
  const form = $('[data-contact-form]');
  if (!form) return;

  const nameInput   = form.querySelector('[data-field="name"]');
  const phoneInput  = form.querySelector('[data-field="phone"]');
  const msgInput    = form.querySelector('[data-field="message"]');
  const nameError   = form.querySelector('[data-error="name"]');
  const phoneError  = form.querySelector('[data-error="phone"]');
  const successMsg  = form.querySelector('[data-success]');
  const formBody    = form.querySelector('[data-form-body]');

  if (!nameInput || !phoneInput) return;

  const showError = (el, errEl, msg) => {
    el.classList.add('is-error');
    if (errEl) { errEl.textContent = msg; errEl.classList.add('is-visible'); }
  };

  const clearError = (el, errEl) => {
    el.classList.remove('is-error');
    if (errEl) errEl.classList.remove('is-visible');
  };

  nameInput.addEventListener('input',  () => clearError(nameInput,  nameError));
  phoneInput.addEventListener('input', () => clearError(phoneInput, phoneError));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name  = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const msg   = msgInput ? msgInput.value.trim() : '';

    if (!name) { showError(nameInput, nameError, 'Please enter your name.'); valid = false; }
    if (!phone) {
      showError(phoneInput, phoneError, 'Please enter your mobile number.'); valid = false;
    } else if (!isValidIndianMobile(phone)) {
      showError(phoneInput, phoneError, 'Please enter a valid 10-digit Indian mobile number.'); valid = false;
    }

    if (!valid) return;

    const message = msg
      ? `Hi Bhoomi Developers, my name is ${name} and my contact number is ${phone}. ${msg}`
      : `Hi Bhoomi Developers, I'm interested in your projects. My name is ${name} and my contact number is ${phone}. Please share more details.`;

    if (formBody && successMsg) {
      formBody.style.display = 'none';
      successMsg.classList.add('is-visible');
    }

    setTimeout(() => {
      window.open(buildWhatsAppUrl(BHOOMI_CONFIG.whatsappNumber, message), '_blank', 'noopener,noreferrer');
    }, 400);
  });
};

// ── Render Projects (Homepage & Projects Page) ────────────────

const renderProjectCards = (containerId, filterFn = null) => {
  const container = document.getElementById(containerId);
  if (!container || typeof PROJECTS === 'undefined') return;

  const list = filterFn ? PROJECTS.filter(filterFn) : PROJECTS;

  if (!list.length) {
    container.innerHTML = '<p class="body-md" style="text-align:center; padding:3rem 0; grid-column:1/-1;">Projects coming soon.</p>';
    return;
  }

  container.innerHTML = list.map((p, i) => {
    const hasImage = p.thumbnail && p.thumbnail.trim();
    const imgHtml = hasImage
      ? `<img src="${p.thumbnail}" alt="${p.name} — Bhoomi Developers" loading="lazy">`
      : `<div class="img-placeholder" style="width:100%;height:100%">Project Image</div>`;

    const statsHtml = p.statistics.slice(0, 2).map(s =>
      `<div>
        <div class="project-card__stat-value">${s.value}</div>
        <div class="project-card__stat-label">${s.label}</div>
      </div>`
    ).join('');

    return `
      <article class="project-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
        <a href="${getProjectUrl(p)}" aria-label="View ${p.name} project">
          <div class="project-card__image">
            ${imgHtml}
            <span class="project-card__badge">${p.status}</span>
          </div>
          <div class="project-card__body">
            <div class="project-card__eyebrow">Bhoomi Developers</div>
            <h3 class="project-card__title">${p.name}</h3>
            <p class="project-card__desc">${p.shortDesc}</p>
            <div class="project-card__stats">${statsHtml}</div>
            <span class="link-arrow">
              View Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </a>
      </article>`;
  }).join('');

  // Re-run reveal observer on new elements
  initScrollReveal();
};

const getProjectUrl = (project) => {
  // Use the explicit url field from project data (relative to site root).
  // Build the correct prefix using data-page-depth on <body>:
  //   depth 0 = root page  (index.html, projects.html)  → no prefix needed
  //   depth 1 = sub-folder (projects/brahmasthan.html)  → prefix with '../'
  const depth = parseInt(document.body.dataset.pageDepth || '0', 10);
  const prefix = depth >= 1 ? '../'.repeat(depth) : '';
  const url = project.url || `projects/${project.slug}.html`;
  return prefix + url;
};

// ── Init ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initEnquiryForms();
  initContactForm();

  // Homepage featured projects
  renderProjectCards('featured-projects', p => p.featured);

  // All projects page
  renderProjectCards('all-projects');
});
