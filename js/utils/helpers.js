/**
 * helpers.js — utilitários genéricos reutilizáveis
 */

/**
 * Executa um callback uma única vez quando o elemento entra no viewport.
 * @param {Element|NodeList|string} target - elemento, lista ou selector CSS
 * @param {Function} callback - função (entry, observer) chamada na intersecção
 * @param {IntersectionObserverInit} [options]
 */
export function onceVisible(target, callback, options = {}) {
  const defaults = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const opts = { ...defaults, ...options };

  const elements =
    target instanceof NodeList ? Array.from(target) :
    typeof target === 'string' ? Array.from(document.querySelectorAll(target)) :
    [target];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry, observer);
        observer.unobserve(entry.target);
      }
    });
  }, opts);

  elements.forEach((el) => el && observer.observe(el));
  return observer;
}

/**
 * Debounce — atrasa execução até parar de ser chamado.
 * @param {Function} fn
 * @param {number} wait - ms
 */
export function debounce(fn, wait = 200) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

/**
 * Throttle — limita execução a uma vez por intervalo.
 * @param {Function} fn
 * @param {number} limit - ms
 */
export function throttle(fn, limit = 100) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Selecciona um elemento do DOM de forma segura.
 * @param {string} selector
 * @param {Element} [context=document]
 */
export function qs(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Selecciona múltiplos elementos do DOM.
 * @param {string} selector
 * @param {Element} [context=document]
 */
export function qsa(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Adiciona/remove uma classe com base numa condição.
 * @param {Element} el
 * @param {string} cls
 * @param {boolean} condition
 */
export function toggleClass(el, cls, condition) {
  if (!el) return;
  el.classList.toggle(cls, condition);
}

/**
 * Anima um número de `start` até `end` durante `duration` ms.
 * @param {Element} el - elemento onde escrever o valor
 * @param {number} start
 * @param {number} end
 * @param {number} duration - ms
 * @param {string} [suffix=''] - texto a acrescentar (ex: '+')
 */
export function animateCounter(el, start, end, duration, suffix = '') {
  const startTime = performance.now();
  const range = end - start;

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out quadrática
    const eased = 1 - (1 - progress) ** 3;
    const value = Math.round(start + range * eased);

    // Formata com separador de milhar
    el.textContent = value.toLocaleString('pt-PT') + suffix;

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
