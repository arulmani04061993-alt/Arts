/**
 * STACKLY — Art & Design Institute
 * Dynamic Component Loader (Navbar & Footer) with Zero-Fail Fallbacks
 */

const NAVBAR_HTML_FALLBACK = `
<div class="stackly-fixed-header" id="stackly-fixed-header">
<div class="announcement-bar d-none d-md-block">
  <div class="container d-flex justify-content-between align-items-center">
    <div>
      <span class="badge-accent">Admissions Open 2026</span>
      <span>Fall Cohort Applications Now Open. Portfolio Reviews Scheduled Weekly.</span>
    </div>
    <div>
      <a href="admissions.html">Apply For Scholarship <i class="bi bi-arrow-right"></i></a>
    </div>
  </div>
</div>
<header class="stackly-navbar">
  <div class="container d-flex align-items-center justify-content-between">
    <a href="index.html" class="navbar-brand-stackly" aria-label="STACKLY Art & Design Institute Home">
      <img src="assets/images/logo.webp" alt="STACKLY Institute" class="navbar-brand-logo" width="160" height="47">
    </a>
    <nav class="stackly-nav-center d-none d-lg-block" aria-label="Main Navigation">
      <ul class="stackly-nav-list">
        <li class="stackly-nav-item"><a href="index.html" class="stackly-nav-link">Home</a></li>
        <li class="stackly-nav-item"><a href="about.html" class="stackly-nav-link">About Us</a></li>
        <li class="stackly-nav-item stackly-dropdown">
          <a href="javascript:void(0);" class="stackly-nav-link stackly-dropdown-trigger" role="button" aria-haspopup="true" aria-expanded="false">Services <i class="bi bi-chevron-down" style="font-size: 0.75rem;"></i></a>
          <div class="stackly-dropdown-menu">
            <a href="service-details.html?service=graphic-design" class="dropdown-item-custom">Graphic Design <i class="bi bi-arrow-right"></i></a>
            <a href="service-details.html?service=ui-ux-design" class="dropdown-item-custom">UI/UX Design <i class="bi bi-arrow-right"></i></a>
            <a href="service-details.html?service=branding-identity" class="dropdown-item-custom">Branding & Identity <i class="bi bi-arrow-right"></i></a>
            <a href="service-details.html?service=digital-illustration" class="dropdown-item-custom">Digital Illustration <i class="bi bi-arrow-right"></i></a>
            <a href="service-details.html?service=motion-graphics" class="dropdown-item-custom">Motion Graphics <i class="bi bi-arrow-right"></i></a>
            <a href="service-details.html?service=web-design" class="dropdown-item-custom">Web Design <i class="bi bi-arrow-right"></i></a>
          </div>
        </li>
        <li class="stackly-nav-item"><a href="blog.html" class="stackly-nav-link">Blog</a></li>
        <li class="stackly-nav-item"><a href="contact.html" class="stackly-nav-link">Contact</a></li>
        <li class="stackly-nav-item"><a href="admissions.html" class="stackly-nav-link admission-highlight">Admission <span class="badge-pill-mini">2026</span></a></li>
      </ul>
    </nav>
    <div class="stackly-nav-actions">
      <a href="login.html" class="nav-login-link">Login</a>
      <a href="signup.html" class="btn-custom btn-coral d-none d-lg-inline-flex">Sign Up</a>
      <button class="mobile-nav-toggle d-lg-none" aria-label="Toggle navigation menu"><i class="bi bi-list"></i></button>
    </div>
  </div>
</header>
</div>
<div class="mobile-drawer-overlay"></div>
<div class="stackly-mobile-drawer">
  <div class="mobile-drawer-header">
    <a href="index.html" class="navbar-brand-stackly">
      <img src="assets/images/logo.webp" alt="STACKLY Institute" class="navbar-brand-logo" width="145" height="42">
    </a>
    <button class="mobile-close-btn" aria-label="Close menu">&times;</button>
  </div>
  <ul class="mobile-nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About Us</a></li>
    <li class="mobile-has-dropdown">
      <a href="javascript:void(0);" class="mobile-dropdown-toggle d-flex justify-content-between align-items-center">Services <i class="bi bi-chevron-down"></i></a>
      <ul class="mobile-submenu">
        <li><a href="service-details.html?service=graphic-design">Graphic Design</a></li>
        <li><a href="service-details.html?service=ui-ux-design">UI/UX Design</a></li>
        <li><a href="service-details.html?service=branding-identity">Branding & Identity</a></li>
        <li><a href="service-details.html?service=digital-illustration">Digital Illustration</a></li>
        <li><a href="service-details.html?service=motion-graphics">Motion Graphics</a></li>
        <li><a href="service-details.html?service=web-design">Web Design</a></li>
      </ul>
    </li>
    <li><a href="blog.html">Blog</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="admissions.html" class="text-coral">Admission 2026</a></li>
  </ul>
  <div class="mt-4 pt-3 border-top border-secondary">
    <a href="login.html" class="btn-custom btn-outline-ivory w-100 mb-2">Login</a>
    <a href="signup.html" class="btn-custom btn-coral w-100">Sign Up</a>
  </div>
</div>
`;

const FOOTER_HTML_FALLBACK = `
<footer class="stackly-footer-ref">
  <div class="container">
    <div class="row g-4 align-items-start justify-content-between footer-ref-row">
      
      <!-- Col 1: Brand Logo, Description & Circular Socials -->
      <div class="col-lg-3 col-md-6 footer-ref-col">
        <div class="footer-ref-brand mb-3">
          <a href="index.html" class="footer-brand-ref-link" aria-label="STACKLY Home">
            <svg class="footer-ref-logo-icon" width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3C10.5 3 6 7.5 6 13c0 3.2 1.5 6 3.8 7.8 1.2-1.4 1.8-3.2 1.8-5 0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2.1l2.8-2.8C23.1 4.7 19.7 3 16 3z" fill="#0C1F2E"/>
              <path d="M16 29c5.5 0 10-4.5 10-10 0-3.2-1.5-6-3.8-7.8-1.2 1.4-1.8 3.2-1.8 5 0 3.3-2.7 6-6 6-1.8 0-3.4-.8-4.5-2.1l-2.8 2.8C8.9 27.3 12.3 29 16 29z" fill="#0C1F2E"/>
            </svg>
            <span class="footer-ref-brand-text">STACKLY</span>
          </a>
        </div>
        <p class="footer-ref-desc">
          Inspiring the next generation of creative thinkers, visual artists, and design innovators through world-class studio education.
        </p>
        <div class="footer-ref-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener" class="footer-ref-social-btn" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener" class="footer-ref-social-btn" aria-label="X"><i class="bi bi-twitter-x"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener" class="footer-ref-social-btn" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" class="footer-ref-social-btn" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          <a href="https://youtube.com" target="_blank" rel="noopener" class="footer-ref-social-btn" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
        </div>
      </div>

      <!-- Col 2: Company Links -->
      <div class="col-lg-2 col-md-3 col-6 footer-ref-col">
        <h4 class="footer-ref-heading">Company</h4>
        <ul class="footer-ref-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="faculty.html">Faculty</a></li>
          <li><a href="student-portfolio.html">Portfolio</a></li>
          <li><a href="blog.html">Blogs</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>

      <!-- Col 3: Services / Programs Links -->
      <div class="col-lg-2 col-md-3 col-6 footer-ref-col">
        <h4 class="footer-ref-heading">Services</h4>
        <ul class="footer-ref-links">
          <li><a href="service-details.html?service=graphic-design">Graphic Design</a></li>
          <li><a href="service-details.html?service=ui-ux-design">UI/UX Design</a></li>
          <li><a href="service-details.html?service=branding-identity">Branding</a></li>
          <li><a href="service-details.html?service=motion-graphics">Motion Graphics</a></li>
          <li><a href="admissions.html">Admissions</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="faq.html">FAQ</a></li>
        </ul>
      </div>

      <!-- Col 4: Stay Updated Newsletter -->
      <div class="col-lg-4 col-md-6 footer-ref-col">
        <h4 class="footer-ref-heading">Stay Updated</h4>
        <p class="footer-ref-desc mb-3">
          Subscribe to our newsletter for the latest design updates, creative advice, and studio tips.
        </p>
        <form class="footer-ref-form" id="footer-newsletter-form" autocomplete="off" novalidate>
          <div class="footer-ref-form-row">
            <input type="email" class="footer-ref-input" id="footer-newsletter-email" placeholder="Email Address" autocomplete="off" required>
            <button type="submit" class="footer-ref-submit-btn">Subscribe</button>
          </div>
          <div class="form-feedback-message mt-2 small" id="footer-newsletter-msg"></div>
        </form>
      </div>

    </div>

    <!-- Centered Bottom Copyright with Subtle Divider -->
    <div class="footer-ref-bottom">
      <p class="mb-0">&copy; 2026 STACKLY. All Rights Reserved.</p>
    </div>
  </div>
</footer>

<!-- Lightbox Modal Container for Portfolios and Galleries -->
<div class="stackly-lightbox" id="stackly-lightbox" role="dialog" aria-modal="true" aria-hidden="true">
  <button class="lightbox-close-btn" id="lightbox-close-btn" aria-label="Close image lightbox">&times;</button>
  <div class="lightbox-content-box">
    <img src="" alt="" id="lightbox-img">
    <div class="lightbox-caption" id="lightbox-caption"></div>
  </div>
</div>

<!-- Back to Top Button -->
<button id="back-to-top" aria-label="Scroll back to top">
  <i class="bi bi-arrow-up"></i>
</button>
`;

async function loadComponents() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  // Load Navbar
  if (navbarPlaceholder) {
    try {
      const resp = await fetch('navbar.html');
      if (resp.ok) {
        navbarPlaceholder.innerHTML = await resp.text();
      } else {
        navbarPlaceholder.innerHTML = NAVBAR_HTML_FALLBACK;
      }
    } catch (e) {
      navbarPlaceholder.innerHTML = NAVBAR_HTML_FALLBACK;
    }
    if (typeof initNavbar === 'function') {
      initNavbar();
    }
  }

  // Load Footer
  if (footerPlaceholder) {
    try {
      const resp = await fetch('footer.html');
      if (resp.ok) {
        footerPlaceholder.innerHTML = await resp.text();
      } else {
        footerPlaceholder.innerHTML = FOOTER_HTML_FALLBACK;
      }
    } catch (e) {
      footerPlaceholder.innerHTML = FOOTER_HTML_FALLBACK;
    }
    initFooterFeatures();
  }

  // Refresh AOS after DOM elements are in place
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

function initFooterFeatures() {
  // 1. Back to top buttons (both floating button and bottom bar trigger)
  const backToTopBtn = document.getElementById('back-to-top');
  const footerScrollBtn = document.getElementById('footer-scroll-top-btn');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', scrollToTop);
  }

  if (footerScrollBtn) {
    footerScrollBtn.addEventListener('click', scrollToTop);
  }

  // 2. Real-time Live Atelier Clock (Updates every second)
  function updateAtelierClock() {
    const clockEl = document.getElementById('footer-live-time');
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
    }
  }
  updateAtelierClock();
  setInterval(updateAtelierClock, 1000);

  // 3. Interactive Copy Address to Clipboard with Animated Feedback
  const copyBtn = document.getElementById('btn-copy-address');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const addressText = document.getElementById('footer-address-text')?.textContent || '42 Creative Quarter, Art & Tech District';
      navigator.clipboard.writeText(addressText).then(() => {
        const originalContent = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="bi bi-check2 me-1"></i> Copied!';
        copyBtn.classList.add('copied');
        copyBtn.style.backgroundColor = '#2ed573';
        copyBtn.style.borderColor = '#2ed573';
        copyBtn.style.color = '#000';

        setTimeout(() => {
          copyBtn.innerHTML = originalContent;
          copyBtn.classList.remove('copied');
          copyBtn.style.backgroundColor = '';
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      }).catch(() => {
        alert('Address: 42 Creative Quarter, Art & Tech District');
      });
    });
  }

  // 4. Lightbox close button & overlay click
  const lightbox = document.getElementById('stackly-lightbox');
  const closeBtn = document.getElementById('lightbox-close-btn');
  if (lightbox) {
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });
    }
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
      }
    });
  }

  // 5. Footer newsletter form handler with premium feedback
  const newsletterForm = document.getElementById('footer-newsletter-form');
  const newsletterMsg = document.getElementById('footer-newsletter-msg');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('footer-newsletter-email');
      if (input && input.value.trim() && input.checkValidity()) {
        newsletterForm.reset();
        input.value = '';
        window.location.href = '404.html';
      } else {
        newsletterMsg.innerHTML = '<span class="text-danger"><i class="bi bi-exclamation-circle-fill"></i> Please enter a valid email address.</span>';
      }
    });
  }
}

// Reset form inputs (newsletter email, contact form, admissions form etc.) when returning back via browser history or bfcache
window.addEventListener('pageshow', function () {
  document.querySelectorAll('#footer-newsletter-form, #blog-newsletter-form, #stackly-contact-form, #stackly-admission-form, form.footer-ref-form').forEach(form => {
    form.reset();
  });
  document.querySelectorAll('#footer-newsletter-email, #blog-newsletter-email, #contact-name, #contact-email, #contact-message, #contact-phone, #app-fullname, #app-email, #app-phone, #app-portfolio-link, #app-statement, input[type="email"]').forEach(input => {
    input.value = '';
    input.classList.remove('is-invalid');
  });
  const contactFeedback = document.getElementById('contact-feedback-alert');
  if (contactFeedback) contactFeedback.classList.add('d-none');
  const admissionFeedback = document.getElementById('admission-feedback-alert');
  if (admissionFeedback) admissionFeedback.classList.add('d-none');
});

document.addEventListener('DOMContentLoaded', loadComponents);

