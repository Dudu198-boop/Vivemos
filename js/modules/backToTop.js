import { qs, throttle } from '../utils/helpers.js';

export function initBackToTop() {
  const btn = qs('#backToTop');
  if (!btn) return;

  const onScroll = throttle(() => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
