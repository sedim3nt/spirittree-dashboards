# PRD: The Model Arms Race Tracker

**Codename:** Arms Race
**Category:** Public Good / Developer Audience
**Build time:** 2 days
**Revenue:** Sponsorship, traffic → marketplace funnel

---

## Concept
A **real-time leaderboard and timeline** of AI model releases, showing the arms race between OpenAI, Anthropic, Google, Meta, Alibaba, and open-source in one visual.

Like the "nuclear stockpile" charts from the Cold War — but for AI capabilities.

## Visual Design
- **Timeline view:** Horizontal timeline showing every major model release, stacked by company. Color-coded. Density shows acceleration.
- **Capability matrix:** Models × benchmarks grid. LMSYS Arena, SWE-Bench, MMLU, HumanEval, etc.
- **Context window race:** Log-scale bar chart — from 4K (GPT-3) to 2M (GPT-5.4) over time
- **Cost efficiency curve:** How much capability per dollar, by model
- **Release frequency:** "Time between major releases" shrinking chart — from 18 months to 3 months to weeks
- **"Days since last frontier model"** — countdown that keeps resetting

## Data Sources
- LMSYS Chatbot Arena (public API)
- Provider announcements (RSS/news scraping)
- SWE-Bench, HumanEval, MATH, GPQA leaderboards
- Manually curated model database (we maintain)

## Revenue Path
- Free: full dashboard (public good)
- Newsletter: "Weekly Model Drop" — $5/mo analysis of new releases
- Marketplace funnel: "Want to use these models? Here's our agent setup guide [$49]"
- Sponsorship: AI companies want to be featured prominently

## Why This Works
Developers, researchers, and journalists constantly need this information but it's scattered across Twitter, arXiv, and random blogs. One canonical dashboard becomes the go-to reference.

## Kill Criteria
If we can't maintain weekly updates, it becomes stale and dies. Must be automated.
