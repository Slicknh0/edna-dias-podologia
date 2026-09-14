/* Edna Dias Podologia — the only JavaScript on the page.
   Three jobs: header shadow on scroll, the mobile WhatsApp bar, conversion events.
   No dependencies. Nothing here is required for the page to be readable or usable. */
(function () {
  'use strict';

  /* ---- Footer year ------------------------------------------------------ */
  var year = document.getElementById('ano');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Header elevation + sticky mobile CTA -----------------------------
     Both react to the same scroll position, so they share one passive
     listener throttled to the frame. */
  var header = document.querySelector('.header');
  var sticky = document.getElementById('stickyCta');
  var stickyLink = sticky ? sticky.querySelector('a') : null;
  var ticking = false;
  var stickyShown = false;

  /* The bar appears once the hero's own button has actually left the screen, so a tall
     phone never shows two identical WhatsApp buttons at once. Where IntersectionObserver
     is missing, `observed` stays false and update() falls back to a scroll distance. */
  var heroCta = document.querySelector('.hero__actions .btn--whatsapp');
  var observed = false;
  var heroCtaGone = false;

  if (heroCta && 'IntersectionObserver' in window) {
    observed = true;
    new IntersectionObserver(
      function (entries) {
        heroCtaGone = !entries[0].isIntersecting;
        update();
      },
      { threshold: 0 }
    ).observe(heroCta);
  }

  function update() {
    var y = window.scrollY || window.pageYOffset;

    if (header) {
      header.setAttribute('data-scrolled', y > 8 ? 'true' : 'false');
    }

    if (sticky) {
      /* Hide again near the footer so the bar never sits on top of the final CTA. */
      var docHeight = document.documentElement.scrollHeight;
      var nearEnd = y + window.innerHeight > docHeight - 260;
      var past = observed ? heroCtaGone : y > 620;
      var shouldShow = past && !nearEnd;

      if (shouldShow !== stickyShown) {
        stickyShown = shouldShow;
        sticky.setAttribute('data-visible', shouldShow ? 'true' : 'false');
        sticky.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
        /* Keep the hidden bar out of the tab order entirely. */
        if (stickyLink) stickyLink.tabIndex = shouldShow ? 0 : -1;
      }
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  /* ---- Conversion tracking ---------------------------------------------
     Every WhatsApp, phone, maps and Instagram link carries a data-track name.
     No analytics ID is configured, so this only pushes to whichever layer is
     present. Wire GA4 or GTM later and the events start flowing — nothing
     here needs to change. */
  document.addEventListener(
    'click',
    function (event) {
      var el = event.target.closest('[data-track]');
      if (!el) return;

      var name = el.getAttribute('data-track');

      if (typeof window.gtag === 'function') {
        window.gtag('event', name, {
          event_category: 'contato',
          event_label: el.getAttribute('href') || ''
        });
      }

      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: name,
          link_url: el.getAttribute('href') || ''
        });
      }
    },
    { passive: true }
  );
})();
