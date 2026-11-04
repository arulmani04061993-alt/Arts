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
        breadcrumb: 'Graphic Design',
        title: 'Graphic Design Studio & Consultation',
        desc: 'Specialized studio access, master mentorship, and creative production pipelines in grid formulation, editorial publication, and tactile print packaging.',
        image: 'assets/images/courses/service-graphic.webp',
        secondaryImg: 'assets/images/services/showcase-graphic.webp',
        badge: 'Editorial & Print Artifact',
        overview: 'Our graphic design ateliers balance Swiss rationalism with bold experimental typography. Students and brand partners dissect grid structures, master prepress separations, and craft monograph publications using state-of-the-art print machinery.',
        tools: 'Adobe InDesign, Illustrator, Glyphs 3, Risograph MZ790, Heidelberg Letterpress',
        specs: 'Equipped with precision color-calibrated proofing monitors, spot ink mixing labs, and binding presses suitable for museum-grade monograph editions.',
        metric1: '100%',
        metricLabel1: 'Press Calibrated',
        metric2: '1:8',
        metricLabel2: 'Master Mentorship',
        metric3: '24/7',
        metricLabel3: 'Studio Access',
        format: 'Physical Atelier & Lab',
        mentor: 'Senior Publication Director',
        access: 'Letterpress & Risograph Hub',
        cert: 'STACKLY Graphic Master Badge',
        deliverables: [
          'Complete editorial publication or identity system ready for commercial agency review',
          'Rigorous mastery of spot color separations, tactile substrates, and prepress standards',
          'Comprehensive case study documentation tracing iterations, micro-typography, and grid rationale'
        ],
        faqQ1: 'Can students access the letterpress and screen printing rollers outside class?',
        faqA1: 'Yes, enrolled atelier candidates enjoy 24/7 studio badge access with scheduled technician supervision during active pressing hours.',
        faqQ2: 'Are specialized paper stocks and spot inks provided?',
        faqA2: 'Yes, our inventory houses imported European cotton stocks, metallic inks, and custom binding tapes at subsidized academic rates.'
      },
      'ui-ux-design': {
        breadcrumb: 'UI/UX Design',
        title: 'UI/UX Product Design & Usability Lab',
        desc: 'Frontier interaction design atelier providing usability biometric eye-tracking, high-fidelity micro-interaction prototyping, and scalable design token architecture.',
        image: 'assets/images/courses/service-uiux.webp',
        secondaryImg: 'assets/images/services/showcase-uiux.webp',
        badge: 'Design System & Mobile Artifact',
        overview: 'Moving far beyond superficial Dribbble mockups, our UI/UX atelier approaches software as living behavioral architecture. Projects are stress-tested against cognitive load benchmarks, WCAG 2.2 accessibility, and multi-platform component tokens.',
        tools: 'Figma Enterprise, Protopie Studio, Maze Analytics, React, Storybook',
        specs: 'Dedicated testing suites equipped with Tobii eye-trackers, device device testbeds (iOS, Android, VisionOS), and real-time biometric feedback rigs.',
        metric1: 'WCAG AAA',
        metricLabel1: 'Accessibility Rigor',
        metric2: '99.4%',
        metricLabel2: 'Usability Score',
        metric3: '48 Hrs',
        metricLabel3: 'Prototype Sprint',
        format: 'Hybrid Digital Studio',
        mentor: 'Principal Product Architect',
        access: 'Biometric Usability Lab',
        cert: 'STACKLY UI/UX Systems Credential',
        deliverables: [
          'Production-ready Figma component library with synchronized design tokens and variants',
          'Usability testing report complete with eye-tracking heatmaps and cognitive task completion rates',
          'Interactive functional prototype in Protopie demonstrating spatial transitions and haptics'
        ],
        faqQ1: 'Do you cover handoff to engineers and developer tokens?',
        faqA1: 'Yes, all projects culminate in token pipeline handoff utilizing Storybook, JSON schema exports, and direct developer inspect workflows.',
        faqQ2: 'Can we conduct usability sessions with real external participants?',
        faqA2: 'Our research lab maintains a curated participant panel across Salem and remote cohorts for monitored unmoderated and moderated tests.'
      },
      'branding-identity': {
        breadcrumb: 'Branding & Identity',
        title: 'Brand Strategy & Visual Identity Studio',
        desc: 'End-to-end strategic brand positioning, architectural nomenclature, kinetic logomarks, and comprehensive design governance systems.',
        image: 'assets/images/courses/service-branding.webp',
        secondaryImg: 'assets/images/services/showcase-branding.webp',
        badge: 'Comprehensive Identity System',
        overview: 'We treat branding as a dynamic cultural dialogue rather than an isolated logo design exercise. Our atelier guides creators through anthropological research, competitive white-space auditing, sensory identity, and modular design guidelines.',
        tools: 'Type Design Software, Adobe Creative Suite, Cinema 4D, Brand Guidelines Sandbox',
        specs: 'Full-scale spatial mockups, outdoor digital billboard test renders, and sensory packaging material fabrication suites.',
        metric1: '360°',
        metricLabel1: 'Brand Touchpoints',
        metric2: '1:8',
        metricLabel2: 'Mentor Critiques',
        metric3: '100%',
        metricLabel3: 'Commercial Viability',
        format: 'Studio / Agency Brief',
        mentor: 'Global Creative Director',
        access: 'Packaging & Spatial Pavilion',
        cert: 'STACKLY Brand Strategist Award',
        deliverables: [
          'Full brand identity manual containing typography hierarchies, tone-of-voice, and color specs',
          'Suite of commercial collateral including bespoke packaging, stationery, and spatial signage',
          'Animated kinetic brand mark and sonic branding micro-interaction guidelines'
        ],
        faqQ1: 'Do we work with real brand briefs during the studio sessions?',
        faqA1: 'Yes, students and atelier fellows tackle both live agency partnership briefs and hypothetical sector-disrupting startup concepts.',
        faqQ2: 'Does this cover intellectual property and trademark checks?',
        faqA2: 'Basic trademark clearance methodologies, image rights vetting, and font licensing best practices are woven directly into every brief.'
      },
      'digital-illustration': {
        breadcrumb: 'Digital Illustration',
        title: 'Digital Illustration & Concept Art Atelier',
        desc: 'High-end digital painting workstations equipped with 27-inch 4K Wacom Cintiq Pro suites for editorial art, visual development, and worldbuilding.',
        image: 'assets/images/courses/service-illustration.webp',
        secondaryImg: 'assets/images/services/showcase-illustration.webp',
        badge: 'Concept Art & Matte Painting',
        overview: 'Bridging traditional oil painting fundamentals with modern digital speed, this atelier hones anatomy, dynamic lighting, color theory, and narrative atmosphere. From high-fashion editorial vignettes to game environment concept art.',
        tools: 'Wacom Cintiq Pro 27, Apple iPad Pro, Photoshop, Procreate, Clip Studio Paint EX',
        specs: 'Dedicated digital darkroom suites with 100% Adobe RGB calibrated displays and true-color proof printing presses.',
        metric1: '4K Pro',
        metricLabel1: 'Cintiq Workstations',
        metric2: '1:8',
        metricLabel2: 'Individual Reviews',
        metric3: '100%',
        metricLabel3: 'Stylistic Range',
        format: 'Intensive Practical Atelier',
        mentor: 'Senior Concept Illustrator',
        access: 'Hardware Cintiq Lab',
        cert: 'STACKLY Master Illustrator',
        deliverables: [
          'Finished editorial illustration portfolio ready for submission to publishing houses and magazines',
          'Worldbuilding art book featuring character turnarounds, lighting keys, and environment paintings',
          'Detailed documentation of compositional studies, thumbnailing processes, and brushwork techniques'
        ],
        faqQ1: 'Do I need to be a skilled traditional painter before enrolling?',
        faqA1: 'While hand-eye drawing fundamentals help, our mentors train artists starting with foundational perspective and value blocking up to advanced digital painting.',
        faqQ2: 'Are Wacom tablets and software licenses provided by the institute?',
        faqA2: 'Yes, every workstation in the atelier is permanently equipped with top-tier Wacom Cintiqs and fully licensed creative suites.'
      },
      'motion-graphics': {
        breadcrumb: 'Motion Graphics',
        title: 'Kinetic Motion Graphics & VFX Lab',
        desc: 'Kinetic typography, 3D procedural simulation, optical camera tracking, and spatial broadcast identity design powered by modern GPU clusters.',
        image: 'assets/images/courses/service-motion.webp',
        secondaryImg: 'assets/images/services/showcase-motion.webp',
        badge: '3D Procedural & Kinetic Reel',
        overview: 'Motion is the native language of the contemporary screen. In this studio, typography comes alive with physics, 3D assets deform with procedural shaders, and kinetic sound design anchors every visual transition.',
        tools: 'Cinema 4D, Maxon Redshift, Octane Render, After Effects, Houdini, Unreal Engine 5',
        specs: 'High-density multi-GPU render workstations and a 24-camera optical motion capture green infinity cyclorama.',
        metric1: '60 FPS',
        metricLabel1: 'Fluid Dynamics',
        metric2: '24 Cam',
        metricLabel2: 'Optical MoCap',
        metric3: 'GPU Farm',
        metricLabel3: 'Rapid Render Nodes',
        format: 'Studio / Hardware Cluster',
        mentor: 'Lead VFX & Motion Director',
        access: 'MoCap & Green Stage',
        cert: 'STACKLY Kinetic Motion Specialist',
        deliverables: [
          'Professional 60-second broadcast motion reel showcasing kinetic type, 3D simulation, and UI animation',
          'Complete procedural scene files with lighting setups and shader graphs optimized for GPU rendering',
          'Multi-platform social, digital billboard, and spatial interface video deliverables'
        ],
        faqQ1: 'How do render queues and server times work for student projects?',
        faqA1: 'Our local render farm allocates dedicated background rendering slots so projects process smoothly overnight without tying up your workstation.',
        faqQ2: 'Do we learn dynamic audio syncing and sound design?',
        faqA2: 'Yes, kinetic pacing and spatial audio synthesis are critical modules taught alongside visual keyframing.'
      },
      'web-design': {
        breadcrumb: 'Web Design',
        title: 'Creative Web Design & Front-End Architecture',
        desc: 'Bespoke editorial website crafting, WebGL physics simulations, GSAP kinetic scroll interactions, and high-performance creative web engineering.',
        image: 'assets/images/courses/service-web.webp',
        secondaryImg: 'assets/images/services/showcase-web.webp',
        badge: 'WebGL & Creative Dev Artifact',
        overview: 'We dismantle cookie-cutter web templates in favor of expressive digital architecture. Students and partners build bespoke interactive web experiences with smooth momentum scrolling, dynamic GLSL shaders, and semantic accessibility.',
        tools: 'HTML5, CSS3/SCSS, JavaScript ESNext, GSAP, Lenis, Three.js, WebGL, Vite',
        specs: 'Local testing staging servers, multi-device viewport testing stations, and accessibility testing suites.',
        metric1: '100/100',
        metricLabel1: 'Lighthouse Score',
        metric2: '120 FPS',
        metricLabel2: 'Smooth Physics',
        metric3: '100%',
        metricLabel3: 'Custom Code Craft',
        format: 'Hybrid Atelier & Code Lab',
        mentor: 'Senior Creative Technologist',
        access: 'Front-End Testing Lab',
        cert: 'STACKLY Creative Technologist',
        deliverables: [
          'Live hosted bespoke editorial website with custom micro-interactions and smooth scroll momentum',
          'Responsive grid layout optimized across mobile viewports, high-DPI displays, and tablets',
          'Git repository featuring clean, semantic, well-documented source code and asset pipelines'
        ],
        faqQ1: 'Is prior coding experience strictly required?',
        faqA1: 'No, the curriculum begins with foundational semantic markup and typography styling before advancing into GSAP animation and WebGL concepts.',
        faqQ2: 'Will our websites be deployed live to the public internet?',
        faqA2: 'Yes, every studio participant publishes their production artifact to custom domains and live production CDN environments.'
      }
    };

    const selectedService = serviceData[serviceParam] || serviceData['graphic-design'];
    
    // Update Breadcrumb & Titles
    serviceDetailsTitle.textContent = selectedService.title;
    const breadcrumbEl = document.getElementById('service-breadcrumb-title');
    if (breadcrumbEl) breadcrumbEl.textContent = selectedService.breadcrumb;
    document.title = `${selectedService.title} — STACKLY Art & Design`;

    // Update Descriptions & Overviews
    const descEl = document.getElementById('service-details-desc');
    if (descEl) descEl.textContent = selectedService.desc;
    const overviewEl = document.getElementById('service-details-overview');
    if (overviewEl) overviewEl.textContent = selectedService.overview;
    const toolsEl = document.getElementById('service-details-tools');
    if (toolsEl) toolsEl.textContent = selectedService.tools;
    const specsEl = document.getElementById('service-details-specs');
    if (specsEl) specsEl.textContent = selectedService.specs;

    // Update Visuals
    const imgEl = document.getElementById('service-details-img');
    if (imgEl) imgEl.src = selectedService.image;
    const secondaryImgEl = document.getElementById('service-secondary-img');
    if (secondaryImgEl) secondaryImgEl.src = selectedService.secondaryImg;
    const secondaryBadgeEl = document.getElementById('service-secondary-badge');
    if (secondaryBadgeEl) secondaryBadgeEl.textContent = selectedService.badge;

    // Update Metrics
    const m1 = document.getElementById('service-metric-1');
    if (m1) m1.textContent = selectedService.metric1;
    const ml1 = document.getElementById('service-metric-label-1');
    if (ml1) ml1.textContent = selectedService.metricLabel1;

    const m2 = document.getElementById('service-metric-2');
    if (m2) m2.textContent = selectedService.metric2;
    const ml2 = document.getElementById('service-metric-label-2');
    if (ml2) ml2.textContent = selectedService.metricLabel2;

    const m3 = document.getElementById('service-metric-3');
    if (m3) m3.textContent = selectedService.metric3;
    const ml3 = document.getElementById('service-metric-label-3');
    if (ml3) ml3.textContent = selectedService.metricLabel3;

    // Update Sidebar Meta
    const metaFormat = document.getElementById('service-meta-format');
    if (metaFormat) metaFormat.textContent = selectedService.format;
    const metaMentor = document.getElementById('service-meta-mentor');
    if (metaMentor) metaMentor.textContent = selectedService.mentor;
    const metaAccess = document.getElementById('service-meta-access');
    if (metaAccess) metaAccess.textContent = selectedService.access;
    const metaCert = document.getElementById('service-meta-cert');
    if (metaCert) metaCert.textContent = selectedService.cert;

    // Update Deliverables
    const deliverablesList = document.getElementById('service-deliverables-list');
    if (deliverablesList && selectedService.deliverables) {
      deliverablesList.innerHTML = selectedService.deliverables
        .map(item => `<li><i class="bi bi-check-circle-fill"></i> ${item}</li>`)
        .join('');
    }

    // Update FAQs
    const faqQ1 = document.getElementById('service-faq-q1');
    if (faqQ1) faqQ1.textContent = selectedService.faqQ1;
    const faqA1 = document.getElementById('service-faq-a1');
    if (faqA1) faqA1.textContent = selectedService.faqA1;

    const faqQ2 = document.getElementById('service-faq-q2');
    if (faqQ2) faqQ2.textContent = selectedService.faqQ2;
    const faqA2 = document.getElementById('service-faq-a2');
    if (faqA2) faqA2.textContent = selectedService.faqA2;
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
