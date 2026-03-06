// News data organized by country for the Iran War Tracker
// Countries: Iran, USA, Israel, India, Lebanon, Syria, Qatar, Bahrain, UAE,
// Jordan, Saudi Arabia, Kuwait, Iraq, Turkey, Cyprus, Sri Lanka, Oman, Azerbaijan

const COUNTRIES = {
    "iran": { name: "Iran", flag: "🇮🇷", primary: true },
    "usa": { name: "United States", flag: "🇺🇸", primary: true },
    "israel": { name: "Israel", flag: "🇮🇱", primary: true },
    "india": { name: "India", flag: "🇮🇳", primary: false },
    "lebanon": { name: "Lebanon", flag: "🇱🇧", primary: false },
    "syria": { name: "Syria", flag: "🇸🇾", primary: false },
    "qatar": { name: "Qatar", flag: "🇶🇦", primary: false },
    "bahrain": { name: "Bahrain", flag: "🇧🇭", primary: false },
    "uae": { name: "United Arab Emirates", flag: "🇦🇪", primary: false },
    "jordan": { name: "Jordan", flag: "🇯🇴", primary: false },
    "saudi-arabia": { name: "Saudi Arabia", flag: "🇸🇦", primary: false },
    "kuwait": { name: "Kuwait", flag: "🇰🇼", primary: false },
    "iraq": { name: "Iraq", flag: "🇮🇶", primary: false },
    "turkey": { name: "Turkey", flag: "🇹🇷", primary: false },
    "cyprus": { name: "Cyprus", flag: "🇨🇾", primary: false },
    "sri-lanka": { name: "Sri Lanka", flag: "🇱🇰", primary: false },
    "oman": { name: "Oman", flag: "🇴🇲", primary: false },
    "azerbaijan": { name: "Azerbaijan", flag: "🇦🇿", primary: false },
};

const NEWS_ARTICLES = [
    // ==================== IRAN ====================
    {
        country: "iran",
        category: "military",
        title: "Iran's Air Defense Systems Activated Across Multiple Provinces",
        excerpt: "Iranian military sources confirm widespread activation of air defense networks as tensions escalate. IRGC commanders report readiness across all strategic installations and nuclear facilities.",
        source: "Tehran Times",
        date: "2026-03-05",
        featured: true
    },
    {
        country: "iran",
        category: "diplomacy",
        title: "Iran Calls for Emergency UN Security Council Session",
        excerpt: "Iranian Foreign Minister sends formal request to the United Nations demanding an emergency Security Council meeting to address what Tehran calls 'unlawful aggression' against its sovereignty.",
        source: "Press TV",
        date: "2026-03-05"
    },
    {
        country: "iran",
        category: "military",
        title: "IRGC Deploys Naval Forces to Strait of Hormuz Chokepoint",
        excerpt: "Iran's Revolutionary Guard Corps has positioned fast-attack boats and anti-ship missile batteries along the Strait of Hormuz, raising concerns about potential disruption to global oil shipping lanes.",
        source: "Fars News Agency",
        date: "2026-03-04"
    },
    {
        country: "iran",
        category: "economic",
        title: "Iranian Rial Drops to Record Low Amid Escalation",
        excerpt: "The Iranian currency has fallen sharply on unofficial markets as citizens rush to convert savings to dollars and gold, with the central bank struggling to maintain stability.",
        source: "Iran International",
        date: "2026-03-04"
    },
    {
        country: "iran",
        category: "humanitarian",
        title: "Civilians Evacuate Border Regions as Conflict Intensifies",
        excerpt: "Tens of thousands of Iranian families are fleeing western border provinces, creating a growing humanitarian crisis. Red Crescent teams are setting up temporary shelters in Isfahan and Shiraz.",
        source: "IRNA",
        date: "2026-03-03"
    },

    // ==================== UNITED STATES ====================
    {
        country: "usa",
        category: "military",
        title: "Pentagon Orders Additional Carrier Strike Group to Persian Gulf",
        excerpt: "The Department of Defense has deployed the USS Eisenhower Carrier Strike Group to join existing naval forces in the Persian Gulf region, marking the largest US naval buildup in the area since 2003.",
        source: "AP News",
        date: "2026-03-05"
    },
    {
        country: "usa",
        category: "diplomacy",
        title: "White House Faces Bipartisan Pressure Over Iran Strategy",
        excerpt: "Congressional leaders from both parties demand briefings on the administration's endgame in Iran. The Senate Foreign Relations Committee schedules emergency closed-door hearings for next week.",
        source: "Reuters",
        date: "2026-03-05"
    },
    {
        country: "usa",
        category: "analysis",
        title: "US Military Bases Across Middle East on Highest Alert",
        excerpt: "All American military installations from Qatar to Bahrain have raised their force protection levels to FPCON Delta, the highest state of alert, as intelligence agencies warn of potential retaliatory strikes.",
        source: "CNN",
        date: "2026-03-04"
    },
    {
        country: "usa",
        category: "economic",
        title: "Oil Prices Surge Past $120 as Strait of Hormuz Tensions Mount",
        excerpt: "Brent crude futures spike above $120 per barrel amid fears that Iran could restrict shipping through the Strait of Hormuz, through which 20% of the world's oil passes daily.",
        source: "Bloomberg",
        date: "2026-03-04"
    },
    {
        country: "usa",
        category: "diplomacy",
        title: "State Department Issues Travel Warnings for Entire Middle East",
        excerpt: "The US State Department has raised travel advisories to Level 4 (Do Not Travel) for Iran, Iraq, Lebanon, and Syria, while issuing Level 3 warnings for most other Middle Eastern nations.",
        source: "The Washington Post",
        date: "2026-03-03"
    },

    // ==================== ISRAEL ====================
    {
        country: "israel",
        category: "military",
        title: "Israel Confirms Strikes on Iranian Nuclear Facilities",
        excerpt: "The IDF confirms targeted operations against Iranian nuclear enrichment sites, stating the strikes were conducted to 'eliminate an existential threat.' International reactions range from support to strong condemnation.",
        source: "The Times of Israel",
        date: "2026-03-05"
    },
    {
        country: "israel",
        category: "military",
        title: "Iron Dome and Arrow Systems Intercept Multiple Incoming Missiles",
        excerpt: "Israel's multi-layered missile defense successfully intercepted a barrage of ballistic missiles and drones launched from Iranian territory. The military reports a 95% interception rate.",
        source: "Haaretz",
        date: "2026-03-05"
    },
    {
        country: "israel",
        category: "humanitarian",
        title: "Israeli Home Front Command Orders Nationwide Shelter Readiness",
        excerpt: "Citizens across Israel are instructed to identify nearest bomb shelters as Home Front Command raises alert to its highest level. Schools in northern and central Israel shift to remote learning.",
        source: "Ynet News",
        date: "2026-03-04"
    },
    {
        country: "israel",
        category: "diplomacy",
        title: "Netanyahu Addresses Nation: 'We Will Defend Ourselves Against Any Threat'",
        excerpt: "In a prime-time televised address, the Israeli Prime Minister vows to pursue all necessary measures to ensure national security, while calling on international allies to support Israel's right to self-defense.",
        source: "Jerusalem Post",
        date: "2026-03-04"
    },
    {
        country: "israel",
        category: "analysis",
        title: "Northern Border Tensions Rise as Hezbollah Activity Increases",
        excerpt: "Military analysts warn of a potential second front opening along the Lebanon border, with increased Hezbollah reconnaissance and drone activity detected by Israeli intelligence.",
        source: "Israel Hayom",
        date: "2026-03-03"
    },

    // ==================== INDIA ====================
    {
        country: "india",
        category: "economic",
        title: "India Scrambles to Secure Alternative Oil Supply Routes",
        excerpt: "With Iran being one of India's key crude oil suppliers, New Delhi is in urgent talks with Saudi Arabia and Russia to secure alternative supply agreements. India imports over 85% of its oil needs.",
        source: "The Hindu",
        date: "2026-03-05"
    },
    {
        country: "india",
        category: "diplomacy",
        title: "PM Modi Calls for Immediate De-escalation in Iran Conflict",
        excerpt: "Indian Prime Minister Narendra Modi speaks with leaders of multiple nations, urging restraint and calling for diplomatic solutions. India maintains strategic relationships with both Iran and Israel.",
        source: "Hindustan Times",
        date: "2026-03-05"
    },
    {
        country: "india",
        category: "humanitarian",
        title: "India Prepares Evacuation Plans for 8 Million Diaspora in Gulf",
        excerpt: "The Ministry of External Affairs activates Operation Samundar Setu contingency plans to evacuate Indian nationals from Gulf states if the conflict expands. An estimated 8 million Indians live in the region.",
        source: "NDTV",
        date: "2026-03-04"
    },
    {
        country: "india",
        category: "economic",
        title: "Indian Stock Markets Tumble on Iran War Fears, Sensex Down 1,200 Points",
        excerpt: "BSE Sensex and NSE Nifty witness sharp sell-off as investors flee to safe-haven assets. IT and pharma stocks fall on concerns about disrupted trade routes through the Suez Canal and Persian Gulf.",
        source: "The Economic Times",
        date: "2026-03-04"
    },
    {
        country: "india",
        category: "analysis",
        title: "Chabahar Port Project Hangs in Balance Amid Iran Escalation",
        excerpt: "India's strategically important Chabahar port development in southeastern Iran faces uncertainty. The $500 million project was seen as India's gateway to Central Asia and Afghanistan.",
        source: "The Indian Express",
        date: "2026-03-03"
    },
    {
        country: "india",
        category: "military",
        title: "Indian Navy Deploys Warships to Arabian Sea for Citizen Protection",
        excerpt: "INS Vikramaditya carrier group and additional destroyers positioned in the Arabian Sea to safeguard Indian shipping interests and prepare for potential evacuation operations from the Gulf region.",
        source: "Times of India",
        date: "2026-03-03"
    },
    {
        country: "india",
        category: "diplomacy",
        title: "India Walks Diplomatic Tightrope Between Iran and US-Israel Axis",
        excerpt: "Analysts note India's challenging position: maintaining its strategic oil partnership with Iran while preserving its growing defense ties with Israel and trade relationship with the United States.",
        source: "The Wire",
        date: "2026-03-02"
    },

    // ==================== LEBANON ====================
    {
        country: "lebanon",
        category: "military",
        title: "Hezbollah Launches Rocket Barrage at Northern Israel",
        excerpt: "Lebanese militant group Hezbollah fires over 200 rockets toward Israeli positions in the Galilee region, declaring solidarity with Iran. The IDF responds with airstrikes on launch sites in southern Lebanon.",
        source: "Al Jazeera",
        date: "2026-03-05"
    },
    {
        country: "lebanon",
        category: "humanitarian",
        title: "Southern Lebanon Residents Flee as Cross-Border Fire Intensifies",
        excerpt: "UNHCR reports tens of thousands of Lebanese civilians fleeing northward from border villages. Beirut's already strained infrastructure struggles to accommodate the displaced population.",
        source: "The Daily Star Lebanon",
        date: "2026-03-04"
    },
    {
        country: "lebanon",
        category: "economic",
        title: "Lebanon's Already Collapsed Economy Faces New Crisis",
        excerpt: "With the Lebanese pound at record lows and banks already imposing strict capital controls, the new conflict threatens to push the country deeper into economic catastrophe. Fuel and food shortages worsen.",
        source: "L'Orient Today",
        date: "2026-03-03"
    },

    // ==================== SYRIA ====================
    {
        country: "syria",
        category: "military",
        title: "Israeli Strikes Target Iranian Military Assets in Syria",
        excerpt: "The IDF conducts extensive airstrikes on Iranian weapons depots and command centers near Damascus and Aleppo, marking the heaviest Israeli bombardment of Syrian territory in years.",
        source: "Syrian Observatory for Human Rights",
        date: "2026-03-05"
    },
    {
        country: "syria",
        category: "humanitarian",
        title: "Syria Faces New Displacement Wave Amid Regional Conflict",
        excerpt: "Already home to the world's largest internally displaced population, Syria sees fresh waves of displacement as Israeli and Iranian-backed forces clash on its territory.",
        source: "UNICEF",
        date: "2026-03-04"
    },
    {
        country: "syria",
        category: "analysis",
        title: "Iran's Syrian Proxy Network Under Unprecedented Pressure",
        excerpt: "Military analysts observe that Israeli precision strikes are systematically degrading Iran's ability to operate through proxy militias in Syria, threatening Tehran's 'land bridge' to Lebanon.",
        source: "BBC News",
        date: "2026-03-03"
    },

    // ==================== QATAR ====================
    {
        country: "qatar",
        category: "diplomacy",
        title: "Qatar Offers to Mediate Between Iran and Western Coalition",
        excerpt: "Doha leverages its unique position of maintaining ties with both Iran and the US to propose a mediation framework. Qatar's Al Udeid Air Base remains a critical US military staging point.",
        source: "Al Jazeera",
        date: "2026-03-05"
    },
    {
        country: "qatar",
        category: "military",
        title: "Al Udeid Air Base Placed on Maximum Alert as Threats Increase",
        excerpt: "The largest US military facility in the Middle East raises its security posture amid intelligence warnings of potential Iranian proxy attacks targeting American assets in the Gulf.",
        source: "The Peninsula Qatar",
        date: "2026-03-04"
    },
    {
        country: "qatar",
        category: "economic",
        title: "Qatar's LNG Exports Face Disruption as Gulf Shipping Routes Threatened",
        excerpt: "As the world's largest LNG exporter, Qatar faces potential supply chain disruptions if conflict spreads to the Strait of Hormuz. European energy markets react with sharp price increases.",
        source: "Gulf Times",
        date: "2026-03-03"
    },

    // ==================== BAHRAIN ====================
    {
        country: "bahrain",
        category: "military",
        title: "US Fifth Fleet Headquarters in Bahrain Boosts Security",
        excerpt: "Naval Support Activity Bahrain, home to the US Fifth Fleet and over 9,000 American military personnel, implements heightened security measures as the command coordinates regional naval operations.",
        source: "Gulf Daily News",
        date: "2026-03-05"
    },
    {
        country: "bahrain",
        category: "diplomacy",
        title: "Bahrain Condemns Iranian Aggression, Stands with Regional Allies",
        excerpt: "The Kingdom of Bahrain issues a strongly worded statement condemning Iran's military actions, citing historical tensions with Tehran and reaffirming its commitment to the Abraham Accords framework.",
        source: "Bahrain News Agency",
        date: "2026-03-04"
    },
    {
        country: "bahrain",
        category: "humanitarian",
        title: "Bahrain's Shia Community Caught Between Loyalties Amid Conflict",
        excerpt: "The island nation's Shia majority population faces increased scrutiny as sectarian tensions rise. Human rights organizations call for restraint and protection of civil liberties.",
        source: "Middle East Eye",
        date: "2026-03-03"
    },

    // ==================== UAE ====================
    {
        country: "uae",
        category: "economic",
        title: "Dubai Financial Markets Plunge as Regional Conflict Deepens",
        excerpt: "The Dubai Financial Market index drops over 6% in a single session as investors reassess risk in the Gulf region. Abu Dhabi's sovereign wealth funds reportedly shifting assets to safer positions.",
        source: "The National UAE",
        date: "2026-03-05"
    },
    {
        country: "uae",
        category: "military",
        title: "UAE Activates THAAD Missile Defense Systems Amid Iranian Threats",
        excerpt: "The Emirates activates its American-supplied Terminal High Altitude Area Defense systems as a precautionary measure, with officials citing intelligence about potential Iranian missile targeting of Gulf states.",
        source: "Khaleej Times",
        date: "2026-03-04"
    },
    {
        country: "uae",
        category: "diplomacy",
        title: "UAE Calls for Restraint While Reinforcing Defense Posture",
        excerpt: "Abu Dhabi walks a careful diplomatic line, calling for de-escalation while simultaneously hosting expanded US military operations from its Al Dhafra Air Base.",
        source: "Gulf News",
        date: "2026-03-03"
    },

    // ==================== JORDAN ====================
    {
        country: "jordan",
        category: "military",
        title: "Jordan Intercepts Drones and Missiles Crossing Its Airspace",
        excerpt: "The Royal Jordanian Air Force shoots down multiple Iranian drones and cruise missiles transiting Jordanian airspace en route to Israel, marking a significant escalation in Jordan's involvement.",
        source: "Jordan Times",
        date: "2026-03-05"
    },
    {
        country: "jordan",
        category: "humanitarian",
        title: "Jordan Braces for Potential Refugee Influx from Iraq and Syria",
        excerpt: "Already hosting over 1.3 million Syrian refugees, Jordan's government works with UNHCR to prepare contingency plans for new waves of displacement if the conflict expands to neighboring Iraq.",
        source: "Al Jazeera",
        date: "2026-03-04"
    },
    {
        country: "jordan",
        category: "diplomacy",
        title: "King Abdullah Convenes Emergency Arab League Session in Amman",
        excerpt: "Jordan's monarch hosts an emergency gathering of Arab League foreign ministers to coordinate a unified response to the Iran crisis and prevent further regional destabilization.",
        source: "Reuters",
        date: "2026-03-03"
    },

    // ==================== SAUDI ARABIA ====================
    {
        country: "saudi-arabia",
        category: "diplomacy",
        title: "Saudi Arabia Suspends Recent Iran Détente, Recalls Ambassador",
        excerpt: "The Kingdom reverses its historic 2023 diplomatic rapprochement with Iran, recalling its ambassador from Tehran and urging Saudi citizens to leave Iran immediately.",
        source: "Arab News",
        date: "2026-03-05"
    },
    {
        country: "saudi-arabia",
        category: "military",
        title: "Saudi Arabia Places Patriot Missile Batteries on Maximum Alert",
        excerpt: "Saudi air defenses across the Eastern Province and around critical oil infrastructure at Ras Tanura and Abqaiq are placed on the highest alert following threats from Iran-aligned Houthi forces.",
        source: "Saudi Gazette",
        date: "2026-03-04"
    },
    {
        country: "saudi-arabia",
        category: "economic",
        title: "Saudi Aramco Boosts Oil Output to Stabilize Global Markets",
        excerpt: "Saudi Arabia signals willingness to increase crude production by 2 million barrels per day to offset potential supply disruptions, in coordination with other OPEC+ members.",
        source: "Bloomberg",
        date: "2026-03-03"
    },

    // ==================== KUWAIT ====================
    {
        country: "kuwait",
        category: "military",
        title: "Kuwait Elevates Military Readiness Near Iranian Border",
        excerpt: "Kuwait's armed forces raise their alert status and reinforce positions near the Iraqi border, where Camp Arifjan hosts thousands of US troops serving as a key logistics hub.",
        source: "Kuwait Times",
        date: "2026-03-05"
    },
    {
        country: "kuwait",
        category: "economic",
        title: "Kuwait's Oil Exports Face Route Disruption Risks",
        excerpt: "As a major OPEC producer, Kuwait monitors the Strait of Hormuz situation closely. Officials explore alternative pipeline routes through Saudi Arabia to bypass potential naval blockades.",
        source: "Arab Times",
        date: "2026-03-04"
    },
    {
        country: "kuwait",
        category: "diplomacy",
        title: "Kuwait Calls for Diplomatic Resolution, Offers Humanitarian Aid",
        excerpt: "Kuwait's Foreign Ministry issues a statement calling for immediate ceasefire and pledges $100 million in humanitarian assistance for civilians affected by the conflict across the region.",
        source: "KUNA",
        date: "2026-03-03"
    },

    // ==================== IRAQ ====================
    {
        country: "iraq",
        category: "military",
        title: "Iran-Backed Militias in Iraq Launch Attacks on US Bases",
        excerpt: "Multiple rocket and drone attacks target American military positions at Ain al-Asad and Erbil air bases. Iraqi government faces pressure to prevent its territory from being used as a battleground.",
        source: "Al Jazeera",
        date: "2026-03-05"
    },
    {
        country: "iraq",
        category: "diplomacy",
        title: "Iraqi PM Demands All Parties Respect Iraqi Sovereignty",
        excerpt: "Baghdad walks a precarious line between its Iranian neighbor and American military partner, with the Prime Minister demanding that neither side use Iraqi territory for military operations.",
        source: "Iraq News Agency",
        date: "2026-03-04"
    },
    {
        country: "iraq",
        category: "humanitarian",
        title: "Iraqi Kurdistan Region Sees Surge in Displaced Families",
        excerpt: "The Kurdistan Regional Government reports thousands of families arriving from areas near Iran-backed militia positions, overwhelming local services already stretched thin from prior conflicts.",
        source: "Rudaw",
        date: "2026-03-03"
    },

    // ==================== TURKEY ====================
    {
        country: "turkey",
        category: "diplomacy",
        title: "Turkey Closes Airspace to Military Aircraft Amid Iran Conflict",
        excerpt: "Ankara restricts Turkish airspace to military overflights by all parties, complicating US logistics while positioning Turkey as a neutral broker. NATO allies express concern over the decision.",
        source: "Daily Sabah",
        date: "2026-03-05"
    },
    {
        country: "turkey",
        category: "economic",
        title: "Turkish Lira Under Pressure as Regional Instability Spreads",
        excerpt: "The already-vulnerable Turkish currency faces renewed selling pressure as investors reassess regional risk. Turkey's heavy reliance on imported energy makes it particularly vulnerable to oil price spikes.",
        source: "Hurriyet Daily News",
        date: "2026-03-04"
    },
    {
        country: "turkey",
        category: "analysis",
        title: "Erdogan's Balancing Act: NATO Member with Iran Ties",
        excerpt: "Turkey's unique position as a NATO member that maintains economic ties with Iran puts President Erdogan in a complex diplomatic position as the Western alliance responds to the conflict.",
        source: "TRT World",
        date: "2026-03-03"
    },

    // ==================== CYPRUS ====================
    {
        country: "cyprus",
        category: "military",
        title: "British Bases in Cyprus on High Alert for Iran Conflict Operations",
        excerpt: "RAF Akrotiri, Britain's sovereign base on Cyprus, sees increased activity as the UK positions military assets for potential operations. Cyprus becomes a critical staging point for Western forces.",
        source: "Cyprus Mail",
        date: "2026-03-05"
    },
    {
        country: "cyprus",
        category: "diplomacy",
        title: "Cyprus Offers Humanitarian Corridor for Evacuees from Region",
        excerpt: "The Cypriot government announces its willingness to serve as a transit point for civilian evacuations from Lebanon and other conflict zones, activating its EU humanitarian response protocols.",
        source: "Philenews",
        date: "2026-03-04"
    },

    // ==================== SRI LANKA ====================
    {
        country: "sri-lanka",
        category: "military",
        title: "Debris from Intercepted Missiles Falls Off Sri Lankan Coast",
        excerpt: "Sri Lankan Navy recovers missile debris from waters off the southern coast, believed to be remnants of intercepted Iranian ballistic missiles. The incident highlights the far-reaching nature of the conflict.",
        source: "Daily Mirror Sri Lanka",
        date: "2026-03-05"
    },
    {
        country: "sri-lanka",
        category: "economic",
        title: "Sri Lanka's Shipping Lanes Disrupted by Indian Ocean Military Activity",
        excerpt: "Commercial shipping around Sri Lanka faces delays and increased insurance costs as naval forces from multiple nations increase patrols. Colombo port sees vessels diverting from Gulf routes.",
        source: "The Sunday Times Sri Lanka",
        date: "2026-03-04"
    },
    {
        country: "sri-lanka",
        category: "diplomacy",
        title: "Colombo Urges Indian Ocean Region Be Kept Out of Conflict",
        excerpt: "Sri Lanka's Foreign Ministry calls on all parties to ensure the conflict does not extend into the Indian Ocean region, citing the impact on its fishing industry and maritime commerce.",
        source: "Daily News Sri Lanka",
        date: "2026-03-03"
    },

    // ==================== OMAN ====================
    {
        country: "oman",
        category: "diplomacy",
        title: "Oman Activates Backchannel Diplomacy Between Iran and the West",
        excerpt: "Muscat leverages its historic role as a mediator with Tehran, with Omani officials reportedly shuttling between capitals to establish a framework for de-escalation talks.",
        source: "Times of Oman",
        date: "2026-03-05"
    },
    {
        country: "oman",
        category: "military",
        title: "Oman Reinforces Strait of Hormuz Naval Positions",
        excerpt: "Oman, which shares control of the Strait of Hormuz with Iran, increases its naval presence to protect shipping lanes and its territorial waters from becoming a conflict zone.",
        source: "Oman Daily Observer",
        date: "2026-03-04"
    },
    {
        country: "oman",
        category: "economic",
        title: "Omani Ports See Surge in Insurance Costs for Gulf-bound Vessels",
        excerpt: "Port Sultan Qaboos and Sohar Port report significant increases in maritime insurance premiums, threatening Oman's position as a key logistics hub for Gulf commerce.",
        source: "Muscat Daily",
        date: "2026-03-03"
    },

    // ==================== AZERBAIJAN ====================
    {
        country: "azerbaijan",
        category: "military",
        title: "Azerbaijan Bolsters Border Defenses Near Iranian Frontier",
        excerpt: "Baku reinforces its southern border with additional military units following reports of Iranian troop movements in the region. Azerbaijan's complex relationship with both Iran and Israel adds tension.",
        source: "APA News",
        date: "2026-03-05"
    },
    {
        country: "azerbaijan",
        category: "diplomacy",
        title: "Azerbaijan's Israel Ties Under Scrutiny Amid Iran Conflict",
        excerpt: "Azerbaijan's deep defense partnership with Israel, including drone technology transfers and energy cooperation, draws increased Iranian hostility and threatens the delicate Baku-Tehran relationship.",
        source: "Trend News Agency",
        date: "2026-03-04"
    },
    {
        country: "azerbaijan",
        category: "economic",
        title: "Caspian Energy Routes Gain Importance as Gulf Alternatives",
        excerpt: "Azerbaijan's oil and gas pipelines through Turkey to Europe see renewed strategic importance as Persian Gulf routes face disruption, boosting Baku's geopolitical leverage.",
        source: "Caspian News",
        date: "2026-03-03"
    },
];
