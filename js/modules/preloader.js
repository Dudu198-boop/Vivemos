import { qs } from '../utils/helpers.js';

export function initPreloader() {
  const preloader = qs('#preloader');
  if (!preloader) return;

  // Hide preloader when window finishes loading
  window.addEventListener('load', () => {
    // Add a slight delay for smooth visual transition
    setTimeout(() => {
      preloader.classList.add('is-hidden');
    }, 500);
  });
}
