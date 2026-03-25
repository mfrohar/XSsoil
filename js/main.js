'use strict';

/* ============================================
   XS SOIL SOLUTIONS — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAV SCROLL BEHAVIOUR
     ========================================== */
  const nav = document.querySelector('.nav');

  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ==========================================
     2. MOBILE HAMBURGER TOGGLE
     ========================================== */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================
     3. SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ==========================================
     4. INTERSECTION OBSERVER — ANIMATE ON SCROLL
     ========================================== */
  const animEls = document.querySelectorAll('.animate-on-scroll');

  if (animEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    animEls.forEach(el => el.classList.add('visible'));
  }

  /* ==========================================
     5. DROPDOWN KEYBOARD ACCESSIBILITY
     ========================================== */
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');

    if (!toggle || !menu) return;

    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-expanded', 'false');

    // Click
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Keyboard
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
          const firstItem = menu.querySelector('.nav-dropdown-item');
          if (firstItem) firstItem.focus();
        }
      }
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Close on Escape inside menu
    menu.querySelectorAll('.nav-dropdown-item').forEach(item => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          dropdown.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      });
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    dropdowns.forEach(d => {
      d.classList.remove('open');
      const t = d.querySelector('.nav-dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  /* ==========================================
     6. STAT COUNTER ANIMATION
     ========================================== */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el, target, duration) {
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutCubic(progress) * target);
      el.textContent = prefix + value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-counter]');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          animateCounter(el, target, 1500);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* ==========================================
     7. CONTACT FORM VALIDATION
     ========================================== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const successMsg = document.getElementById('form-success');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, msg) {
      input.classList.add('error');
      const errEl = input.parentElement.querySelector('.form-error');
      if (errEl) {
        errEl.textContent = msg;
        errEl.classList.add('visible');
      }
    }

    function clearError(input) {
      input.classList.remove('error');
      const errEl = input.parentElement.querySelector('.form-error');
      if (errEl) errEl.classList.remove('visible');
    }

    // Live validation on blur
    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('blur', () => {
        if (input.required && !input.value.trim()) {
          showError(input, 'This field is required.');
        } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
          showError(input, 'Please enter a valid email address.');
        } else {
          clearError(input);
        }
      });
      input.addEventListener('input', () => clearError(input));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      contactForm.querySelectorAll('.form-control[required]').forEach(input => {
        if (!input.value.trim()) {
          showError(input, 'This field is required.');
          valid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          showError(input, 'Please enter a valid email address.');
          valid = false;
        }
      });

      if (valid) {
        contactForm.style.display = 'none';
        if (successMsg) {
          successMsg.classList.add('visible');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  /* ==========================================
     8. ACTIVE NAV LINK HIGHLIGHTING
     ========================================== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* ==========================================
     9. FAQ ACCORDION
     ========================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.setAttribute('aria-expanded', 'false');
    const answerId = 'faq-ans-' + Math.random().toString(36).substr(2, 9);
    answer.id = answerId;
    question.setAttribute('aria-controls', answerId);

    question.addEventListener('click', () => {
      const isOpen = question.classList.contains('open');

      // Close all
      faqItems.forEach(otherItem => {
        const otherQ = otherItem.querySelector('.faq-question');
        const otherA = otherItem.querySelector('.faq-answer');
        if (otherQ && otherA) {
          otherQ.classList.remove('open');
          otherA.style.maxHeight = '0';
          otherQ.setAttribute('aria-expanded', 'false');
        }
      });

      // Open clicked if it was closed
      if (!isOpen) {
        question.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });

    question.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  /* ==========================================
     10. APPLICATION FORM (CAREERS)
     ========================================== */
  const applicationForm = document.getElementById('application-form');

  if (applicationForm) {
    const appSuccess = document.getElementById('application-success');

    applicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applicationForm.style.display = 'none';
      if (appSuccess) {
        appSuccess.classList.add('visible');
      }
    });

    // File input label update
    const fileInput = applicationForm.querySelector('input[type="file"]');
    const fileDisplay = applicationForm.querySelector('.file-name-display');
    if (fileInput && fileDisplay) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
          fileDisplay.textContent = fileInput.files[0].name;
        }
      });
    }
  }

});
