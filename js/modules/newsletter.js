import { qs } from '../utils/helpers.js';

export function initNewsletter() {
  const form = qs('#newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const input = form.querySelector('input[type="email"]');
    
    if (!input.value) return;

    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Simulate async subscription
    setTimeout(() => {
      btn.innerHTML = 'Subscrito!';
      btn.style.backgroundColor = 'var(--color-success)';
      input.value = '';
      
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
      }, 3000);
    }, 1000);
  });
}
