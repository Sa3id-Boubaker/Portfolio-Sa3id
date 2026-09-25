/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (themeToggle) {
      themeToggle.innerHTML = `<i class="bi ${isDark ? 'bi-sun' : 'bi-moon-stars'}"></i>`;
      themeToggle.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
      themeToggle.setAttribute('title', isDark ? 'Mode clair' : 'Mode sombre');
    }
  }

  applyTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  /**
   * Init typed.js (language-aware)
   */
  var typedInstance = null;
  function initTyped(lang) {
    const selectTyped = document.querySelector('.typed');
    if (!selectTyped) return;
    const attr = lang === 'en' && selectTyped.hasAttribute('data-typed-items-en')
      ? 'data-typed-items-en'
      : 'data-typed-items';
    const typed_strings = selectTyped.getAttribute(attr).split(',');
    if (typedInstance) typedInstance.destroy();
    typedInstance = new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Language switcher (FR/EN)
   */
  const langToggle = document.querySelector('.lang-toggle');
  const translations = window.PORTFOLIO_TRANSLATIONS || {};
  const ATTR_I18N_MAP = {
    'data-i18n-placeholder': 'placeholder',
    'data-i18n-aria-label': 'aria-label',
    'data-i18n-title': 'title',
    'data-i18n-alt': 'alt'
  };

  function translate(lang, key) {
    return translations[lang] ? translations[lang][key] : undefined;
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const val = translate(lang, el.getAttribute('data-i18n'));
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const val = translate(lang, el.getAttribute('data-i18n-html'));
      if (val !== undefined) el.innerHTML = val;
    });

    Object.keys(ATTR_I18N_MAP).forEach((dataAttr) => {
      document.querySelectorAll('[' + dataAttr + ']').forEach((el) => {
        const val = translate(lang, el.getAttribute(dataAttr));
        if (val !== undefined) el.setAttribute(ATTR_I18N_MAP[dataAttr], val);
      });
    });

    initTyped(lang);

    if (langToggle) {
      langToggle.textContent = lang === 'fr' ? 'EN' : 'FR';
      const label = lang === 'fr' ? 'Switch to English' : 'Passer en français';
      langToggle.setAttribute('aria-label', label);
      langToggle.setAttribute('title', label);
    }
  }

  const savedLang = localStorage.getItem('portfolio-lang') || 'fr';
  applyLanguage(savedLang);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const nextLang = document.documentElement.getAttribute('lang') === 'fr' ? 'en' : 'fr';
      localStorage.setItem('portfolio-lang', nextLang);
      applyLanguage(nextLang);
    });
  }

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          const value = el.getAttribute('aria-valuenow') + '%';
          el.parentElement.style.setProperty('--skill-percent', value);
          el.style.width = value;
          el.style.flexBasis = value;
        });
      }
    });
    item.querySelectorAll('.progress .progress-bar').forEach(el => {
      const value = el.getAttribute('aria-valuenow') + '%';
      el.parentElement.style.setProperty('--skill-percent', value);
      el.style.width = value;
      el.style.flexBasis = value;
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Portfolio horizontal row filters (plain, no isotope)
   */
  document.querySelectorAll('.portfolio-scroll-row').forEach(function(row) {
    const filterList = row.closest('.container').querySelector('.portfolio-filters');
    if (!filterList) return;
    const marquee = row.closest('.portfolio-marquee');

    filterList.querySelectorAll('li').forEach(function(filterEl) {
      filterEl.addEventListener('click', function() {
        filterList.querySelector('.filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        const filter = this.getAttribute('data-filter');
        const isAll = filter === '*';

        row.querySelectorAll('.portfolio-item').forEach(function(item) {
          if (!isAll && item.hasAttribute('aria-hidden')) {
            item.style.display = 'none';
            return;
          }
          const show = isAll || item.matches(filter);
          item.style.display = show ? '' : 'none';
        });

        if (marquee) {
          marquee.classList.toggle('is-filtered', !isAll);
        }
      }, false);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.querySelectorAll('.project-card-clickable').forEach(card => {
    const openProject = () => {
      window.location.href = card.dataset.projectUrl;
    };

    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      openProject();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject();
      }
    });
  });

})();