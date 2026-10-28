/**
 * main.js — ponto de entrada do JavaScript
 * Inicializa todos os módulos quando o DOM estiver pronto.
 */

import { initNavbar }      from './modules/navbar.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { initCounters }    from './modules/counter.js';
import { initContactForm } from './modules/contactForm.js';
import { initGallery }     from './modules/gallery.js';
import { initInteractiveMap } from './modules/interactiveMap.js';
import { initBackToTop }   from './modules/backToTop.js';
import { initPreloader }   from './modules/preloader.js';
import { initNewsletter }  from './modules/newsletter.js';
import { initI18n }        from './modules/i18n.js';

function init() {
  initNavbar();
  initI18n();        // deve correr logo após o navbar estar no DOM
  initScrollReveal();
  initCounters();
  initContactForm();
  initGallery();
  initInteractiveMap();
  initBackToTop();
  initPreloader();
  initNewsletter();
}

// Garante que o DOM está carregado antes de inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
