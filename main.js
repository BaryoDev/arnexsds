// Arnex Software Development Services - front-end behavior
document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile navigation ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // --- Anti-spam email: assembled at runtime so it never sits in the HTML source ---
  document.querySelectorAll('[data-email]').forEach(function (el) {
    var user = el.getAttribute('data-user');
    var domain = el.getAttribute('data-domain');
    if (!user || !domain) return;
    var addr = user + '@' + domain;
    if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + addr);
    if (el.getAttribute('data-text') !== 'keep') el.textContent = addr;
  });

  // --- Anti-spam phone: assembled at runtime ---
  document.querySelectorAll('[data-phone]').forEach(function (el) {
    var num = el.getAttribute('data-phone');
    var display = el.getAttribute('data-display') || num;
    if (el.tagName === 'A') el.setAttribute('href', 'tel:' + num);
    if (el.getAttribute('data-text') !== 'keep') el.textContent = display;
  });

  // --- Reveal on scroll ---
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // --- Current year in footer ---
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
});
