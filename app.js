/**
 * JOBBYIST PLATFORM - PRODUCTION READY APPLICATION
 * Complete Implementation with ALL Features from Specification
 * 
 * BACKEND INTEGRATION GUIDE:
 * ===========================
 * (original content retained...)
 */

// ... existing original app.js content remains above ...

/* BEGIN added enhancements: dropdown toggle + AdSense injection */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!trigger || !menu) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('[data-dropdown]').forEach(d => {
        const btn = d.querySelector('.dropdown-trigger');
        const m = d.querySelector('.dropdown-menu');
        if (btn && m) {
          btn.setAttribute('aria-expanded', 'false');
          m.style.opacity = '0';
          m.style.visibility = 'hidden';
          m.style.transform = 'translateY(-10px)';
        }
      });
      if (!expanded) {
        trigger.setAttribute('aria-expanded', 'true');
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateY(0)';
      } else {
        trigger.setAttribute('aria-expanded', 'false');
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(-10px)';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]')) {
      document.querySelectorAll('[data-dropdown]').forEach(d => {
        const btn = d.querySelector('.dropdown-trigger');
        const m = d.querySelector('.dropdown-menu');
        if (btn && m) {
          btn.setAttribute('aria-expanded', 'false');
          m.style.opacity = '0';
          m.style.visibility = 'hidden';
          m.style.transform = 'translateY(-10px)';
        }
      });
    }
  });

  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('focus', () => {
      languageSelect.style.boxShadow = '0 0 0 3px rgba(33,128,141,0.5)';
    });
    languageSelect.addEventListener('blur', () => {
      languageSelect.style.boxShadow = '';
    });
  }
});

function maybeInjectAdsenseOnNavigation(pageId) {
  const excluded = ['terms', 'privacy-policy', 'cookie-settings', 'contact'];
  if (excluded.includes(pageId)) return;
  if (document.querySelector('script[src*="googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1237323355260727";
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

if (window.jobbyistApp && typeof window.jobbyistApp.showPage === 'function') {
  const originalShowPage = window.jobbyistApp.showPage.bind(window.jobbyistApp);
  window.jobbyistApp.showPage = function (pageId) {
    originalShowPage(pageId);
    maybeInjectAdsenseOnNavigation(pageId);
  };
}
/* END enhancements */
