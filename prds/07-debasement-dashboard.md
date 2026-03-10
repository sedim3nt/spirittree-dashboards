# PRD: The Debasement Dashboard

**Codename:** Debasement
**Category:** Revenue / Raoul Pal Thesis
**Build time:** 3-4 days
**Revenue:** Newsletter, crypto audience funnel

---

## Concept
Raoul Pal's core thesis in one visual: **government debt expansion debases fiat currency, making hard assets (crypto, gold, equities) the only rational long-term hold.** This dashboard makes that thesis visible and undeniable.

## Metrics Displayed
1. **US M2 Money Supply** — total dollars in existence (line chart, log scale)
2. **US National Debt** — real-time counter (like usdebtclock.org but prettier)
3. **Purchasing Power of $1** — starting from 1971 (Nixon shock), showing decay
4. **The "Everything Code"** — Raoul's correlation: M2 growth → crypto/gold/Nasdaq growth
5. **Real interest rates** — nominal rate minus inflation (are you getting paid to save or punished?)
6. **BTC vs M2 overlay** — Bitcoin price overlaid on M2 growth, showing correlation
7. **ETH deflationary tracker** — net ETH supply change since The Merge (burn vs issuance)
8. **Global liquidity index** — Fed + ECB + BOJ + PBOC balance sheets combined

## Visual Design
- Dark theme (financial data aesthetic — Bloomberg-inspired)
- Large animated counters for debt and money supply
- Correlation charts with R² values displayed
- "Your savings lost [X]% purchasing power this year" personalized calculator
- Shareable "debasement card" — shows how much $10K lost in real terms over [timeframe]

## Data Sources
- FRED (Federal Reserve Economic Data) — M2, federal funds rate, CPI
- Treasury Direct — national debt to the penny
- CoinGecko/CoinMarketCap — BTC, ETH prices
- Ultrasound.money API — ETH burn data
- Global central bank balance sheets (various APIs)
- All automatable, daily updates

## Revenue Path
- Free: core dashboard (audience builder)
- Newsletter: $12/mo — "The Debasement Report" weekly analysis
- Premium: $49/mo — custom alerts, portfolio hedging suggestions, API access
- Course: $199 — "Understanding Monetary Debasement" video series (Landon teaches, AI assists)
- Crypto audience → funnel to SafeSpace/MycoMaps (cross-pollination)

## Why This Works
usdebtclock.org gets 2M+ monthly visits with ugly design and no narrative. We add beautiful design + Raoul's thesis narrative + actionable investment framing. This is an audience builder that compounds.

## Kill Criteria
If FRED API access is restricted or rate-limited beyond usability, simplify to manual weekly updates.
