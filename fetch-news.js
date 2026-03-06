// ========== fetch-news.js ==========
// Runs server-side (Node.js) via GitHub Actions to fetch Google News RSS
// and write live-news.json — NO CORS issues since it's server-side.

const https = require('https');
const http = require('http');
const fs = require('fs');

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

const CATEGORY_KEYWORDS = {
    military: ['military', 'strike', 'bomb', 'missile', 'attack', 'troops', 'army', 'navy', 'air force', 'drone', 'weapon', 'defense', 'offensive', 'war', 'battle', 'combat', 'soldier', 'killed', 'airstrike', 'artillery', 'tank', 'warship', 'fighter jet', 'operation'],
    diplomacy: ['diplomat', 'talks', 'negotiat', 'sanction', 'un ', 'united nations', 'ambassador', 'treaty', 'summit', 'ceasefire', 'peace', 'foreign minister', 'state department', 'resolution', 'condemn', 'alliance'],
    humanitarian: ['humanitarian', 'refugee', 'civilian', 'evacuate', 'displacement', 'aid', 'crisis', 'shelter', 'food', 'water', 'hospital', 'casualties', 'death toll', 'wounded', 'red cross', 'unhcr', 'children'],
    economic: ['economic', 'oil', 'market', 'stock', 'trade', 'price', 'economy', 'sanction', 'currency', 'inflation', 'export', 'import', 'gdp', 'barrel', 'energy', 'gas', 'shipping', 'supply chain', 'financial'],
    analysis: ['analysis', 'opinion', 'commentary', 'expert', 'assess', 'strategy', 'geopolitic', 'implication', 'scenario', 'forecast', 'perspective', 'explain'],
};

function detectCategory(title, snippet) {
    const text = (title + ' ' + snippet).toLowerCase();
    let best = 'analysis', bestScore = 0;
    for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
        let score = kws.filter(kw => text.includes(kw)).length;
        if (score > bestScore) { bestScore = score; best = cat; }
    }
    return best;
}

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? https : http;
        lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 IranNewsTracker/1.0' } }, (res) => {
            // Follow redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode}`));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function extractSource(title) {
    const m = title.match(/\s[-–—]\s([^-–—]+)$/);
    return m ? m[1].trim() : 'News Source';
}

function cleanTitle(title) {
    return title.replace(/\s[-–—]\s[^-–—]+$/, '').trim();
}

function stripTags(html) {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
        .replace(/&quot;/g, '\"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
        .replace(/<[^>]*>/g, '')  // strip again after entity decode
        .replace(/\s{2,}/g, ' ')
        .trim();
}

// ========== Article Content Extraction ==========

/**
 * Extract paragraph text from an HTML fragment.
 * Filters out very short or boilerplate paragraphs.
 */
function extractParagraphs(html) {
    const paragraphs = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let m;
    while ((m = pRegex.exec(html)) !== null) {
        const text = stripTags(m[1]).trim();
        // Skip very short lines and common boilerplate
        if (
            text.length > 50 &&
            !/^(sign up|subscribe|newsletter|cookie|©|copyright|advertisement|read more|share this|follow us)/i.test(text)
        ) {
            paragraphs.push(text);
        }
    }
    return paragraphs;
}

/**
 * Fetch an article URL and attempt to extract its main text content.
 * Tries <article> tag, common content div patterns, then falls back to all <p> tags.
 * Returns a trimmed string (max ~2000 chars) or '' on failure.
 */
async function extractArticleContent(url, timeoutMs = 10000) {
    if (!url) return '';
    try {
        const html = await Promise.race([
            fetchUrl(url),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeoutMs)),
        ]);

        let paragraphs = [];

        // Strategy 1: <article> tag
        const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
        if (articleMatch) {
            paragraphs = extractParagraphs(articleMatch[1]);
        }

        // Strategy 2: common content div classes
        if (paragraphs.length < 2) {
            const contentPatterns = [
                /<div[^>]*class="[^"]*article[_-]?body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
                /<div[^>]*class="[^"]*story[_-]?body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
                /<div[^>]*class="[^"]*post[_-]?content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
                /<div[^>]*class="[^"]*entry[_-]?content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
                /<div[^>]*class="[^"]*article[_-]?content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
                /<div[^>]*id="article[_-]?body"[^>]*>([\s\S]*?)<\/div>/i,
            ];
            for (const pat of contentPatterns) {
                const cm = html.match(pat);
                if (cm) {
                    const found = extractParagraphs(cm[1]);
                    if (found.length > paragraphs.length) paragraphs = found;
                }
            }
        }

        // Strategy 3: all <p> tags on the page (noisy but better than nothing)
        if (paragraphs.length < 2) {
            paragraphs = extractParagraphs(html);
        }

        if (paragraphs.length === 0) return '';

        // Join and cap at ~2000 characters
        let content = paragraphs.join('\n\n');
        if (content.length > 2000) {
            content = content.substring(0, 2000).replace(/\s+\S*$/, '') + '…';
        }
        return content;
    } catch (err) {
        // Timeout, HTTP error, etc. — silently return empty
        return '';
    }
}

/**
 * Process a batch of articles, extracting content with concurrency limiting.
 * @param {Array} articles
 * @param {number} concurrency - max simultaneous fetches
 * @param {number} delayMs - delay between batches
 */
async function enrichArticlesWithContent(articles, concurrency = 5, delayMs = 500) {
    console.log(`\n📄 Extracting article content (${articles.length} articles, concurrency=${concurrency})...`);
    let completed = 0;

    for (let i = 0; i < articles.length; i += concurrency) {
        const batch = articles.slice(i, i + concurrency);
        const results = await Promise.allSettled(
            batch.map(async (article) => {
                const content = await extractArticleContent(article.link);
                article.content = content;
                completed++;
                if (content) {
                    process.stdout.write(`  ✅ [${completed}/${articles.length}] ${article.title.substring(0, 50)}... (${content.length} chars)\n`);
                } else {
                    process.stdout.write(`  ⏭  [${completed}/${articles.length}] ${article.title.substring(0, 50)}... (no content)\n`);
                }
            })
        );
        // Small delay between batches to be polite
        if (i + concurrency < articles.length) {
            await new Promise(r => setTimeout(r, delayMs));
        }
    }

    const withContent = articles.filter(a => a.content).length;
    console.log(`\n📄 Content extraction complete: ${withContent}/${articles.length} articles enriched`);
}

function parseRssItems(xml) {
    const articles = [];
    // Simple regex-based XML parser (no external deps)
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
        const block = match[1];
        const getTag = (tag) => {
            const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
            return m ? m[1].trim() : '';
        };

        const rawTitle = stripTags(getTag('title'));
        const link = getTag('link').replace(/<!\[CDATA\[(.*?)\]\]>/, '$1');
        const pubDate = getTag('pubDate');
        const desc = stripTags(getTag('description'));

        const source = extractSource(rawTitle);
        const title = cleanTitle(rawTitle);
        let excerpt = desc.substring(0, 300);

        // Google News descriptions often just repeat the title — use title if excerpt is poor
        if (!excerpt || excerpt.length < 20 || excerpt.toLowerCase().startsWith(title.toLowerCase().substring(0, 20))) {
            excerpt = title;
        }

        if (title) {
            articles.push({
                title,
                link,
                source,
                excerpt,
                date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                pubDate: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
            });
        }
    }
    return articles;
}

async function fetchCountryNews(countryKey, maxArticles = 5) {
    const queries = COUNTRY_FEED_QUERIES[countryKey] || [];
    const all = [];
    const seen = new Set();

    for (const q of queries) {
        const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;
        try {
            const xml = await fetchUrl(url);
            const items = parseRssItems(xml);
            for (const a of items) {
                const key = a.title.toLowerCase();
                if (!seen.has(key)) {
                    seen.add(key);
                    a.country = countryKey;
                    a.category = detectCategory(a.title, a.excerpt);
                    all.push(a);
                }
            }
        } catch (err) {
            console.warn(`  Failed: ${q} — ${err.message}`);
        }
    }

    all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    return all.slice(0, maxArticles);
}

async function main() {
    console.log('🔄 Fetching live news for Iran War Tracker...\n');
    const allArticles = [];
    const countries = Object.keys(COUNTRY_FEED_QUERIES);

    for (const country of countries) {
        process.stdout.write(`  Fetching: ${country}... `);
        try {
            const articles = await fetchCountryNews(country, 5);
            allArticles.push(...articles);
            console.log(`✅ ${articles.length} articles`);
        } catch (err) {
            console.log(`❌ failed: ${err.message}`);
        }
    }

    // Enrich articles with actual article text (best-effort)
    await enrichArticlesWithContent(allArticles);

    const output = {
        lastUpdated: new Date().toISOString(),
        totalArticles: allArticles.length,
        articles: allArticles,
    };

    fs.writeFileSync('live-news.json', JSON.stringify(output, null, 2));
    console.log(`\n✅ Wrote ${allArticles.length} articles to live-news.json`);
    console.log(`   Last updated: ${output.lastUpdated}`);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
