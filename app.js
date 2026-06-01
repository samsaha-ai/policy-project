const app = document.getElementById("app");
const page = app?.dataset.page || "home";

const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function initChrome() {
  const masthead = document.querySelector("[data-masthead]");
  const clock = document.querySelector("[data-utc-clock]");

  function tick() {
    if (!clock) return;
    const now = new Date();
    clock.textContent = `UTC ${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}`;
  }

  function setScrolled() {
    masthead?.classList.toggle("is-scrolled", window.scrollY > 4);
  }

  tick();
  setInterval(tick, 1000);
  window.addEventListener("scroll", setScrolled, { passive: true });
  setScrolled();
}

function signedClass(value) {
  return Number(value) >= 0 ? "delta-up" : "delta-down";
}

function formatSigned(value, suffix = "") {
  const sign = Number(value) > 0 ? "+" : "";
  return `${sign}${Number(value).toFixed(Math.abs(value) >= 10 ? 1 : 2)}${suffix}`;
}

function spark(points, colorClass = "") {
  const coords = points.map((point, index) => `${index * 10},${22 - point}`).join(" ");
  return `<svg class="sparkline ${colorClass}" viewBox="0 0 70 24" aria-hidden="true"><polyline points="${coords}"></polyline></svg>`;
}

function pageHeader(kicker, title, subhead, side = "") {
  return `
    <section class="shell page-header section-tight">
      <div>
        <div class="page-kicker">${kicker}</div>
        <h1 class="page-title">${title}</h1>
        <p class="page-subhead">${subhead}</p>
      </div>
      ${side ? `<div class="header-side">${side}</div>` : ""}
    </section>
  `;
}

function footer() {
  return `
    <footer class="footer" id="subscribe">
      <div class="footer-grid">
        <div>
          <a class="wordmark" href="index.html">Capital &amp; Diplomacy</a>
          <p class="footer-tagline">Geopolitical and economic intelligence for analysts who need context before consensus.</p>
        </div>
        <nav class="footer-links" aria-label="Footer">
          <a href="markets.html">Markets</a>
          <a href="simulator.html">Policy Simulator</a>
          <a href="countries.html">Country Intelligence</a>
          <a href="research.html">Research</a>
          <a href="risk-map.html">Risk Monitor</a>
          <a href="rankings.html">Geoeconomic Rankings</a>
          <a href="explainers.html">Video Explainers</a>
          <a href="index.html">Intelligence Brief</a>
        </nav>
        <form class="newsletter">
          <label for="newsletter-email">Join 12,400 analysts</label>
          <input id="newsletter-email" class="bare-input" type="email" placeholder="Email address" aria-label="Email address">
        </form>
      </div>
    </footer>
  `;
}

const activeRiskMapEmbedSrc = "https://war-monitor.com/dashboard";

function earthMapReference(label = "War Monitor active conflict map reference", src = "https://war-monitor.com/dashboard", linkLabel = "Open War Monitor →", extraClass = "") {
  return `
    <div style="position: relative; width: 100%; height: 600px; overflow: hidden;">
  <iframe src="https://war-monitor.com/" 
          width="100%"  	
          height="100%" 
          frameborder="0" 
          allowfullscreen 
          style="position: absolute; top: 0; left: 0;">
  </iframe>
	</div>
  `;
}

function smallWorldMap() {
  return `
    ${earthMapReference("Google Earth nighttime satellite reference for geopolitical risk tiers")}
    <svg class="risk-map-small" viewBox="0 0 960 440" role="img" aria-label="Geopolitical risk tier map">
      <path class="map-land" d="M92 118 L126 84 L183 72 L232 93 L276 122 L304 168 L282 215 L229 224 L205 262 L168 253 L139 214 L104 190 Z"></path>
      <path class="map-land" d="M268 252 L306 276 L338 331 L326 392 L286 421 L250 376 L232 312 Z"></path>
      <path class="map-land" d="M406 111 L487 78 L598 78 L711 99 L827 118 L886 161 L835 200 L705 189 L633 226 L532 201 L442 216 L383 173 Z"></path>
      <path class="map-land" d="M470 223 L526 208 L578 244 L599 310 L566 378 L506 384 L462 330 L438 266 Z"></path>
      <path class="map-land" d="M728 302 L794 285 L849 319 L842 366 L770 374 Z"></path>
      <path class="map-highlight" opacity="0.92" d="M602 137 L647 123 L686 138 L690 176 L646 191 L608 171 Z"></path>
      <path class="map-highlight" opacity="0.74" d="M492 146 L538 124 L619 118 L610 159 L548 176 L499 169 Z"></path>
      <path class="map-highlight" opacity="0.62" d="M315 135 L355 128 L373 157 L348 185 L307 171 Z"></path>
      <path class="map-highlight" opacity="0.48" d="M559 201 L581 205 L590 228 L571 244 L551 229 Z"></path>
      <path class="map-highlight" opacity="0.36" d="M244 304 L277 294 L296 328 L281 368 L252 344 Z"></path>
      <path class="map-highlight" opacity="0.26" d="M433 245 L471 237 L497 261 L486 299 L446 291 Z"></path>
      <g class="chart-axis">
        <text x="35" y="410">Tier opacity indicates intensity of geoeconomic risk exposure.</text>
      </g>
    </svg>
    <div class="map-legend">
      <span><i class="legend-dot" style="opacity:.92"></i>Systemic sanctions risk</span>
      <span><i class="legend-dot" style="opacity:.62"></i>Supply-chain exposure</span>
      <span><i class="legend-dot" style="opacity:.36"></i>Sovereign stress</span>
    </div>
  `;
}

function debtChart() {
  const data = [
    ["Japan", 255],
    ["Greece", 162],
    ["Italy", 137],
    ["United States", 123],
    ["France", 111],
    ["United Kingdom", 101],
    ["China", 83],
    ["Germany", 64]
  ];
  const rows = data.map(([label, value], index) => {
    const width = (value / 270) * 520;
    const y = 42 + index * 38;
    return `
      <text x="0" y="${y + 13}" class="chart-axis">${label}</text>
      <rect x="112" y="${y}" width="${width}" height="14" fill="#C9A84C" opacity="${0.38 + index * 0.055}"></rect>
      <text x="${124 + width}" y="${y + 12}" class="chart-axis">${value}%</text>
    `;
  }).join("");

  return `
    <svg class="bar-chart" viewBox="0 0 700 370" role="img" aria-label="Public debt to GDP bar chart">
      <text x="0" y="16" class="chart-label">PUBLIC DEBT-TO-GDP</text>
      <line x1="112" y1="334" x2="632" y2="334" class="chart-grid"></line>
      <text x="112" y="356" class="chart-axis">0</text>
      <text x="295" y="356" class="chart-axis">100</text>
      <text x="488" y="356" class="chart-axis">200</text>
      ${rows}
    </svg>
  `;
}

function renderHome() {
  const pulse = [
    ["S&P 500", "5,321.4", 0.42, [7, 10, 8, 13, 12, 16, 14, 18]],
    ["DXY Index", "104.68", -0.18, [16, 13, 14, 11, 10, 9, 8, 7]],
    ["WTI Crude", "$78.40", 1.26, [8, 6, 9, 10, 13, 12, 16, 17]],
    ["Brent", "$82.71", 0.94, [9, 8, 11, 12, 15, 13, 16, 18]],
    ["Gold", "$2,345", 0.31, [10, 12, 11, 14, 15, 13, 17, 19]],
    ["US 10Y Yield", "4.28%", -0.06, [18, 17, 14, 15, 12, 11, 9, 8]],
    ["EUR/USD", "1.084", 0.12, [9, 8, 10, 11, 9, 12, 14, 15]],
    ["BTC/USD", "$67,450", -1.74, [18, 16, 17, 13, 14, 10, 11, 8]]
  ];

  const articles = [
    ["SANCTIONS", "Sanctions Architecture After SWIFT: How Secondary Sanctions Are Reshaping Global Trade Corridors.", "Financial exclusion is giving way to a denser compliance regime that pushes trade through informal clearing, local-currency settlement, and politically aligned intermediaries.", "18 min ago"],
    ["MONETARY POLICY", "The ECB's Slow Pivot and the Political Economy of Disinflation.", "Rate relief is arriving after real incomes absorbed the shock, leaving fiscal ministries to manage the lagged distributional effects.", "42 min ago"],
    ["CONFLICT ECONOMY", "The Red Sea Shock Is Becoming a Working-Capital Problem.", "Longer shipping routes are tying up inventory finance and raising the cost of resilience for firms with thin supplier redundancy.", "1 hr ago"],
    ["TRADE LAW", "Export Controls Are Becoming Industrial Policy by Other Means.", "Technology denial regimes now shape capital expenditure decisions as directly as tariffs once shaped customs flows.", "2 hrs ago"],
    ["SOVEREIGN DEBT", "Debt Distress Is Moving from Default Events to Negotiation Fatigue.", "The new sovereign architecture punishes delay with underinvestment long before a formal restructuring is reached.", "3 hrs ago"],
    ["CENTRAL BANKING", "Reserve Managers Are Buying Optionality, Not Just Gold.", "The shift into bullion and non-dollar assets is less a revolt against the dollar than a hedge against payment-system weaponization.", "4 hrs ago"]
  ];

  app.innerHTML = `
    <section class="shell lead-band section divider-bottom">
      <div class="grid-12">
        <article class="lead-primary">
          <div class="category">MONETARY ORDER</div>
          <h1 class="lead-title">The Renminbi's Quiet Ascent: What a Multipolar Reserve Currency System Means for Dollar Dominance</h1>
          <p class="lead-thesis">China is not replacing the dollar so much as building a parallel settlement layer for states that need geopolitical insurance. The result is a slower, more fragmented reserve system in which liquidity, sanctions exposure, and strategic autonomy are priced together.</p>
          <div class="story-meta"><span>Elena Markovic</span><span>9 min read</span></div>
        </article>
        <div class="lead-secondary">
          <article class="secondary-story">
            <div class="category">GEOPOLITICAL FINANCE</div>
            <h2 class="secondary-title">Sanctions Architecture After SWIFT: How Secondary Sanctions Are Reshaping Global Trade Corridors.</h2>
            <p class="story-lede">The enforcement frontier has moved from payment messaging into insurance, shipping, beneficial ownership, and correspondent banking risk.</p>
          </article>
          <article class="secondary-story">
            <div class="category">SOVEREIGN RISK</div>
            <h2 class="secondary-title">Debt Distress and Development Finance After the Beijing Lending Cycle.</h2>
            <p class="story-lede">The most consequential negotiations are now happening before default, inside maturity extensions and collateral carveouts.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="shell section-tight">
      <div class="pulse-bar" aria-label="Global pulse market indicators">
        ${pulse.map(([label, value, delta, points]) => `
          <div class="pulse-item">
            <div class="pulse-label">${label}</div>
            <div class="pulse-value"><strong>${value}</strong><span class="${signedClass(delta)}">${formatSigned(delta, "%")}</span></div>
            ${spark(points, signedClass(delta))}
          </div>
        `).join("")}
      </div>
    </section>

    <section class="shell section">
      <div class="intelligence-grid">
        ${articles.map(([cat, title, lede, time]) => `
          <article class="article-tile">
            <div class="category">${cat}</div>
            <h2 class="article-title">${title}</h2>
            <p class="lede">${lede}</p>
            <div class="timestamp">${time}</div>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="band">
      <div class="band-inner analysis-spread">
        <blockquote class="pull-quote">"The new macro cycle is not defined by scarcity alone, but by who can absorb the cost of strategic redundancy."</blockquote>
        <div>
          <h2 class="abstract-title">Featured Analysis: Strategic Redundancy as the New Cost of Capital</h2>
          <p class="abstract-text">Supply chains are being redesigned around political optionality, not pure efficiency. The resulting capital cycle favors firms and states that can finance duplicate capacity, inventory buffers, and jurisdictional flexibility without losing pricing power.</p>
          <div class="key-findings">
            <div class="finding"><strong>Key Finding 1</strong> — Firms with dual sourcing in critical minerals face higher short-run costs but lower exposure to export-control shocks.</div>
            <div class="finding"><strong>Key Finding 2</strong> — Public credit guarantees are becoming a substitute for missing private insurance in contested trade corridors.</div>
            <div class="finding"><strong>Key Finding 3</strong> — Monetary policy transmission weakens when geopolitical risk forces companies to prioritize resilience over margin expansion.</div>
          </div>
        </div>
      </div>
    </section>

    <section class="shell section data-dispatch">
      <div class="map-frame">
        <h2 class="module-heading">Data Dispatch: Geopolitical Risk Tiers</h2>
        ${smallWorldMap()}
      </div>
      <div class="chart-frame">
        <h2 class="module-heading">Public Debt Burden Across Major Economies</h2>
        ${debtChart()}
      </div>
    </section>
    ${footer()}
  `;
}

function polylineFrom(values, width = 760, height = 290, min = null, max = null) {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  return values.map((value, index) => {
    const x = 54 + index * ((width - 90) / (values.length - 1));
    const y = 30 + (1 - ((value - lo) / (hi - lo))) * (height - 76);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function yieldCurveChart() {
  const labels = ["1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y", "20Y", "30Y"];
  const current = [5.48, 5.45, 5.31, 5.07, 4.74, 4.36, 4.28, 4.55, 4.42];
  const prior = [5.16, 5.25, 5.28, 5.04, 4.35, 3.82, 3.76, 4.01, 3.93];
  const xFor = (index) => 54 + index * (670 / (labels.length - 1));

  return `
    <svg class="yield-chart" viewBox="0 0 780 330" role="img" aria-label="US Treasury yield curve">
      <text x="54" y="18" class="chart-label">US TREASURY YIELD CURVE</text>
      <line x1="54" y1="270" x2="724" y2="270" class="chart-grid"></line>
      <line x1="54" y1="210" x2="724" y2="210" class="chart-grid"></line>
      <line x1="54" y1="150" x2="724" y2="150" class="chart-grid"></line>
      <line x1="54" y1="90" x2="724" y2="90" class="chart-grid"></line>
      <rect x="${xFor(4) - 12}" y="72" width="${xFor(6) - xFor(4) + 24}" height="172" fill="#7C4A4A" opacity="0.16"></rect>
      <text x="${xFor(4) + 12}" y="92" class="chart-axis">2Y/10Y inversion zone</text>
      <polyline class="chart-line-prior" points="${polylineFrom(prior, 780, 330, 3.4, 5.6)}"></polyline>
      <polyline class="chart-line" points="${polylineFrom(current, 780, 330, 3.4, 5.6)}"></polyline>
      ${labels.map((label, index) => `<text x="${xFor(index) - 8}" y="302" class="chart-axis">${label}</text>`).join("")}
      <text x="12" y="274" class="chart-axis">3.5</text>
      <text x="12" y="214" class="chart-axis">4.1</text>
      <text x="12" y="154" class="chart-axis">4.7</text>
      <text x="12" y="94" class="chart-axis">5.3</text>
      <text x="54" y="318" class="chart-axis">Gold: current curve. Muted line: curve from 12 months prior.</text>
    </svg>
  `;
}

function wtiChart() {
  const prices = [72, 75, 81, 86, 83, 78, 74, 71, 76, 79, 82, 78];
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  return `
    <svg class="area-chart" viewBox="0 0 760 340" role="img" aria-label="WTI crude 12 month price line">
      <text x="54" y="18" class="chart-label">WTI CRUDE 12-MONTH PRICE</text>
      <line x1="54" y1="282" x2="718" y2="282" class="chart-grid"></line>
      <line x1="54" y1="222" x2="718" y2="222" class="chart-grid"></line>
      <line x1="54" y1="162" x2="718" y2="162" class="chart-grid"></line>
      <line x1="54" y1="102" x2="718" y2="102" class="chart-grid"></line>
      <polyline class="chart-line" points="${polylineFrom(prices, 760, 340, 68, 90)}"></polyline>
      ${months.map((month, index) => `<text x="${54 + index * (664 / 11) - 8}" y="314" class="chart-axis">${month}</text>`).join("")}
      <text x="14" y="286" class="chart-axis">$68</text>
      <text x="14" y="226" class="chart-axis">$75</text>
      <text x="14" y="166" class="chart-axis">$82</text>
      <text x="14" y="106" class="chart-axis">$89</text>
    </svg>
  `;
}

function renderMarkets() {
  const command = [
    ["GDP Growth (G7 avg)", "1.6%", "+0.2 pp", "Resilient services consumption is offsetting manufacturing weakness, keeping recession risk uneven rather than synchronized."],
    ["Global Inflation Rate", "4.7%", "-0.6 pp", "Goods disinflation is doing the visible work, while shelter and wage-sensitive services keep central banks cautious."],
    ["Fed Funds Rate", "5.25-5.50%", "unchanged", "Policy remains restrictive because the FOMC is prioritizing inflation credibility over near-term credit relief."],
    ["US 10Y Yield", "4.28%", "-6 bps", "Treasury duration demand improves when investors price slower nominal growth and lower term-premium shock risk."],
    ["DXY", "104.7", "-0.18%", "Dollar strength reflects rate differentials and safe-asset demand rather than a clean US growth premium."],
    ["Global PMI Composite", "50.6", "+0.4", "The global economy is expanding at stall speed, with services masking weak tradable-goods momentum."]
  ];

  const movers = {
    Equities: [
      ["S&P 500", "5,321.4", 0.42, [7, 10, 8, 13, 12, 16, 14, 18]],
      ["NASDAQ 100", "18,550", 0.64, [8, 9, 11, 15, 12, 17, 16, 19]],
      ["STOXX 600", "521.3", -0.21, [15, 13, 14, 12, 10, 11, 8, 7]],
      ["Nikkei 225", "38,920", 0.18, [9, 11, 10, 12, 15, 13, 16, 17]],
      ["Hang Seng", "18,330", -0.76, [18, 16, 14, 15, 12, 9, 10, 7]],
      ["MSCI EM", "1,057", 0.09, [8, 7, 10, 9, 13, 12, 14, 15]]
    ],
    Commodities: [
      ["WTI Crude", "$78.40", 1.26, [8, 6, 9, 10, 13, 12, 16, 17]],
      ["Brent", "$82.71", 0.94, [9, 8, 11, 12, 15, 13, 16, 18]],
      ["Gold", "$2,345", 0.31, [10, 12, 11, 14, 15, 13, 17, 19]],
      ["Copper", "$4.62/lb", -0.47, [17, 16, 14, 12, 13, 10, 9, 8]],
      ["TTF Gas", "EUR 31.8", 2.12, [6, 8, 7, 10, 12, 15, 14, 18]],
      ["CBOT Wheat", "$6.72", -0.33, [16, 14, 15, 12, 11, 9, 10, 8]]
    ],
    Currencies: [
      ["EUR/USD", "1.084", 0.12, [9, 8, 10, 11, 9, 12, 14, 15]],
      ["USD/JPY", "156.8", -0.22, [18, 16, 15, 14, 13, 10, 9, 8]],
      ["GBP/USD", "1.273", 0.08, [9, 9, 11, 10, 12, 13, 14, 15]],
      ["USD/CNH", "7.24", 0.16, [8, 10, 9, 11, 13, 12, 14, 16]],
      ["USD/MXN", "16.75", -0.41, [17, 15, 14, 12, 11, 9, 8, 7]],
      ["USD/TRY", "32.2", 0.58, [6, 7, 8, 10, 12, 14, 15, 18]]
    ]
  };

  const regions = [
    ["North America", "2.2%", "3.3%", "5.50%", "-2.8%", 2],
    ["Europe", "0.8%", "2.6%", "4.00%", "+2.1%", 3],
    ["Asia-Pacific", "4.1%", "2.4%", "varied", "+1.7%", 3],
    ["Middle East & Africa", "3.0%", "9.8%", "varied", "+0.9%", 4],
    ["Latin America", "2.0%", "5.4%", "9.25%", "-1.6%", 3]
  ];

  const emCurrencies = [
    ["Chinese yuan", "7.24", "-1.9%", "Active", "Managed fixing and state-bank dollar supply are limiting depreciation without forcing a sharp reserve drawdown."],
    ["Indian rupee", "83.3", "-0.7%", "Active", "Reserve Bank smoothing is preserving import-price stability while capital inflows cushion current-account pressure."],
    ["Brazilian real", "5.15", "-6.1%", "Passive", "Fiscal uncertainty and carry compression have outweighed still-positive real rates."],
    ["Mexican peso", "16.75", "+1.8%", "None", "Nearshoring inflows and high real yields continue to support peso resilience."],
    ["Turkish lira", "32.2", "-8.4%", "Active", "Orthodox rate hikes slowed the adjustment, but inflation inertia keeps depreciation pressure alive."],
    ["South African rand", "18.4", "-0.9%", "Passive", "Commodity sensitivity and power-sector constraints keep the risk premium elevated."],
    ["Indonesian rupiah", "16,040", "-4.2%", "Active", "Dollar strength and portfolio outflows have forced rate defense despite stable domestic demand."],
    ["Egyptian pound", "47.6", "-35.0%", "Active", "A step devaluation and external financing package reset the currency regime but left imported inflation exposed."]
  ];

  app.innerHTML = `
    ${pageHeader("Markets & Economic Intelligence", "The Global Economy in Real Time.", "Macro indicators, commodity flows, and currency dynamics — contextualized.")}
    <section class="shell section">
      <div class="command-strip">
        ${command.map(([label, value, delta, note]) => `
          <div class="metric-tile">
            <div class="metric-label">${label}</div>
            <div class="metric-value">${value}</div>
            <div class="metric-delta">${delta}</div>
            <div class="intelligence-note">${note}</div>
          </div>
        `).join("")}
      </div>
    </section>
    <section class="shell section-tight">
      <div class="market-movers">
        ${Object.entries(movers).map(([group, rows]) => `
          <div class="mover-column">
            <div class="category">${group}</div>
            ${rows.map(([name, value, change, points]) => `
              <div class="mover-row">
                <strong>${name}</strong>
                <span>${value}</span>
                <span class="${signedClass(change)}">${formatSigned(change, "%")}</span>
                ${spark(points, signedClass(change))}
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    </section>
    <section class="shell section">
      <h2 class="module-heading">Yield Curve Visualizer</h2>
      ${yieldCurveChart()}
      <p class="callout">An inverted 2Y/10Y spread has preceded every US recession since 1955.</p>
    </section>
    <section class="shell section divider-top">
      <h2 class="module-heading">Regional Economic Heat Map</h2>
      <table class="data-table">
        <thead><tr><th>REGION</th><th>GDP GROWTH</th><th>INFLATION</th><th>CENTRAL BANK RATE</th><th>CURRENT ACCOUNT</th><th>POLITICAL RISK</th></tr></thead>
        <tbody>
          ${regions.map(([region, gdp, inflation, rate, account, risk]) => `
            <tr><td><strong>${region}</strong></td><td>${gdp}</td><td>${inflation}</td><td>${rate}</td><td>${account}</td><td><span class="gold-dots">${"●".repeat(risk)}${"○".repeat(5 - risk)}</span></td></tr>
          `).join("")}
        </tbody>
      </table>
    </section>
    <section class="shell section split-60-40 divider-top">
      <div>
        <h2 class="module-heading">Commodities Intelligence: WTI Crude</h2>
        ${wtiChart()}
      </div>
      <div class="annotation-stack">
        ${[
          ["Gold", "Central-bank demand and sanctions-risk hedging have turned bullion into a reserve optionality instrument. Higher real rates cap speculative upside, but official-sector buying has made drawdowns shallower."],
          ["Natural Gas", "European inventories are healthy, yet LNG cargo competition remains sensitive to Asian weather and Red Sea routing risk. The market is pricing logistics uncertainty more than immediate scarcity."],
          ["Wheat", "Black Sea export resilience has lowered crisis premia, but weather volatility and insurance costs still make food inflation vulnerable to conflict escalation. Import-dependent states remain exposed through fiscal subsidy channels."]
        ].map(([title, text]) => `<article class="annotation-card"><h3>${title}</h3><p>${text}</p></article>`).join("")}
      </div>
    </section>
    <section class="shell section divider-top">
      <h2 class="module-heading">Currency War Tracker</h2>
      <table class="data-table">
        <thead><tr><th>CURRENCY</th><th>RATE VS USD</th><th>YTD CHANGE</th><th>INTERVENTION</th><th>MACRO NOTE</th></tr></thead>
        <tbody>
          ${emCurrencies.map(([currency, rate, ytd, status, note]) => `
            <tr><td><strong>${currency}</strong></td><td>${rate}</td><td>${ytd}</td><td>${status}</td><td>${note}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </section>
    ${footer()}
  `;
}

const powerfulCountries = [
  "United States",
  "China",
  "Russia",
  "United Kingdom",
  "Germany",
  "South Korea",
  "France",
  "Japan",
  "Saudi Arabia",
  "United Arab Emirates",
  "Israel",
  "India",
  "Canada",
  "Australia",
  "Turkey",
  "Italy",
  "Singapore",
  "Spain",
  "Switzerland",
  "Sweden",
  "Brazil",
  "Qatar",
  "Iran",
  "Netherlands",
  "Egypt"
];

const simulatorConfigs = {
  TARIFFS: {
    sliderLabel: "Tariff rate",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
    defaultValue: 25,
    selectLabel: "Target sector",
    selectOptions: ["Technology", "Agriculture", "Steel & Metals", "Pharmaceuticals", "Energy"],
    multiLabel: "Country target",
    multiOptions: powerfulCountries,
    defaultTargets: ["China"]
  },
  "INTEREST RATES": {
    sliderLabel: "Policy-rate shock",
    min: -300,
    max: 300,
    step: 25,
    unit: " bps",
    defaultValue: 100,
    selectLabel: "Transmission channel",
    selectOptions: ["Bank credit", "Mortgage market", "Sovereign debt", "Corporate refinancing", "Exchange rate"],
    multiLabel: "Exposed economies",
    multiOptions: powerfulCountries,
    defaultTargets: ["United States"]
  },
  SANCTIONS: {
    sliderLabel: "Sanctions coverage",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
    defaultValue: 40,
    selectLabel: "Primary sector targeted",
    selectOptions: ["Finance", "Energy", "Shipping", "Technology", "Defense"],
    multiLabel: "Target jurisdiction",
    multiOptions: powerfulCountries,
    defaultTargets: ["Russia"]
  },
  TAXATION: {
    sliderLabel: "Tax-rate change",
    min: -10,
    max: 20,
    step: 1,
    unit: " pts",
    defaultValue: 5,
    selectLabel: "Tax base",
    selectOptions: ["Corporate income", "Capital gains", "Consumption", "Carbon", "High-income households"],
    multiLabel: "Affected countries",
    multiOptions: powerfulCountries,
    defaultTargets: ["United States"]
  },
  IMMIGRATION: {
    sliderLabel: "Net migration change",
    min: -50,
    max: 50,
    step: 1,
    unit: "%",
    defaultValue: -15,
    selectLabel: "Labor channel",
    selectOptions: ["High-skill visas", "Seasonal labor", "Asylum processing", "Family reunification", "Border enforcement"],
    multiLabel: "Country exposure",
    multiOptions: powerfulCountries,
    defaultTargets: ["United States"]
  },
  "INFLATION TARGET": {
    sliderLabel: "Inflation target",
    min: 1,
    max: 5,
    step: 0.25,
    unit: "%",
    defaultValue: 2.5,
    selectLabel: "Credibility assumption",
    selectOptions: ["High credibility", "Medium credibility", "Low credibility", "Fiscal dominance risk"],
    multiLabel: "Policy setting",
    multiOptions: powerfulCountries,
    defaultTargets: ["United States"]
  }
};

const simulatorState = {
  category: "TARIFFS",
  magnitude: 25,
  select: "Technology",
  targets: ["China"]
};

function renderSimulator() {
  app.innerHTML = `
    ${pageHeader("Policy Simulator", "Model the Economic Consequences of Policy Decisions.", "Adjust macroeconomic levers and observe simulated second-order effects across trade, inflation, employment, and geopolitical stability.")}
    <section class="shell section simulator-layout">
      <aside class="control-panel">
        <div class="tabs" role="tablist" aria-label="Policy categories">
          ${Object.keys(simulatorConfigs).map((category) => `<button class="tab-button ${category === simulatorState.category ? "is-active" : ""}" type="button" data-sim-tab="${category}">${category}</button>`).join("")}
        </div>
        <div id="sim-controls"></div>
      </aside>
      <section class="impact-dashboard" aria-live="polite">
        <div id="impact-meters"></div>
      </section>
    </section>
    <section class="shell section divider-top">
      <h2 class="module-heading">Second-Order Effects</h2>
      <div class="effects-grid" id="second-order-effects"></div>
    </section>
    <section class="shell section-tight">
      <div class="scenario-bar">
        <input class="bare-input" type="text" placeholder="Save this scenario" aria-label="Scenario name">
        <button class="outline-button" type="button">Export as PDF</button>
        <select class="select-control" aria-label="Compare with saved scenario">
          <option>Compare with → Baseline 2024 trade regime</option>
          <option>Compare with → 2018 tariff escalation</option>
          <option>Compare with → Energy sanctions shock</option>
        </select>
      </div>
    </section>
    <section class="shell section-tight">
      <details class="methodology">
        <summary>Methodology note</summary>
        <p>The simulation uses an IS-LM demand channel to estimate output and employment effects from rate, tax, and fiscal-price shocks. Trade effects are approximated with a gravity-model elasticity that scales bilateral exposure by sector intensity and substitution capacity. Inflation and policy reaction estimates reference Taylor Rule logic, with risk deltas added when the lever plausibly changes sanctions exposure, alliance cohesion, or retaliatory incentives.</p>
      </details>
    </section>
    ${footer()}
  `;
  initSimulator();
}

function renderSimulatorControls() {
  const config = simulatorConfigs[simulatorState.category];
  simulatorState.select = config.selectOptions.includes(simulatorState.select) ? simulatorState.select : config.selectOptions[0];
  simulatorState.targets = simulatorState.targets.filter((target) => config.multiOptions.includes(target));
  if (!simulatorState.targets.length) simulatorState.targets = [...config.defaultTargets];

  document.getElementById("sim-controls").innerHTML = `
    <div class="control-group">
      <label class="control-label" for="sim-range">${config.sliderLabel}</label>
      <div class="range-wrap">
        <input id="sim-range" type="range" min="${config.min}" max="${config.max}" step="${config.step}" value="${simulatorState.magnitude}">
        <span id="sim-range-value" class="metric-delta">${simulatorState.magnitude}${config.unit}</span>
      </div>
    </div>
    <div class="control-group">
      <label class="control-label" for="sim-select">${config.selectLabel}</label>
      <select id="sim-select" class="select-control">
        ${config.selectOptions.map((option) => `<option ${option === simulatorState.select ? "selected" : ""}>${option}</option>`).join("")}
      </select>
    </div>
    <div class="control-group">
      <span class="control-label">${config.multiLabel}</span>
      <div class="multi-select">
        ${config.multiOptions.map((option) => `<button class="chip ${simulatorState.targets.includes(option) ? "is-selected" : ""}" type="button" data-sim-target="${option}">${option}</button>`).join("")}
      </div>
    </div>
  `;

  const range = document.getElementById("sim-range");
  const select = document.getElementById("sim-select");
  range.addEventListener("input", () => {
    simulatorState.magnitude = Number(range.value);
    document.getElementById("sim-range-value").textContent = `${simulatorState.magnitude}${config.unit}`;
    updateSimulatorOutputs();
  });
  select.addEventListener("change", () => {
    simulatorState.select = select.value;
    updateSimulatorOutputs();
  });
  document.querySelectorAll("[data-sim-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.simTarget;
      if (simulatorState.targets.includes(target)) {
        simulatorState.targets = simulatorState.targets.filter((item) => item !== target);
      } else {
        simulatorState.targets.push(target);
      }
      if (!simulatorState.targets.length) simulatorState.targets = [target];
      button.classList.toggle("is-selected", simulatorState.targets.includes(target));
      updateSimulatorOutputs();
    });
  });
}

function calculateImpacts() {
  const c = simulatorState.category;
  const m = Number(simulatorState.magnitude);
  const exposure = 1 + (simulatorState.targets.length - 1) * 0.12;
  const sectorIntensity = {
    Technology: 1.15,
    Agriculture: 0.82,
    "Steel & Metals": 1.05,
    Pharmaceuticals: 0.76,
    Energy: 1.22,
    Finance: 1.25,
    Shipping: 1.1,
    Defense: 0.88
  }[simulatorState.select] || 1;

  let values;
  if (c === "TARIFFS") {
    values = {
      gdp: -0.018 * m * exposure * sectorIntensity,
      cpi: 0.026 * m * sectorIntensity,
      trade: -0.33 * m * exposure,
      jobs: -0.017 * m * sectorIntensity,
      currency: -0.14 * m * exposure,
      risk: 0.22 * m * exposure
    };
  } else if (c === "INTEREST RATES") {
    values = {
      gdp: -0.0042 * m,
      cpi: -0.0028 * m,
      trade: -0.013 * m,
      jobs: -0.0024 * m,
      currency: 0.018 * m,
      risk: Math.abs(m) * 0.006
    };
  } else if (c === "SANCTIONS") {
    values = {
      gdp: -0.012 * m * exposure,
      cpi: 0.018 * m * sectorIntensity,
      trade: -0.42 * m * exposure,
      jobs: -0.01 * m,
      currency: -0.19 * m,
      risk: 0.31 * m * exposure
    };
  } else if (c === "TAXATION") {
    values = {
      gdp: -0.055 * m,
      cpi: m > 0 ? -0.015 * m : 0.025 * Math.abs(m),
      trade: -0.09 * m,
      jobs: -0.026 * m,
      currency: 0.03 * m,
      risk: Math.abs(m) * 0.08
    };
  } else if (c === "IMMIGRATION") {
    values = {
      gdp: 0.026 * m,
      cpi: -0.012 * m,
      trade: 0.06 * m,
      jobs: 0.018 * m,
      currency: 0.022 * m,
      risk: Math.abs(m) * 0.05
    };
  } else {
    const deviation = m - 2;
    values = {
      gdp: 0.16 * deviation,
      cpi: 0.34 * deviation,
      trade: 0.5 * deviation,
      jobs: 0.09 * deviation,
      currency: -0.62 * deviation,
      risk: Math.abs(deviation) * 1.6
    };
  }

  return values;
}

function impactNarratives(values) {
  const targetText = simulatorState.targets.join(", ");
  const lever = simulatorState.category.toLowerCase();
  const selected = simulatorState.select.toLowerCase();

  if (simulatorState.category === "TARIFFS") {
    return [
      `A ${simulatorState.magnitude}% tariff on ${selected} imports from ${targetText} reduces domestic output through higher input costs while accelerating supply-chain diversification toward lower-tariff jurisdictions.`,
      `Consumer prices rise as importers pass through part of the tariff and domestic producers gain temporary pricing power in protected categories.`,
      `Trade volume falls as bilateral flows reroute through third countries and customs compliance raises the fixed cost of cross-border transactions.`,
      `Employment losses concentrate in downstream sectors that depend on imported intermediate goods rather than in the protected sector itself.`,
      `Currency pressure reflects weaker trade efficiency and a higher risk premium for firms with exposed offshore revenue.`,
      `Geopolitical risk rises because retaliation incentives increase when tariff coverage reaches strategic sectors.`
    ];
  }

  if (simulatorState.category === "INTEREST RATES") {
    return [
      `A ${simulatorState.magnitude} bps policy-rate shock changes output through credit demand, refinancing costs, and the investment hurdle rate.`,
      `Inflation responds with a lag because demand-sensitive services adjust more slowly than goods and energy components.`,
      `Trade volumes move with domestic demand and exchange-rate pass-through into import prices.`,
      `Employment shifts through construction, durable goods, and small-business credit availability before appearing in headline payrolls.`,
      `Currency pressure reflects relative-rate differentials and carry incentives across the selected economies.`,
      `Geopolitical risk changes when higher debt-service costs constrain fiscal capacity in allied or exposed economies.`
    ];
  }

  if (simulatorState.category === "SANCTIONS") {
    return [
      `A ${simulatorState.magnitude}% sanctions coverage regime targeting ${selected} compresses output by restricting external finance, insurance, and import substitution capacity.`,
      `Inflation rises where sanctioned inputs are difficult to replace and domestic logistics become less efficient.`,
      `Trade volume contracts as compliance screening, beneficial-ownership risk, and shipping insurance reduce executable transactions.`,
      `Employment effects are concentrated in export-facing firms and sectors with blocked access to dollar settlement.`,
      `Currency pressure increases as hard-currency inflows fall and local settlement channels trade at a discount.`,
      `Geopolitical risk rises because sanction evasion networks expand and secondary-sanctions exposure spreads to intermediaries.`
    ];
  }

  return [
    `The ${lever} lever transmits to GDP through aggregate demand, sector capacity, and the speed at which households and firms adjust balance sheets.`,
    `Inflation changes through demand pressure, import prices, wage bargaining, and the credibility of the policy framework.`,
    `Trade volume follows the combined effect of exchange-rate moves, domestic absorption, and cross-border compliance costs.`,
    `Employment adjusts after output because firms initially absorb uncertainty through hours, vacancies, and delayed investment.`,
    `Currency pressure reflects capital-flow sensitivity, external balances, and the credibility of the policy rule.`,
    `Geopolitical risk changes when the policy creates spillovers that trading partners interpret as coercive or destabilizing.`
  ];
}

function updateSimulatorOutputs() {
  const values = calculateImpacts();
  const narratives = impactNarratives(values);
  const meters = [
    ["GDP Impact (%)", values.gdp, "%", 4],
    ["Inflation Effect (CPI pts)", values.cpi, " pts", 4],
    ["Trade Volume Change (%)", values.trade, "%", 35],
    ["Employment Effect (millions)", values.jobs, "m", 3],
    ["Currency Pressure (index)", values.currency, "", 18],
    ["Geopolitical Risk Delta", values.risk, "", 32]
  ];

  document.getElementById("impact-meters").innerHTML = meters.map(([label, value, suffix, max], index) => {
    const width = Math.min(Math.abs(value) / max, 1) * 50;
    const left = value >= 0 ? 50 : 50 - width;
    return `
      <div class="impact-meter">
        <div class="meter-label">${label}</div>
        <div class="meter-track"><span class="meter-fill" style="left:${left}%;width:${width}%;background:${value >= 0 ? "var(--gold)" : "var(--red)"}"></span></div>
        <div class="meter-value ${value >= 0 ? "positive" : "negative"}">${formatSigned(value, suffix)}</div>
        <p class="meter-explain">${narratives[index]}</p>
      </div>
    `;
  }).join("");

  updateSecondOrderEffects(values);
}

function updateSecondOrderEffects(values) {
  const tradeDirection = values.trade >= 0 ? "↑" : "↓";
  const gdpDirection = values.gdp >= 0 ? "↑" : "↓";
  const partners = simulatorState.category === "SANCTIONS"
    ? [["🇷🇺 Russia", "↓"], ["🇨🇳 China", "→"], ["🇹🇷 Turkey", "↑"], ["🇦🇪 UAE", "↑"], ["🇮🇳 India", "→"]]
    : [["🇨🇳 China", tradeDirection], ["🇪🇺 European Union", tradeDirection], ["🇲🇽 Mexico", gdpDirection], ["🇻🇳 Vietnam", "↑"], ["🇮🇳 India", tradeDirection]];

  const responses = simulatorState.category === "TARIFFS"
    ? ["China: accelerate yuan settlement and retaliate on politically salient agricultural exports.", "European Union: pursue WTO consultation while expanding anti-coercion instruments.", "Mexico and Vietnam: absorb diversionary investment but face stricter rules-of-origin scrutiny."]
    : simulatorState.category === "SANCTIONS"
      ? ["Target state: deepen non-dollar settlement and reroute trade through intermediary jurisdictions.", "Sanctioning coalition: expand beneficial-ownership screening and secondary-sanctions enforcement.", "Neutral hubs: face higher compliance costs as banks de-risk shipping, insurance, and trade finance."]
      : ["Central banks: adjust forward guidance to contain expectations drift.", "Finance ministries: use targeted relief to offset distributional stress without overwhelming monetary transmission.", "Trading partners: hedge exposure through inventory buffers and currency reserves."];

  const precedent = simulatorState.category === "TARIFFS"
    ? "Comparable to the 2002 Bush steel tariffs, which triggered WTO dispute proceedings and were reversed within 18 months. The 2018 US-China tariff cycle shows how narrow measures can become durable bargaining infrastructure."
    : simulatorState.category === "SANCTIONS"
      ? "Comparable to the sanctions escalation after Russia's 2014 Crimea annexation and the broader financial restrictions imposed after the 2022 invasion of Ukraine. The precedent shows that payment restrictions reshape trade even when commodity flows continue."
      : "Comparable to the Volcker disinflation and later emerging-market sudden-stop episodes, where domestic stabilization produced external spillovers through dollar funding, capital flows, and trade compression.";

  document.getElementById("second-order-effects").innerHTML = `
    <div>
      <div class="category">Trading Partners Affected</div>
      <div class="effects-list">${partners.map(([name, direction]) => `<span>${name} <strong class="${direction === "↑" ? "positive" : direction === "↓" ? "negative" : ""}">${direction}</strong></span>`).join("")}</div>
    </div>
    <div>
      <div class="category">Likely Policy Responses</div>
      <div class="effects-list">${responses.map((item) => `<span>- ${item}</span>`).join("")}</div>
    </div>
    <div>
      <div class="category">Historical Precedent</div>
      <p class="lede">${precedent}</p>
    </div>
  `;
}

function initSimulator() {
  document.querySelectorAll("[data-sim-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      simulatorState.category = button.dataset.simTab;
      const config = simulatorConfigs[simulatorState.category];
      simulatorState.magnitude = config.defaultValue;
      simulatorState.select = config.selectOptions[0];
      simulatorState.targets = [...config.defaultTargets];
      document.querySelectorAll("[data-sim-tab]").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      renderSimulatorControls();
      updateSimulatorOutputs();
    });
  });
  renderSimulatorControls();
  updateSimulatorOutputs();
}

const countryProfiles = {
  China: {
    official: "People's Republic of China",
    classification: "STRATEGIC TIER 1 — SYSTEMIC GEOPOLITICAL ACTOR",
    summary: "China is the central manufacturing node in the global economy and the principal strategic competitor to the United States. Its leverage rests on industrial scale, critical mineral processing, trade finance, and the ability to coordinate state credit with long-horizon industrial policy. The near-term risk is a balance-sheet slowdown in property and local government finance that reduces domestic demand while increasing external pressure to export excess capacity.",
    stats: ["1.41B", "$17.8T", "$12.6K", "5.2%", "0.2%", "83.6%", "+1.4%", "46.7"],
    risk: 7
  },
  "United States": {
    official: "United States of America",
    classification: "STRATEGIC TIER 1 — RESERVE CURRENCY AND SECURITY ANCHOR",
    summary: "The United States remains the core issuer of global safe assets and the dominant military alliance organizer. Its leverage is built on dollar liquidity, technology platforms, energy flexibility, and security guarantees. The near-term risk is fiscal polarization that raises term premia and complicates alliance commitments.",
    stats: ["335M", "$27.4T", "$81.6K", "2.5%", "3.4%", "123%", "-3.0%", "41.5"],
    risk: 4
  },
  Russia: {
    official: "Russian Federation",
    classification: "STRATEGIC TIER 2 — REVISIONIST ENERGY AND SECURITY ACTOR",
    summary: "Russia projects influence through energy exports, military coercion, nuclear deterrence, and sanctions adaptation networks. Its leverage is strongest where commodity dependence intersects with weak institutional alignment. The near-term risk is prolonged war expenditure that deepens fiscal rigidity and technological isolation.",
    stats: ["146M", "$2.0T", "$13.8K", "3.6%", "7.4%", "20%", "+2.5%", "36.0"],
    risk: 8
  },
  Germany: {
    official: "Federal Republic of Germany",
    classification: "STRATEGIC TIER 2 — INDUSTRIAL AND EUROPEAN POLICY ANCHOR",
    summary: "Germany is the European Union's industrial balance sheet and a key rule-setting actor in trade, climate, and fiscal governance. Its leverage depends on manufacturing depth, export credit, and institutional influence in Brussels. The near-term risk is weak productivity growth combined with energy-cost and China-demand exposure.",
    stats: ["84M", "$4.5T", "$53.6K", "-0.3%", "5.9%", "64%", "+5.9%", "31.7"],
    risk: 3
  },
  India: {
    official: "Republic of India",
    classification: "STRATEGIC TIER 2 — DEMOGRAPHIC AND NONALIGNED SCALE POWER",
    summary: "India is a high-growth market with rising diplomatic optionality between Western security partnerships and Global South leadership. Its leverage rests on demographics, services exports, pharmaceutical capacity, and strategic geography in the Indian Ocean. The near-term risk is employment absorption failing to match the pace of population and urban labor-force growth.",
    stats: ["1.43B", "$3.6T", "$2.5K", "7.6%", "5.4%", "82%", "-1.2%", "35.7"],
    risk: 5
  },
  Brazil: {
    official: "Federative Republic of Brazil",
    classification: "STRATEGIC TIER 3 — AGRICULTURAL, ENERGY, AND CLIMATE SWING STATE",
    summary: "Brazil's geopolitical relevance comes from food exports, energy resources, climate governance, and diplomatic reach across the Global South. Its leverage increases when commodity security and decarbonization agendas converge. The near-term risk is fiscal slippage that lifts real rates and crowds out private investment.",
    stats: ["216M", "$2.2T", "$10.4K", "2.9%", "4.6%", "85%", "-1.5%", "52.0"],
    risk: 5
  },
  "Saudi Arabia": {
    official: "Kingdom of Saudi Arabia",
    classification: "STRATEGIC TIER 2 — ENERGY PRICE AND REGIONAL SECURITY ACTOR",
    summary: "Saudi Arabia remains a central actor in oil-market management and Gulf security alignment. Its leverage rests on spare production capacity, sovereign capital, and the ability to coordinate with both Washington and Beijing. The near-term risk is balancing fiscal breakeven oil prices with expensive diversification projects.",
    stats: ["36M", "$1.1T", "$32.5K", "-0.8%", "2.3%", "24%", "+2.0%", "45.9"],
    risk: 4
  },
  Iran: {
    official: "Islamic Republic of Iran",
    classification: "STRATEGIC TIER 2 — SANCTIONS-ADAPTED REGIONAL POWER",
    summary: "Iran projects influence through regional networks, energy geography, and asymmetric military capacity. Its leverage is strongest where maritime chokepoints, non-state partners, and sanctions evasion intersect. The near-term risk is escalation that converts proxy conflict into direct infrastructure or shipping disruption.",
    stats: ["89M", "$402B", "$4.5K", "4.7%", "40.7%", "34%", "+3.1%", "40.9"],
    risk: 8
  }
};

const worldBankIndicators = [
  ["population", "SP.POP.TOTL"],
  ["gdp", "NY.GDP.MKTP.CD"],
  ["gdpPerCapita", "NY.GDP.PCAP.CD"],
  ["gdpGrowth", "NY.GDP.MKTP.KD.ZG"],
  ["inflation", "FP.CPI.TOTL.ZG"],
  ["debt", "GC.DOD.TOTL.GD.ZS"],
  ["currentAccount", "BN.CAB.XOKA.GD.ZS"],
  ["gini", "SI.POV.GINI"]
];

let worldBankCountries = [
  ["Afghanistan", "AFG"], ["Albania", "ALB"], ["Algeria", "DZA"], ["Andorra", "AND"], ["Angola", "AGO"], ["Antigua and Barbuda", "ATG"], ["Argentina", "ARG"], ["Armenia", "ARM"], ["Australia", "AUS"], ["Austria", "AUT"], ["Azerbaijan", "AZE"],
  ["Bahamas", "BHS"], ["Bahrain", "BHR"], ["Bangladesh", "BGD"], ["Barbados", "BRB"], ["Belarus", "BLR"], ["Belgium", "BEL"], ["Belize", "BLZ"], ["Benin", "BEN"], ["Bhutan", "BTN"], ["Bolivia", "BOL"], ["Bosnia and Herzegovina", "BIH"], ["Botswana", "BWA"], ["Brazil", "BRA"], ["Brunei Darussalam", "BRN"], ["Bulgaria", "BGR"], ["Burkina Faso", "BFA"], ["Burundi", "BDI"],
  ["Cabo Verde", "CPV"], ["Cambodia", "KHM"], ["Cameroon", "CMR"], ["Canada", "CAN"], ["Central African Republic", "CAF"], ["Chad", "TCD"], ["Chile", "CHL"], ["China", "CHN"], ["Colombia", "COL"], ["Comoros", "COM"], ["Congo, Dem. Rep.", "COD"], ["Congo, Rep.", "COG"], ["Costa Rica", "CRI"], ["Cote d'Ivoire", "CIV"], ["Croatia", "HRV"], ["Cuba", "CUB"], ["Cyprus", "CYP"], ["Czechia", "CZE"],
  ["Denmark", "DNK"], ["Djibouti", "DJI"], ["Dominica", "DMA"], ["Dominican Republic", "DOM"], ["Ecuador", "ECU"], ["Egypt", "EGY"], ["El Salvador", "SLV"], ["Equatorial Guinea", "GNQ"], ["Eritrea", "ERI"], ["Estonia", "EST"], ["Eswatini", "SWZ"], ["Ethiopia", "ETH"],
  ["Fiji", "FJI"], ["Finland", "FIN"], ["France", "FRA"], ["Gabon", "GAB"], ["Gambia, The", "GMB"], ["Georgia", "GEO"], ["Germany", "DEU"], ["Ghana", "GHA"], ["Greece", "GRC"], ["Grenada", "GRD"], ["Guatemala", "GTM"], ["Guinea", "GIN"], ["Guinea-Bissau", "GNB"], ["Guyana", "GUY"],
  ["Haiti", "HTI"], ["Honduras", "HND"], ["Hungary", "HUN"], ["Iceland", "ISL"], ["India", "IND"], ["Indonesia", "IDN"], ["Iran", "IRN"], ["Iraq", "IRQ"], ["Ireland", "IRL"], ["Israel", "ISR"], ["Italy", "ITA"],
  ["Jamaica", "JAM"], ["Japan", "JPN"], ["Jordan", "JOR"], ["Kazakhstan", "KAZ"], ["Kenya", "KEN"], ["Kiribati", "KIR"], ["Korea, Dem. People's Rep.", "PRK"], ["South Korea", "KOR"], ["Kosovo", "XKX"], ["Kuwait", "KWT"], ["Kyrgyz Republic", "KGZ"],
  ["Lao PDR", "LAO"], ["Latvia", "LVA"], ["Lebanon", "LBN"], ["Lesotho", "LSO"], ["Liberia", "LBR"], ["Libya", "LBY"], ["Liechtenstein", "LIE"], ["Lithuania", "LTU"], ["Luxembourg", "LUX"],
  ["Madagascar", "MDG"], ["Malawi", "MWI"], ["Malaysia", "MYS"], ["Maldives", "MDV"], ["Mali", "MLI"], ["Malta", "MLT"], ["Marshall Islands", "MHL"], ["Mauritania", "MRT"], ["Mauritius", "MUS"], ["Mexico", "MEX"], ["Micronesia, Fed. Sts.", "FSM"], ["Moldova", "MDA"], ["Monaco", "MCO"], ["Mongolia", "MNG"], ["Montenegro", "MNE"], ["Morocco", "MAR"], ["Mozambique", "MOZ"], ["Myanmar", "MMR"],
  ["Namibia", "NAM"], ["Nauru", "NRU"], ["Nepal", "NPL"], ["Netherlands", "NLD"], ["New Zealand", "NZL"], ["Nicaragua", "NIC"], ["Niger", "NER"], ["Nigeria", "NGA"], ["North Macedonia", "MKD"], ["Norway", "NOR"],
  ["Oman", "OMN"], ["Pakistan", "PAK"], ["Palau", "PLW"], ["Panama", "PAN"], ["Papua New Guinea", "PNG"], ["Paraguay", "PRY"], ["Peru", "PER"], ["Philippines", "PHL"], ["Poland", "POL"], ["Portugal", "PRT"],
  ["Qatar", "QAT"], ["Romania", "ROU"], ["Russia", "RUS"], ["Rwanda", "RWA"], ["Samoa", "WSM"], ["San Marino", "SMR"], ["Sao Tome and Principe", "STP"], ["Saudi Arabia", "SAU"], ["Senegal", "SEN"], ["Serbia", "SRB"], ["Seychelles", "SYC"], ["Sierra Leone", "SLE"], ["Singapore", "SGP"], ["Slovak Republic", "SVK"], ["Slovenia", "SVN"], ["Solomon Islands", "SLB"], ["Somalia", "SOM"], ["South Africa", "ZAF"], ["South Sudan", "SSD"], ["Spain", "ESP"], ["Sri Lanka", "LKA"], ["St. Kitts and Nevis", "KNA"], ["St. Lucia", "LCA"], ["St. Vincent and the Grenadines", "VCT"], ["Sudan", "SDN"], ["Suriname", "SUR"], ["Sweden", "SWE"], ["Switzerland", "CHE"], ["Syrian Arab Republic", "SYR"],
  ["Tajikistan", "TJK"], ["Tanzania", "TZA"], ["Thailand", "THA"], ["Timor-Leste", "TLS"], ["Togo", "TGO"], ["Tonga", "TON"], ["Trinidad and Tobago", "TTO"], ["Tunisia", "TUN"], ["Turkey", "TUR"], ["Turkmenistan", "TKM"], ["Tuvalu", "TUV"],
  ["Uganda", "UGA"], ["Ukraine", "UKR"], ["United Arab Emirates", "ARE"], ["United Kingdom", "GBR"], ["United States", "USA"], ["Uruguay", "URY"], ["Uzbekistan", "UZB"],
  ["Vanuatu", "VUT"], ["Venezuela", "VEN"], ["Vietnam", "VNM"], ["West Bank and Gaza", "PSE"], ["Yemen", "YEM"], ["Zambia", "ZMB"], ["Zimbabwe", "ZWE"]
].map(([name, code]) => ({ name, code }));

function normalizeCountryName(name) {
  return String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function mergeWorldBankCountries(fetched) {
  const byCode = new Map(worldBankCountries.map((country) => [country.code, country]));
  fetched.forEach((country) => {
    if (!byCode.has(country.code)) byCode.set(country.code, country);
  });
  worldBankCountries = [...byCode.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function findWorldBankCountry(value) {
  const needle = normalizeCountryName(value);
  if (!needle) return null;
  const aliases = {
    "russian federation": "russia",
    "korea rep": "south korea",
    "republic of korea": "south korea",
    "iran islamic rep": "iran",
    "egypt arab rep": "egypt",
    "turkiye": "turkey",
    "venezuela rb": "venezuela",
    "yemen rep": "yemen"
  };
  const normalizedNeedle = aliases[needle] || needle;
  return worldBankCountries.find((country) => normalizeCountryName(country.name) === normalizedNeedle)
    || worldBankCountries.find((country) => normalizeCountryName(country.name).startsWith(normalizedNeedle))
    || worldBankCountries.find((country) => normalizeCountryName(country.name).includes(normalizedNeedle));
}

function createWorldBankProfile(record) {
  return {
    official: record.name,
    classification: "WORLD BANK DATABANK PROFILE — STRUCTURED ECONOMIC INTELLIGENCE BRIEF",
    summary: `${record.name} is loaded from the World Bank DataBank country catalog for comparative economic screening. Its leverage should be assessed through output scale, external balances, inflation dynamics, debt sustainability, and institutional risk rather than narrative country description alone. The near-term risk profile depends on how growth, prices, fiscal space, and current-account pressure interact under global rate and trade shocks.`,
    stats: ["Loading", "Loading", "Loading", "Loading", "Loading", "Loading", "Loading", "Loading"],
    risk: 5,
    code: record.code,
    source: "Fetching latest available World Bank DataBank indicators..."
  };
}

function latestWorldBankValue(payload) {
  const rows = Array.isArray(payload?.[1]) ? payload[1] : [];
  return rows.find((row) => row.value !== null && row.value !== undefined) || null;
}

function compactNumber(value, prefix = "") {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  const n = Number(value);
  if (Math.abs(n) >= 1e12) return `${prefix}${(n / 1e12).toFixed(1)}T`;
  if (Math.abs(n) >= 1e9) return `${prefix}${(n / 1e9).toFixed(1)}B`;
  if (Math.abs(n) >= 1e6) return `${prefix}${(n / 1e6).toFixed(1)}M`;
  return `${prefix}${fmt.format(n)}`;
}

function formatWorldBankStats(values) {
  const pct = (value) => value?.value === null || value?.value === undefined ? "—" : `${Number(value.value).toFixed(1)}%`;
  return [
    compactNumber(values.population?.value),
    compactNumber(values.gdp?.value, "$"),
    values.gdpPerCapita?.value === undefined ? "—" : `$${compactNumber(values.gdpPerCapita.value).replace("$", "")}`,
    pct(values.gdpGrowth),
    pct(values.inflation),
    pct(values.debt),
    pct(values.currentAccount),
    values.gini?.value === null || values.gini?.value === undefined ? "—" : Number(values.gini.value).toFixed(1)
  ];
}

async function fetchWorldBankIndicator(code, indicator) {
  const response = await fetch(`https://api.worldbank.org/v2/country/${code}/indicator/${indicator}?format=json&per_page=80`);
  if (!response.ok) throw new Error(`World Bank request failed for ${indicator}`);
  return latestWorldBankValue(await response.json());
}

async function refreshWorldBankStats(countryName) {
  const profile = countryProfiles[countryName];
  const record = findWorldBankCountry(countryName);
  if (!profile || !record || profile.worldBankFetched || typeof fetch !== "function") return;
  profile.code = record.code;
  try {
    const entries = await Promise.all(worldBankIndicators.map(async ([key, indicator]) => [key, await fetchWorldBankIndicator(record.code, indicator)]));
    const values = Object.fromEntries(entries);
    profile.stats = formatWorldBankStats(values);
    const years = entries.map(([, row]) => row?.date).filter(Boolean);
    const latestYear = years.length ? Math.max(...years.map(Number)) : null;
    profile.source = `World Bank DataBank/API, latest available indicators through ${latestYear || "most recent release"}.`;
    profile.worldBankFetched = true;
    if (activeCountry === countryName) renderCountryProfile();
  } catch (error) {
    profile.source = "World Bank DataBank/API lookup is unavailable from this local browser session; showing local intelligence baseline.";
    profile.worldBankFetched = true;
    if (activeCountry === countryName) renderCountryProfile();
  }
}

async function hydrateWorldBankCountryCatalog() {
  if (typeof fetch !== "function") return false;
  try {
    const response = await fetch("https://api.worldbank.org/v2/country?format=json&per_page=400");
    if (!response.ok) return false;
    const payload = await response.json();
    const rows = Array.isArray(payload?.[1]) ? payload[1] : [];
    const fetched = rows
      .filter((row) => row.region?.value && row.region.value !== "Aggregates")
      .map((row) => ({ name: row.name, code: row.id }));
    mergeWorldBankCountries(fetched);
    return true;
  } catch (error) {
    return false;
  }
}

const statLabels = ["Population", "Nominal GDP", "GDP per Capita", "GDP Growth", "Inflation", "Government Debt/GDP", "Current Account Balance", "Gini Coefficient"];
let activeCountry = "China";
let activeDossierTab = "ECONOMY";

function economyTab(country) {
  if (country !== "China") {
    return `
      <div class="dossier-grid">
        <div class="dossier-block">
          <h3>Economic Structure</h3>
          <p class="lede">The profile uses a stylized sector mix until the full country brief is published. The central analytical question is how domestic demand, external balances, and state capacity interact under geopolitical stress.</p>
          <div class="composition-bar">
            <span class="composition-segment" style="width:58%;background:#C9A84C">Services</span>
            <span class="composition-segment" style="width:32%;background:#8E7A3B">Industry</span>
            <span class="composition-segment" style="width:10%;background:#62562D">Agriculture</span>
          </div>
        </div>
        <div class="definition-list">
          <span><strong>Central bank:</strong> Policy credibility is assessed through inflation performance, reserve adequacy, and financial-sector depth.</span>
          <span><strong>Currency regime:</strong> Managed flexibility with varying degrees of capital-account openness.</span>
          <span><strong>Trade exposure:</strong> Energy, manufactured goods, services, or food flows determine the dominant shock channel.</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="dossier-grid">
      <div class="dossier-block">
        <h3>GDP Composition</h3>
        <div class="composition-bar">
          <span class="composition-segment" style="width:54.6%;background:#C9A84C">Services 54.6%</span>
          <span class="composition-segment" style="width:38.3%;background:#8E7A3B">Industry 38.3%</span>
          <span class="composition-segment" style="width:7.1%;background:#62562D">Agriculture 7.1%</span>
        </div>
        <div class="definition-list">
          <span><strong>Top exports:</strong> Electrical machinery $900B; machinery $576B; vehicles $146B; plastics $118B; furniture and lighting $110B.</span>
          <span><strong>Top partners:</strong> ASEAN, European Union, United States.</span>
          <span><strong>Central bank:</strong> People's Bank of China uses reserve requirements, policy lending facilities, and managed liquidity to stabilize credit conditions.</span>
          <span><strong>Currency regime:</strong> Managed floating exchange rate with daily fixing and capital-account controls.</span>
        </div>
      </div>
      <div class="dossier-block">
        <h3>Intelligence Assessment</h3>
        <p class="lede">China's macro model is transitioning from property-led domestic demand toward manufacturing upgrading and export competitiveness. The adjustment is constrained by weak household confidence, local-government debt, and the need to preserve employment while avoiding a disorderly credit contraction.</p>
      </div>
    </div>
  `;
}

function foreignPolicyTab(country) {
  const rows = country === "China"
    ? [["United States", 1], ["Russia", 4], ["European Union", 2], ["India", 1.5], ["Saudi Arabia", 3.5], ["ASEAN", 3]]
    : [["United States", 3], ["China", 2.5], ["European Union", 3], ["Russia", 2], ["India", 3], ["Regional neighbors", 2.5]];
  return `
    <div class="dossier-grid">
      <div>
        <h3 class="module-heading">Alliance Matrix</h3>
        ${rows.map(([name, score]) => `
          <div class="spectrum-row">
            <span class="muted">${name}</span>
            <span class="spectrum" style="--score:${score}"></span>
          </div>
        `).join("")}
        <div class="chart-axis">ADVERSARIAL → STRATEGIC PARTNER</div>
      </div>
      <div class="definition-list">
        <span><strong>Memberships:</strong> United Nations Security Council, G20, BRICS, Shanghai Cooperation Organisation, APEC, WTO.</span>
        <span><strong>Flashpoint:</strong> Taiwan remains the highest-consequence dispute because it connects sovereignty claims, semiconductor supply chains, and US alliance credibility. Beijing's coercive pressure is calibrated below the threshold of open war, but military normalization around the island raises accident risk. The economic consequence of escalation would be immediate repricing of technology supply chains and maritime insurance.</span>
      </div>
    </div>
  `;
}

function domesticPoliticsTab(country) {
  const profile = countryProfiles[country];
  return `
    <div class="dossier-grid">
      <div class="definition-list">
        <span><strong>Government type:</strong> ${country === "China" ? "One-party socialist republic" : "Constitutional system with country-specific executive-legislative balance"}</span>
        <span><strong>Ruling party or coalition:</strong> ${country === "China" ? "Chinese Communist Party" : "Current governing coalition or executive party"}</span>
        <span><strong>Political risk score:</strong> ${profile.risk}/10</span>
      </div>
      <p class="lede">${country === "China"
        ? "Leadership stability is high because personnel authority and policy signaling remain centralized around the party-state. Institutional quality is strongest in execution capacity and weakest where transparency, legal autonomy, and local fiscal incentives diverge. Civil society operates inside narrow political boundaries, limiting bottom-up correction mechanisms. Election risk is not material, but elite policy coordination and public employment expectations are central to near-term stability."
        : "Leadership stability depends on coalition cohesion, fiscal credibility, and the public's tolerance for inflation or austerity. Institutional quality is strongest where the bureaucracy can execute policy without abrupt partisan reversal. Civil society and media autonomy shape the speed at which economic stress becomes political pressure. Near-term election risk is assessed through real-income growth, corruption salience, and external financing conditions."}</p>
    </div>
  `;
}

function riskFactorsTab(country) {
  const chinaRisks = [
    ["FISCAL", 4, "Local-government financing vehicles remain a latent balance-sheet risk. Debt resolution is likely to be gradual, but delayed recognition can suppress infrastructure investment and bank risk appetite."],
    ["GEOPOLITICAL", 5, "Taiwan and technology controls create the highest external shock channel. The risk is less a single crisis than cumulative normalization of coercive pressure and countermeasure escalation."],
    ["SOCIAL", 3, "Youth unemployment and weak household confidence complicate the pivot toward consumption-led growth. Social pressure is managed administratively but can still influence policy sequencing."],
    ["ENVIRONMENTAL", 3, "Water scarcity, flooding, and energy-security tradeoffs affect agriculture, hydroelectric output, and industrial continuity. Climate adaptation is now an economic planning issue rather than a peripheral environmental file."],
    ["INSTITUTIONAL", 4, "Centralized policy execution can move quickly but may suppress local information flows. Regulatory uncertainty remains a discount factor for private-sector investment."]
  ];
  const genericRisks = [
    ["FISCAL", 3, "Debt sustainability depends on growth, real interest rates, and the political capacity to protect capital expenditure while consolidating current spending."],
    ["GEOPOLITICAL", 4, "External alignment choices can alter market access, security guarantees, and exposure to sanctions or export controls."],
    ["SOCIAL", 3, "Real-income pressure can turn inflation, labor-market weakness, or subsidy reform into broader political volatility."],
    ["ENVIRONMENTAL", 3, "Climate and resource-security shocks increasingly transmit through food prices, insurance costs, and infrastructure reliability."],
    ["INSTITUTIONAL", 3, "Policy continuity depends on administrative capacity, judicial predictability, and the credibility of fiscal and monetary authorities."]
  ];
  const risks = country === "China" ? chinaRisks : genericRisks;
  return `
    <div class="dossier-grid">
      ${risks.map(([cat, dots, text]) => `
        <div class="risk-item">
          <div><span class="category">${cat}</span> <span class="gold-dots">${"●".repeat(dots)}${"○".repeat(5 - dots)}</span></div>
          <p>${text}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDossier() {
  const container = document.getElementById("dossier-content");
  if (!container) return;
  const country = activeCountry;
  const tabs = {
    ECONOMY: economyTab(country),
    "FOREIGN POLICY": foreignPolicyTab(country),
    "DOMESTIC POLITICS": domesticPoliticsTab(country),
    "RISK FACTORS": riskFactorsTab(country)
  };
  container.innerHTML = tabs[activeDossierTab];
  document.querySelectorAll("[data-dossier-tab]").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.dossierTab === activeDossierTab);
  });
}

function renderCountryProfile() {
  const profile = countryProfiles[activeCountry] || createWorldBankProfile(findWorldBankCountry(activeCountry) || { name: activeCountry, code: "" });
  document.getElementById("country-profile").innerHTML = `
    <section class="shell section country-header">
      <h1 class="country-title">${activeCountry}</h1>
      <div class="official-name">${profile.official}</div>
      <div class="classification">${profile.classification}</div>
      <p class="summary-text">${profile.summary}</p>
    </section>
    <section class="shell section-tight">
      <div class="stats-strip">
        ${statLabels.map((label, index) => `<div class="stat-item"><div class="metric-label">${label}</div><div class="stat-value">${profile.stats[index]}</div></div>`).join("")}
      </div>
      <div class="data-source-note">${profile.source || "Local intelligence baseline; World Bank DataBank refresh runs when the browser can reach the World Bank API."} <a href="https://databank.worldbank.org/" target="_blank" rel="noreferrer">World Bank DataBank →</a></div>
    </section>
    <section class="shell section">
      <div class="tabs">
        ${["ECONOMY", "FOREIGN POLICY", "DOMESTIC POLITICS", "RISK FACTORS"].map((tab) => `<button class="tab-button ${tab === activeDossierTab ? "is-active" : ""}" type="button" data-dossier-tab="${tab}">${tab}</button>`).join("")}
      </div>
      <div class="dossier-content" id="dossier-content"></div>
    </section>
    <section class="shell section divider-top">
      <h2 class="module-heading">Related Intelligence</h2>
      <div class="related-grid">
        ${[
          ["MONETARY ORDER", "The Renminbi's Quiet Ascent and the Politics of Reserve Diversification", "Today, 08:15 UTC"],
          ["TRADE LAW", "Export Controls Are Becoming Industrial Policy by Other Means", "Yesterday, 19:40 UTC"],
          ["SOVEREIGN DEBT", "Development Finance After the Beijing Lending Cycle", "May 21, 2024"]
        ].map(([cat, title, time]) => `<article class="related-item"><div class="category">${cat}</div><h3>${title}</h3><div class="timestamp">${time}</div></article>`).join("")}
      </div>
    </section>
  `;
  document.querySelectorAll("[data-dossier-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeDossierTab = button.dataset.dossierTab;
      renderDossier();
    });
  });
  renderDossier();
}

function renderCountries() {
  const quick = ["China", "United States", "Russia", "Germany", "India", "Brazil", "Saudi Arabia", "Iran"];
  app.innerHTML = `
    <section class="shell search-bar section">
      <div class="page-kicker">Country Intelligence</div>
      <input id="country-search" class="bare-input country-search" type="search" list="world-bank-country-options" placeholder="Search 195 countries..." aria-label="Search countries">
      <datalist id="world-bank-country-options"></datalist>
      <div id="country-search-status" class="search-status">World Bank DataBank-backed search is ready. Choose a country and press Enter.</div>
      <div class="quick-access">
        ${quick.map((country) => `<button class="chip ${country === activeCountry ? "is-selected" : ""}" type="button" data-country="${country}">${country}</button>`).join("")}
      </div>
    </section>
    <div id="country-profile"></div>
    ${footer()}
  `;

  function updateCountryOptions() {
    const options = document.getElementById("world-bank-country-options");
    if (!options) return;
    options.innerHTML = worldBankCountries.map((country) => `<option value="${country.name}"></option>`).join("");
  }

  function setCountryStatus(message) {
    const status = document.getElementById("country-search-status");
    if (status) status.textContent = message;
  }

  function selectCountry(country) {
    const record = findWorldBankCountry(country);
    if (!record) {
      setCountryStatus("No matching World Bank country found. Try the official country name or a shorter search term.");
      return;
    }
    activeCountry = countryProfiles[record.name] ? record.name : record.name;
    if (!countryProfiles[activeCountry]) {
      countryProfiles[activeCountry] = createWorldBankProfile(record);
    }
    activeDossierTab = "ECONOMY";
    document.querySelectorAll("[data-country]").forEach((chip) => chip.classList.toggle("is-selected", chip.dataset.country === activeCountry));
    renderCountryProfile();
    setCountryStatus(`Loading latest available World Bank indicators for ${activeCountry}.`);
    refreshWorldBankStats(activeCountry);
  }

  updateCountryOptions();
  document.querySelectorAll("[data-country]").forEach((button) => {
    button.addEventListener("click", () => selectCountry(button.dataset.country));
  });
  const searchInput = document.getElementById("country-search");
  searchInput.addEventListener("change", (event) => {
    const value = event.currentTarget.value.trim();
    if (value) selectCountry(value);
  });
  searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const value = event.currentTarget.value.trim();
    if (value) selectCountry(value);
  });
  renderCountryProfile();
  refreshWorldBankStats(activeCountry);
  hydrateWorldBankCountryCatalog().then((loaded) => {
    updateCountryOptions();
    setCountryStatus(loaded
      ? "World Bank country catalog loaded. Choose any listed country and press Enter."
      : "Using the local World Bank-code catalog; live DataBank country loading is unavailable in this browser session.");
  });
}

const researchPieces = [
  ["ECONOMICS BEHIND THE HEADLINES", "Why the Fed's Dual Mandate Creates Impossible Tradeoffs During Supply Shocks", "Supply shocks force central banks to choose between inflation precision and labor-market damage when rate hikes cannot produce oil, chips, or shipping capacity.", "Mara Venkataraman", "12 min", "May 24, 2024"],
  ["POLICY BRIEFS", "Strategic Tariffs and the Return of Industrial Bargaining", "Tariffs are increasingly deployed as bargaining infrastructure that links supply-chain relocation to domestic political coalitions.", "Owen Leclerc", "9 min", "May 20, 2024"],
  ["WORKING PAPERS", "Reserve Diversification Under Sanctions Risk: Evidence from Gold Accumulation", "Central-bank reserve behavior suggests that sanctions exposure raises the option value of non-liability assets even without immediate dollar liquidation.", "Nadia Rahman", "26 min", "May 18, 2024"],
  ["GEOPOLITICAL RISK REPORTS", "Maritime Chokepoints and the Insurance Premium on Globalization", "Shipping disruptions are best understood as balance-sheet shocks that raise working-capital needs before they appear in consumer prices.", "Tomas Iversen", "14 min", "May 16, 2024"],
  ["COUNTRY ASSESSMENTS", "India's Manufacturing Ambition and the Limits of Labor Absorption", "Industrial policy can lift export capacity, but demographic leverage depends on formal employment creation rather than headline GDP growth.", "Anika Bose", "18 min", "May 12, 2024"],
  ["POLICY BRIEFS", "Sovereign Debt Workouts in a Fragmented Creditor System", "The rise of bilateral and collateralized lending has made timing, coordination, and comparability of treatment the core debt-relief problems.", "Julian Acosta", "11 min", "May 8, 2024"]
];

function reportChart() {
  const china = [18, 32, 48, 62, 74, 84, 91];
  const multilaterals = [42, 44, 47, 49, 52, 55, 58];
  const privateCreditors = [21, 24, 27, 31, 34, 37, 40];
  const years = ["2012", "2014", "2016", "2018", "2020", "2022", "2024"];
  return `
    <svg class="report-chart" viewBox="0 0 760 380" role="img" aria-label="Comparative creditor exposure chart">
      <text x="54" y="20" class="chart-label">SUB-SAHARAN AFRICA EXTERNAL PUBLIC DEBT EXPOSURE</text>
      <line x1="54" y1="306" x2="716" y2="306" class="chart-grid"></line>
      <line x1="54" y1="236" x2="716" y2="236" class="chart-grid"></line>
      <line x1="54" y1="166" x2="716" y2="166" class="chart-grid"></line>
      <line x1="54" y1="96" x2="716" y2="96" class="chart-grid"></line>
      <polyline class="chart-line" points="${polylineFrom(china, 760, 380, 0, 100)}"></polyline>
      <polyline class="chart-line-prior" points="${polylineFrom(multilaterals, 760, 380, 0, 100)}"></polyline>
      <polyline points="${polylineFrom(privateCreditors, 760, 380, 0, 100)}" fill="none" stroke="#7C4A4A" stroke-width="1.7"></polyline>
      ${years.map((year, index) => `<text x="${54 + index * (662 / 6) - 10}" y="338" class="chart-axis">${year}</text>`).join("")}
      <text x="590" y="72" class="chart-axis">China-linked lending</text>
      <text x="590" y="156" class="chart-axis">Multilaterals</text>
      <text x="590" y="226" class="chart-axis">Private creditors</text>
    </svg>
  `;
}

function renderResearch() {
  app.innerHTML = `
    ${pageHeader("Research & Analysis", "Original Intelligence. Independent Analysis.", "Working papers, policy briefs, and deep-dive analysis at the intersection of economics, geopolitics, and international law.")}
    <section class="shell section report-layout">
      <div>
        <h2 class="report-title">Debt Distress and Development Finance: How China's Belt and Road Lending Is Reshaping Sovereign Debt Architecture in Sub-Saharan Africa.</h2>
        <p class="report-subtitle">Creditor fragmentation, collateral clauses, and the politics of restructuring delay.</p>
        <p class="report-abstract">This report examines how Chinese policy-bank lending altered the bargaining structure of sovereign debt workouts across Sub-Saharan Africa. It finds that debt distress increasingly emerges through delayed investment, import compression, and fiscal arrears before a formal default event. The paper argues that the next generation of restructuring frameworks must solve coordination problems across bilateral, multilateral, and private creditors rather than treating debt relief as a single negotiation.</p>
        <div class="argument-list">
          <span>— Chinese lending changed the maturity profile and collateral politics of public debt.</span>
          <span>— Debt distress now appears as liquidity rationing before market access is fully lost.</span>
          <span>— The Common Framework remains too slow for countries facing simultaneous climate, food, and currency shocks.</span>
        </div>
        <div class="metadata-row"><span>REPORT</span><span>24 pages</span><span>Published May 29, 2024</span><span class="category">SOVEREIGN DEBT</span></div>
      </div>
      <div>${reportChart()}</div>
    </section>
    <section class="shell section-tight divider-top">
      <div class="text-tabs" id="research-tabs">
        ${["ALL", "ECONOMICS BEHIND THE HEADLINES", "POLICY BRIEFS", "WORKING PAPERS", "GEOPOLITICAL RISK REPORTS", "COUNTRY ASSESSMENTS"].map((tab) => `<button class="text-tab ${tab === "ALL" ? "is-active" : ""}" type="button" data-research-filter="${tab}">${tab}</button>`).join("")}
      </div>
    </section>
    <section class="shell section-tight">
      <div class="research-index" id="research-index">
        ${researchPieces.map(([series, title, abstract, author, read, date]) => `
          <article class="research-item" data-series="${series}">
            <div class="series-label">${series}</div>
            <h2 class="article-title">${title}</h2>
            <p class="lede">${abstract}</p>
            <div class="story-meta"><span>${author}</span><span>${read}</span><span>${date}</span></div>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="band">
      <div class="band-inner">
        <div class="page-kicker">Economics Behind the Headlines</div>
        <div class="issue-strip section-tight">
          ${[
            ["EVENT — Fed holds rates at 5.25%. WHY IT MATTERS:", "The Taylor Rule now implies a modest overshoot, signaling the FOMC is prioritizing labor-market resilience over inflation precision."],
            ["EVENT — Red Sea rerouting extends delivery times. WHY IT MATTERS:", "Inventory finance becomes the transmission channel as firms carry more goods in transit and pay higher insurance premia."],
            ["EVENT — China expands support for strategic manufacturing. WHY IT MATTERS:", "Industrial credit can sustain export volumes even when household demand is weak, exporting disinflationary pressure abroad."]
          ].map(([event, answer]) => `<article class="issue-teaser"><div class="category">${event}</div><p>${answer}</p></article>`).join("")}
        </div>
      </div>
    </section>
    <section class="shell section">
      <div class="submit-banner">
        <div>
          <h2 class="module-heading">Contribute original research.</h2>
          <p class="lede">Capital &amp; Diplomacy publishes original analysis from emerging voices in economics, international relations, and public policy.</p>
        </div>
        <a class="outline-button" href="mailto:research@capitaldiplomacy.example">Submit a piece →</a>
      </div>
    </section>
    ${footer()}
  `;

  document.querySelectorAll("[data-research-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.researchFilter;
      document.querySelectorAll("[data-research-filter]").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      document.querySelectorAll(".research-item").forEach((item) => {
        item.classList.toggle("is-hidden", filter !== "ALL" && item.dataset.series !== filter);
      });
    });
  });
}

const riskTierColors = {
  "ACTIVE CONFLICT": "#7C2F2F",
  "HIGH TENSION": "#8E563A",
  "SANCTIONS REGIME": "#9C6B3E",
  "POLITICAL INSTABILITY": "#A88948",
  "CONTESTED TERRITORY": "#C9A84C"
};

function riskWorldMap() {
  const project = ([lon, lat]) => [
    ((lon + 180) / 360) * 1000,
    ((90 - lat) / 180) * 560
  ];
  const geoPath = (points) => points.map((point, index) => {
    const [x, y] = project(point);
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ") + " Z";

  const landMasses = [
    [[-168, 72], [-150, 70], [-135, 60], [-124, 50], [-110, 48], [-96, 49], [-82, 46], [-66, 48], [-54, 55], [-58, 45], [-73, 40], [-81, 30], [-80, 25], [-95, 24], [-106, 30], [-117, 33], [-124, 41], [-132, 50], [-148, 58], [-164, 62]],
    [[-101, 23], [-89, 21], [-83, 15], [-78, 10], [-80, 8], [-88, 11], [-95, 15], [-101, 19]],
    [[-82, 12], [-72, 11], [-62, 7], [-51, -2], [-44, -14], [-39, -24], [-47, -35], [-55, -52], [-68, -55], [-74, -43], [-79, -25], [-81, -7]],
    [[-74, 83], [-46, 82], [-20, 76], [-18, 66], [-34, 60], [-48, 61], [-62, 68], [-72, 75]],
    [[-11, 71], [18, 72], [42, 69], [62, 61], [59, 50], [44, 43], [32, 41], [20, 46], [8, 44], [-4, 50], [-10, 58], [-22, 63]],
    [[26, 72], [62, 72], [103, 72], [140, 67], [170, 60], [179, 51], [160, 44], [142, 42], [132, 34], [122, 23], [110, 20], [105, 9], [96, 6], [91, 18], [80, 23], [73, 17], [67, 25], [58, 25], [51, 31], [43, 35], [36, 42], [44, 52], [60, 57], [64, 65], [46, 68]],
    [[34, 31], [48, 29], [57, 22], [52, 15], [45, 12], [39, 18], [35, 25]],
    [[68, 24], [78, 27], [89, 23], [92, 12], [81, 7], [72, 9], [68, 18]],
    [[96, 22], [108, 21], [112, 12], [107, 5], [101, 1], [97, 10]],
    [[-18, 36], [-5, 37], [11, 34], [25, 31], [35, 25], [43, 12], [50, 9], [45, -5], [39, -18], [33, -34], [22, -35], [13, -30], [3, -35], [-8, -28], [-15, -14], [-17, 2], [-21, 18]],
    [[47, -13], [51, -18], [50, -25], [45, -25], [43, -18]],
    [[112, -11], [124, -15], [137, -12], [153, -28], [146, -39], [132, -39], [116, -33], [112, -22]],
    [[166, -35], [178, -38], [174, -46], [166, -44]],
    [[-8, 58], [2, 56], [1, 50], [-6, 50], [-10, 54]],
    [[138, 45], [145, 40], [143, 34], [135, 32], [130, 35], [133, 42]],
    [[120, 24], [122, 23], [122, 21], [120, 22]]
  ];

  const highlighted = [
    ["Russia", "SANCTIONS REGIME", "Sanctions pressure has reoriented trade toward China, India, Turkey, and Gulf intermediaries. Energy flows continue, but finance, insurance, and technology access carry elevated compliance risk.", [[30, 70], [60, 71], [100, 70], [140, 66], [178, 60], [170, 50], [130, 49], [95, 52], [60, 53], [38, 56], [30, 62]]],
    ["Ukraine", "ACTIVE CONFLICT", "The war remains the central European security shock and a continuing drain on fiscal, energy, and defense capacity. Reconstruction needs and export-route vulnerability keep the economic risk trajectory elevated.", [[22, 52], [32, 52], [40, 49], [37, 45], [28, 44], [22, 47]]],
    ["China", "HIGH TENSION", "Strategic competition is concentrated in semiconductors, maritime claims, and export controls. Domestic demand weakness increases external pressure through industrial overcapacity and trade-defensive responses abroad.", [[73, 49], [92, 53], [112, 49], [124, 42], [135, 32], [123, 21], [103, 18], [89, 26], [78, 31], [73, 40]]],
    ["Taiwan", "CONTESTED TERRITORY", "Taiwan links sovereignty risk with the most advanced semiconductor supply chain in the global economy. Coercive military activity below the war threshold still raises insurance, inventory, and relocation costs.", [[120, 25], [122, 24], [122, 22], [120, 21]]],
    ["Iran", "SANCTIONS REGIME", "Iran's sanctions-adapted economy remains tied to oil exports, regional networks, and maritime leverage. Escalation risk transmits through energy prices, shipping insurance, and compliance exposure.", [[44, 39], [54, 39], [64, 33], [61, 26], [50, 25], [44, 31]]],
    ["Israel and Palestinian Territories", "ACTIVE CONFLICT", "The conflict has produced regional escalation risk across energy, shipping, and alliance politics. The economic channel is less local output than the probability of wider confrontation.", [[34, 33.5], [36, 33], [36, 29.5], [34, 30]]],
    ["Yemen", "ACTIVE CONFLICT", "The conflict and Red Sea attacks have turned a local war into a global shipping-risk variable. Rerouting around the Cape raises transit times, insurance premia, and working-capital requirements.", [[42, 19], [53, 18], [55, 14], [48, 12], [42, 14]]],
    ["Sudan", "ACTIVE CONFLICT", "Civil war has disrupted state capacity, food security, and regional migration flows. The spillover risk is concentrated in the Horn of Africa, Red Sea logistics, and humanitarian financing.", [[22, 22], [38, 22], [38, 9], [31, 8], [22, 13]]],
    ["Myanmar", "POLITICAL INSTABILITY", "Civil conflict and military rule have fragmented territorial control and trade governance. The risk channel runs through energy projects, border commerce, and China's regional security calculus.", [[92, 28], [101, 26], [101, 12], [96, 10], [92, 18]]],
    ["North Korea", "HIGH TENSION", "Missile development and sanctions evasion keep Northeast Asian security risk structurally elevated. Economic exposure is limited directly but high through alliance signaling and proliferation risk.", [[124, 43], [130, 42], [131, 39], [126, 37], [124, 40]]],
    ["Syria", "SANCTIONS REGIME", "The conflict is frozen rather than resolved, leaving reconstruction, sanctions relief, and refugee return politically blocked. Regional normalization has not restored broad economic access.", [[35, 37], [42, 37], [42, 33], [36, 32]]],
    ["Venezuela", "SANCTIONS REGIME", "Energy sanctions, debt distress, and migration pressure shape Venezuela's regional impact. Partial oil-sector relief can change supply margins without resolving institutional risk.", [[-73, 12], [-60, 11], [-59, 3], [-67, 0], [-73, 6]]],
    ["Sahel", "POLITICAL INSTABILITY", "Military coups, insurgency, and foreign-security realignment have weakened regional coordination. The economic impact appears in mining risk, migration routes, and aid conditionality.", [[-17, 20], [10, 20], [36, 17], [35, 10], [8, 11], [-17, 13]]],
    ["South China Sea", "CONTESTED TERRITORY", "Competing maritime claims create a persistent low-intensity risk to trade routes and naval signaling. The core economic risk is escalation near logistics lanes that carry a large share of global goods trade.", [[105, 22], [123, 22], [126, 7], [112, 3], [105, 10]]]
  ];

  return `
    <div class="world-risk-wrap">
      ${earthMapReference("War Monitor active risk map reference", activeRiskMapEmbedSrc, "Open active risk map →", "active-risk-map-embed")}
      <svg class="world-risk-map" viewBox="0 0 1000 560" role="img" aria-label="Global geopolitical risk map">
        ${landMasses.map((points) => `<path class="map-land" d="${geoPath(points)}"></path>`).join("")}
        ${highlighted.map(([name, tier, note, points]) => `<path class="risk-country" data-name="${name}" data-tier="${tier}" data-note="${note}" style="fill:${riskTierColors[tier]}" d="${geoPath(points)}"></path>`).join("")}
      </svg>
      <div class="map-tooltip" id="map-tooltip" role="status" aria-live="polite"></div>
    </div>
  `;
}

function renderRisk() {
  const conflicts = [
    ["Russia-Ukraine War", "Eastern Europe", "2014", "Russia; Ukraine; NATO-backed Ukrainian defense support", "ENERGY", "↑"],
    ["Israel-Hamas War", "Levant", "2023", "Israel; Hamas; regional proxy actors", "SHIPPING", "↑"],
    ["Sudan Civil War", "Northeast Africa", "2023", "Sudanese Armed Forces; Rapid Support Forces", "FOOD", "↑"],
    ["Yemen Conflict", "Arabian Peninsula", "2014", "Houthi movement; Yemeni government; regional coalition actors", "SHIPPING", "→"],
    ["Syrian Civil War", "Levant", "2011", "Syrian government; opposition factions; external backers", "FINANCE", "→"],
    ["Myanmar Civil War", "Southeast Asia", "2021", "Military junta; ethnic armed organizations; resistance forces", "ENERGY", "↑"],
    ["Sahel Insurgency", "West Africa", "2012", "Jihadist groups; national militaries; regional forces", "FOOD", "↑"],
    ["Red Sea Shipping Crisis", "Red Sea", "2023", "Houthi movement; US-led maritime coalition; commercial shipping", "SHIPPING", "↑"]
  ];
  const sanctions = [
    ["Russia", "US / EU / UK / G7", "2014 / 2022", "Finance, energy, technology", 5],
    ["Iran", "US / EU / UN", "1979 / 2006", "Energy, banking, defense", 5],
    ["North Korea", "UN / US / EU", "2006", "Defense, finance, shipping", 5],
    ["Myanmar", "US / EU / UK", "2021", "Military-linked entities", 4],
    ["Syria", "US / EU", "2011", "Finance, energy, reconstruction", 4],
    ["Belarus", "EU / US / UK", "2020 / 2022", "Finance, potash, aviation", 4]
  ];
  const side = `<span>Last updated: May 29, 2024 - 14:00 UTC</span><span class="risk-badge">Risk Index: ELEVATED</span>`;

  app.innerHTML = `
    ${pageHeader("Geopolitical Risk Monitor", "Global Conflict & Instability Tracker.", "Active conflicts, sanctions architectures, contested territories, and systemic geopolitical risks — updated and analyzed.", side)}
    <section class="shell section-tight">
      <div class="legend-bar">
        ${Object.entries(riskTierColors).map(([tier, color]) => `<span class="legend-item"><i class="legend-swatch" style="background:${color}"></i>${tier}</span>`).join("")}
      </div>
    </section>
    <section class="shell section-tight">
      ${riskWorldMap()}
    </section>
    <section class="shell section risk-layout divider-top">
      <div>
        <h2 class="module-heading">Active Conflicts</h2>
        <table class="data-table">
          <thead><tr><th>CONFLICT</th><th>REGION</th><th>START DATE</th><th>PARTIES INVOLVED</th><th>ECONOMIC IMPACT</th><th>RISK TRAJECTORY</th></tr></thead>
          <tbody>
            ${conflicts.map(([conflict, region, start, parties, impact, trajectory]) => `<tr><td><strong>${conflict}</strong></td><td>${region}</td><td>${start}</td><td>${parties}</td><td>${impact}</td><td class="${trajectory === "↑" ? "negative" : trajectory === "↓" ? "delta-up" : ""}">${trajectory}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
      <aside class="sanctions-panel">
        <div class="category">Active Sanctions Regimes</div>
        ${sanctions.map(([country, body, year, sector, dots]) => `<div class="sanction-item"><strong>${country}</strong><br>${body} - ${year}<br>${sector}<br><span class="gold-dots">${"●".repeat(dots)}${"○".repeat(5 - dots)}</span></div>`).join("")}
      </aside>
    </section>
    <section class="band">
      <div class="band-inner score-strip">
        ${[
          ["Global GPR Index", "71.4", "Composite text-mined geopolitical risk series normalized against long-run conflict volatility."],
          ["Great Power Tension Score", "82.0", "Weighted assessment of US-China, NATO-Russia, and regional deterrence pressure."],
          ["Nuclear Risk Indicator", "64.8", "Tracks doctrine signaling, missile testing, and crisis proximity among nuclear-armed states."],
          ["Trade War Intensity", "58.6", "Measures tariff coverage, export controls, sanctions spillover, and retaliatory policy activity."],
          ["Alliance Fragmentation Index", "47.9", "Captures voting divergence, defense spending gaps, and coalition durability under stress."]
        ].map(([name, score, note]) => `<div class="score-item"><div class="metric-label">${name}</div><div class="score-value">${score}</div><p class="intelligence-note">${note}</p></div>`).join("")}
      </div>
    </section>
    ${footer()}
  `;
  initRiskTooltip();
}

function initRiskTooltip() {
  const wrap = document.querySelector(".world-risk-wrap");
  const tooltip = document.getElementById("map-tooltip");
  if (!wrap || !tooltip) return;

  wrap.addEventListener("mousemove", (event) => {
    const target = event.target.closest(".risk-country");
    if (!target) {
      tooltip.classList.remove("is-visible");
      return;
    }
    const rect = wrap.getBoundingClientRect();
    tooltip.style.left = `${Math.min(event.clientX - rect.left + 16, rect.width - 280)}px`;
    tooltip.style.top = `${Math.max(event.clientY - rect.top - 20, 12)}px`;
    tooltip.innerHTML = `<div class="tooltip-title">${target.dataset.name}</div><div class="tooltip-tier">${target.dataset.tier}</div><div class="tooltip-note">${target.dataset.note}</div>`;
    tooltip.classList.add("is-visible");
  });
  wrap.addEventListener("mouseleave", () => tooltip.classList.remove("is-visible"));
}

function videoPlaceholder(number, title, runtime, compact = false) {
  return `
    <div class="video-box">
      <span class="episode-number">${number}</span>
      <svg class="play-icon" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" stroke-width="1.5"></circle>
        <path d="M27 21 L46 32 L27 43 Z" fill="currentColor"></path>
      </svg>
      <h3 class="video-title">${title}</h3>
      <span class="runtime">${runtime}</span>
    </div>
  `;
}

function renderExplainers() {
  const latest = [
    ["EP. 014", "Why the Fed's Dual Mandate Creates Impossible Tradeoffs During Supply Shocks", "The Monetary Order", "18:42", "May 28, 2024"],
    ["EP. 013", "How Petrodollar Recycling Shaped the Architecture of Global Finance", "The Monetary Order", "16:18", "May 21, 2024"],
    ["EP. 012", "Why Export Controls Are Replacing Tariffs in the Technology War", "Trade Wars & Consequences", "14:37", "May 16, 2024"],
    ["EP. 011", "The Political Economy of Food Prices After a Shipping Shock", "State & Market", "12:54", "May 9, 2024"],
    ["EP. 010", "How Central Banks Think About Currency Intervention", "The Monetary Order", "17:05", "May 2, 2024"],
    ["EP. 009", "What Sovereign Debt Restructuring Actually Negotiates", "State & Market", "19:11", "Apr 25, 2024"]
  ];
  const series = [
    ["The Monetary Order", "14 episodes", "Money, reserves, central banks, and the institutional architecture behind global liquidity."],
    ["Trade Wars & Consequences", "11 episodes", "Tariffs, sanctions, export controls, and the second-order effects of economic coercion."],
    ["State & Market", "9 episodes", "How governments, firms, and institutions bargain over risk, inflation, industrial policy, and social stability."]
  ];

  app.innerHTML = `
    ${pageHeader("Intelligence Explainers", "Complex Economics. Explained Without Condescension.", "Short-form video analysis on monetary policy, trade architecture, geopolitical risk, and the economics behind global events.")}
    <section class="shell section video-hero">
      ${videoPlaceholder("EP. 014", "Why the Fed's Dual Mandate Creates Impossible Tradeoffs During Supply Shocks", "18:42")}
      <div>
        <div class="category">The Monetary Order</div>
        <h2 class="report-title">Why the Fed's Dual Mandate Creates Impossible Tradeoffs During Supply Shocks</h2>
        <p class="summary-text">A supply shock makes the central bank fight inflation with a tool designed to reduce demand. The episode explains why employment, credibility, and energy prices can move the policy optimum in different directions at the same time. It also shows why a purely mechanical Taylor Rule is insufficient when the shock comes from outside the domestic credit cycle.</p>
        <div class="small-label">Key concepts covered:</div>
        <div class="concept-tags"><span class="concept-tag">Taylor Rule</span><span class="concept-tag">Output Gap</span><span class="concept-tag">Supply Shock</span><span class="concept-tag">Real Rates</span></div>
        <div class="story-meta"><span>Hosted by Leila Haddad</span><span>Research desk: Monetary policy</span></div>
      </div>
    </section>
    <section class="shell section divider-top">
      ${series.map(([name, count, desc], sIndex) => `
        <div class="series-band">
          <div class="series-head"><h2 class="module-heading">${name}</h2><span class="muted">${count}</span></div>
          <p class="lede">${desc}</p>
          <div class="episode-row">
            ${latest.slice(0, 4).map(([ep, title, show, runtime], index) => `<article class="episode-card">${videoPlaceholder(`EP. ${String(14 - sIndex * 4 - index).padStart(3, "0")}`, title, runtime, true)}<div class="story-meta"><span>${runtime}</span><span class="category">${show}</span></div></article>`).join("")}
          </div>
        </div>
      `).join("")}
    </section>
    <section class="shell section divider-top">
      <h2 class="module-heading">Latest Releases</h2>
      <div class="episode-grid">
        ${latest.map(([ep, title, show, runtime, date]) => `
          <article class="episode-card">
            ${videoPlaceholder(ep, title, runtime, true)}
            <div class="category">${ep}</div>
            <h3>${title}</h3>
            <div class="story-meta"><span>${show}</span><span>${runtime}</span><span>${date}</span></div>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="shell section divider-top">
      <div class="page-kicker">Full Transcripts Available</div>
      <div class="transcript-list section-tight">
        ${latest.map(([ep, title]) => `<div class="transcript-item"><span>${ep} - ${title}</span><a class="transcript-link" href="#">Read transcript →</a></div>`).join("")}
      </div>
    </section>
    <section class="shell section">
      <div class="submit-banner">
        <div><h2 class="module-heading">Shape the editorial agenda.</h2><p class="lede">Capital &amp; Diplomacy commissions explainers based on reader-submitted policy questions.</p></div>
        <form class="topic-form"><input class="bare-input" type="text" placeholder="Propose a topic" aria-label="Propose a topic"><button class="outline-button" type="button">Propose a topic →</button></form>
      </div>
    </section>
    ${footer()}
  `;
}

const topRanks = [
  [1, "United States", 92.4, [94, 96, 84, 88], "The United States combines reserve-currency depth, alliance reach, technology leadership, and energy flexibility in a way no competitor currently matches."],
  [2, "China", 88.1, [92, 86, 68, 82], "China's manufacturing scale and state-directed industrial capacity offset weaker institutional openness and balance-sheet fragility."],
  [3, "Germany", 81.3, [78, 72, 88, 76], "Germany remains Europe's industrial and regulatory anchor despite weak demographics and energy-transition pressure."],
  [4, "Japan", 79.6, [76, 71, 86, 80], "Japan's capital depth, technology base, and alliance position compensate for debt and demographic constraints."],
  [5, "United Kingdom", 76.8, [72, 74, 84, 70], "The United Kingdom retains financial, intelligence, and legal influence beyond its manufacturing weight."],
  [6, "France", 75.9, [70, 77, 82, 71], "France's military capacity, EU influence, and energy system resilience support a higher geopolitical score than its growth profile implies."],
  [7, "India", 74.5, [73, 70, 57, 78], "India's demographic scale and strategic geography are rising faster than its institutional and infrastructure capacity."],
  [8, "Canada", 72.8, [69, 66, 87, 73], "Canada benefits from resource security, institutional quality, and US-market integration, with limited independent coercive leverage."],
  [9, "South Korea", 71.4, [75, 62, 82, 69], "South Korea's technology and manufacturing depth are strategically significant but exposed to Northeast Asian security risk."],
  [10, "Australia", 70.2, [65, 67, 88, 74], "Australia's resource position, alliance role, and institutional resilience give it leverage beyond population scale."]
];

const indexRanks = [
  [11, "Italy", "Europe", 68.9, 66, 58, 76, 62, 0.4],
  [12, "Netherlands", "Europe", 68.1, 64, 55, 89, 66, 0.8],
  [13, "Switzerland", "Europe", 67.4, 62, 52, 94, 70, 0.2],
  [14, "Spain", "Europe", 65.8, 61, 51, 78, 63, 0.6],
  [15, "Saudi Arabia", "Middle East & Africa", 64.9, 67, 70, 49, 65, 1.1],
  [16, "Brazil", "Americas", 63.5, 64, 58, 54, 60, -0.3],
  [17, "Indonesia", "Asia-Pacific", 62.7, 63, 55, 52, 64, 0.7],
  [18, "Turkey", "Middle East & Africa", 61.6, 58, 65, 43, 58, -0.6],
  [19, "Mexico", "Americas", 60.8, 61, 52, 50, 62, 0.9],
  [20, "Singapore", "Asia-Pacific", 60.1, 56, 48, 93, 67, 0.1],
  [21, "United Arab Emirates", "Middle East & Africa", 59.4, 58, 61, 58, 64, 1.3],
  [22, "Russia", "Europe", 58.7, 61, 74, 31, 56, -2.4],
  [23, "Norway", "Europe", 57.9, 54, 47, 92, 71, 0.5],
  [24, "Sweden", "Europe", 57.2, 53, 45, 91, 68, 0.3],
  [25, "Poland", "Europe", 56.6, 55, 50, 67, 61, 1.0],
  [26, "Israel", "Middle East & Africa", 55.8, 54, 64, 64, 49, -1.1],
  [27, "Malaysia", "Asia-Pacific", 54.9, 55, 45, 61, 58, 0.4],
  [28, "Thailand", "Asia-Pacific", 53.6, 52, 42, 57, 55, -0.2],
  [29, "Vietnam", "Asia-Pacific", 52.8, 56, 43, 46, 59, 1.5],
  [30, "South Africa", "Middle East & Africa", 51.7, 51, 52, 55, 45, -0.7],
  [31, "Argentina", "Americas", 50.6, 50, 44, 39, 43, -1.8],
  [32, "Chile", "Americas", 49.8, 46, 39, 73, 52, 0.2],
  [33, "Qatar", "Middle East & Africa", 48.9, 49, 50, 54, 59, 0.5],
  [34, "Egypt", "Middle East & Africa", 47.6, 48, 55, 35, 42, -0.9],
  [35, "Philippines", "Asia-Pacific", 46.7, 47, 39, 48, 50, 0.6],
  [36, "Nigeria", "Middle East & Africa", 45.8, 46, 45, 34, 41, -0.5],
  [37, "Colombia", "Americas", 44.6, 43, 38, 50, 45, -0.2],
  [38, "Bangladesh", "Asia-Pacific", 43.9, 45, 34, 37, 46, 0.7],
  [39, "Pakistan", "Asia-Pacific", 42.7, 41, 48, 30, 35, -1.2],
  [40, "Morocco", "Middle East & Africa", 41.9, 40, 36, 45, 44, 0.4],
  [41, "Kenya", "Middle East & Africa", 40.8, 39, 35, 42, 41, 0.5],
  [42, "Peru", "Americas", 39.7, 38, 32, 47, 40, -0.4],
  [43, "Kazakhstan", "Asia-Pacific", 38.9, 40, 42, 32, 39, 0.1],
  [44, "Ukraine", "Europe", 38.0, 33, 48, 42, 29, -2.6],
  [45, "Greece", "Europe", 37.4, 35, 31, 59, 38, 0.9],
  [46, "Hungary", "Europe", 36.8, 36, 34, 43, 36, -0.3],
  [47, "Iran", "Middle East & Africa", 36.0, 38, 53, 24, 30, -1.6],
  [48, "Algeria", "Middle East & Africa", 35.2, 34, 37, 30, 36, 0.2],
  [49, "Ethiopia", "Middle East & Africa", 34.6, 35, 31, 28, 34, 0.4],
  [50, "Sri Lanka", "Asia-Pacific", 34.1, 32, 27, 36, 31, 1.0]
];

function pillarBar(scores) {
  const total = scores.reduce((sum, value) => sum + value, 0);
  const colors = ["#C9A84C", "#9C6B3E", "#7B7F68", "#7C4A4A"];
  return `<div class="pillar-bar">${scores.map((score, index) => `<span class="pillar-seg" style="width:${(score / total) * 100}%;background:${colors[index]}"></span>`).join("")}</div>`;
}

function renderRankings() {
  app.innerHTML = `
    ${pageHeader("Geoeconomic Rankings", "The Capital & Diplomacy Geoeconomic Power Index.", "A composite ranking of 50 nations across economic capacity, geopolitical leverage, institutional resilience, and strategic influence — updated annually.")}
    <section class="methodology-panel section">
      <div class="pillar-strip">
        ${[
          ["ECONOMIC CAPACITY", "35%", "Measures output scale, productivity, reserve adequacy, financial depth, and the capacity to sustain industrial investment.", "GDP; reserve assets; capital-market depth"],
          ["GEOPOLITICAL LEVERAGE", "30%", "Measures military reach, alliance centrality, sanctions capacity, energy influence, and ability to shape external choices.", "Defense reach; alliance network; coercive tools"],
          ["INSTITUTIONAL QUALITY", "20%", "Measures rule credibility, administrative capacity, policy predictability, and public-sector effectiveness.", "Governance; legal predictability; corruption control"],
          ["STRATEGIC RESILIENCE", "15%", "Measures food, energy, fiscal, demographic, and supply-chain resilience under systemic shocks.", "Energy security; fiscal space; supply-chain redundancy"]
        ].map(([name, weight, desc, subs]) => `<div class="pillar"><div class="category">${name}</div><div class="pillar-weight">${weight}</div><p class="lede">${desc}</p><div class="small-label">${subs}</div></div>`).join("")}
      </div>
    </section>
    <section class="shell section">
      <div class="top-ranking">
        ${topRanks.map(([rank, country, score, pillars, rationale]) => `
          <div class="rank-entry ${rank <= 3 ? "top-three" : ""}">
            <div class="rank-number">${rank}</div>
            <div class="rank-country">${country}</div>
            <div class="rank-score">${score}</div>
            ${pillarBar(pillars)}
            <p class="lede">${rationale}</p>
          </div>
        `).join("")}
      </div>
    </section>
    <section class="shell section divider-top">
      <div class="explorer">
        <h2 class="module-heading">Full Index: Ranks 11-50</h2>
        <div class="explorer-controls">
          <label class="control-inline"><span class="control-label">Sort by:</span><select id="rank-sort" class="select-control"><option value="score">Overall</option><option value="economic">Economic</option><option value="geo">Geopolitical</option><option value="institutional">Institutional</option><option value="resilience">Resilience</option></select></label>
          <label class="control-inline"><span class="control-label">Filter by region:</span><select id="rank-region" class="select-control"><option>All</option><option>Americas</option><option>Europe</option><option>Asia-Pacific</option><option>Middle East & Africa</option></select></label>
        </div>
      </div>
      <table class="data-table">
        <thead><tr><th>RANK</th><th>COUNTRY</th><th>GPI SCORE</th><th>ECONOMIC</th><th>GEOPOLITICAL</th><th>INSTITUTIONAL</th><th>RESILIENCE</th><th>YOY CHANGE</th></tr></thead>
        <tbody id="rank-table"></tbody>
      </table>
    </section>
    <section class="shell section notes-download">
      <div>
        <h2 class="module-heading">Methodology &amp; Data Sources</h2>
        <p class="lede">The index combines macroeconomic, institutional, security, and resilience indicators using normalized scores and pillar weights. Input datasets reference IMF macro series, World Bank development indicators, Freedom House governance measures, and SIPRI military-expenditure data. Qualitative adjustments are applied only where measurable sanctions capacity, alliance centrality, or strategic chokepoint exposure is not fully captured in public datasets.</p>
      </div>
      <div class="download-links">
        <a class="outline-button" href="#">Download Full Index (CSV)</a>
        <a class="outline-button" href="#">Download Methodology Brief (PDF)</a>
      </div>
    </section>
    ${footer()}
  `;
  initRankings();
}

function initRankings() {
  const sort = document.getElementById("rank-sort");
  const region = document.getElementById("rank-region");
  const columns = { score: 3, economic: 4, geo: 5, institutional: 6, resilience: 7 };

  function draw() {
    const regionValue = region.value;
    const sortIndex = columns[sort.value];
    const rows = indexRanks
      .filter((row) => regionValue === "All" || row[2] === regionValue)
      .sort((a, b) => b[sortIndex] - a[sortIndex]);
    document.getElementById("rank-table").innerHTML = rows.map(([rank, country, rowRegion, score, economic, geo, institutional, resilience, yoy]) => `
      <tr>
        <td>${rank}</td><td><strong>${country}</strong><br><span class="chart-axis">${rowRegion}</span></td><td>${score.toFixed(1)}</td><td>${economic}</td><td>${geo}</td><td>${institutional}</td><td>${resilience}</td><td class="${yoy >= 0 ? "delta-up" : "delta-down"}">${yoy >= 0 ? "↑" : "↓"} ${Math.abs(yoy).toFixed(1)}</td>
      </tr>
    `).join("");
  }

  sort.addEventListener("change", draw);
  region.addEventListener("change", draw);
  draw();
}

const renderers = {
  home: renderHome,
  markets: renderMarkets,
  simulator: renderSimulator,
  countries: renderCountries,
  research: renderResearch,
  risk: renderRisk,
  explainers: renderExplainers,
  rankings: renderRankings
};

initChrome();
if (app && renderers[page]) {
  renderers[page]();
}
