/**
 * STACKLY — Art & Design Institute
 * Global Preloader Implementation (Exactly ~2 Seconds Duration)
 */

document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('global-preloader');
  if (!preloader) return;

  const progressBar = document.querySelector('.preloader-progress-bar');
  const percentText = document.querySelector('.preloader-percent');

  const startTime = performance.now();
  const totalDuration = 2000; // Exactly 2.0 seconds

  // Animate progress percentage smoothly
  function updateProgress(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / totalDuration, 1);
    const percent = Math.floor(progress * 100);

    if (progressBar) progressBar.style.width = percent + '%';
    if (percentText) percentText.textContent = percent + '%';

    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      finishPreloader();
    }
  }

  requestAnimationFrame(updateProgress);

  function finishPreloader() {
    if (typeof gsap !== 'undefined') {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          preloader.style.display = 'none';
          document.body.classList.add('page-loaded');
          // Recalculate Lenis smooth scroll and ScrollTrigger offsets after preloader removal
          if (window.lenis) {
            window.lenis.resize();
          }
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
          // Trigger entry animations if available
          if (window.triggerHeroAnimations) {
            window.triggerHeroAnimations();
          }
        }
      });
    } else {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.4s ease';
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.add('page-loaded');
      }, 400);
    }
  }
});
