/**
 * counter.js — animação dos números de impacto
 * Detecta quando a secção entra no viewport e anima
 * cada número de 0 até ao valor final.
 */

import { qs, qsa, onceVisible, animateCounter } from '../utils/helpers.js';

/** Configuração dos contadores
 *  `data-target` no HTML define o valor final.
 *  `data-suffix` define o sufixo (ex: '+').
 */
export function initCounters() {
  const section = qs('.numbers');
  if (!section) return;

  const items = qsa('.numbers__value', section);
  if (!items.length) return;

  onceVisible(
    section,
    () => {
      items.forEach((el) => {
        const target  = parseInt(el.dataset.target ?? el.textContent, 10);
        const suffix  = el.dataset.suffix ?? '';
        if (isNaN(target)) return;

        animateCounter(el, 0, target, 1800, suffix);
      });
    },
    { threshold: 0.4 }
  );
}
