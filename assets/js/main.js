/* ==========================================================================
   UNG MAN (UNGMAN.SE) – MAIN SCRIPT
   Navigation, Search, Bookmarks, Quick-Exit & Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSearch();
  initBookmarks();
  initQuickExit();
  initDailyQuote();
  initReadingProgressBar();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('active');
    if (isOpen) {
      drawer.classList.remove('active');
      toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('active');
      toggleBtn.classList.add('open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close when clicking links inside drawer
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
      toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   2. QUICK EXIT (TRYGGHETSFUNKTION)
   -------------------------------------------------------------------------- */
function initQuickExit() {
  const quickExitBtns = document.querySelectorAll('.quick-exit-btn');

  function triggerExit() {
    // Replace URL instantly without leaving local history
    window.location.replace('https://www.smhi.se');
  }

  quickExitBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerExit();
    });
  });

  // Shortcut: Press 'Esc' 3 times in rapid succession
  let escCount = 0;
  let escTimer = null;
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      escCount++;
      clearTimeout(escTimer);
      if (escCount >= 3) {
        triggerExit();
      }
      escTimer = setTimeout(() => {
        escCount = 0;
      }, 1000);
    }
  });
}

/* --------------------------------------------------------------------------
   3. GLOBAL SEARCH MODAL
   -------------------------------------------------------------------------- */
function initSearch() {
  const searchTriggers = document.querySelectorAll('.search-trigger-btn');
  const modal = document.getElementById('searchModal');
  const closeBtn = document.getElementById('searchCloseBtn');
  const input = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResultsArea');

  if (!modal || !input || !resultsContainer) return;

  function openSearch() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 100);
    renderSearchResults('');
  }

  function closeSearch() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    input.value = '';
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  // Close when clicking background
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  // Hotkey CMD+K or CTRL+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });

  input.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    renderSearchResults(q);
  });

  function renderSearchResults(query) {
    if (!window.UNGMAN_DATA || !window.UNGMAN_DATA.articles) return;

    if (!query) {
      resultsContainer.innerHTML = `
        <div style="padding: 12px 0; color: var(--text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">Populära sökningar</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
          <button class="filter-btn" onclick="document.getElementById('searchInput').value='träning'; document.getElementById('searchInput').dispatchEvent(new Event('input'));">Träning</button>
          <button class="filter-btn" onclick="document.getElementById('searchInput').value='AI'; document.getElementById('searchInput').dispatchEvent(new Event('input'));">AI i skolan</button>
          <button class="filter-btn" onclick="document.getElementById('searchInput').value='pengar'; document.getElementById('searchInput').dispatchEvent(new Event('input'));">Ekonomi</button>
          <button class="filter-btn" onclick="document.getElementById('searchInput').value='ångest'; document.getElementById('searchInput').dispatchEvent(new Event('input'));">Stress & Ångest</button>
        </div>
      `;
      return;
    }

    const matches = window.UNGMAN_DATA.articles.filter(art => {
      return art.title.toLowerCase().includes(query) ||
             art.excerpt.toLowerCase().includes(query) ||
             art.categoryName.toLowerCase().includes(query);
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 32px 16px; color: var(--text-secondary);">
          <p>Inga resultat hittades för "<strong>${escapeHtml(query)}</strong>".</p>
          <p style="font-size: 0.85rem; margin-top: 8px;">Försök med sökord som <em>gymnasiet</em>, <em>sömn</em>, <em>relationer</em> eller <em>kalkylator</em>.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.map(art => `
      <a href="${art.url}" class="search-result-item">
        <div class="search-result-title">${highlightMatch(art.title, query)}</div>
        <div class="search-result-snippet">${highlightMatch(art.excerpt, query)}</div>
        <div style="margin-top: 6px; font-size: 0.75rem; color: var(--accent-primary); font-weight: 600;">
          ${art.categoryName} • ${art.readTime}
        </div>
      </a>
    `).join('');
  }
}

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark style="background: rgba(224, 83, 38, 0.2); color: inherit; padding: 0 2px; border-radius: 2px;">$1</mark>');
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* --------------------------------------------------------------------------
   4. BOOKMARK / SAVED GUIDES SYSTEM
   -------------------------------------------------------------------------- */
function initBookmarks() {
  const triggerBtn = document.getElementById('savedTriggerBtn');
  const drawer = document.getElementById('savedDrawer');
  const closeBtn = document.getElementById('savedCloseBtn');
  const countBadge = document.getElementById('savedCounterBadge');
  const bodyEl = document.getElementById('savedDrawerBody');

  function getSaved() {
    try {
      return JSON.parse(localStorage.getItem('ungman_bookmarks') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveList(list) {
    localStorage.setItem('ungman_bookmarks', JSON.stringify(list));
    updateBookmarkUI();
  }

  function updateBookmarkUI() {
    const list = getSaved();
    if (countBadge) {
      countBadge.textContent = list.length;
      countBadge.style.display = list.length > 0 ? 'flex' : 'none';
    }

    // Update heart icons on cards
    document.querySelectorAll('.card-bookmark-btn').forEach(btn => {
      const id = btn.getAttribute('data-article-id');
      if (list.includes(id)) {
        btn.classList.add('saved');
        btn.setAttribute('aria-label', 'Ta bort från sparade');
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        `;
      } else {
        btn.classList.remove('saved');
        btn.setAttribute('aria-label', 'Spara guide');
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        `;
      }
    });

    // Render drawer list
    if (bodyEl && window.UNGMAN_DATA) {
      if (list.length === 0) {
        bodyEl.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">🔖</div>
            <h4 style="margin-bottom: 8px;">Inga sparade guider än</h4>
            <p style="font-size: 0.9rem;">Klicka på hjärtikonen på valfri artikel eller guide för att spara den här till senare.</p>
          </div>
        `;
      } else {
        const savedItems = window.UNGMAN_DATA.articles.filter(a => list.includes(a.id));
        bodyEl.innerHTML = savedItems.map(item => `
          <div style="display: flex; gap: 14px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--border-light); align-items: flex-start;">
            <div style="flex-grow: 1;">
              <span style="font-size: 0.72rem; color: var(--accent-primary); font-weight: 700; text-transform: uppercase;">${item.categoryName}</span>
              <a href="${item.url}" style="display: block; font-weight: 700; font-size: 0.95rem; line-height: 1.3; margin: 4px 0 6px 0;">${item.title}</a>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${item.readTime}</span>
            </div>
            <button onclick="removeSavedArticle('${item.id}')" style="background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px;" title="Ta bort">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        `).join('');
      }
    }
  }

  window.toggleArticleBookmark = function(id) {
    let list = getSaved();
    if (list.includes(id)) {
      list = list.filter(item => item !== id);
      showToast('Guiden togs bort från sparade');
    } else {
      list.push(id);
      showToast('Guiden har sparats i dina bokmärken');
    }
    saveList(list);
  };

  window.removeSavedArticle = function(id) {
    let list = getSaved().filter(item => item !== id);
    saveList(list);
    showToast('Guiden togs bort');
  };

  if (triggerBtn && drawer) {
    triggerBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  updateBookmarkUI();
}

/* --------------------------------------------------------------------------
   5. TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e05326" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* --------------------------------------------------------------------------
   6. DAILY QUOTE CYCLING
   -------------------------------------------------------------------------- */
function initDailyQuote() {
  const quoteEl = document.getElementById('dailyThoughtText');
  const refreshBtn = document.getElementById('refreshThoughtBtn');
  if (!quoteEl || !window.UNGMAN_DATA) return;

  const quotes = window.UNGMAN_DATA.dailyPerspectives;
  let currentIndex = 0;

  function renderQuote(index) {
    quoteEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.textContent = `"${quotes[index].text}"`;
      quoteEl.style.opacity = '1';
    }, 150);
  }

  renderQuote(0);

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % quotes.length;
      renderQuote(currentIndex);
    });
  }
}

/* --------------------------------------------------------------------------
   7. READING PROGRESS BAR
   -------------------------------------------------------------------------- */
function initReadingProgressBar() {
  const bar = document.getElementById('readingProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    bar.style.width = scrolled + '%';
  });
}
