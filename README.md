# STACKLY — Art & Design Institute
## Premium Multi-Page Institutional Website

**STACKLY** is an international art and design institute delivering future-focused creative education. This project is a complete, production-grade corporate website engineered using modern semantic HTML5, CSS3, Bootstrap 5, and pure Vanilla JavaScript, enriched with GSAP, ScrollTrigger, and AOS micro-interactions.

---

## 1. Strict Technology Stack

- **Core Markup:** HTML5 (Semantic, Accessible, SEO-optimized)
- **Styling:** CSS3, Bootstrap 5.3.3 (Vanilla CSS architecture, Swiss-inspired design system with CSS custom properties)
- **Scripting:** Pure Vanilla JavaScript (ES6+, zero frameworks, zero jQuery)
- **Motion & Animation:**
  - GSAP 3.12.5 (GreenSock Animation Platform)
  - GSAP ScrollTrigger 3.12.5 (Viewport scroll triggers, parallax, numerical counters)
  - AOS 2.3.4 (Animate On Scroll for editorial card reveals)
- **Typography:** Space Grotesk (Display/Headings), Manrope (Editorial Body), DM Sans (UI Elements & Tags)
- **Iconography:** Bootstrap Icons 1.11.3
- **Media:** 100% Local WebP Optimized Assets (all verified strictly under 90 KB) & Responsive Video Iframes

---

## 2. Project Directory Structure

```
STACKLY-ART-DESIGN-INSTITUTE/
├── index.html                  # Homepage (15 comprehensive sections)
├── about.html                  # About Us (Heritage, philosophy, facilities)
├── services.html               # Institute Services Catalog (8 creative ateliers)
├── service-details.html        # Dynamic Service Details (Query-string support)
├── courses.html                # Academic Programs Catalog (Client-side search & filter)
├── course-details.html         # Dynamic Course Details (Curriculum accordion, specs)
├── admissions.html             # Admissions 2026 (Process, checklist, validated form)
├── admission-details.html      # Candidate evaluation rubric & procedures
├── faculty.html                # Creative Mentors & Atelier Chairs
├── student-portfolio.html      # Graduate Portfolio Showcase (Masonry & Lightbox)
├── gallery.html                # Exhibition Gallery (Darkroom, studios, opening night)
├── blog.html                   # Editorial Journal (Search, category filtering)
├── blog-details.html           # Long-form article with quotes & share controls
├── contact.html                # Contact coordinates, responsive map & inquiry form
├── faq.html                    # Categorized interactive accordion (8 topics)
├── events.html                 # Masterclasses, symposiums & degree showcase
├── careers.html                # Faculty mentorship opportunities & application
├── pricing.html                # Transparent tuition packages & interactive billing toggle
├── login.html                  # Split-screen portal authentication
├── signup.html                 # Applicant registration with validation
├── forgot-password.html        # Password recovery form with backend notice
├── 404.html                    # Animated 404 error page
├── navbar.html                 # Reusable global header component
├── footer.html                 # Reusable global footer component
├── assets/
│   ├── css/
│   │   ├── style.css           # Core design system tokens & shared components
│   │   ├── animations.css      # Keyframes, floating accents, marquees, reduced-motion
│   │   ├── pages.css           # Unique page heroes, split forms, pricing tables
│   │   └── responsive.css      # Breakpoints (1920px down to 360px mobile)
│   ├── js/
│   │   ├── preloader.js        # Global 2.0-second GSAP loader
│   │   ├── navbar.js           # Sticky navbar, mobile drawer, active states
│   │   ├── components.js       # Dynamic component injector with safe static fallback
│   │   ├── animations.js       # GSAP & ScrollTrigger timeline engine
│   │   ├── aos-init.js         # AOS scroll entrance initialization
│   │   ├── form-validation.js  # Pure Vanilla JS live form validation
│   │   └── main.js             # Client-side filtering, query parsers, lightbox
│   └── images/
│       ├── hero/               # Studio hero & floating portfolio thumbnails
│       ├── about/              # Heritage, collaborative spaces & digital labs
│       ├── courses/            # 8 course thumbnails + 8 service thumbnails
│       ├── student-work/       # High-res graduate portfolio artifacts
│       ├── faculty/            # Distinguished department chairs
│       ├── gallery/            # Exhibition halls, printmaking, VR testing
│       ├── blog/               # Editorial essays & design criticism visuals
│       └── general/            # Campus architecture, event auditoriums & auth
├── verify_project.py           # Verification script for assets and file sizes
└── README.md                   # Complete documentation & image inventory
```

---

## 3. Mandatory Image Optimization Inventory

Every downloaded image is in **WebP** format and compressed **strictly below 90 KB** (ranging between 5 KB and 85 KB) while preserving strong visual clarity.

| Subfolder | File Name | Dimensions | File Size | Description |
| :--- | :--- | :--- | :--- | :--- |
| `hero/` | `hero-studio.webp` | 1200 x 800 | **64.82 KB** | Creative painters and designers in open studio |
| `hero/` | `hero-portfolio-1.webp` | 600 x 450 | **24.47 KB** | Digital UI product design system mockup |
| `hero/` | `hero-portfolio-2.webp` | 600 x 450 | **24.15 KB** | Swiss typography monograph layout |
| `hero/` | `hero-portfolio-3.webp` | 600 x 450 | **5.60 KB** | Abstract generative 3D wave |
| `about/` | `about-studio.webp` | 1000 x 700 | **25.23 KB** | Architectural design desk and creative sketchbooks |
| `about/` | `about-culture.webp` | 1000 x 650 | **47.12 KB** | Collaborative multidisciplinary critique session |
| `about/` | `about-facilities.webp` | 1000 x 650 | **47.92 KB** | High-tech media computing lab & workstations |
| `courses/` | `course-graphic-design.webp` | 800 x 550 | **39.52 KB** | Graphic designer at work on identity brief |
| `courses/` | `course-ui-ux.webp` | 800 x 550 | **19.16 KB** | Mobile wireframes, heuristics and UI tokens |
| `courses/` | `course-motion-graphics.webp` | 800 x 550 | **33.06 KB** | 3D timeline editing and kinetic motion |
| `courses/` | `course-animation.webp` | 800 x 550 | **23.86 KB** | Character animation and digital storytelling |
| `courses/` | `course-photography.webp` | 800 x 550 | **22.30 KB** | Medium format studio camera with strobe lights |
| `courses/` | `course-fashion-design.webp` | 800 x 550 | **50.61 KB** | Couture draping, garment atelier and textiles |
| `courses/` | `course-interior-design.webp` | 800 x 550 | **54.62 KB** | Spatial architecture model and lighting atmosphere |
| `courses/` | `course-digital-illustration.webp`| 800 x 550 | **48.92 KB** | Digital stylus illustration and concept painting |
| `courses/` | `course-digital-marketing.webp` | 800 x 550 | **24.83 KB** | Cultural campaign strategy and digital analytics |
| `courses/` | `service-graphic.webp` | 800 x 550 | **36.05 KB** | Graphic design consultation studio |
| `courses/` | `service-uiux.webp` | 800 x 550 | **19.16 KB** | Interaction usability testing suite |
| `courses/` | `service-branding.webp` | 800 x 550 | **31.61 KB** | Brand naming and visual identity guidelines |
| `courses/` | `service-illustration.webp` | 800 x 550 | **75.36 KB** | Digital illustration atelier |
| `courses/` | `service-motion.webp` | 800 x 550 | **33.06 KB** | Broadcast VFX render workstation |
| `courses/` | `service-web.webp` | 800 x 550 | **54.72 KB** | Creative front-end web development lab |
| `courses/` | `service-photo.webp` | 800 x 550 | **22.30 KB** | Studio lookbook photography lab |
| `courses/` | `service-portfolio.webp` | 800 x 550 | **18.27 KB** | Portfolio auditing and mentoring desk |
| `student-work/`| `portfolio-brand-nordic.webp`| 800 x 600 | **23.19 KB** | Nordic Botanicals — luxury sustainable branding |
| `student-work/`| `portfolio-app-fintech.webp` | 800 x 600 | **31.00 KB** | Apex Mobile System — dark mode UI design |
| `student-work/`| `portfolio-editorial-mag.webp`| 800 x 600 | **15.74 KB** | Form & Void — architectural typography monograph |
| `student-work/`| `portfolio-3d-kinetic.webp` | 800 x 600 | **38.01 KB** | Synapse — procedural 3D sculpture |
| `student-work/`| `portfolio-illustration-myth.webp`| 800 x 600 | **79.83 KB**| Cybernetic Mythos — digital painting |
| `student-work/`| `portfolio-photo-portraits.webp`| 800 x 600 | **13.25 KB** | Monochrome Identity — medium format portraiture |
| `student-work/`| `portfolio-motion-ident.webp`| 800 x 600 | **49.09 KB** | HyperGrid — kinetic broadcast identity |
| `student-work/`| `portfolio-packaging-eco.webp`| 800 x 600 | **19.52 KB** | Terra Sol — sustainable bottle packaging |
| `faculty/` | `faculty-elena.webp` | 600 x 750 | **25.86 KB** | Elena Vance, Head of Visual Communication |
| `faculty/` | `faculty-marcus.webp` | 600 x 750 | **11.11 KB** | Marcus Chen, Director of Interaction Design |
| `faculty/` | `faculty-sophia.webp` | 600 x 750 | **16.65 KB** | Sophia Al-Mansoor, Professor of Motion Arts |
| `faculty/` | `faculty-david.webp` | 600 x 750 | **17.14 KB** | David Kross, Master of Brand Identity |
| `faculty/` | `faculty-amara.webp` | 600 x 750 | **15.20 KB** | Amara Okafor, Lead of Spatial Design |
| `faculty/` | `faculty-julian.webp` | 600 x 750 | **38.99 KB** | Julian Thorne, Creative Director in Residence |
| `gallery/` | `gallery-exhibition-1.webp` | 900 x 650 | **46.56 KB** | Annual Degree Show Main Gallery |
| `gallery/` | `gallery-workshop-sketch.webp`| 900 x 650 | **45.08 KB** | Figure drafting and life drawing studio |
| `gallery/` | `gallery-design-critique.webp`| 900 x 650 | **48.06 KB** | Weekly pinup review and mentor critique |
| `gallery/` | `gallery-printmaking.webp` | 900 x 650 | **67.27 KB** | Screen printing & risograph laboratory |
| `gallery/` | `gallery-sculpture.webp` | 900 x 650 | **84.57 KB** | Material & spatial sculpting atelier |
| `gallery/` | `gallery-digital-lab.webp` | 900 x 650 | **23.32 KB** | Spatial VR and human-computer interface lab |
| `blog/` | `blog-trends-2026.webp` | 800 x 500 | **28.88 KB** | Visual culture and generative craft synthesis |
| `blog/` | `blog-typography-rules.webp`| 800 x 500 | **48.64 KB** | Swiss rationalism and the kinetic grid |
| `blog/` | `blog-ux-spatial.webp` | 800 x 500 | **68.54 KB** | Designing human-centered spatial interfaces |
| `blog/` | `blog-portfolio-secrets.webp`| 800 x 500 | **20.64 KB** | Agency portfolio review criteria |
| `blog/` | `blog-color-psychology.webp` | 800 x 500 | **40.88 KB** | High-voltage electric color resonance in branding |
| `blog/` | `blog-creative-burnout.webp` | 800 x 500 | **13.67 KB** | Sustaining inspiration in high-intensity studios |
| `general/` | `campus-exterior.webp` | 1000 x 650 | **84.65 KB** | STACKLY Institute architectural campus exterior |
| `general/` | `event-workshop.webp` | 900 x 600 | **28.79 KB** | Masterclass studio session in progress |
| `general/` | `event-talk.webp` | 900 x 600 | **24.27 KB** | Auditorium public design symposium |
| `general/` | `event-exhibition.webp` | 900 x 600 | **85.28 KB** | Design showcase opening night gala |
| `general/` | `login-visual.webp` | 900 x 1200 | **84.20 KB** | Dramatic artistic artwork for authentication |

---

## 4. Local Execution & Hosting

### Option A: Python HTTP Server (Recommended)
From the root of the workspace directory, run:
```bash
python -m http.server 8080
```
Then navigate to: `http://localhost:8080` in your web browser.

### Option B: Node.js `serve` / `http-server`
```bash
npx serve .
# or
npx http-server -p 8080
```

### Option C: Direct `file://` Opening
All pages feature zero-fail fallback navigation and footer templates in `assets/js/components.js`. If opened via double-clicking in Windows Explorer (`file:///...`), the website automatically falls back to inline component templates if `fetch()` is restricted by browser security policies.

---

## 5. Global Navigation Hierarchy

Every page strictly adheres to the requested 9-item global navigation order:
1. **Home** (`index.html`)
2. **About Us** (`about.html`)
3. **Services** (`services.html` with dropdown to 6 sub-services)
4. **Courses** (`courses.html` with dropdown to 7 sub-courses)
5. **Blog** (`blog.html`)
6. **Contact** (`contact.html`)
7. **Admission** (`admissions.html` — highlighted with 2026 badge)
8. **Login** (`login.html` — secondary link)
9. **Sign Up** (`signup.html` — primary coral CTA)

---

## 6. Preloader & Motion Design Specifications

- **Global Preloader (`assets/js/preloader.js`):** Runs for exactly **2.0 seconds** on every direct visit. Animates geometric SVG drawing paths, percentage counter from 0% to 100%, and brand wordmark. Once complete, it smoothly fades out and triggers the hero entry animations.
- **GSAP & ScrollTrigger (`assets/js/animations.js`):** Powers the hero typography reveals, mouse movement parallax for floating portfolio thumbnails on desktop, scroll-driven image scale, and numerical counter increases for institutional statistics.
- **AOS (`assets/js/aos-init.js`):** Controls staggered card entries on scroll with smooth cubic easing.
- **Accessibility & Reduced Motion:** Respects `(prefers-reduced-motion: reduce)` media queries by disabling high-velocity animations and providing static layout fallbacks.

---

## 7. Quality Assurance Checklist

- [x] All 22 required HTML pages exist and are connected with working links.
- [x] No broken links (`href="#"` replaced with functional controls or real pages).
- [x] Navbar and Footer components are 100% consistent across all pages.
- [x] All 55 images are in WebP format and verified strictly below 90 KB.
- [x] Global preloader runs for approximately 2.0 seconds without hanging.
- [x] Responsive layout verified on Desktop (1920px, 1440px), Tablet (1024px, 768px), and Mobile (390px, 360px).
- [x] Responsive video and map iframes included with proper aspect ratio wrappers.
- [x] Frontend form validation implemented across Login, Signup, Forgot Password, Admissions, and Contact forms without claiming fake backend storage.
# Arts
