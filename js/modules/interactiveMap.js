import { qs, qsa } from '../utils/helpers.js';

export function initInteractiveMap() {
  const mapPoints = qsa('.map-point');
  const tooltip = qs('#mapTooltip');
  
  if (!mapPoints.length || !tooltip) return;

  const tooltipTitle = qs('.map-tooltip__title', tooltip);
  const tooltipDesc = qs('.map-tooltip__desc', tooltip);

  mapPoints.forEach(point => {
    point.addEventListener('mouseenter', (e) => {
      const region = point.dataset.region;
      const projects = point.dataset.projects;
      
      tooltipTitle.textContent = region;
      tooltipDesc.textContent = projects;
      
      tooltip.classList.add('is-visible');
    });

    point.addEventListener('mousemove', (e) => {
      const containerRect = tooltip.parentElement.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;
      
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    });

    point.addEventListener('mouseleave', () => {
      tooltip.classList.remove('is-visible');
    });
  });
}
