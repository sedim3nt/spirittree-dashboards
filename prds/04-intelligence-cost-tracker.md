# PRD: The Intelligence Cost Tracker

**Codename:** Sørn's Law
**Category:** Revenue / Research
**Build time:** 2 days
**Revenue:** API, research reports, consulting

---

## Concept
Track the **cost per unit of intelligence over time** — visualizing what Emad Mostaque calls the intelligence cost collapse.

Like Moore's Law had a chart showing transistors per dollar doubling. This shows the **cost to perform one hour of expert-level cognitive work** falling exponentially.

## The Metric
**Cost per "cognitive hour"** = what it costs for AI to do 1 hour of work that would take a skilled human 1 hour.

| Date | Model | Cost/Cognitive Hour | vs. Human ($75/hr) |
|------|-------|-------------------|-------------------|
| 2023 Q1 | GPT-4 | $18.00 | 76% cheaper |
| 2023 Q4 | GPT-4 Turbo | $4.20 | 94% cheaper |
| 2024 Q2 | Claude 3.5 Sonnet | $1.80 | 97.6% cheaper |
| 2025 Q1 | Claude 4.5 Sonnet | $0.45 | 99.4% cheaper |
| 2026 Q1 | Claude 4.6 Sonnet | $0.12 | 99.8% cheaper |
| 2026 Q1 | GPT-5.4 | $0.08 | 99.9% cheaper |

## Visual Design
- Log-scale line chart — steep downward curve (like the classic transistor cost chart)
- Y-axis: cost per cognitive hour
- X-axis: time
- Horizontal line at $75 (average skilled human) — the AI line falls away from it
- Annotations on chart: major model releases
- Below: calculator — "How much would [X task] cost with AI vs. a human?"
- Projection line: "At current trajectory, 1 cognitive hour = $0.001 by [date]"

## Data Sources
- Provider pricing pages (OpenAI, Anthropic, Google)
- Benchmark scores (LMSYS, SWE-Bench, HumanEval) as quality weights
- Tokens-per-task estimates from published research
- Updated automatically when new models or pricing changes ship

## Revenue Path
- Free: historical chart + basic calculator
- API: $39/mo — programmatic access to the cost curve data
- Research reports: $199 — quarterly deep dive on intelligence economics
- Corporate consulting: "Your team costs $X/year. AI equivalent: $Y/year. Here's the transition plan."

## Why This Matters
This is the central chart of the AI economy. Every CEO, investor, and policy maker should see it. It's the "hockey stick" that makes the abstract tangible.

## Kill Criteria
If we can't define a credible, reproducible methodology for "cognitive hour" within 1 week, simplify to "cost per million tokens" comparison (less interesting but defensible).
