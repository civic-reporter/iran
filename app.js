// ========== Iran War News Tracker - Application Logic ==========

document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('countrySelect');
    const categorySelect = document.getElementById('categorySelect');
    const newsGrid = document.getElementById('newsGrid');
    const noResults = document.getElementById('noResults');
    const articleCount = document.getElementById('articleCount');
    const countryTags = document.getElementById('countryTags');
    const currentDate = document.getElementById('currentDate');
    const lastUpdated = document.getElementById('lastUpdated');
    const loadingContainer = document.getElementById('loadingContainer');
    const loadingCount = document.getElementById('loadingCount');
    const btnLive = document.getElementById('btnLive');
    const btnStatic = document.getElementById('btnStatic');
    const feedBadge = document.getElementById('feedBadge');

    // Live articles storage
    let LIVE_ARTICLES = [];
    let currentMode = 'live'; // 'live' or 'static'

    // ---- Set dates ----
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
    lastUpdated.textContent = now.toLocaleDateString('en-US', options) + ', ' +
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // ---- Render country tags ----
    function renderCountryTags() {
        const activeArticles = getActiveArticles();
        const sortedKeys = Object.keys(COUNTRIES).sort((a, b) => {
            if (COUNTRIES[a].primary && !COUNTRIES[b].primary) return -1;
            if (!COUNTRIES[a].primary && COUNTRIES[b].primary) return 1;
            return COUNTRIES[a].name.localeCompare(COUNTRIES[b].name);
        });

        countryTags.innerHTML = sortedKeys.map(key => {
            const c = COUNTRIES[key];
            const count = activeArticles.filter(a => a.country === key).length;
            const cls = c.primary ? 'country-tag primary' : 'country-tag';
            return `<span class="${cls}" data-country="${key}" title="View ${c.name} news">
                ${c.flag} ${c.name}
                <span class="tag-count">${count}</span>
            </span>`;
        }).join('');

        // Click to filter
        document.querySelectorAll('.country-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const country = tag.dataset.country;
                countrySelect.value = country;
                renderNews();
                window.scrollTo({ top: newsGrid.offsetTop - 160, behavior: 'smooth' });
            });
        });
    }

    // ---- Get active articles based on mode ----
    function getActiveArticles() {
        return currentMode === 'live' && LIVE_ARTICLES.length > 0 ? LIVE_ARTICLES : NEWS_ARTICLES;
    }

    // ---- Render news cards ----
    function renderNews() {
        const selectedCountry = countrySelect.value;
        const selectedCategory = categorySelect.value;

        let filtered = getActiveArticles();

        if (selectedCountry !== 'all') {
            filtered = filtered.filter(a => a.country === selectedCountry);
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(a => a.category === selectedCategory);
        }

        // Sort by date descending
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        articleCount.textContent = filtered.length;

        if (filtered.length === 0) {
            newsGrid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        newsGrid.innerHTML = filtered.map((article, idx) => {
            const c = COUNTRIES[article.country];
            const dateStr = formatDate(article.date);
            const isFeatured = idx === 0 && selectedCountry === 'all' && selectedCategory === 'all';

            const liveIndicator = article.link ? '<span class="live-dot" title="Live article"></span>' : '';

            if (isFeatured) {
                return `
                <article class="news-card featured">
                    <div class="featured-image">${c.flag}</div>
                    <div>
                        <div class="card-header">
                            <span class="card-country">${c.flag} ${c.name}</span>
                            <span class="card-category ${article.category}">${article.category}</span>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${liveIndicator}<a href="${article.link || '#'}">${article.title}</a></h3>
                            <p class="card-excerpt">${article.excerpt}</p>
                        </div>
                        <div class="card-meta">
                            <span class="card-source">${article.source}</span>
                            <span class="card-date">${dateStr}</span>
                        </div>
                    </div>
                </article>`;
            }

            return `
            <article class="news-card">
                <div class="card-header">
                    <span class="card-country">${c.flag} ${c.name}</span>
                    <span class="card-category ${article.category}">${article.category}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${liveIndicator}<a href="${article.link || '#'}">${article.title}</a></h3>
                    <p class="card-excerpt">${article.excerpt}</p>
                </div>
                <div class="card-meta">
                    <span class="card-source">${article.source}</span>
                    <span class="card-date">${dateStr}</span>
                </div>
            </article>`;
        }).join('');

        // Update active country tag
        document.querySelectorAll('.country-tag').forEach(tag => {
            tag.classList.toggle('active', tag.dataset.country === selectedCountry);
        });
    }

    // ---- Helpers ----
    function formatDate(dateStr) {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // ========== SIDE PANEL LOGIC ==========
    const sidePanel = document.getElementById('sidePanel');
    const panelOverlay = document.getElementById('panelOverlay');
    const panelClose = document.getElementById('panelClose');
    const panelContent = document.getElementById('panelContent');

    function openPanel(article) {
        const c = COUNTRIES[article.country];
        const dateStr = formatDate(article.date);

        // Use actual link for live articles, or Google News search for static ones
        const sourceUrl = article.link || `https://news.google.com/search?q=${encodeURIComponent(article.title + ' ' + article.source)}`;

        // Find related articles (same country, different article)
        const activeArticles = getActiveArticles();
        const related = activeArticles
            .filter(a => a.country === article.country && a.title !== article.title)
            .slice(0, 3);

        panelContent.innerHTML = `
            <div class="panel-article-badges">
                <span class="card-country">${c.flag} ${c.name}</span>
                <span class="card-category ${article.category}">${article.category}</span>
            </div>
            <h2 class="panel-article-title">${article.title}</h2>
            <div class="panel-article-meta">
                <span class="panel-meta-item">📰 ${article.source}</span>
                <span class="panel-meta-item">📅 ${dateStr}</span>
            </div>
            <div class="panel-divider"></div>
            <div class="panel-article-body">
                <p class="lead">${article.excerpt}</p>
                <p>This report was originally published by <strong>${article.source}</strong>, covering the ongoing developments related to the US-Israel-Iran conflict and its impact on ${c.name}.</p>
                <p>The situation continues to evolve rapidly, with multiple international organizations monitoring the developments closely. Analysts note that the implications for ${c.name} extend beyond immediate security concerns to long-term economic and diplomatic relationships in the region.</p>
            </div>
            <div class="panel-actions">
                <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="panel-btn panel-btn-primary">
                    <span class="btn-icon">🔗</span> Open Source Page — ${article.source}
                </a>
                ${article.link ? `<a href="${article.link}" target="_blank" rel="noopener noreferrer" class="panel-btn panel-btn-secondary">
                    <span class="btn-icon">📄</span> Open Original Article Directly
                </a>` : ''}
                <a href="https://news.google.com/search?q=${encodeURIComponent(c.name + ' Iran conflict')}" target="_blank" rel="noopener noreferrer" class="panel-btn panel-btn-secondary">
                    <span class="btn-icon">🌐</span> More ${c.name} News on Google
                </a>
            </div>
            ${related.length ? `
            <div class="panel-divider"></div>
            <div class="panel-related">
                <div class="panel-related-title">Related from ${c.name}</div>
                ${related.map((r, i) => `
                    <div class="panel-related-item" data-related-index="${activeArticles.indexOf(r)}">
                        <span class="related-flag">${COUNTRIES[r.country].flag}</span>
                        <span class="related-title">${r.title}</span>
                    </div>
                `).join('')}
            </div>` : ''}
        `;

        // Attach click handlers to related items
        panelContent.querySelectorAll('.panel-related-item').forEach(el => {
            el.addEventListener('click', () => {
                const idx = parseInt(el.dataset.relatedIndex, 10);
                openPanel(activeArticles[idx]);
            });
        });

        sidePanel.classList.add('open');
        panelOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        panelContent.scrollTop = 0;
    }

    function closePanel() {
        sidePanel.classList.remove('open');
        panelOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    panelClose.addEventListener('click', closePanel);
    panelOverlay.addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePanel();
    });

    // Delegate click on news cards to open side panel
    newsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.news-card');
        if (!card) return;

        // Prevent default if they clicked an <a> tag
        const anchor = e.target.closest('a');
        if (anchor) e.preventDefault();

        // Find article index from the card's position
        const cards = Array.from(newsGrid.querySelectorAll('.news-card'));
        const cardIndex = cards.indexOf(card);

        // Get the currently filtered & sorted articles
        const selectedCountry = countrySelect.value;
        const selectedCategory = categorySelect.value;
        let filtered = getActiveArticles().slice();
        if (selectedCountry !== 'all') filtered = filtered.filter(a => a.country === selectedCountry);
        if (selectedCategory !== 'all') filtered = filtered.filter(a => a.category === selectedCategory);
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filtered[cardIndex]) {
            openPanel(filtered[cardIndex]);
        }
    });

    // ---- Feed toggle ----
    function setMode(mode) {
        currentMode = mode;
        btnLive.classList.toggle('active', mode === 'live');
        btnStatic.classList.toggle('active', mode === 'static');
        feedBadge.textContent = mode === 'live' ? 'LIVE' : 'STATIC';
        feedBadge.className = 'feed-badge ' + mode;
        renderCountryTags();
        renderNews();
    }

    btnLive.addEventListener('click', () => setMode('live'));
    btnStatic.addEventListener('click', () => setMode('static'));

    // ---- Events ----
    countrySelect.addEventListener('change', renderNews);
    categorySelect.addEventListener('change', renderNews);

    // ---- Init ----
    renderCountryTags();

    // Start by showing static data immediately, then fetch live
    renderNews();

    // Fetch live feeds
    async function initLiveFeeds() {
        try {
            loadingContainer.classList.remove('hidden');
            newsGrid.style.display = 'none';

            const liveArticles = await fetchAllLiveNews((completed, total) => {
                loadingCount.textContent = completed;
            });

            if (liveArticles.length > 0) {
                LIVE_ARTICLES = liveArticles;
                currentMode = 'live';
                btnLive.classList.add('active');
                btnStatic.classList.remove('active');
                feedBadge.textContent = 'LIVE';
                feedBadge.className = 'feed-badge live';
                renderCountryTags();
                renderNews();

                // Update last updated time
                const updateTime = new Date();
                lastUpdated.textContent = updateTime.toLocaleDateString('en-US', options) + ', ' +
                    updateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            } else {
                // Fallback to static
                currentMode = 'static';
                btnLive.classList.remove('active');
                btnStatic.classList.add('active');
                feedBadge.textContent = 'STATIC';
                feedBadge.className = 'feed-badge static';
            }
        } catch (err) {
            console.warn('Live feed fetch failed, using static data:', err);
            currentMode = 'static';
            btnLive.classList.remove('active');
            btnStatic.classList.add('active');
            feedBadge.textContent = 'STATIC';
            feedBadge.className = 'feed-badge static';
        } finally {
            loadingContainer.classList.add('hidden');
            newsGrid.style.display = '';
        }
    }

    initLiveFeeds();
});
