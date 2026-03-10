# SpiritTree Dashboards — Master Build Plan

**URL:** `dashboards.spirittree.dev`
**Stack:** Vite + React 19 + TailwindCSS v4 + Framer Motion
**Deploy:** GitHub Pages (`sedim3nt/spirittree-dashboards`)
**Design:** Jewel tones on dark (#0a0a0c), one site, 10 tabs

---

## Design System

### Colors (Jewel Tones)
Each tab gets a **signature jewel color** for its accent. All share the same dark bg/card/border palette.

| Tab | Codename | Jewel Color | Hex |
|-----|----------|-------------|-----|
| 01 | Thought Clock | Emerald | `#00ff88` / `#059669` |
| 02 | Displacement Index | Ruby | `#ef4444` / `#dc2626` |
| 03 | Last Worker | Amber | `#f59e0b` / `#d97706` |
| 04 | Sørn's Law | Sapphire | `#3b82f6` / `#2563eb` |
| 05 | AI Pulse | Amethyst | `#a855f7` / `#9333ea` |
| 06 | Arms Race | Citrine | `#eab308` / `#ca8a04` |
| 07 | Debasement | Gold | `#fbbf24` / `#b45309` |
| 08 | Agent Economy | Teal | `#14b8a6` / `#0d9488` |
| 09 | Multiplier | Rose | `#f43f5e` / `#e11d48` |
| 10 | Singularity Clock | Opal (white-gold) | `#e2e8f0` / `#ffd700` |

### Shared Palette
```
--bg:        #0a0a0c
--bg-card:   #111114
--bg-glow:   #1a1a2e
--border:    #1e1e2e
--text:      #e8e8f0
--text-dim:  #8888a0
--text-muted: #555566
--font-mono: "SF Mono", "Fira Code", monospace
```

### Layout Rules
- Max width: 860px centered
- Tab navigation: horizontal scroll on mobile, full bar on desktop
- Each tab icon + short name
- Active tab underline in its jewel color
- Smooth fade transition between tabs
- Every tab has: Hero metric → Supporting visuals → Data table/breakdown → Methodology footnotes → Footer
- Footer on every tab: "The fruiting body is not the organism. 🦋 · Built by SpiritTree"

### Typography
- Headings: system sans-serif, tight tracking, bold
- Data/numbers: monospace, large, in jewel color
- Body: small, dim, relaxed leading
- Personality copy: italic, slightly brighter, used sparingly for editorial voice

---

## Tab-by-Tab UI Plans

### Tab 01: Thought Clock (Emerald)
**Hero:** Giant millisecond clock counting up from 00:00.000 → stops at ~3.7s with red flash
**Below hero:** "GPT-5.4 just processed everything your brain will think today."
**Section 2:** 4 stat cards (thoughts/day, tokens, human time, AI time)
**Section 3:** Model comparison — horizontal bars (GPT-5.4, Sonnet, Gemini, Opus, GPT-4o) + Human bar at bottom
**Section 4:** Historical chart — bars shrinking from 62s → 3.7s over 9 data points
**Section 5:** Projection card — "Under 1 second by [date]"
**Footnote:** Tseng & Poppenk 2020, inner speech research, Artificial Analysis benchmarks
**Copy flavor:** "Your brain runs 24 hours to do what silicon handles before your coffee cools."

### Tab 02: Displacement Index (Ruby)
**Hero:** Giant semicircular gauge, 0-100, needle pointing to current score (~58)
**Label:** "ACCELERATING" in ruby red
**Below hero:** "The signals are structural. The question isn't if — it's which jobs, and when."
**Section 2:** 6 component signal mini-gauges in a 2×3 grid
  - AI job posting ratio (Indeed/LinkedIn)
  - Hiring rate in exposed roles (BLS)
  - Model capability benchmark (LMSYS)
  - Automation API volume (usage reports)
  - Corporate AI capex (earnings)
  - Public sentiment (X/Reddit NLP)
**Section 3:** Sector breakdown — horizontal bars for Tech, Finance, Creative, Healthcare, Legal, Manufacturing
**Section 4:** 90-day historical line chart
**Footnote:** BLS employment data, Indeed Hiring Lab, LMSYS Arena, corporate earnings transcripts
**Copy flavor:** "This isn't a prediction. It's a measurement. The index reads what's already happening."

### Tab 03: Last Worker Countdown (Amber)
**Hero:** Big number — "The median profession hits 50% automation by [date]"
**Below hero:** "Not when AI replaces the job. When AI does most of it."
**Section 2:** Searchable/filterable table of 30+ professions:
  - Profession name
  - Current % automatable (progress bar)
  - Projected 50% date
  - Trend arrow (↑ → ↓)
**Section 3:** Sort controls: soonest, furthest, most change
**Section 4:** Heatmap mini-visualization by sector (colored blocks)
**Footnote:** O*NET task database (BLS), AI benchmark scores by domain, McKinsey automation estimates calibrated against actual model performance
**Copy flavor:** "The plumber sleeps soundly. The paralegal does not."

### Tab 04: Intelligence Cost Tracker / Sørn's Law (Sapphire)
**Hero:** Big number — "$0.08 per cognitive hour" with comparison "Human: $75/hr"
**Below hero:** "Intelligence is a commodity now. The price chart only goes one direction."
**Section 2:** Log-scale line chart — cost per cognitive hour over time, steep downward
  - Horizontal reference line at $75 (human)
  - Data points annotated with model names
**Section 3:** Cost comparison table: Date | Model | Cost/hr | vs Human
**Section 4:** Calculator input: "Your task takes a human [X] hours at $[Y]/hr → AI cost: $[Z]"
**Section 5:** Projection: "$0.001 per cognitive hour by [date]"
**Footnote:** Provider pricing pages, LMSYS quality benchmarks as weights, tokens-per-task from published research
**Copy flavor:** "What used to require a consultant now requires a prompt. The consultant costs more."

### Tab 05: AI Economy Fear & Greed (Amethyst)
**Hero:** Large circular gauge with gradient (red panic → green euphoric), number in center
**Label:** "OPTIMISTIC" or "CAUTIOUS" etc
**Below hero:** "Not about AI stocks. About what AI is doing to the economy you live in."
**Section 2:** 7 component signal bars (layoffs, hiring, congressional mentions, social sentiment, funding, regulation, capability velocity)
**Section 3:** 30/90/365 day line charts with tab switcher
**Section 4:** "This time last year: [X]" comparison
**Footnote:** News NLP, Indeed job data, Congress.gov, X/Reddit sentiment, Crunchbase, Federal Register, LMSYS velocity
**Copy flavor:** "The collective mood isn't data. But it moves markets, shapes policy, and decides who gets funding."

### Tab 06: Model Arms Race (Citrine)
**Hero:** "Days since last frontier model release: [X]" — counter that keeps resetting
**Below hero:** "The intervals are shrinking. The capabilities aren't."
**Section 2:** Timeline visualization — horizontal, models as dots/circles colored by company, density shows acceleration
  - OpenAI (green), Anthropic (orange), Google (blue), Meta (purple), Alibaba (red), Open Source (white)
**Section 3:** Capability matrix — models × benchmarks grid with colored cells (heatmap style)
**Section 4:** Context window race — log-scale from 4K → 2M
**Section 5:** Release frequency chart — "Months between frontier releases" shrinking
**Footnote:** LMSYS Chatbot Arena, SWE-Bench, HumanEval, MMLU, provider announcements
**Copy flavor:** "This is what an arms race looks like when the weapon is intelligence."

### Tab 07: Debasement Dashboard (Gold)
**Hero:** Real-time US national debt counter (animated number ticker)
**Below hero:** "Every dollar you hold is worth less than it was yesterday. That's not opinion. It's arithmetic."
**Section 2:** 3-column stat row: M2 Money Supply | Purchasing power of $1 since 1971 | Real interest rate
**Section 3:** "The Everything Code" — overlay chart showing M2 growth vs BTC/Gold/Nasdaq correlation
**Section 4:** Savings erosion calculator: "Your $[X] savings lost [Y]% real value this year"
**Section 5:** Global liquidity index — Fed + ECB + BOJ + PBOC combined
**Footnote:** FRED (M2, CPI, Federal Funds Rate), Treasury Direct, CoinGecko, central bank balance sheets
**Copy flavor:** "The money printer doesn't stop. Your purchasing power is the ink."

### Tab 08: Agent Economy Monitor (Teal)
**Hero:** "Estimated active AI agents worldwide: [X]" — big animated counter
**Below hero:** "Nobody is measuring the agent economy. Until now."
**Section 2:** 4 stat cards: Agent-generated code %, Agent content %, Cost/agent-hour, Human-to-agent ratio
**Section 3:** Agent activity by sector — horizontal bars (coding, research, content, support, finance)
**Section 4:** "Agent GDP" estimate — economic output attributed to AI agents
**Section 5:** Autonomy spectrum — distribution chart (copilot → semi-auto → fully autonomous)
**Footnote:** GitHub Copilot stats, API usage estimates from quarterly earnings, Base/ETH agent wallet analysis, OpenClaw npm downloads
**Copy flavor:** "Somewhere right now, an agent is doing a job that was listed on LinkedIn last month."

### Tab 09: Productivity Multiplier (Rose)
**Hero:** Interactive calculator — "How much more productive would YOUR team be with AI?"
**Inputs:** Team size slider, role dropdown, hours/week on various tasks
**Output card:** Hours saved/week, FTE equivalent, annual cost savings, ROI timeline
**Section 2:** Task multiplier reference table (email 4x, coding 3-5x, research 5-8x, etc.)
**Section 3:** Comparison visual: "Your team of [X] with AI = a team of [Y] without"
**Section 4:** "Download your report" email capture CTA
**Footnote:** GitHub Copilot research, McKinsey 2025, Intercom/Zendesk automation data, internal benchmarks
**Copy flavor:** "You don't need more people. You need better infrastructure."

### Tab 10: Singularity Clock (Opal/Gold)
**Hero:** Beautiful analog clock face on dark bg, gold hands, glowing midnight position
**Current position:** 11:54 PM (6 minutes to midnight)
**Below hero:** "We don't know what midnight looks like. But we can measure the approach."
**Section 2:** 7 component factors with individual assessments:
  - Reasoning (85% of expert human)
  - Autonomous task completion (50% SWE-Bench)
  - Scientific discovery capability
  - Self-improvement ability
  - Multi-modal integration
  - Economic displacement (our AJDI)
  - Expert timeline consensus
**Section 3:** Historical clock positions — 2020 (11:00) → 2026 (11:54)
**Section 4:** Expert quotes carousel (Hinton, Bengio, Altman, Hassabis)
**Section 5:** "What happens at midnight?" explainer
**Footnote:** GPQA benchmarks, SWE-Bench, expert surveys (AI Impacts, Metaculus), research papers on self-improvement
**Copy flavor:** "The Bulletin of the Atomic Scientists has their clock. This is ours. Same gravity. Different bomb."

---

## Data Strategy

All dashboards use **static data updated monthly** (not live APIs). This keeps hosting free, eliminates API costs, and lets us control the narrative through curated updates.

Data lives in a `data/` directory as JSON files:
- `data/thought-clock.json`
- `data/displacement-index.json`
- `data/professions.json`
- `data/intelligence-cost.json`
- `data/fear-greed.json`
- `data/models.json`
- `data/debasement.json`
- `data/agent-economy.json`
- `data/multiplier-rates.json`
- `data/singularity.json`

Monthly update process: Riptid3 (research agent) gathers new data, writes JSON, Granit3 deploys.

---

## Navigation

```
[🧠 Thought Clock] [💎 Displacement] [⏳ Last Worker] [📉 Sørn's Law] [💜 AI Pulse]
[⚔️ Arms Race] [🪙 Debasement] [🤖 Agent Economy] [🚀 Multiplier] [🕛 Singularity]
```

URL structure: `dashboards.spirittree.dev/#thought-clock`, `#displacement`, etc.
Hash-based routing (no server needed for GitHub Pages).

---

## Build Instructions for Granit3

1. Scaffold Vite + React + Tailwind v4 + Framer Motion project
2. Create shared design system: colors, card component, section component, footnote component, stat card, gauge component, bar chart component, line chart component
3. Build tab navigation with hash routing
4. Build each tab as a separate component importing from shared + its data JSON
5. Implement the clock (tab 01) with requestAnimationFrame
6. Implement the gauge (tabs 02, 05) as SVG semicircle
7. Implement the analog clock face (tab 10) as SVG
8. Implement the calculator (tabs 04, 09) with useState
9. Build all data JSON files with sourced numbers
10. `vite build` → `out/` directory
11. Deploy to GitHub Pages with Actions workflow
12. Configure `dashboards.spirittree.dev` CNAME

**Target: single `npm run build` produces a static site under 500KB.**
