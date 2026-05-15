const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-primary-nav]');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const imageLinks = Array.from(document.querySelectorAll('.modern-content a[href], .hero-gallery a[href]'))
  .filter(a => /\.(png|jpe?g|gif|webp)$/i.test(a.getAttribute('href')));
if (imageLinks.length) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button type="button" aria-label="Close image">×</button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(box);
  const img = box.querySelector('img');
  const cap = box.querySelector('figcaption');
  const close = () => { box.classList.remove('open'); img.removeAttribute('src'); };
  box.querySelector('button').addEventListener('click', close);
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  imageLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const thumb = a.querySelector('img');
      img.src = a.href;
      img.alt = (thumb && thumb.alt) || a.title || a.textContent.trim() || 'Jolley Foxtrotters photo';
      cap.textContent = a.title || (thumb && thumb.alt) || '';
      box.classList.add('open');
    });
  });
}