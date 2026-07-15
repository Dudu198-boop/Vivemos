/**
 * navbar.js — comportamento da barra de navegação
 * Responsabilidades:
 *   - Efeito de scroll (sombra)
 *   - Menu burger mobile (toggle, animação, fechar ao clicar link)
 *   - Destaque do link activo com IntersectionObserver
 */

import { qs, qsa, throttle, toggleClass } from '../utils/helpers.js';

export function initNavbar() {
  const navbar    = qs('.navbar');
  const burger    = qs('.navbar__burger');
  const linksList = qs('.navbar__links');
  const navLinks  = qsa('.navbar__link');
  const sections  = qsa('section[id]');

  if (!navbar) return;

  // ── Scroll shadow ──────────────────────────────────────────────
  const onScroll = throttle(() => {
    toggleClass(navbar, 'navbar--scrolled', window.scrollY > 60);
  }, 80);

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Burger menu ────────────────────────────────────────────────
  if (burger && linksList) {
    burger.addEventListener('click', () => {
      const isOpen = linksList.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      // Bloqueia scroll do body quando menu aberto
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fecha ao clicar num link
    linksList.addEventListener('click', (e) => {
      if (e.target.closest('.navbar__link')) {
        closeMobileMenu();
      }
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  function closeMobileMenu() {
    if (!linksList) return;
    linksList.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ── Active link via IntersectionObserver ───────────────────────
  if (sections.length && navLinks.length) {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const isActive = link.getAttribute('href') === `#${id}`;
              toggleClass(link, 'is-active', isActive);
            });
          }
        });
      },
      { threshold: 0.35, rootMargin: '-10% 0px -60% 0px' }
    );

    sections.forEach((section) => activeObserver.observe(section));
  }
}
