/**
 * contactForm.js — lógica do formulário de contacto
 * Responsabilidades:
 *   - Validação em tempo real (blur)
 *   - Submissão simulada com feedback visual
 *   - Gestão de estado do botão (loading → sucesso/erro)
 */

import { qs } from '../utils/helpers.js';

/** Regras de validação por campo */
const VALIDATORS = {
  nome: {
    test: (v) => v.trim().length >= 2,
    message: 'O nome deve ter pelo menos 2 caracteres.',
  },
  email: {
    test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Introduza um endereço de email válido.',
  },
  assunto: {
    test: (v) => v.trim().length >= 3,
    message: 'O assunto deve ter pelo menos 3 caracteres.',
  },
  mensagem: {
    test: (v) => v.trim().length >= 10,
    message: 'A mensagem deve ter pelo menos 10 caracteres.',
  },
};

export function initContactForm() {
  const form    = qs('#contactForm');
  const success = qs('#formFeedback');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  // ── Validação por campo ao sair do foco ───────────────────────
  Object.keys(VALIDATORS).forEach((name) => {
    const input = form.elements[name];
    if (!input) return;

    input.addEventListener('blur', () => validateField(input, name));
    input.addEventListener('input', () => {
      // Remove erro assim que o utilizador começa a corrigir
      if (input.classList.contains('form__input--error')) {
        clearFieldError(input);
      }
    });
  });

  // ── Submissão ─────────────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Valida todos os campos antes de enviar
    let isValid = true;
    Object.keys(VALIDATORS).forEach((name) => {
      const input = form.elements[name];
      if (input && !validateField(input, name)) isValid = false;
    });

    if (!isValid) return;

    setLoadingState(submitBtn, true);

    try {
      // Simulação de envio (substituir por fetch real)
      await simulateSubmit();
      showFeedback(success, 'success');
      form.reset();
    } catch {
      showFeedback(success, 'error');
    } finally {
      setLoadingState(submitBtn, false);
    }
  });
}

/* ── Helpers privados ──────────────────────────────────────────── */

function validateField(input, name) {
  const rule = VALIDATORS[name];
  if (!rule) return true;

  const isValid = rule.test(input.value);
  if (!isValid) {
    setFieldError(input, rule.message);
  } else {
    clearFieldError(input);
  }
  return isValid;
}

function setFieldError(input, message) {
  input.classList.add('form__input--error');
  input.setAttribute('aria-invalid', 'true');

  let errEl = input.parentElement.querySelector('.form__error-msg');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className = 'form__error-msg';
    errEl.setAttribute('role', 'alert');
    input.parentElement.appendChild(errEl);
  }
  errEl.textContent = message;
}

function clearFieldError(input) {
  input.classList.remove('form__input--error');
  input.removeAttribute('aria-invalid');
  input.parentElement.querySelector('.form__error-msg')?.remove();
}

function setLoadingState(btn, isLoading) {
  btn.disabled = isLoading;
  if (isLoading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> A enviar…';
  } else {
    btn.innerHTML = btn.dataset.originalText ?? btn.innerHTML;
  }
}

function showFeedback(el, type) {
  if (!el) return;
  el.className = `form__feedback form__feedback--${type} is-visible`;
  el.setAttribute('role', 'alert');

  if (type === 'success') {
    el.innerHTML = '<i class="fas fa-check-circle" aria-hidden="true"></i> Mensagem enviada com sucesso! Entraremos em contacto brevemente.';
  } else {
    el.innerHTML = '<i class="fas fa-exclamation-circle" aria-hidden="true"></i> Ocorreu um erro. Por favor, tente novamente.';
  }

  setTimeout(() => {
    el.classList.remove('is-visible');
  }, 7000);
}

function simulateSubmit() {
  return new Promise((resolve) => setTimeout(resolve, 1400));
}
