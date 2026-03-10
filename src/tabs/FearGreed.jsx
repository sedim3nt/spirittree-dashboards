import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Section, Footnote, Footer, FlavorText } from '../components/Card'
import { HBar, LineChart } from '../components/Charts'
import data from '../data/fear-greed.json'

export default function FearGreed() {
  const [period, setPeriod] = useState('30d')

  const periodData = {
    '30d': { points: data.history30d, labels: ['30d ago', 'Today'] },
    '90d': { points: data.history90d, labels: ['90d ago', 'Today'] },
    '365d': { points: data.history365d, labels: ['1yr ago', 'Today'] },
  }

  const active = periodData[period]

  // Gauge SVG params
  const size = 300
  const cx = size / 2
  const cy = size / 2 + 20
  const r = 100
  const startAngle = 135
  const endAngle = 405
  const totalArc = endAngle - startAngle // 270 degrees
  const scorePct = data.score / 100

  // Convert angle to radians for SVG arc
  const toRad = (deg) => (deg * Math.PI) / 180
  const arcPath = (start, end, radius) => {
    const s = toRad(start)
    const e = toRad(end)
    const x1 = cx + radius * Math.cos(s)
    const y1 = cy + radius * Math.sin(s)
    const x2 = cx + radius * Math.cos(e)
    const y2 = cy + radius * Math.sin(e)
    const largeArc = end - start > 180 ? 1 : 0
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`
  }

  // Needle endpoint
  const needleAngle = toRad(startAngle + scorePct * totalArc)
  const needleX = cx + (r - 20) * Math.cos(needleAngle)
  const needleY = cy + (r - 20) * Math.sin(needleAngle)

  // Label positions (outside the arc)
  const fearLabelAngle = toRad(startAngle)
  const greedLabelAngle = toRad(endAngle)
  const labelR = r + 25

  const change = data.score - data.lastYearScore

  return (
    <div>
      {/* Hero: Circular gauge */}
      <div className="text-center py-8">
        <div className="flex justify-center">
          <motion.svg
            width={size}
            height={size * 0.65}
            viewBox={`0 0 ${size} ${size * 0.65}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            <defs>
              <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>

            {/* Background arc */}
            <path
              d={arcPath(startAngle, endAngle, r)}
              fill="none"
              stroke="#1e1e2e"
              strokeWidth="18"
              strokeLinecap="round"
            />

            {/* Colored arc */}
            <motion.path
              d={arcPath(startAngle, endAngle, r)}
              fill="none"
              stroke="url(#gauge-grad)"
              strokeWidth="18"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            {/* Needle */}
            <motion.line
              x1={cx}
              y1={cy}
              x2={needleX}
              y2={needleY}
              stroke="#a855f7"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
            <circle cx={cx} cy={cy} r="6" fill="#a855f7" />

            {/* Scale labels — positioned outside the arc ends */}
            <text x={35} y={cy + 30} textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold" letterSpacing="2">FEAR</text>
            <text x={size - 35} y={cy + 30} textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold" letterSpacing="2">GREED</text>
          </motion.svg>
        </div>

        {/* Score and label BELOW the gauge, not inside it */}
        <div className="text-center mt-4">
          <div className="font-[family-name:var(--font-mono)] text-5xl font-bold" style={{ color: '#a855f7' }}>
            {data.score}
          </div>
          <div className="font-[family-name:var(--font-mono)] text-sm font-bold tracking-[0.25em] mt-2" style={{ color: '#a855f7' }}>
            {data.label}
          </div>
        </div>
      </div>

      <FlavorText>
        Not about AI stocks. About what AI is doing to the economy you live in.
      </FlavorText>

      {/* Component signals */}
      <Section title="Component Signals">
        {data.signals.map((s) => (
          <HBar
            key={s.name}
            label={s.name}
            value={s.value}
            max={100}
            color="#a855f7"
            sub={`Weight: ${s.weight}%`}
          />
        ))}
      </Section>

      {/* Historical chart with tab switcher */}
      <Section title="Historical Trend">
        <Card>
          <div className="flex gap-2 mb-4">
            {['30d', '90d', '365d'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  period === p
                    ? 'bg-amethyst/20 text-amethyst border border-amethyst/40'
                    : 'bg-bg border border-border text-text-dim hover:text-text'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <LineChart
            points={active.points}
            color="#a855f7"
            height={140}
            labels={active.labels}
          />
        </Card>
      </Section>

      {/* Year-over-year comparison */}
      <Section title="Year Over Year">
        <Card>
          <div className="text-center">
            <div className="text-text-dim text-xs uppercase tracking-wider mb-2">
              This time last year
            </div>
            <div className="font-mono text-2xl font-bold text-text-muted">
              {data.lastYearScore}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 flex items-center justify-center gap-2"
            >
              <span className="text-emerald text-xl">&#9650;</span>
              <span className="font-mono text-lg font-bold" style={{ color: '#a855f7' }}>
                +{change} points
              </span>
            </motion.div>
          </div>
        </Card>
      </Section>

      <Footnote>
        News NLP, Indeed job data, Congress.gov, X/Reddit sentiment, Crunchbase, Federal Register, LMSYS velocity.
      </Footnote>

      <FlavorText>
        The collective mood isn't data. But it moves markets, shapes policy, and decides who gets funding.
      </FlavorText>

      <Footer />
    </div>
  )
}
