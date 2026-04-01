// ── INIT ──
window.addEventListener('load', () => { triggerReveals(); });

// ── BILINGUAL SYSTEM ──
const savedLang = localStorage.getItem('site_lang') || 'tr';
document.documentElement.lang = savedLang;

document.addEventListener('DOMContentLoaded', () => {
  const transition = document.querySelector('.page-transition');
  if(transition) {
    setTimeout(() => { transition.classList.add('entered'); }, 50);
  }

  const langLinks = document.querySelectorAll('.lang-switch a, .mobile-lang-switch a');
  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = link.textContent.trim().toLowerCase();
      if(selectedLang === 'tr' || selectedLang === 'en') {
        const transition = document.querySelector('.page-transition');
        if (transition) {
          transition.classList.remove('entered');
          transition.classList.add('exit');
          setTimeout(() => {
            localStorage.setItem('site_lang', selectedLang);
            document.documentElement.lang = selectedLang;
            updateLangButtons(selectedLang);
            transition.classList.remove('exit');
            setTimeout(() => { transition.classList.add('entered'); }, 50);
          }, 600);
        } else {
          localStorage.setItem('site_lang', selectedLang);
          document.documentElement.lang = selectedLang;
          updateLangButtons(selectedLang);
        }
      }
    });
  });
  updateLangButtons(savedLang);
});

function updateLangButtons(lang) {
  const langLinks = document.querySelectorAll('.lang-switch a, .mobile-lang-switch a');
  langLinks.forEach(link => {
    if(link.textContent.trim().toLowerCase() === lang) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update placeholders
  document.querySelectorAll('input[data-tr], textarea[data-tr]').forEach(el => {
    el.placeholder = lang === 'tr' ? el.getAttribute('data-tr') : el.getAttribute('data-en');
  });
}


// ── CUSTOM CURSOR ──
const dot = document.querySelector('.cursor-dot');
let mx = 0, my = 0;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function cursorLoop() {
  if (dot) dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  requestAnimationFrame(cursorLoop);
}
cursorLoop();


// ── HEADER SCROLL ──
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── HAMBURGER ──
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── INTERSECTION OBSERVER ──
function triggerReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stat-number')) {
          animateCounter(entry.target);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .stat-number').forEach(el => observer.observe(el));
}

// Run reveals after a short delay to let page render
setTimeout(triggerReveals, 100);

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (!target) return;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── FILTER BUTTONS ──
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    workCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        setTimeout(() => card.style.opacity = '1', 50);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 350);
      }
    });
  });
});

// ── PAGE TRANSITIONS ──
document.querySelectorAll('a[href$=".html"], nav a[href$=".html"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
      e.preventDefault();
      const transition = document.querySelector('.page-transition');
      if (transition) {
        transition.classList.remove('entered');
        transition.classList.add('exit');
        setTimeout(() => { window.location.href = href; }, 600);
      } else {
        window.location.href = href;
      }
    }
  });
});

// ── FORM SUBMIT ──
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn span');
    const isEnglish = document.documentElement.lang === 'en';
    
    btn.textContent = isEnglish ? 'SENT ✓' : 'GÖNDERİLDİ ✓';
    setTimeout(() => { 
      btn.textContent = isEnglish ? 'SEND MESSAGE' : 'MESAJ GÖNDER'; 
      e.target.reset(); 
    }, 2500);
  });
}

// ── HOVER PREVIEW ──
const workRows = document.querySelectorAll('.work-row');
const workPreview = document.querySelector('.work-preview');
const previewImgs = document.querySelectorAll('.preview-img');

if (workRows.length > 0 && workPreview) {
  workRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const targetId = row.dataset.preview;
      if (!targetId) return;
      workPreview.classList.add('active');
      previewImgs.forEach(img => {
        if (img.id === targetId) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    });
    row.addEventListener('mouseleave', () => {
      workPreview.classList.remove('active');
      previewImgs.forEach(img => img.classList.remove('active'));
    });
  });
}
