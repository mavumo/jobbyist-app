/* Updated Navigation JS */
import { closeAllDropdowns } from './util.js';

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo-container');
  if (logo) logo.addEventListener('click', () => (window.location = 'index.html'));

  // Add Home link dynamically if missing
  const nav = document.getElementById('navbar-nav');
  if (nav && !nav.querySelector('[data-home-link]')) {
    const homeLi = document.createElement('a');
    homeLi.href = 'index.html';
    homeLi.textContent = 'Home';
    homeLi.className = 'nav-link';
    homeLi.setAttribute('data-home-link', '');
    nav.insertBefore(homeLi, nav.firstChild);
  }

  // Dropdown toggles (click)
  document.querySelectorAll('.dropdown-trigger').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const menu = btn.nextElementSibling;
      const isOpen = menu.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) menu.classList.add('open');
    });
  });

  // Language selector sync
  const langBtn = document.getElementById('language-select-btn');
  const langMenu = document.getElementById('language-menu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = langMenu.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) langMenu.classList.add('open');
    });
    langMenu.querySelectorAll('button[data-lang]').forEach(item => {
      item.addEventListener('click', () => {
        const code = item.getAttribute('data-lang');
        localStorage.setItem('jobbyist-lang', code);
        document.documentElement.lang = code.split('-')[1] || 'en';
        langBtn.innerHTML = item.innerHTML;
        closeAllDropdowns();
      });
    });
  }

  // Close dropdowns on outside click
  document.addEventListener('click', e => {
    const isDropdown = e.target.closest('.dropdown-menu, .dropdown-trigger');
    if (!isDropdown) closeAllDropdowns();
  });
});
