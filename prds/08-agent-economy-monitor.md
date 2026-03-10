# PRD: The Agent Economy Monitor

**Codename:** Agent Economy
**Category:** Revenue / First-mover
**Build time:** 4-5 days
**Revenue:** API, enterprise, consulting

---

## Concept
A dashboard tracking the **emerging economy of AI agents** — how many agents are running, what they're doing, how much economic activity they're generating.

Nobody is measuring this. We'd be the first index.

## Metrics
1. **Active AI agents** (estimated) — based on API usage reports, OpenClaw installs, Claude/GPT API volume
2. **Agent-generated code commits** — % of GitHub commits authored by AI (Copilot, Codex, Claude)
3. **Agent-generated content** — estimated % of new web content written by AI
4. **Agent transactions** — onchain transactions from known agent wallets (Base, Ethereum)
5. **Cost per agent-hour** — what it costs to run a productive AI agent for an hour
6. **Agent capability index** — composite of SWE-Bench, tool use, multi-step task scores
7. **Agent autonomy spectrum** — distribution of agents by autonomy level (copilot → semi-auto → full auto)
8. **Human-to-agent ratio** — estimated agents per human worker in knowledge work

## Visual Design
- Globe visualization with agent "activity" hotspots
- Running counter: "Estimated active AI agents worldwide: [X]"
- Line charts for each metric over time
- "Agent GDP" — estimated economic output attributed to AI agents
- Sector breakdown: coding, research, content, customer service, finance

## Data Sources
- GitHub API — commit analysis, Copilot usage stats (public)
- OpenAI/Anthropic usage reports (quarterly earnings)
- Base/Ethereum blockchain — agent wallet transactions (onchain data)
- OpenClaw download stats (npm)
- News/research paper scraping for estimates
- Quarterly recalibration

## Revenue Path
- Free: headline metrics
- API: $99/mo — full dataset access for researchers/VCs
- Enterprise: $499/mo — sector-specific agent adoption metrics for workforce planning
- Reports: $299/quarter — "State of the Agent Economy" deep-dive
- Consulting: "Is your industry ready for agents? Let's assess."

## Why This Matters
Every VC, corporate strategist, and policy maker will need this data within 12 months. Being the first to track it = owning the category. This is what Bloomberg Terminal does for financial data — but for the agent economy.

## Kill Criteria
If reliable data sources can't be found for at least 4/8 metrics, narrow to "Agent Code Index" (just tracking AI-generated code, which is measurable).
