'use strict';

// Keep links from the earlier single-page version working.
const legacyPages = {
  '#about': 'about.html',
  '#portfolio': 'portfolio.html',
  '#contact': 'contact.html'
};

function followLegacyLink() {
  const filename = location.pathname.split('/').pop();
  if ((filename === '' || filename === 'index.html') && legacyPages[location.hash]) {
    location.replace(legacyPages[location.hash]);
  }
}

function resetDocument() {
  document.querySelectorAll('.document-content').forEach((content) => {
    content.scrollTop = 0;
  });
}

followLegacyLink();
window.addEventListener('hashchange', () => {
  followLegacyLink();
  resetDocument();
});

window.addEventListener('pageshow', (event) => {
  resetDocument();
  // Replay the opening when returning to a cached document page.
  if (event.persisted) {
    document.querySelectorAll('.file-view.is-open').forEach((page) => {
      page.classList.remove('is-open');
      void page.offsetWidth;
      page.classList.add('is-open');
    });
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    window.location.href = 'index.html#files';
  }
});
