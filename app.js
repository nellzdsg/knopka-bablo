/* Кнопка Бабло — логика страницы */
(function () {
  'use strict';

  var SITE = window.SITE || { categories: [], faq: [] };

  /* ---------- разметка ---------- */

  function tile(icon, tone, cls) {
    return (
      '<span class="tile' + (cls ? ' ' + cls : '') + '" data-tone="' + tone +
      '" aria-hidden="true"><svg class="i"><use href="#i-' + icon + '"/></svg></span>'
    );
  }

  function card(item) {
    return (
      '<article class="card">' +
        '<div class="card__top">' +
          tile(item.icon, item.tone) +
          (item.badge ? '<span class="badge">' + item.badge + '</span>' : '') +
        '</div>' +
        '<h4 class="card__name">' + item.name + '</h4>' +
        '<p class="card__desc">' + item.desc + '</p>' +
        '<div class="card__act">' +
          '<a class="card__btn" href="' + item.url + '" target="_blank" rel="noopener sponsored nofollow">' +
            '<span>Открыть</span>' +
            '<svg class="i" aria-hidden="true"><use href="#i-arrowUpRight"/></svg>' +
          '</a>' +
          '<button class="iconbtn" type="button" data-copy="' + item.url + '" ' +
            'aria-label="Скопировать ссылку на ' + item.name + '" title="Скопировать ссылку">' +
            '<svg class="i" aria-hidden="true"><use href="#i-copy"/></svg>' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }

  function category(cat, index) {
    var panelId = 'cat-' + cat.id;
    var btnId = 'cat-btn-' + cat.id;

    return (
      '<article class="cat" data-cat="' + cat.id + '">' +
        '<h3 class="cat__h">' +
          '<button class="cat__btn" type="button" id="' + btnId + '" aria-expanded="false" aria-controls="' + panelId + '">' +
            tile(cat.icon, cat.tone) +
            '<span class="cat__name">' + cat.title +
              ' <span class="cat__count">' + cat.items.length + '</span>' +
            '</span>' +
            '<span class="cat__chev" aria-hidden="true"><svg class="i"><use href="#i-chevron"/></svg></span>' +
          '</button>' +
        '</h3>' +
        '<div class="cat__panel" id="' + panelId + '" role="region" aria-labelledby="' + btnId + '">' +
          '<div class="cat__inner">' +
            '<div class="cat__body">' +
              (cat.note ? '<p class="cat__note">' + cat.note + '</p>' : '') +
              '<div class="cards">' + cat.items.map(card).join('') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function faqItem(entry, index) {
    var answerId = 'faq-a-' + index;

    return (
      '<div class="faq__item" data-faq>' +
        '<h3 class="cat__h">' +
          '<button class="faq__q" type="button" aria-expanded="false" aria-controls="' + answerId + '">' +
            '<span>' + entry.q + '</span>' +
            '<svg class="i" aria-hidden="true"><use href="#i-chevron"/></svg>' +
          '</button>' +
        '</h3>' +
        '<div class="faq__a" id="' + answerId + '">' +
          '<div><p>' + entry.a + '</p></div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ---------- рендер ---------- */

  var catsHost = document.getElementById('cats');
  if (catsHost) catsHost.innerHTML = SITE.categories.map(category).join('');

  var faqHost = document.getElementById('faq-list');
  if (faqHost) faqHost.innerHTML = SITE.faq.map(faqItem).join('');

  /* один и тот же бот может стоять в нескольких разделах — считаем по ссылке */
  var seenUrls = {};
  var botsCount = 0;
  SITE.categories.forEach(function (cat) {
    cat.items.forEach(function (item) {
      if (seenUrls[item.url]) return;
      seenUrls[item.url] = true;
      botsCount += 1;
    });
  });

  var statBots = document.querySelector('[data-stat="bots"]');
  var statCats = document.querySelector('[data-stat="cats"]');
  if (statBots) statBots.textContent = botsCount;
  if (statCats) statCats.textContent = SITE.categories.length;

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- аккордеоны ---------- */

  function setOpen(container, open, animate) {
    container.classList.toggle('is-open', open);
    var control = container.querySelector('[aria-expanded]');
    if (control) control.setAttribute('aria-expanded', String(open));

    var panel = container.querySelector('.cat__panel, .faq__a');
    if (!panel) return;

    if (animate) {
      panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
      return;
    }

    var prev = panel.style.transition;
    panel.style.transition = 'none';
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
    void panel.offsetHeight;
    panel.style.transition = prev;
  }

  function syncOpenPanels() {
    Array.prototype.forEach.call(
      document.querySelectorAll('.cat.is-open .cat__panel, .faq__item.is-open .faq__a'),
      function (panel) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    );
  }

  /* При заходе на сайт все разделы свёрнуты — состояние не запоминаем. */
  var cats = Array.prototype.slice.call(document.querySelectorAll('.cat'));
  cats.forEach(function (cat) {
    setOpen(cat, false, false);

    cat.querySelector('.cat__btn').addEventListener('click', function () {
      setOpen(cat, !cat.classList.contains('is-open'), true);
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-faq]'), function (item) {
    var btn = item.querySelector('.faq__q');
    setOpen(item, false, false);
    btn.addEventListener('click', function () {
      setOpen(item, !item.classList.contains('is-open'), true);
    });
  });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncOpenPanels, 150);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncOpenPanels);
  }

  /* ---------- копирование ---------- */

  var toastEl = document.getElementById('toast');
  var toastTimer = null;

  function toast(message) {
    if (!toastEl) return;
    toastEl.innerHTML =
      '<svg class="i" aria-hidden="true"><use href="#i-check"/></svg><span>' + message + '</span>';
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('is-on');
    }, 2200);
  }

  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return legacyCopy(text);
        }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  document.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-copy]');
    if (!btn) return;

    copyText(btn.getAttribute('data-copy')).then(function (ok) {
      if (!ok) {
        toast('Не получилось — скопируй адрес из строки браузера');
        return;
      }

      btn.classList.add('is-done');
      var use = btn.querySelector('use');
      if (use) use.setAttribute('href', '#i-check');
      toast('Ссылка скопирована');

      setTimeout(function () {
        btn.classList.remove('is-done');
        if (use) use.setAttribute('href', '#i-copy');
      }, 1600);
    });
  });

  /* ---------- мобильное меню ---------- */

  var hdr = document.getElementById('hdr');
  var burger = document.getElementById('burger');

  function closeMenu() {
    if (!hdr) return;
    hdr.classList.remove('is-open');
    if (burger) {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      var use = burger.querySelector('use');
      if (use) use.setAttribute('href', '#i-menu');
    }
  }

  if (burger && hdr) {
    burger.addEventListener('click', function () {
      var open = !hdr.classList.contains('is-open');
      hdr.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      var use = burger.querySelector('use');
      if (use) use.setAttribute('href', open ? '#i-close' : '#i-menu');
    });

    document.querySelectorAll('.nav a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (!hdr.classList.contains('is-open')) return;
      if (event.target.closest('#hdr')) return;
      closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---------- шапка, «наверх», подсветка меню ---------- */

  var totop = document.getElementById('totop');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    })
    .filter(Boolean);

  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      ticking = false;

      if (hdr) hdr.classList.toggle('is-scrolled', y > 8);
      if (totop) totop.classList.toggle('is-on', y > 640);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (totop) {
    totop.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }
})();
