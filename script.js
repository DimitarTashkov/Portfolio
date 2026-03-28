// ===== Dynamic Year =====
document.querySelectorAll('#year').forEach(el => { el.textContent = new Date().getFullYear(); });

// ===== Typing Animation =====
(function () {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const phrases = ['C# Web Developer', 'Freelance .NET Developer', '6+ Apps Delivered to Clients'];
  let phraseIdx = 0, charIdx = 0, deleting = false;
  function type() {
    const current = phrases[phraseIdx];
    el.textContent = deleting ? current.substring(0, charIdx--) : current.substring(0, charIdx++);
    if (!deleting && charIdx > current.length) { setTimeout(() => { deleting = true; type(); }, 1800); return; }
    if (deleting && charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
    setTimeout(type, deleting ? 35 : 65);
  }
  type();
})();

// ===== Navbar Scroll Effect =====
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

// ===== Active Nav Link Highlight =====
(function () {
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!navLinks.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
})();

// ===== Hamburger Menu =====
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
})();

// ===== Scroll Reveal =====
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));
})();

// ===== Stats Counter =====
(function () {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;
  let counted = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target);
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            counter.textContent = current + (target === 6 ? '+' : '');
          }, 40);
        });
      }
    });
  }, { threshold: 0.3 });
  const statsRow = document.querySelector('.stats-row');
  if (statsRow) observer.observe(statsRow);
})();

// ===== Project Filters (projects.html) =====
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;
  function filterProjects(filter) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      const category = card.dataset.category;
      const pinned = card.dataset.pinned === 'true';
      let show = false;
      if (filter === 'all') show = true;
      else if (filter === 'best') show = pinned;
      else show = category === filter;
      card.style.display = show ? '' : 'none';
      if (show) { card.classList.remove('fade-in'); void card.offsetWidth; card.classList.add('fade-in'); }
    });
    filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  }
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => filterProjects(btn.dataset.filter));
  });
  // Default: show "best"
  filterProjects('best');
})();

// ===== Gallery / Carousel (project pages) =====
(function () {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  const viewport = gallery.querySelector('.gallery-viewport');
  const dotsContainer = gallery.querySelector('.gallery-dots');
  const prevBtn = gallery.querySelector('.gallery-prev');
  const nextBtn = gallery.querySelector('.gallery-next');
  if (!viewport || !window.galleryImages) return;

  const images = window.galleryImages;
  let current = 0;

  function render() {
    const src = images[current];
    const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');
    if (isVideo) {
      viewport.innerHTML = '<video src="' + src + '" controls muted autoplay loop></video>';
    } else {
      viewport.innerHTML = '<img src="' + src + '" alt="Screenshot ' + (current + 1) + '" loading="lazy">';
      viewport.querySelector('img').addEventListener('click', () => openLightbox(src));
    }
    dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  // Create dots
  images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { current = i; render(); });
    dotsContainer.appendChild(dot);
  });

  if (prevBtn) prevBtn.addEventListener('click', () => { current = (current - 1 + images.length) % images.length; render(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { current = (current + 1) % images.length; render(); });

  render();

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lbImg = lightbox.querySelector('.lightbox-image');
  const lbClose = lightbox.querySelector('.lightbox-close');

  function openLightbox(src) {
    lbImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
})();

// ===== Markdown Rendering (project pages) =====
(function () {
  const readmeContainer = document.getElementById('readme-content');
  if (!readmeContainer || !window.readmePath) return;
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
  script.onload = () => {
    fetch(window.readmePath)
      .then(r => r.text())
      .then(md => {
        readmeContainer.innerHTML = marked.parse(md);
        // Fix image paths: images/ or Images/ -> media/
        readmeContainer.querySelectorAll('img').forEach(img => {
          const src = img.getAttribute('src');
          if (src && !src.startsWith('http') && !src.startsWith('media/')) {
            img.src = src.replace(/^(images|Images|screenshots)\//i, 'media/');
          }
          img.loading = 'lazy';
          // Hide broken images
          img.onerror = function () { this.style.display = 'none'; };
        });
      })
      .catch(() => { readmeContainer.innerHTML = '<p style="color:var(--text-muted);">README not available.</p>'; });
  };
  document.head.appendChild(script);
})();
