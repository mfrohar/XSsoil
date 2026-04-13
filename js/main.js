'use strict';

/* ============================================
   XS SOIL SOLUTIONS — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     INIT: NAV SOCIAL ICONS
     ========================================== */
  const navActions = document.querySelector('.nav-actions');
  if (navActions) {
    const socialIcons = document.createElement('div');
    socialIcons.classList.add('nav-social');
    socialIcons.setAttribute('aria-label', 'Social links');
    socialIcons.innerHTML = `
      <a href="https://www.linkedin.com/company/xs-soil-solutions" target="_blank" rel="noopener" aria-label="LinkedIn" class="nav-social-link">
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      </a>
      <a href="mailto:info@xssoil.ca" aria-label="Email us" class="nav-social-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="15" height="15">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
      <a href="tel:9053341197" aria-label="Call us" class="nav-social-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="15" height="15">
          <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17z"/>
        </svg>
      </a>
    `;
    navActions.insertBefore(socialIcons, navActions.firstChild);
  }

  const mobileMenuEl = document.querySelector('.nav-mobile-menu');
  if (mobileMenuEl) {
    // Inject overlay logo (top-left, absolute)
    const overlayLogo = document.createElement('a');
    overlayLogo.href = 'index.html';
    overlayLogo.className = 'nav-overlay-logo';
    overlayLogo.setAttribute('aria-label', 'XS Soil Solutions home');
    overlayLogo.innerHTML = `<img src="assets/XS-Soil-Logo.png" alt="XS Soil Solutions" width="160" height="41">`;
    mobileMenuEl.insertBefore(overlayLogo, mobileMenuEl.firstChild);

    // Inject close button (top-right, absolute)
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-overlay-close';
    closeBtn.setAttribute('aria-label', 'Close navigation menu');
    closeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="28" height="28">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>`;
    mobileMenuEl.insertBefore(closeBtn, mobileMenuEl.firstChild);

    // Inject social links at the bottom of the overlay
    const mobileSocial = document.createElement('div');
    mobileSocial.classList.add('nav-mobile-social');
    mobileSocial.innerHTML = `
      <a href="https://www.linkedin.com/company/xs-soil-solutions" target="_blank" rel="noopener" aria-label="LinkedIn" class="nav-mobile-social-link">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
        LinkedIn
      </a>
      <a href="mailto:info@xssoil.ca" aria-label="Email us" class="nav-mobile-social-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="14" height="14">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        info@xssoil.ca
      </a>
      <a href="tel:9053341197" aria-label="Call us" class="nav-mobile-social-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="14" height="14">
          <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17z"/>
        </svg>
        905-334-1197
      </a>
    `;
    mobileMenuEl.appendChild(mobileSocial);

    // Set stagger animation delays on top-level nav items
    const staggerItems = mobileMenuEl.querySelectorAll(
      '.nav-mobile-link:not(.nav-mobile-sublink), .nav-mobile-dropdown'
    );
    staggerItems.forEach((item, i) => {
      item.style.setProperty('--stagger-delay', `${0.06 + i * 0.07}s`);
    });
  }

  /* ==========================================
     1. NAV SCROLL BEHAVIOUR
     ========================================== */
  const nav = document.querySelector('.nav');

  function handleNavScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ==========================================
     2. MOBILE HAMBURGER TOGGLE
     ========================================== */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  function closeOverlay() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close button (injected above)
    const overlayClose = mobileMenu.querySelector('.nav-overlay-close');
    if (overlayClose) overlayClose.addEventListener('click', closeOverlay);

    // Close on nav link click — skip dropdown toggles (they expand sub-items)
    mobileMenu.querySelectorAll('a:not(.nav-mobile-dropdown-toggle)').forEach(link => {
      link.addEventListener('click', closeOverlay);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeOverlay();
    });
  }

  /* ==========================================
     2.5. NAVIGATION DROPDOWN TOGGLES
     ========================================== */
  const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Close all other dropdowns
      dropdownToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.setAttribute('aria-expanded', 'false');
        }
      });
      
      // For anchor tags (like Services), allow navigation on click
      // For buttons (like About), toggle dropdown
      if (toggle.tagName === 'BUTTON') {
        e.preventDefault();
        toggle.setAttribute('aria-expanded', String(!isExpanded));
      } else {
        // For anchor tags, toggle dropdown and allow navigation
        toggle.setAttribute('aria-expanded', String(!isExpanded));
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    dropdownToggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Mobile dropdown toggles
  const mobileDropdownToggles = document.querySelectorAll('.nav-mobile-dropdown-toggle');
  
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      if (!isExpanded) {
        e.preventDefault(); // First click: expand sub-items, don't navigate
        toggle.setAttribute('aria-expanded', 'true');
      }
      // Second click: already expanded — let navigation happen naturally
    });
  });

  /* ==========================================
     3. SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

  /* ==========================================
     5. STAT COUNTER ANIMATION
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
          animateCounter(el, parseInt(el.dataset.counter, 10), 1500);
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
      if (errEl) { errEl.textContent = msg; errEl.classList.add('visible'); }
    }

    function clearError(input) {
      input.classList.remove('error');
      const errEl = input.parentElement.querySelector('.form-error');
      if (errEl) errEl.classList.remove('visible');
    }

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
        if (!input.value.trim()) { showError(input, 'This field is required.'); valid = false; }
        else if (input.type === 'email' && !validateEmail(input.value)) { showError(input, 'Please enter a valid email address.'); valid = false; }
      });
      if (valid) {
        contactForm.style.display = 'none';
        if (successMsg) { successMsg.classList.add('visible'); successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
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
      faqItems.forEach(otherItem => {
        const otherQ = otherItem.querySelector('.faq-question');
        const otherA = otherItem.querySelector('.faq-answer');
        if (otherQ && otherA) {
          otherQ.classList.remove('open');
          otherA.style.maxHeight = '0';
          otherQ.setAttribute('aria-expanded', 'false');
        }
      });
      if (!isOpen) {
        question.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });

    question.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); question.click(); }
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
      if (appSuccess) appSuccess.classList.add('visible');
    });

    const fileInput = applicationForm.querySelector('input[type="file"]');
    const fileDisplay = applicationForm.querySelector('.file-name-display');
    if (fileInput && fileDisplay) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) fileDisplay.textContent = fileInput.files[0].name;
      });
    }
  }


  /* ==========================================
     12. HERO LETTER ANIMATION
     ========================================== */
  (function initHeroLetterAnim() {
    const headline = document.querySelector('.hero .hero-headline');
    if (!headline) return;

    const rawHtml = headline.innerHTML;
    const segments = rawHtml.split(/(<br\s*\/?>)/gi);
    let delay = 100;
    let result = '';

    segments.forEach(seg => {
      if (/^<br/i.test(seg)) {
        result += seg;
      } else {
        const words = seg.split(' ');
        words.forEach((word, wordIdx) => {
          if (wordIdx > 0) {
            result += `<span class="hero-letter-space">&nbsp;</span>`;
          }
          if (word.length > 0) {
            result += `<span style="display:inline-block;white-space:nowrap">`;
            for (const ch of word) {
              result += `<span class="hero-letter" style="animation-delay:${delay}ms">${ch}</span>`;
              delay += 38;
            }
            result += `</span>`;
          }
        });
      }
    });

    headline.innerHTML = result;
  })();


});
