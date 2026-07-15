/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== BURGER MENU ===== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  // Animate burger lines
  burger.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  burger.querySelectorAll('span')[1].style.opacity  = isOpen ? '0' : '1';
  burger.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

/* ===== SMOOTH ACTIVE LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(
  '.num-item, .about-img, .about-text, .mission-card, .init-card, .partner-item, .testi-card, .contact-info, .contact-form-wrap'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 100;
  revealObserver.observe(el);
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';

    // Simulate async submission
    setTimeout(() => {
      formSuccess.style.display = 'flex';
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = 'Enviar mensagem <i class="fas fa-paper-plane"></i>';
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    }, 1200);
  });
}

/* ===== ACTIVE NAV STYLE ===== */
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--green-main); } .nav-links a.active::after { left: 14px; right: 14px; }`;
document.head.appendChild(style);
