# PRD: AI Economy Fear & Greed Index

**Codename:** AI Pulse
**Category:** Revenue / Attention Magnet
**Build time:** 3-4 days
**Revenue:** Newsletter, API, sponsorship

---

## Concept
The **CNN Fear & Greed Index, but for AI's impact on the economy.** A single daily number (0-100) measuring whether the collective mood is "AI will save us" or "AI will destroy us."

NOT about AI stocks. About the ECONOMIC impact of AI on society.

## Component Signals

| Signal | Weight | Source |
|--------|--------|--------|
| AI layoff announcements | 20% | News NLP (Bloomberg, Reuters, TechCrunch) |
| AI hiring volume | 15% | Indeed/LinkedIn job posting data |
| Congressional AI mentions | 10% | Congress.gov API, hearing transcripts |
| Social sentiment (X + Reddit) | 20% | NLP on #AI, r/artificial, r/singularity |
| AI startup funding | 10% | Crunchbase/PitchBook data |
| AI regulation activity | 10% | Federal Register, EU AI Act tracker |
| Model capability change rate | 15% | LMSYS Arena score velocity |

## Scoring
- **0-25:** "Panic" — AI is the villain narrative dominates
- **26-50:** "Cautious" — Mixed signals, uncertainty
- **51-75:** "Optimistic" — "AI will create more jobs than it destroys"
- **76-100:** "Euphoric" — "AI will solve everything" narrative

## Visual Design
- Giant circular gauge with gradient (red → green)
- Today's number in huge text: "63 — Optimistic"
- 7 component bars below
- 30/90/365 day historical line chart
- "This time last year: [X]"
- Shareable social card auto-generated daily

## Revenue Path
- Free: today's number + 30-day history
- Newsletter: $7/mo weekly analysis of the index moves
- API: $49/mo
- Sponsorship: daily embed on other sites = brand exposure

## Kill Criteria
If sentiment analysis produces random/noisy results, reduce to 3 hard-data signals only.
