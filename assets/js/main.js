/**
 * STACKLY — Art & Design Institute
 * Main Controller: Filtering, Dynamic Query Handlers, Lightbox, & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================================
  // 1. LIGHTBOX CONTROLLER
  // ===================================================================
  const lightbox = document.getElementById('stackly-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  document.querySelectorAll('[data-lightbox-src]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = el.getAttribute('data-lightbox-src');
      const caption = el.getAttribute('data-lightbox-caption') || '';

      if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
      }
    });
  });

  // ===================================================================
  // 2. CLIENT-SIDE FILTERING (COURSES, PORTFOLIO, BLOG, GALLERY)
  // ===================================================================
  function setupFiltering(containerSelector, itemSelector, filterBtnsSelector, searchInputSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    const filterBtns = document.querySelectorAll(filterBtnsSelector);
    const searchInput = document.querySelector(searchInputSelector);

    let activeFilter = 'all';
    let searchQuery = '';

    function filterItems() {
      let visibleCount = 0;
      items.forEach(item => {
        const category = (item.getAttribute('data-category') || '').toLowerCase();
        const textContent = item.textContent.toLowerCase();

        const matchesCategory = (activeFilter === 'all' || category.includes(activeFilter.toLowerCase()));
        const matchesSearch = (!searchQuery || textContent.includes(searchQuery.toLowerCase()));

        if (matchesCategory && matchesSearch) {
          item.style.display = '';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      const noResultsMsg = document.querySelector(containerSelector + '-no-results');
      if (noResultsMsg) {
        noResultsMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        filterItems();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        filterItems();
      });
    }
  }

  // Initialize Courses Filter
  setupFiltering('#courses-grid', '.course-filter-item', '.course-filter-btn', '#courses-search-input');

  // Initialize Portfolio Filter
  setupFiltering('#portfolio-grid', '.portfolio-filter-item', '.portfolio-filter-btn', '#portfolio-search-input');

  // Initialize Blog Filter
  setupFiltering('#blog-grid', '.blog-filter-item', '.blog-filter-btn', '#blog-search-input');

  // ===================================================================
  // 3. DYNAMIC QUERY STRING PARSERS
  // ===================================================================
  const urlParams = new URLSearchParams(window.location.search);

  // A. COURSE DETAILS LOADER
  const courseParam = urlParams.get('course');
  const courseDetailsHero = document.getElementById('course-details-title');
  if (courseDetailsHero) {
    const courseData = {
      'graphic-design': {
        title: 'Graphic Design & Brand Architecture',
        category: 'Visual Communication',
        duration: '12 Months (Full-Time)',
        format: 'Studio + Digital Labs',
        desc: 'Master visual identity systems, modern typography, editorial layout, packaging design, and brand narrative through immersive creative briefs.',
        tools: 'Adobe Photoshop, Illustrator, InDesign, Figma, Glyphs, Risograph',
        image: 'assets/images/courses/course-graphic-design.webp'
      },
      'ui-ux-design': {
        title: 'UI/UX & Product Design Systems',
        category: 'Interaction Design',
        duration: '9 Months (Full-Time / Hybrid)',
        format: 'Digital Prototyping Lab',
        desc: 'Architect seamless digital experiences. Learn user research, wireframing, high-fidelity UI design systems, micro-interactions, and usability testing.',
        tools: 'Figma, Protopie, Framer, FigJam, Miro, Maze',
        image: 'assets/images/courses/course-ui-ux.webp'
      },
      'animation-motion': {
        title: 'Animation & Kinetic Motion Design',
        category: 'Motion Arts',
        duration: '12 Months (Studio)',
        format: 'Motion Capture & Visual Labs',
        desc: 'Bring static graphics to life with kinetic typography, 3D character animation, broadcast branding, and spatial motion design.',
        tools: 'After Effects, Cinema 4D, Blender, Premiere Pro, Houdini',
        image: 'assets/images/courses/course-motion-graphics.webp'
      },
      'photography': {
        title: 'Contemporary Studio & Editorial Photography',
        category: 'Visual Arts',
        duration: '6 Months (Studio Practice)',
        format: 'Darkroom & Lighting Studio',
        desc: 'Explore studio lighting, medium-format cameras, visual storytelling, commercial portraiture, and high-end digital retouching.',
        tools: 'Hasselblad, Sony Alpha, Capture One, Photoshop, Profoto Systems',
        image: 'assets/images/courses/course-photography.webp'
      },
      'interior-design': {
        title: 'Spatial & Interior Environmental Design',
        category: 'Spatial Design',
        duration: '12 Months (Studio)',
        format: 'Materials Library & Fabrication',
        desc: 'Design human-centered physical environments, hospitality spaces, lighting atmospheres, and sustainable architectural interiors.',
        tools: 'AutoCAD, SketchUp, Rhino, V-Ray, Enscape',
        image: 'assets/images/courses/course-interior-design.webp'
      },
      'fashion-design': {
        title: 'Avant-Garde Fashion & Textile Design',
        category: 'Fashion Arts',
        duration: '12 Months (Atelier)',
        format: 'Garment Studio & Draping Lab',
        desc: 'Pattern drafting, couture draping, sustainable textile exploration, collection development, and runway presentation.',
        tools: 'CLO 3D, Gerber Accumark, Industrial Sewing, Textile Looms',
        image: 'assets/images/courses/course-fashion-design.webp'
      },
      'digital-marketing': {
        title: 'Creative Brand Strategy & Digital Marketing',
        category: 'Brand Communications',
        duration: '6 Months (Hybrid)',
        format: 'Campaign Strategy Lab',
        desc: 'Learn high-converting creative direction, social storytelling, performance marketing, content strategy, and cultural brand positioning.',
        tools: 'Meta Ads Manager, Google Analytics, Semrush, Notion, Canva',
        image: 'assets/images/courses/course-digital-marketing.webp'
      }
    };

    const selectedCourse = courseData[courseParam] || courseData['graphic-design'];
    document.getElementById('course-details-title').textContent = selectedCourse.title;
    const catEl = document.getElementById('course-details-category');
    if (catEl) catEl.textContent = selectedCourse.category;
    const durEl = document.getElementById('course-details-duration');
    if (durEl) durEl.textContent = selectedCourse.duration;
    const formatEl = document.getElementById('course-details-format');
    if (formatEl) formatEl.textContent = selectedCourse.format;
    const descEl = document.getElementById('course-details-desc');
    if (descEl) descEl.textContent = selectedCourse.desc;
    const toolsEl = document.getElementById('course-details-tools');
    if (toolsEl) toolsEl.textContent = selectedCourse.tools;
    const imgEl = document.getElementById('course-details-img');
    if (imgEl) imgEl.src = selectedCourse.image;
  }

  // B. SERVICE DETAILS LOADER
  const serviceParam = urlParams.get('service');
  const serviceDetailsTitle = document.getElementById('service-details-title');
  if (serviceDetailsTitle) {
    const serviceData = {
      'graphic-design': {
        title: 'Graphic Design Studio & Consultation',
        desc: 'We provide specialized studio access, master mentorship, and creative production pipelines in typography, publication, and identity design.',
        tools: 'Adobe Creative Cloud, Risograph Printing, Letterpress',
        image: 'assets/images/courses/service-graphic.webp'
      },
      'ui-ux-design': {
        title: 'UI/UX Product Design & Usability Lab',
        desc: 'Our interactive digital lab offers usability testing, wireframe auditing, interface engineering, and enterprise design system consultation.',
        tools: 'Figma, UserZoom, Maze, React Prototype Sandbox',
        image: 'assets/images/courses/service-uiux.webp'
      },
      'branding-identity': {
        title: 'Brand Strategy & Visual Identity Studio',
        desc: 'End-to-end strategic naming, brand architecture, visual identity guideline creation, and cultural positioning audits.',
        tools: 'Brand Archetype Auditing, Type Design, Spatial Mockups',
        image: 'assets/images/courses/service-branding.webp'
      },
      'digital-illustration': {
        title: 'Digital Illustration & Concept Art Atelier',
        desc: 'Equipped with professional Wacom Cintiqs and Apple Pencil suites for editorial illustration, character design, and environment art.',
        tools: 'Procreate, Photoshop, Painter, Clip Studio',
        image: 'assets/images/courses/service-illustration.webp'
      },
      'motion-graphics': {
        title: 'Kinetic Motion Graphics & VFX Lab',
        desc: 'State-of-the-art motion capture studio and render farm for kinetic typography, broadcast graphics, and immersive visual experiments.',
        tools: 'Cinema 4D, Octane Render, After Effects, Redshift',
        image: 'assets/images/courses/service-motion.webp'
      },
      'web-design': {
        title: 'Creative Web Design & Front-End Architecture',
        desc: 'Bespoke editorial website crafting, interactive web art, creative dev workshops, and responsive design systems.',
        tools: 'HTML5, CSS3, GSAP, WebGL, Three.js, Figma',
        image: 'assets/images/courses/service-web.webp'
      }
    };

    const selectedService = serviceData[serviceParam] || serviceData['graphic-design'];
    serviceDetailsTitle.textContent = selectedService.title;
    const descEl = document.getElementById('service-details-desc');
    if (descEl) descEl.textContent = selectedService.desc;
    const toolsEl = document.getElementById('service-details-tools');
    if (toolsEl) toolsEl.textContent = selectedService.tools;
    const imgEl = document.getElementById('service-details-img');
    if (imgEl) imgEl.src = selectedService.image;
  }

  // ===================================================================
  // 4. PRICING BILLING CYCLE TOGGLE
  // ===================================================================
  const pricingToggle = document.getElementById('pricing-period-toggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isAnnual = pricingToggle.checked;
      document.querySelectorAll('.pricing-price-val').forEach(el => {
        const monthly = el.getAttribute('data-monthly');
        const annual = el.getAttribute('data-annual');
        el.textContent = isAnnual ? annual : monthly;
      });
      document.querySelectorAll('.pricing-period').forEach(el => {
        el.textContent = isAnnual ? '/ year (Save 20%)' : '/ term';
      });
    });
  }

});
