import { motion } from 'framer-motion'
import { Card, Section, Footnote, Footer, FlavorText, Hero } from '../components/Card'
import { HBar, BarChartVertical } from '../components/Charts'
import data from '../data/models.json'

export default function ArmsRace() {
  // Timeline SVG params
  const svgW = 700
  const svgH = 300
  const padL = 40
  const padR = 20
  const padT = 20
  const padB = 40

  // Parse dates and compute positions
  const allDates = data.timeline.map(m => new Date(m.date))
  const minDate = Math.min(...allDates)
  const maxDate = Math.max(...allDates)
  const dateRange = maxDate - minDate || 1

  // Group by approximate month to detect overlaps
  const buckets = {}
  data.timeline.forEach((m, i) => {
    const d = new Date(m.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!buckets[key]) buckets[key] = []
    buckets[key].push(i)
  })

  const timelinePoints = data.timeline.map((m, i) => {
    const d = new Date(m.date)
    const x = padL + ((d - minDate) / dateRange) * (svgW - padL - padR)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    const stackIdx = buckets[key].indexOf(i)
    const y = svgH / 2 - 20 + stackIdx * 30
    return { x, y, ...m }
  })

  // Year markers for x-axis
  const years = [...new Set(data.timeline.map(m => new Date(m.date).getFullYear()))]

  // Capability matrix
  const benchmarkKeys = ['arena', 'swe', 'humaneval', 'mmlu']
  const benchmarkLabels = ['Arena', 'SWE-Bench', 'HumanEval', 'MMLU']
  const benchmarkMaxes = benchmarkKeys.map(k =>
    Math.max(...data.benchmarks.map(b => b[k]))
  )

  // Context window - log scale for display
  const maxLogCtx = Math.log10(Math.max(...data.contextWindow.map(c => c.tokens)))

  return (
    <div>
      <Hero
        value={String(data.daysSinceLastFrontier)}
        label="DAYS SINCE LAST FRONTIER MODEL"
        sub={`Latest: ${data.lastModel} (${data.lastDate})`}
        color="citrine"
      />

      <FlavorText>
        The intervals are shrinking. The capabilities aren't.
      </FlavorText>

      {/* Timeline visualization */}
      <Section title="Frontier Model Timeline">
        <Card>
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 500 }}>
              {/* Center line */}
              <line
                x1={padL} y1={svgH / 2}
                x2={svgW - padR} y2={svgH / 2}
                stroke="#333" strokeWidth="1"
              />

              {/* Year labels */}
              {years.map((year) => {
                const d = new Date(`${year}-07-01`)
                const x = padL + ((d - minDate) / dateRange) * (svgW - padL - padR)
                return (
                  <g key={year}>
                    <line x1={x} y1={svgH - padB + 5} x2={x} y2={svgH / 2} stroke="#333" strokeWidth="0.5" strokeDasharray="3 3" />
                    <text x={x} y={svgH - padB + 20} textAnchor="middle" fill="#888" fontSize="11" fontFamily="var(--font-mono)">
                      {year}
                    </text>
                  </g>
                )
              })}

              {/* Model circles */}
              {timelinePoints.map((p, i) => (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <circle cx={p.x} cy={p.y} r="8" fill={p.color} opacity="0.85">
                    <title>{`${p.name} (${p.company}) - ${p.date}`}</title>
                  </circle>
                  <text
                    x={p.x}
                    y={p.y - 12}
                    textAnchor="middle"
                    fill={p.color}
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                    opacity="0.9"
                  >
                    {p.name}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {[...new Map(data.timeline.map(m => [m.company, m.color])).entries()].map(([company, color]) => (
              <div key={company} className="flex items-center gap-1.5 text-xs text-text-dim">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                {company}
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Capability matrix */}
      <Section title="Capability Matrix">
        <Card className="overflow-x-auto">
          <div className="min-w-[450px]">
            {/* Header */}
            <div className="grid grid-cols-5 gap-2 pb-2 border-b border-border">
              <div className="text-text-dim text-xs uppercase tracking-wider">Model</div>
              {benchmarkLabels.map(l => (
                <div key={l} className="text-text-dim text-xs uppercase tracking-wider text-center">{l}</div>
              ))}
            </div>
            {/* Rows */}
            {data.benchmarks.map((b, ri) => (
              <motion.div
                key={b.model}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * ri }}
                className="grid grid-cols-5 gap-2 py-2 border-b border-border"
              >
                <div className="text-text font-mono text-xs truncate">{b.model}</div>
                {benchmarkKeys.map((k, ci) => {
                  const intensity = b[k] / benchmarkMaxes[ci]
                  return (
                    <div
                      key={k}
                      className="text-center font-mono text-xs py-1 rounded"
                      style={{
                        background: `rgba(234, 179, 8, ${intensity * 0.35})`,
                        color: intensity > 0.85 ? '#eab308' : '#aaa',
                      }}
                    >
                      {b[k]}
                    </div>
                  )
                })}
              </motion.div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Context window race */}
      <Section title="Context Window Race">
        {data.contextWindow.map((c) => {
          const logVal = Math.log10(c.tokens)
          const logMax = maxLogCtx
          const pct = (logVal / logMax) * 100
          const display = c.tokens >= 1000000 ? `${(c.tokens / 1000000).toFixed(1)}M` : c.tokens >= 1000 ? `${(c.tokens / 1000).toFixed(0)}K` : c.tokens
          return (
            <div key={c.model} className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-text font-medium">{c.model} ({c.date})</span>
                <span className="font-mono font-bold" style={{ color: '#eab308' }}>{display}</span>
              </div>
              <div className="h-2.5 bg-bg rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #eab30866, #eab308)' }}
                />
              </div>
              <div className="text-text-muted text-xs mt-1">{c.tokens.toLocaleString()} tokens</div>
            </div>
          )
        })}
      </Section>

      {/* Release frequency */}
      <Section title="Frontier Release Interval (months)">
        <BarChartVertical
          items={data.releaseIntervals.map(r => ({
            label: r.period,
            value: r.months,
          }))}
          color="#eab308"
          height={180}
        />
      </Section>

      <Footnote>
        LMSYS Chatbot Arena, SWE-Bench, HumanEval, MMLU, provider announcements.
      </Footnote>

      <FlavorText>
        This is what an arms race looks like when the weapon is intelligence.
      </FlavorText>

      <Footer />
    </div>
  )
}
