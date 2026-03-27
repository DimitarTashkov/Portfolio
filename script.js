// ===== Typing Animation =====
const typingEl = document.getElementById('typing-text');
const phrases = [
  'C# Web Developer',
  'Freelance .NET Developer',
  '6+ Apps Delivered to Clients'
];
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
let typingTimeout;

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typingEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      typingTimeout = setTimeout(type, 1800);
      return;
    }
    typingTimeout = setTimeout(type, 60);
  } else {
    typingEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingTimeout = setTimeout(type, 400);
      return;
    }
    typingTimeout = setTimeout(type, 30);
  }
}

type();

// ===== Navbar Scroll =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('.section[id]');

function onScroll() {
  // Navbar background
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  const scrolledToBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);
  if (scrolledToBottom && sections.length) {
    current = sections[sections.length - 1].getAttribute('id');
  } else {
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile Menu =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Stats Counter =====
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
let statsCounted = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsCounted) {
      statsCounted = true;
      statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const suffix = num.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 1500;
        const step = Math.max(1, Math.floor(duration / target / 16));
        const increment = () => {
          count++;
          num.textContent = count + suffix;
          if (count < target) {
            requestAnimationFrame(increment);
          }
        };
        requestAnimationFrame(increment);
      });
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-row');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== Dynamic Copyright Year =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
