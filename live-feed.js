// ========== Live RSS Feed Fetcher for Iran War News Tracker ==========
// Fetches real news from Google News RSS feeds via CORS proxy

const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
];

// Search queries per country for Iran conflict news
const COUNTRY_FEED_QUERIES = {
    "iran": ["Iran war", "Iran military conflict"],
    "usa": ["United States Iran conflict", "US Iran military"],
    "israel": ["Israel Iran war", "Israel Iran strikes"],
    "india": ["India Iran conflict impact", "India Iran war oil"],
    "lebanon": ["Lebanon Hezbollah Iran war", "Lebanon Israel conflict"],
    "syria": ["Syria Iran Israel strikes", "Syria Iran conflict"],
    "qatar": ["Qatar Iran conflict", "Qatar Iran war diplomacy"],
    "bahrain": ["Bahrain Iran conflict", "Bahrain US military Iran"],
    "uae": ["UAE Iran conflict", "Emirates Iran war"],
    "jordan": ["Jordan Iran conflict", "Jordan Iran war"],
    "saudi-arabia": ["Saudi Arabia Iran conflict", "Saudi Iran war"],
    "kuwait": ["Kuwait Iran conflict", "Kuwait Iran war"],
    "iraq": ["Iraq Iran conflict militia", "Iraq Iran war"],
    "turkey": ["Turkey Iran conflict", "Turkey Iran war"],
    "cyprus": ["Cyprus Iran conflict military", "Cyprus Middle East war"],
    "sri-lanka": ["Sri Lanka Iran conflict", "Sri Lanka Iran war shipping"],
    "oman": ["Oman Iran conflict", "Oman Strait Hormuz"],
    "azerbaijan": ["Azerbaijan Iran conflict", "Azerbaijan Iran war"],
};

// Category detection keywords
const CATEGORY_KEYWORDS = {
    military: ['military', 'strike', 'bomb', 'missile', 'attack', 'troops', 'army', 'navy', 'air force', 'drone', 'weapon', 'defense', 'offensive', 'war', 'battle', 'combat', 'soldier', 'killed', 'airstrike', 'artillery', 'tank', 'warship', 'fighter jet', 'operation'],
    diplomacy: ['diplomat', 'talks', 'negotiat', 'sanction', 'UN ', 'United Nations', 'ambassador', 'treaty', 'summit', 'ceasefire', 'peace', 'foreign minister', 'state department', 'resolution', 'condemn', 'alliance'],
    humanitarian: ['humanitarian', 'refugee', 'civilian', 'evacuate', 'displacement', 'aid', 'crisis', 'shelter', 'food', 'water', 'hospital', 'casualties', 'death toll', 'wounded', 'red cross', 'UNHCR', 'children'],
    economic: ['economic', 'oil', 'market', 'stock', 'trade', 'price', 'economy', 'sanction', 'currency', 'inflation', 'export', 'import', 'GDP', 'barrel', 'energy', 'gas', 'shipping', 'supply chain', 'financial'],
    analysis: ['analysis', 'opinion', 'commentary', 'expert', 'assess', 'strategy', 'geopolitic', 'implication', 'scenario', 'forecast', 'perspective', 'explain'],
};

function detectCategory(title, snippet) {
    const text = (title + ' ' + snippet).toLowerCase();
    let bestCategory = 'analysis';
    let bestScore = 0;

    for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        let score = 0;
        for (const kw of keywords) {
            if (text.includes(kw.toLowerCase())) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestCategory = cat;
        }
    }
    return bestCategory;
}

function buildGoogleNewsRssUrl(query) {
    return `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function extractSourceFromGoogleTitle(title) {
    // Google News titles often end with " - Source Name"
    const match = title.match(/\s[-–—]\s([^-–—]+)$/);
    return match ? match[1].trim() : 'News Source';
}

function cleanTitle(title) {
    // Remove the " - Source Name" suffix from Google News titles
    return title.replace(/\s[-–—]\s[^-–—]+$/, '').trim();
}

async function fetchWithProxy(url) {
    for (const proxy of CORS_PROXIES) {
        try {
            const resp = await fetch(proxy + encodeURIComponent(url), {
                signal: AbortSignal.timeout(8000)
            });
            if (resp.ok) {
                return await resp.text();
            }
        } catch (e) {
            // Try next proxy
            continue;
        }
    }
    return null;
}

function parseRssXml(xmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const items = doc.querySelectorAll('item');
    const articles = [];

    items.forEach(item => {
        const rawTitle = item.querySelector('title')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';

        const source = extractSourceFromGoogleTitle(rawTitle);
        const title = cleanTitle(rawTitle);
        const excerpt = stripHtml(description).substring(0, 300);

        if (title) {
            articles.push({
                title,
                link,
                source,
                excerpt: excerpt || title,
                date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                dateObj: pubDate ? new Date(pubDate) : new Date(),
            });
        }
    });

    return articles;
}

// Fetch news for a single country
async function fetchCountryNews(countryKey, maxArticles = 5) {
    const queries = COUNTRY_FEED_QUERIES[countryKey] || [];
    const allArticles = [];
    const seenTitles = new Set();

    for (const query of queries) {
        const rssUrl = buildGoogleNewsRssUrl(query);
        const xmlText = await fetchWithProxy(rssUrl);
        if (!xmlText) continue;

        const articles = parseRssXml(xmlText);
        for (const a of articles) {
            // Deduplicate by title
            const normalizedTitle = a.title.toLowerCase().trim();
            if (!seenTitles.has(normalizedTitle)) {
                seenTitles.add(normalizedTitle);
                a.country = countryKey;
                a.category = detectCategory(a.title, a.excerpt);
                allArticles.push(a);
            }
        }
    }

    // Sort by date descending, take top N
    allArticles.sort((a, b) => b.dateObj - a.dateObj);
    return allArticles.slice(0, maxArticles);
}

// Fetch news for ALL countries
async function fetchAllLiveNews(onProgress) {
    const countryKeys = Object.keys(COUNTRIES);
    const liveArticles = [];
    let completed = 0;

    // Fetch in batches of 4 to avoid overwhelming proxies
    const batchSize = 4;
    for (let i = 0; i < countryKeys.length; i += batchSize) {
        const batch = countryKeys.slice(i, i + batchSize);
        const results = await Promise.allSettled(
            batch.map(key => fetchCountryNews(key, 5))
        );

        for (const result of results) {
            if (result.status === 'fulfilled') {
                liveArticles.push(...result.value);
            }
        }

        completed += batch.length;
        if (onProgress) {
            onProgress(completed, countryKeys.length);
        }
    }

    return liveArticles;
}
