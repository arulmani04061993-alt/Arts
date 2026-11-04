/**
 * STACKLY — Art & Design Institute
 * Lenis Smooth Scrolling, GSAP & ScrollTrigger Master Motion Design
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize Lenis Smooth Scroll if library is loaded
  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
      infinite: false
    });

    window.lenis = lenis;

    // Connect Lenis scroll event to GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);

      // Bind Lenis animation frame with GSAP ticker for flawless sync
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Refresh Lenis and ScrollTrigger after dynamic components and preloader finish
    window.addEventListener('load', () => {
      setTimeout(() => {
        lenis.resize();
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 500);
    });

    // Anchor links smooth navigation via Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -90, duration: 1.3 });
          }
        }
      });
    });
  }

  // Check if GSAP is available
  if (typeof gsap === 'undefined') return;

  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (prefersReducedMotion) {
    console.log('Reduced motion preferred: Skipping intense GSAP animations.');
    return;
  }

  // 1. Hero Entrance Timeline (Triggered after preloader)
  window.triggerHeroAnimations = function() {
    const heroTitle = document.querySelector('.hero-editorial-title');
    const heroSubtitle = document.querySelector('.hero-editorial-subtitle');
    const heroCtas = document.querySelector('.hero-cta-group');
    const heroImgBox = document.querySelector('.hero-main-img-box');
    const heroFloatingCards = document.querySelectorAll('.floating-hero-card');

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (heroTitle) {
      heroTl.fromTo(heroTitle, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.1 }
      );
    }

    if (heroSubtitle) {
      heroTl.fromTo(heroSubtitle, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.9 }, 
        '-=0.7'
      );
    }

    if (heroCtas) {
      heroTl.fromTo(heroCtas, 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        '-=0.6'
      );
    }

    if (heroImgBox) {
      heroTl.fromTo(heroImgBox,
        { scale: 0.94, opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' },
        { scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.out' },
        '-=0.9'
      );
    }

    if (heroFloatingCards.length > 0) {
      heroTl.fromTo(heroFloatingCards,
        { y: 30, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' },
        '-=0.5'
      );
    }
  };

  // 2. Desktop Mouse Parallax for Floating Hero Cards
  const heroSection = document.querySelector('.hero-editorial');
  const floatingCards = document.querySelectorAll('.floating-hero-card');
  if (heroSection && floatingCards.length > 0 && window.innerWidth > 991) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (clientY / window.innerHeight - 0.5) * 2;

      floatingCards.forEach((card, index) => {
        const factor = (index + 1) * 12;
        gsap.to(card, {
          x: xPercent * factor,
          y: yPercent * factor,
          duration: 0.6,
          ease: 'power1.out'
        });
      });
    });
  }

  // 3. ScrollTrigger Counter Animation for Stats
  if (typeof ScrollTrigger !== 'undefined') {
    const statCounters = document.querySelectorAll('.stat-counter-num');
    statCounters.forEach(counter => {
      const targetVal = parseInt(counter.getAttribute('data-count') || counter.innerText.replace(/[^0-9]/g, ''), 10);
      const suffix = counter.getAttribute('data-suffix') || '+';

      if (!isNaN(targetVal)) {
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(counter, 
              { innerText: 0 }, 
              { 
                innerText: targetVal, 
                duration: 2.2, 
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function() {
                  counter.innerText = Math.floor(counter.innerText) + suffix;
                }
              }
            );
          }
        });
      }
    });

    // 4. Scroll-Triggered Subtle Scale for Section Images
    const scaleImages = document.querySelectorAll('.scroll-scale-img');
    scaleImages.forEach(img => {
      gsap.fromTo(img,
        { scale: 1 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );
    });

    // 5. Scroll-Triggered Entrance for Staggered Cards
    const cardGrids = document.querySelectorAll('.stagger-card-grid');
    cardGrids.forEach(grid => {
      const cards = grid.querySelectorAll('.stagger-card-item');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 82%',
              once: true
            }
          }
        );
      }
    });
  }
});
