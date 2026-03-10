# PRD: The AI Job Displacement Index (AJDI)

**Codename:** Displacement Index
**Category:** Revenue / Attention Magnet
**Build time:** 3-4 days
**Revenue:** Newsletter, API, consulting

---

## Concept
A **Fear & Greed Index but for AI job displacement.** Single number from 0-100 that answers: "How close is AI to making my job unnecessary?"

Combines multiple signals into one composite score, updated daily.

## Component Signals

| Signal | Weight | Source | What It Measures |
|--------|--------|--------|-----------------|
| AI job posting ratio | 20% | Indeed/LinkedIn API scraping | % of jobs mentioning AI skills required |
| Hiring rate in AI-exposed roles | 20% | BLS data, Indeed | Are companies hiring fewer humans in AI-capable roles? |
| AI model capability benchmark | 15% | LMSYS, HumanEval, SWE-Bench | How good are AI models at human tasks? |
| Automation API call volume | 15% | OpenAI/Anthropic usage reports | How much AI is being used for work? |
| Corporate AI capex | 15% | Earnings reports, news | How much are companies investing in AI over humans? |
| Public sentiment | 15% | X/Reddit/news NLP | Fear vs excitement about AI displacement |

## Scoring
- **0-20:** "Safe" — AI is a tool, not a threat
- **21-40:** "Shifting" — Some jobs changing, most safe
- **41-60:** "Accelerating" — Structural changes underway
- **61-80:** "Disrupting" — Widespread displacement in specific sectors
- **81-100:** "Singularity Adjacent" — Fundamental economic restructuring

## Visual Design
- Giant semicircle gauge (like fear/greed index) with the score
- Color gradient: green → yellow → orange → red → purple
- Below: each component signal with its own mini-gauge
- Historical chart: the index over time
- Sector breakdown: AJDI for tech, finance, creative, healthcare, etc.
- Shareable card: "Your sector's AJDI is [X] — [label]"

## Data Pipeline
- Daily scrape of job postings (Indeed/LinkedIn)
- Weekly BLS data pull
- Monthly model benchmark updates
- Continuous NLP on X/Reddit for sentiment
- All automated via Riptid3 research agent

## Revenue Path
- Free dashboard → email newsletter ($12/mo for weekly deep-dive)
- API: $49/mo for researchers/journalists
- Corporate licensing: $499/mo for HR departments wanting sector-specific data
- Consulting: "Is your workforce ready? Contact us for an AI readiness audit"

## Why This Works
The Fear & Greed Index for crypto (alternative.me) gets 500K+ monthly visits from a single number on a gauge. This is the same concept for the biggest economic story of the decade.

## Kill Criteria
If we can't get reliable data for at least 4/6 signals within 2 weeks, simplify to 3 signals.
