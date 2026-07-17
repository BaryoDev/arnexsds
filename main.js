// Arnex Software Development Services — front-end behavior
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

  // --- Contact form (Web3Forms) with honeypot + graceful result ---
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var status = document.getElementById('form-status');
      var key = form.getAttribute('data-access-key') || '';
      // Honeypot: if filled, silently drop (a bot did it)
      if (form.querySelector('[name="botcheck"]') && form.querySelector('[name="botcheck"]').checked) return;
      if (!key || key.indexOf('YOUR_') === 0) {
        if (status) status.textContent = 'Contact form not yet configured. Please email or call us directly using the details on this page.';
        return;
      }
      var data = new FormData(form);
      data.append('access_key', key);
      if (status) status.textContent = 'Sending…';
      fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (r.success) { form.reset(); if (status) status.textContent = 'Thanks — your message has been sent. We’ll reply shortly.'; }
          else if (status) status.textContent = 'Sorry, something went wrong. Please email us directly instead.';
        })
        .catch(function () { if (status) status.textContent = 'Sorry, something went wrong. Please email us directly instead.'; });
    });
  }

  // --- Current year in footer ---
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
});
