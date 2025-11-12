// main.js — централизованная логика для всех страниц
const App = (function () {
  const LANGS = {
    ru: {
      "nav.home": "Главная",
      "nav.search": "Поиск",
      "nav.projects": "Проекты",
      "nav.about": "О нас",
      "nav.login": "Войти",
      "nav.signup": "Регистрация",
      "hero.title": "Найди команду. Начни проект. Развивайся.",
      "hero.subtitle": "Платформа для начинающих специалистов — находи людей с похожими навыками, создавай команды и запускай первые проекты.",
      "hero.cta1": "Начать поиск",
      "hero.cta2": "Как это работает",
      "quicksearch.title": "Быстрый поиск",
      "quicksearch.label": "Что ищешь?",
      "quicksearch.role": "Роль",
      "quicksearch.btn": "Поиск",
      "quicksearch.invalid": "Введите запрос",
      "recommended.title": "Рекомендованные специалисты",
      "recommended.subtitle": "Фильтр по навыкам и опыту"
    },
    en: {
      "nav.home": "Home",
      "nav.search": "Search",
      "nav.projects": "Projects",
      "nav.about": "About",
      "nav.login": "Login",
      "nav.signup": "Sign up",
      "hero.title": "Find teammates. Start a project. Grow.",
      "hero.subtitle": "A platform for beginners — find people with similar skills, build teams and launch your first projects.",
      "hero.cta1": "Start searching",
      "hero.cta2": "How it works",
      "quicksearch.title": "Quick search",
      "quicksearch.label": "What are you looking for?",
      "quicksearch.role": "Role",
      "quicksearch.btn": "Search",
      "quicksearch.invalid": "Enter a query",
      "recommended.title": "Recommended specialists",
      "recommended.subtitle": "Filter by skills and experience"
    }
  };

  const state = {
    lang: localStorage.getItem('ft_lang') || 'ru',
    theme: localStorage.getItem('ft_theme') || 'light',
    users: [],
    projects: []
  };

  // Utils
  function $qs(sel, root = document) { return root.querySelector(sel); }
  function $qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  // i18n simple
  function applyTranslations() {
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'ru';
    const dict = LANGS[state.lang];
    $qsa('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    // lang toggle button label
    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = state.lang === 'ru' ? 'EN' : 'RU';
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.getElementById && (document.getElementById('themeToggle').textContent = '☀️');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.getElementById && (document.getElementById('themeToggle').textContent = '🌙');
    }
    state.theme = theme;
    localStorage.setItem('ft_theme', theme);
  }

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

  // Render user card
  function renderUserCard(u) {
    const col = document.createElement('div');
    col.className = 'col-md-4';
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
            <button class="btn btn-outline-primary btn-sm btn-details" data-id="${u.id}">Подробнее</button>
            <a class="btn btn-primary btn-sm" href="mailto:${u.contact.email}">Связаться</a>
          </div>
        </div>
      </div>
    `;
    return col;
  }

  // Render project card
  function renderProjectCard(p) {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h5>${p.title}</h5>
          <p class="flex-grow-1">${p.short}</p>
          <div class="mb-3">${p.tags.map(t => `<span class="badge bg-light text-dark me-1">${t}</span>`).join('')}</div>
          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-outline-primary btn-sm btn-project" data-id="${p.id}">Подробнее</button>
            <button class="btn btn-primary btn-sm">Присоединиться</button>
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

  // Initialize page-specific functionality
  async function initIndexPage() {
    document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

    // load users
    state.users = await loadJSON('data/users.json');
    const container = document.getElementById('recommended');
    if (container) {
      container.innerHTML = '';
      state.users.forEach(u => container.appendChild(renderUserCard(u)));
    }

    // quick search
    const quickSearch = document.getElementById('quickSearch');
    if (quickSearch) {
      quickSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = document.getElementById('q').value.trim();
        if (!q) {
          // bootstrap validation
          const input = document.getElementById('q');
          input.classList.add('is-invalid');
          setTimeout(()=>input.classList.remove('is-invalid'), 1400);
          return;
        }
        // redirect to search with query params
        const role = document.getElementById('role').value;
        const url = new URL(window.location.origin + '/search.html');
        url.searchParams.set('q', q);
        if (role) url.searchParams.set('role', role);
        window.location.href = url.toString();
      });
    }

    // details button (event delegation)
    document.getElementById('recommended')?.addEventListener('click', (e) => {
      if (e.target.matches('.btn-details')) {
        const id = Number(e.target.dataset.id);
        const user = state.users.find(u => u.id === id);
        if (user) {
          openModal(`
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h4>${user.name}</h4>
              <button class="btn btn-sm btn-outline-secondary" id="modalClose">Закрыть</button>
            </div>
            <p><strong>Роль:</strong> ${user.role} — ${user.experience}</p>
            <p><strong>О себе:</strong> ${user.bio}</p>
            <p><strong>Навыки:</strong> ${user.skills.join(', ')}</p>
            <p><strong>Контакты:</strong> <a href="mailto:${user.contact.email}">${user.contact.email}</a> • <a href="https://t.me/${user.contact.telegram.replace('@','')}" target="_blank" rel="noopener noreferrer">${user.contact.telegram}</a></p>
          `);
          document.getElementById('modalRoot')?.addEventListener('click', (ev) => {
            if (ev.target && ev.target.id === 'modalClose') closeModal();
          });
        }
      }
    });
  }

  async function initSearchPage() {
    // load users
    state.users = await loadJSON('data/users.json');
    const results = document.getElementById('results');

    function renderResults(list) {
      results.innerHTML = '';
      if (list.length === 0) {
        results.innerHTML = `<div class="col-12"><div class="alert alert-info">Ничего не найдено</div></div>`;
        return;
      }
      list.forEach(u => results.appendChild(renderUserCard(u)));
    }

    // prefill from query string
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const role = params.get('role') || '';
    if (q) document.getElementById('skill').value = q;
    if (role) document.getElementById('roleSelect').value = role;

    // initial render: all
    renderResults(state.users);

    // form submit (filter)
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

    // details event listener (delegation)
    document.getElementById('results')?.addEventListener('click', (e) => {
      if (e.target.matches('.btn-details')) {
        const id = Number(e.target.dataset.id);
        const user = state.users.find(u => u.id === id);
        if (user) {
          openModal(`
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h4>${user.name}</h4>
              <button class="btn btn-sm btn-outline-secondary" id="modalClose">Закрыть</button>
            </div>
            <p><strong>Роль:</strong> ${user.role} — ${user.experience}</p>
            <p><strong>О себе:</strong> ${user.bio}</p>
            <p><strong>Навыки:</strong> ${user.skills.join(', ')}</p>
            <p><strong>Контакты:</strong> <a href="mailto:${user.contact.email}">${user.contact.email}</a> • <a href="https://t.me/${user.contact.telegram.replace('@','')}" target="_blank">${user.contact.telegram}</a></p>
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

    // details
    list.addEventListener('click', (e) => {
      if (e.target.matches('.btn-project')) {
        const id = Number(e.target.dataset.id);
        const project = state.projects.find(p => p.id === id);
        if (project) {
          openModal(`
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h4>${project.title}</h4>
              <button class="btn btn-sm btn-outline-secondary" id="modalClose">Закрыть</button>
            </div>
            <p><strong>Описание:</strong> ${project.description}</p>
            <p><strong>Тэги:</strong> ${project.tags.join(', ')}</p>
            <p><strong>Владелец:</strong> ${project.owner}</p>
            <p><strong>Нужны:</strong> ${project.membersNeeded.join(', ')}</p>
          `);
        }
      }
    });
  }

  // Form validation handlers for login/signup
  function attachFormValidation() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function (e) {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
          form.classList.add('was-validated');
          return;
        }
        // example fake success handling for login/signup — show alert / modal
        // For real projects: submit to backend endpoint
        if (form.id === 'signupForm') {
          e.preventDefault();
          alert('Аккаунт создан (демо). Проверьте email (заглушка).');
          form.reset();
        } else if (form.id === 'loginForm') {
          e.preventDefault();
          alert('Вход выполнен (демо).');
          form.reset();
        }
      }, false);
    });
  }

  // Global initializations
  async function init() {
    // apply lang and theme
    applyTranslations();
    setTheme(state.theme);

    // lang toggle
    document.getElementById('langToggle')?.addEventListener('click', () => {
      state.lang = state.lang === 'ru' ? 'en' : 'ru';
      localStorage.setItem('ft_lang', state.lang);
      applyTranslations();
    });

    // theme toggle
    document.getElementById('themeToggle')?.addEventListener('click', () => {
      setTheme(state.theme === 'dark' ? 'light' : 'dark');
    });

    // close modal on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Clicks on nav links — highlight active
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.href === window.location.href || link.getAttribute('href') === window.location.pathname.split('/').pop()) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Attach general form validation
    attachFormValidation();

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
