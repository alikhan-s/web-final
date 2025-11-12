// main.js — централизованная логика для всех страниц
const App = (function () {
  
  // --- Полный словарь переводов ---
  const LANGS = {
    ru: {
      // Навигация
      "nav.home": "Главная",
      "nav.search": "Поиск",
      "nav.projects": "Проекты",
      "nav.about": "О нас",
      "nav.login": "Войти",
      "nav.signup": "Регистрация",
      // Главная (Hero)
      "hero.title": "Найди команду. Начни проект. Развивайся.",
      "hero.subtitle": "Платформа для начинающих специалистов — находи людей с похожими навыками, создавай команды и запускай первые проекты.",
      "hero.cta1": "Начать поиск",
      "hero.cta2": "Как это работает",
      // Главная (Быстрый поиск)
      "quicksearch.title": "Быстрый поиск",
      "quicksearch.label": "Что ищешь?",
      "quicksearch.placeholder": "frontend, дизайнер...",
      "quicksearch.role": "Роль",
      "quicksearch.btn": "Поиск",
      "quicksearch.invalid": "Введите запрос",
      // Главная (Рекомендованные)
      "recommended.title": "Рекомендованные специалисты",
      "recommended.subtitle": "Фильтр по навыкам и опыту",
      // Поиск
      "search.title": "Поиск специалистов",
      "search.placeholder": "Введите навык (React, Python...)",
      "search.anyRole": "Любая роль",
      "search.btn": "Поиск",
      "search.noResults": "Ничего не найдено",
      // Проекты
      "projects.title": "Активные проекты",
      "projects.join": "Присоединиться",
      // О нас
      "about.title": "О проекте FindTeam",
      "about.p1": "FindTeam — платформа для студентов и начинающих специалистов, которая помогает находить единомышленников для совместных проектов, хакатонов и стартапов. Наша цель — сделать первый командный опыт доступным и комфортным.",
      "about.li1": "Поиск людей по навыкам",
      "about.li2": "Публикация проектов и поиск участников",
      "about.li3": "Удобный интерфейс и фильтрация",
      // Вход (Login)
      "login.title": "Вход",
      "login.email": "Email",
      "login.password": "Пароль",
      "login.btn": "Войти",
      "login.noAccount": "Нет аккаунта?",
      "login.signupLink": "Регистрация",
      "login.alert": "Вход выполнен (демо).",
      // Регистрация (Signup)
      "signup.title": "Регистрация",
      "signup.name": "Имя",
      "signup.email": "Email",
      "signup.password": "Пароль",
      "signup.role": "Роль",
      "signup.btn": "Создать аккаунт",
      "signup.alert": "Аккаунт создан (демо). Проверьте email (заглушка).",
      // Сообщения об ошибках (Forms)
      "invalid.name": "Введите имя",
      "invalid.email": "Введите корректный email",
      "invalid.password": "Пароль минимум 6 символов",
      // Динамический контент (Модалки, кнопки)
      "modal.details": "Подробнее",
      "modal.role": "Роль",
      "modal.bio": "О себе",
      "modal.skills": "Навыки",
      "modal.contacts": "Контакты",
      "modal.close": "Закрыть",
      "modal.copy": "Копировать Email",
      "modal.copied": "Скопировано!",
      "modal.copyError": "Ошибка!",
      "modal.project.desc": "Описание",
      "modal.project.tags": "Тэги",
      "modal.project.owner": "Владелец",
      "modal.project.needed": "Нужны"
    },
    en: {
      // Nav
      "nav.home": "Home",
      "nav.search": "Search",
      "nav.projects": "Projects",
      "nav.about": "About",
      "nav.login": "Login",
      "nav.signup": "Sign up",
      // Hero
      "hero.title": "Find teammates. Start a project. Grow.",
      "hero.subtitle": "A platform for beginners — find people with similar skills, build teams and launch your first projects.",
      "hero.cta1": "Start searching",
      "hero.cta2": "How it works",
      // Quick Search
      "quicksearch.title": "Quick search",
      "quicksearch.label": "What are you looking for?",
      "quicksearch.placeholder": "frontend, designer...",
      "quicksearch.role": "Role",
      "quicksearch.btn": "Search",
      "quicksearch.invalid": "Enter a query",
      // Recommended
      "recommended.title": "Recommended specialists",
      "recommended.subtitle": "Filter by skills and experience",
      // Search
      "search.title": "Search Specialists",
      "search.placeholder": "Enter a skill (React, Python...)",
      "search.anyRole": "Any role",
      "search.btn": "Search",
      "search.noResults": "Nothing found",
      // Projects
      "projects.title": "Active Projects",
      "projects.join": "Join",
      // About
      "about.title": "About FindTeam",
      "about.p1": "FindTeam is a platform for students and beginners, helping to find teammates for joint projects, hackathons, and startups. Our goal is to make the first team experience accessible and comfortable.",
      "about.li1": "Search for people by skills",
      "about.li2": "Publish projects and find members",
      "about.li3": "Convenient interface and filtering",
      // Login
      "login.title": "Login",
      "login.email": "Email",
      "login.password": "Password",
      "login.btn": "Login",
      "login.noAccount": "No account?",
      "login.signupLink": "Sign up",
      "login.alert": "Login successful (demo).",
      // Signup
      "signup.title": "Sign up",
      "signup.name": "Name",
      "signup.email": "Email",
      "signup.password": "Password",
      "signup.role": "Role",
      "signup.btn": "Create account",
      "signup.alert": "Account created (demo). Check your email (stub).",
      // Form Invalids
      "invalid.name": "Enter your name",
      "invalid.email": "Enter a valid email",
      "invalid.password": "Password must be at least 6 characters",
      // Dynamic content
      "modal.details": "Details",
      "modal.role": "Role",
      "modal.bio": "About",
      "modal.skills": "Skills",
      "modal.contacts": "Contacts",
      "modal.close": "Close",
      "modal.copy": "Copy Email",
      "modal.copied": "Copied!",
      "modal.copyError": "Error!",
      "modal.project.desc": "Description",
      "modal.project.tags": "Tags",
      "modal.project.owner": "Owner",
      "modal.project.needed": "Members needed"
    }
  };

  const state = {
    lang: localStorage.getItem('ft_lang') || 'ru',
    // --- УБИРАЕМ 'theme' из state, им будет управлять localStorage + applySavedTheme ---
    users: [],
    projects: []
  };

  // Utils
  function $qs(sel, root = document) { return root.querySelector(sel); }
  function $qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  // --- Функция для получения перевода в JS ---
  function getTranslation(key) {
    return LANGS[state.lang][key] || key; 
  }

  // --- i18n (теперь также для placeholder) ---
  function applyTranslations() {
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'ru';
    const dict = LANGS[state.lang];
    
    $qsa('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.placeholder !== undefined) {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
    // lang toggle button label
    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = state.lang === 'ru' ? 'EN' : 'RU';
  }

  // --- УБИРАЕМ СТАРУЮ ФУНКЦИЮ setTheme ---

  // Fetch JSON helpers
  async function loadJSON(path) {
    try {
      const r = await fetch(path);
      if (!r.ok) throw new Error('Не удалось загрузить ' + path);
      return await r.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  // --- ОБНОВЛЕНО: renderUserCard (добавлен data-i18n) ---
  function renderUserCard(u) {
    const col = document.createElement('div');
    col.className = 'col-md-4 reveal-on-scroll';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-center mb-3">
            <div class="avatar me-3" aria-hidden="true">${u.name[0]}</div>
            <div>
              <h5 class="mb-0">${u.name}</h5>
              <small class="text-muted">${u.role} — ${u.experience}</small>
            </div>
          </div>
          <p class="flex-grow-1">${u.bio}</p>
          <div class="mb-3">${u.skills.map(s => `<span class="badge bg-light text-dark me-1">${s}</span>`).join('')}</div>
          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-outline-primary btn-sm btn-details" data-id="${u.id}" data-i18n="modal.details">Подробнее</button>
            <a class="btn btn-primary btn-sm" href="mailto:${u.contact.email}" data-i18n="modal.contacts">Связаться</a>
          </div>
        </div>
      </div>
    `;
    return col;
  }

  // --- ОБНОВЛЕНО: renderProjectCard (добавлен data-i18n) ---
  function renderProjectCard(p) {
    const col = document.createElement('div');
    col.className = 'col-md-4 reveal-on-scroll';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h5>${p.title}</h5>
          <p class="flex-grow-1">${p.short}</p>
          <div class="mb-3">${p.tags.map(t => `<span class="badge bg-light text-dark me-1">${t}</span>`).join('')}</div>
          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-outline-primary btn-sm btn-project" data-id="${p.id}" data-i18n="modal.details">Подробнее</button>
            <button class="btn btn-primary btn-sm" data-i18n="projects.join">Присоединиться</button>
          </div>
        </div>
      </div>
    `;
    return col;
  }

  // Custom modal
  function openModal(htmlContent) {
    closeModal();
    const backdrop = document.createElement('div');
    backdrop.className = 'custom-modal-backdrop';
    backdrop.innerHTML = `<div class="custom-modal" role="dialog" aria-modal="true">${htmlContent}</div>`;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
    document.getElementById('modalRoot')?.appendChild(backdrop);
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    const root = document.getElementById('modalRoot');
    if (!root) return;
    root.innerHTML = '';
    document.body.style.overflow = '';
  }

  // Scroll Animation Logic
  function handleScrollAnimations() {
    const $window = $(window);
    const windowBottom = $window.scrollTop() + $window.height();

    $('.reveal-on-scroll').each(function () {
      const $el = $(this);
      const elementTop = $el.offset().top;

      if (elementTop < windowBottom - 100) {
        $el.addClass('is-visible');
      }
    });
  }

  // Initialize page-specific functionality
  async function initIndexPage() {
    document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

    state.users = await loadJSON('data/users.json');
    const container = document.getElementById('recommended');
    if (container) {
      container.innerHTML = '';
      state.users.forEach(u => container.appendChild(renderUserCard(u)));
    }

    const quickSearch = document.getElementById('quickSearch');
    if (quickSearch) {
      quickSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = document.getElementById('q').value.trim();
        if (!q) {
          const input = document.getElementById('q');
          input.classList.add('is-invalid');
          setTimeout(()=>input.classList.remove('is-invalid'), 1400);
          return;
        }
        const role = document.getElementById('role').value;
        const url = new URL(window.location.origin + '/search.html');
        url.searchParams.set('q', q);
        if (role) url.searchParams.set('role', role);
        window.location.href = url.toString();
      });
    }

    // --- ОБНОВЛЕНО: Модальное окно (использует getTranslation) ---
    document.getElementById('recommended')?.addEventListener('click', (e) => {
      if (e.target.matches('.btn-details')) {
        const id = Number(e.target.dataset.id);
        const user = state.users.find(u => u.id === id);
        if (user) {
          openModal(`
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h4>${user.name}</h4>
              <button class="btn btn-sm btn-outline-secondary" id="modalClose">${getTranslation('modal.close')}</button>
            </div>
            <p><strong>${getTranslation('modal.role')}:</strong> ${user.role} — ${user.experience}</p>
            <p><strong>${getTranslation('modal.bio')}:</strong> ${user.bio}</p>
            <p><strong>${getTranslation('modal.skills')}:</strong> ${user.skills.join(', ')}</p>
            <p><strong>${getTranslation('modal.contacts')}:</strong> <a href="mailto:${user.contact.email}">${user.contact.email}</a> 
              <button class="btn btn-sm btn-outline-secondary ms-2 btn-copy" data-copy-text="${user.contact.email}">${getTranslation('modal.copy')}</button> • 
              <a href="https://t.me/${user.contact.telegram.replace('@','')}" target="_blank" rel="noopener noreferrer">${user.contact.telegram}</a>
            </p>
          `);
          document.getElementById('modalRoot')?.addEventListener('click', (ev) => {
            if (ev.target && ev.target.id === 'modalClose') closeModal();
          });
        }
      }
    });
  }

  async function initSearchPage() {
    state.users = await loadJSON('data/users.json');
    const results = document.getElementById('results');

    function renderResults(list) {
      results.innerHTML = '';
      if (list.length === 0) {
        results.innerHTML = `<div class="col-12"><div class="alert alert-info">${getTranslation('search.noResults')}</div></div>`;
        return;
      }
      list.forEach(u => results.appendChild(renderUserCard(u)));
      handleScrollAnimations();
    }

    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const role = params.get('role') || '';
    if (q) document.getElementById('skill').value = q;
    if (role) document.getElementById('roleSelect').value = role;

    renderResults(state.users);

    document.getElementById('searchForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const skill = document.getElementById('skill').value.trim().toLowerCase();
      const roleV = document.getElementById('roleSelect').value;
      const res = state.users.filter(u => {
        const matchesSkill = skill === '' || u.skills.join(' ').toLowerCase().includes(skill) || u.name.toLowerCase().includes(skill) || u.bio.toLowerCase().includes(skill);
        const matchesRole = roleV === '' || u.role.toLowerCase() === roleV.toLowerCase();
        return matchesSkill && matchesRole;
      });
      renderResults(res);
    });

    // --- ОБНОВЛЕНО: Модальное окно (использует getTranslation) ---
    document.getElementById('results')?.addEventListener('click', (e) => {
      if (e.target.matches('.btn-details')) {
        const id = Number(e.target.dataset.id);
        const user = state.users.find(u => u.id === id);
        if (user) {
          openModal(`
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h4>${user.name}</h4>
              <button class="btn btn-sm btn-outline-secondary" id="modalClose">${getTranslation('modal.close')}</button>
            </div>
            <p><strong>${getTranslation('modal.role')}:</strong> ${user.role} — ${user.experience}</p>
            <p><strong>${getTranslation('modal.bio')}:</strong> ${user.bio}</p>
            <p><strong>${getTranslation('modal.skills')}:</strong> ${user.skills.join(', ')}</p>
            <p><strong>${getTranslation('modal.contacts')}:</strong> <a href="mailto:${user.contact.email}">${user.contact.email}</a> 
              <button class="btn btn-sm btn-outline-secondary ms-2 btn-copy" data-copy-text="${user.contact.email}">${getTranslation('modal.copy')}</button> • 
              <a href="https://t.me/${user.contact.telegram.replace('@','')}" target="_blank">${user.contact.telegram}</a>
            </p>
          `);
        }
      }
    });
  }

  async function initProjectsPage() {
    state.projects = await loadJSON('data/projects.json');
    const list = document.getElementById('projectsList');
    if (!list) return;
    list.innerHTML = '';
    state.projects.forEach(p => list.appendChild(renderProjectCard(p)));
    handleScrollAnimations();

    // --- ОБНОВЛЕНО: Модальное окно (использует getTranslation) ---
    list.addEventListener('click', (e) => {
      if (e.target.matches('.btn-project')) {
        const id = Number(e.target.dataset.id);
        const project = state.projects.find(p => p.id === id);
        if (project) {
          openModal(`
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h4>${project.title}</h4>
              <button class="btn btn-sm btn-outline-secondary" id="modalClose">${getTranslation('modal.close')}</button>
            </div>
            <p><strong>${getTranslation('modal.project.desc')}:</strong> ${project.description}</p>
            <p><strong>${getTranslation('modal.project.tags')}:</strong> ${project.tags.join(', ')}</p>
            <p><strong>${getTranslation('modal.project.owner')}:</strong> ${project.owner}</p>
            <p><strong>${getTranslation('modal.project.needed')}:</strong> ${project.membersNeeded.join(', ')}</p>
          `);
        }
      }
    });
  }

  // --- ОБНОВЛЕНО: Валидация (использует getTranslation) ---
  function attachFormValidation() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function (e) {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
          form.classList.add('was-validated');
          return;
        }
        
        if (form.id === 'signupForm') {
          e.preventDefault();
          alert(getTranslation('signup.alert'));
          form.reset();
        } else if (form.id === 'loginForm') {
          e.preventDefault();
          alert(getTranslation('login.alert'));
          form.reset();
        }
      }, false);
    });
  }

  // Global initializations
  async function init() {
    // 1. Применяем язык
    applyTranslations();

    // --- 2. НОВАЯ ЛОГИКА ТЕМЫ (из портфолио) ---
    const $themeToggle = $('#theme-toggle');
    const $body = $('body');

    function applySavedTheme() {
        const savedTheme = localStorage.getItem('ft_theme'); 
        if (savedTheme === 'dark') {
            $body.addClass('dark-mode');
            $themeToggle.removeClass('bi-moon-fill').addClass('bi-sun-fill');
        } else {
            $body.removeClass('dark-mode');
            $themeToggle.removeClass('bi-sun-fill').addClass('bi-moon-fill');
        }
    }
    // Сразу применяем тему при загрузке
    applySavedTheme(); 

    $themeToggle.on('click', function() {
        $body.toggleClass('dark-mode');
        if ($body.hasClass('dark-mode')) {
            localStorage.setItem('ft_theme', 'dark'); 
            $themeToggle.removeClass('bi-moon-fill').addClass('bi-sun-fill');
        } else {
            localStorage.setItem('ft_theme', 'light'); 
            $themeToggle.removeClass('bi-sun-fill').addClass('bi-moon-fill');
        }
    });
    // --- КОНЕЦ НОВОЙ ЛОГИКИ ТЕМЫ ---

    // 3. Остальная логика
    
    // lang toggle
    document.getElementById('langToggle')?.addEventListener('click', () => {
      state.lang = state.lang === 'ru' ? 'en' : 'ru';
      localStorage.setItem('ft_lang', state.lang);
      applyTranslations();
    });

    // close modal on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Back to Top Button Logic
    const $topBtn = $('.back-to-top');
    $(window).on('scroll', () => {
      if ($(this).scrollTop() > 300) {
        $topBtn.fadeIn();
      } else {
        $topBtn.fadeOut();
      }
    });
    $topBtn.on('click', (e) => {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // --- ОБНОВЛЕНО: Копирование (использует getTranslation) ---
    $('#modalRoot').on('click', '.btn-copy', function() {
      const $btn = $(this);
      const textToCopy = $btn.attr('data-copy-text');

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = $btn.text();
        $btn.text(getTranslation('modal.copied'));
        $btn.prop('disabled', true);
        setTimeout(() => {
          $btn.text(getTranslation('modal.copy')); 
          $btn.prop('disabled', false);
        }, 2000);
      }).catch(err => {
        console.error('Не удалось скопировать: ', err);
        $btn.text(getTranslation('modal.copyError'));
      });
    });

    // Scroll Animations Trigger
    $(window).on('scroll load', handleScrollAnimations);
    
    // Attach general form validation
    attachFormValidation();

    // Preloader Hide
    $(window).on('load', () => {
      const $preloader = $('#preloader');
      if ($preloader.length) {
        $preloader.css('opacity', 0);
        setTimeout(() => $preloader.hide(), 500); 
      }
    });

    // Route-specific
    const page = window.location.pathname.split('/').pop();
    if (page === '' || page === 'index.html') await initIndexPage();
    if (page === 'search.html') await initSearchPage();
    if (page === 'projects.html') await initProjectsPage();
  }

  return { init };
})();

// Start app after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  App.init().catch(err => console.error(err));
});