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
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = linksList.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
      } else {
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      }
    });

    // Fecha ao clicar num link
    const links = qsa('.navbar__link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        closeMobileMenu();
      });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      const isClickInsideMenu = linksList.contains(e.target);
      const isClickOnBurger = burger.contains(e.target);
      const isClickOnMobileLang = e.target.closest('.navbar__links-lang-mobile');
      
      if (!isClickInsideMenu && !isClickOnBurger && !isClickOnMobileLang && linksList.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });

    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && linksList.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  function closeMobileMenu() {
    if (!linksList) return;
    linksList.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
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
