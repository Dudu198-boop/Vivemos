/**
 * scrollReveal.js — animações de entrada ao fazer scroll
 * Usa IntersectionObserver para aplicar a classe `is-visible`
 * nos elementos com a classe `reveal`, com suporte a stagger.
 */

import { qsa } from '../utils/helpers.js';

/** Selector de todos os elementos a animar */
const REVEAL_SELECTOR = [
  '.numbers__item',
  '.about__image-wrap',
  '.about__text',
  '.mission-card',
  '.init-card',
  '.partner-card',
  '.testi-card',
  '.contact__info',
  '.form-wrap',
].join(', ');

export function initScrollReveal() {
  // Respeita preferência de movimento reduzido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = qsa(REVEAL_SELECTOR);
  if (!elements.length) return;

  // Marca todos os elementos como `reveal` e define delay por grupo
  elements.forEach((el, index) => {
    el.classList.add('reveal');
    // Stagger de 100ms dentro de grupos de 4
    const delayIndex = index % 4;
    if (delayIndex > 0) {
      el.classList.add(`reveal--delay-${delayIndex}`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
