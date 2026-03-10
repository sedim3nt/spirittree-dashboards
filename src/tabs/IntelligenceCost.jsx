import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Section, Footnote, Footer, FlavorText, Hero } from '../components/Card'
import data from '../data/intelligence-cost.json'

export default function IntelligenceCost() {
  const [hours, setHours] = useState(10)
  const [rate, setRate] = useState(75)

  const humanCost = hours * rate
  const aiCost = hours * data.currentCost
  const savings = humanCost - aiCost
  const savingsPct = ((savings / humanCost) * 100).toFixed(1)

  // Log-scale SVG chart
  const svgW = 700
  const svgH = 320
  const padL = 60
  const padR = 30
  const padT = 30
  const padB = 50

  const allCosts = data.history.map(h => h.cost)
  const logMin = Math.floor(Math.log10(Math.min(...allCosts))) - 0.5
  const logMax = Math.log10(data.humanCost) + 0.3

  const mapY = (cost) => {
    const logVal = Math.log10(cost)
    const pct = (logVal - logMin) / (logMax - logMin)
    return padT + (1 - pct) * (svgH - padT - padB)
  }

  const mapX = (i) => {
    return padL + (i / (data.history.length - 1)) * (svgW - padL - padR)
  }

  const humanY = mapY(data.humanCost)

  const points = data.history.map((h, i) => ({
    x: mapX(i),
    y: mapY(h.cost),
    ...h,
  }))

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  // Y-axis ticks
  const yTicks = [0.01, 0.1, 1, 10, 75]

  return (
    <div>
      <Hero value="$0.08" label="PER COGNITIVE HOUR" sub="Human: $75/hr" color="sapphire" />

      <FlavorText>
        Intelligence is a commodity now. The price chart only goes one direction.
      </FlavorText>

      {/* Log-scale cost chart */}
      <Section title="Cost per Cognitive Hour (Log Scale)">
        <Card>
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 400 }}>
              {/* Y-axis ticks and labels */}
              {yTicks.map((tick) => {
                const y = mapY(tick)
                return (
                  <g key={tick}>
                    <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
                    <text x={padL - 8} y={y + 4} textAnchor="end" fill="#888" fontSize="10" fontFamily="var(--font-mono)">
                      ${tick}
                    </text>
                  </g>
                )
              })}

              {/* Human cost dashed line */}
              <line
                x1={padL} y1={humanY} x2={svgW - padR} y2={humanY}
                stroke="#ef4444" strokeWidth="1.5" strokeDasharray="8 4"
              />
              <text x={svgW - padR + 4} y={humanY + 4} fill="#ef4444" fontSize="10" fontFamily="var(--font-mono)">
                Human $75
              </text>

              {/* Connecting line */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />

              {/* Data points */}
              {points.map((p, i) => (
                <g key={i}>
                  <motion.circle
                    cx={p.x} cy={p.y} r="4"
                    fill="#3b82f6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                  />
                  <text
                    x={p.x}
                    y={p.y - 10}
                    textAnchor="middle"
                    fill="#3b82f6"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                  >
                    {p.model}
                  </text>
                  {/* X-axis label */}
                  <text
                    x={p.x}
                    y={svgH - padB + 16}
                    textAnchor="middle"
                    fill="#888"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    transform={`rotate(-30, ${p.x}, ${svgH - padB + 16})`}
                  >
                    {p.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Card>
      </Section>

      {/* Cost comparison table */}
      <Section title="Cost History">
        <Card className="overflow-x-auto">
          <div className="min-w-[400px]">
            {/* Header */}
            <div className="grid grid-cols-4 gap-2 pb-2 border-b border-border text-text-dim text-xs uppercase tracking-wider">
              <span>Date</span>
              <span>Model</span>
              <span>Cost/hr</span>
              <span>vs Human</span>
            </div>
            {/* Rows */}
            {data.history.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="grid grid-cols-4 gap-2 py-2 border-b border-border text-sm"
              >
                <span className="text-text-dim font-mono text-xs">{h.date}</span>
                <span className="text-text font-mono text-xs">{h.model}</span>
                <span className="font-mono text-xs" style={{ color: '#3b82f6' }}>${h.cost.toFixed(2)}</span>
                <span className="text-text-dim font-mono text-xs">{h.pctCheaper}% cheaper</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Calculator */}
      <Section title="Cost Calculator">
        <Card>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-text-dim text-xs uppercase tracking-wider block mb-2">
                Hours of Work
              </label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Math.max(0, Number(e.target.value)))}
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text font-mono text-sm focus:outline-none focus:border-sapphire"
              />
            </div>
            <div>
              <label className="text-text-dim text-xs uppercase tracking-wider block mb-2">
                Human Rate ($/hr)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text font-mono text-sm focus:outline-none focus:border-sapphire"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-text-dim text-xs uppercase tracking-wider mb-1">Human Cost</div>
              <div className="text-text font-mono text-xl font-bold">${humanCost.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-text-dim text-xs uppercase tracking-wider mb-1">AI Cost</div>
              <div className="font-mono text-xl font-bold" style={{ color: '#3b82f6' }}>
                ${aiCost.toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-text-dim text-xs uppercase tracking-wider mb-1">You Save</div>
              <div className="text-emerald font-mono text-xl font-bold">${savings.toFixed(2)}</div>
              <div className="text-text-muted text-xs mt-0.5">{savingsPct}%</div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Projection */}
      <Section title="Projection">
        <Card>
          <div className="text-center">
            <div className="font-mono text-3xl font-bold" style={{ color: '#3b82f6' }}>
              ${data.projectionCost}
            </div>
            <div className="text-text-dim text-sm mt-2 uppercase tracking-wider">
              per cognitive hour by {data.projectionDate}
            </div>
          </div>
        </Card>
      </Section>

      <Footnote>
        Provider pricing pages, LMSYS quality benchmarks as weights, tokens-per-task from published research.
      </Footnote>

      <FlavorText>
        What used to require a consultant now requires a prompt. The consultant costs more.
      </FlavorText>

      <Footer />
    </div>
  )
}
