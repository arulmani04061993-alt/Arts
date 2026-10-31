/**
 * STACKLY — Art & Design Institute
 * Navbar & Mobile Navigation Controller
 */

function initNavbar() {
  const navbar = document.querySelector('.stackly-navbar');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.stackly-mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-drawer-overlay');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');

  // Fixed navbar & announcement bar transition on scroll
  if (navbar) {
    const handleScroll = () => {
      const announcement = document.querySelector('.announcement-bar');
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
        if (announcement) announcement.classList.add('announcement-hidden');
      } else {
        navbar.classList.remove('scrolled');
        if (announcement) announcement.classList.remove('announcement-hidden');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Open mobile drawer
  if (mobileToggle && mobileDrawer && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeMobileMenu = () => {
      mobileDrawer.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // Mobile submenu accordion toggles
  const mobileDropdowns = document.querySelectorAll('.mobile-has-dropdown');
  mobileDropdowns.forEach(item => {
    const link = item.querySelector('.mobile-dropdown-toggle');
    const submenu = item.querySelector('.mobile-submenu');
    if (link && submenu) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        submenu.classList.toggle('open');
        const icon = link.querySelector('i');
        if (icon) {
          icon.classList.toggle('bi-chevron-down');
          icon.classList.toggle('bi-chevron-up');
        }
      });
    }
  });

  // Set active link in navbar
  highlightActiveNav();
}

function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.stackly-nav-link, .mobile-nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop().split('?')[0];
    if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // If navbar is already directly in DOM
  if (document.querySelector('.stackly-navbar')) {
    initNavbar();
  }
});
