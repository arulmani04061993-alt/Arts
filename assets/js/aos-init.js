/**
 * STACKLY — Art & Design Institute
 * AOS (Animate on Scroll) Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 50
    });
  }
});
