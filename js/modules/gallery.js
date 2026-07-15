import { qs, qsa, toggleClass } from '../utils/helpers.js';

export function initGallery() {
  const filterBtns = qsa('.gallery__filter-btn');
  const galleryItems = qsa('.gallery__item');
  const lightbox = qs('#lightbox');
  
  if (!filterBtns.length || !galleryItems.length || !lightbox) return;

  const lightboxImg = qs('.lightbox__img', lightbox);
  const closeBtn = qs('.lightbox__close', lightbox);
  const prevBtn = qs('.lightbox__prev', lightbox);
  const nextBtn = qs('.lightbox__next', lightbox);

  let currentImages = [];
  let currentIndex = 0;

  // --- Filtering ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('is-hidden');
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });

  // --- Lightbox ---
  function openLightbox(index, visibleItems) {
    currentImages = visibleItems;
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    if (!currentImages.length) return;
    const item = currentImages[currentIndex];
    const img = qs('img', item);
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  function showPrev() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
  }

  function showNext() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const visibleItems = galleryItems.filter(el => !el.classList.contains('is-hidden'));
      const index = visibleItems.indexOf(item);
      if (index > -1) {
        openLightbox(index, visibleItems);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}
