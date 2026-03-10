import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, Section, Footnote, Footer, FlavorText, Hero } from '../components/Card'
import { HBar } from '../components/Charts'
import data from '../data/professions.json'

function parseDateSort(dateStr) {
  if (dateStr === 'Already') return 2020
  const match = dateStr.match(/(\d{4})/)
  return match ? parseInt(match[1], 10) : 2099
}

export default function LastWorker() {
  const [sortMode, setSortMode] = useState('soonest')
  const [search, setSearch] = useState('')

  const sortedProfessions = useMemo(() => {
    const items = [...data.professions]
    switch (sortMode) {
      case 'soonest':
        items.sort((a, b) => parseDateSort(a.date) - parseDateSort(b.date))
        break
      case 'furthest':
        items.sort((a, b) => parseDateSort(b.date) - parseDateSort(a.date))
        break
      case 'automated':
        items.sort((a, b) => b.current - a.current)
        break
      default:
        break
    }
    return items
  }, [sortMode])

  const filtered = useMemo(() => {
    if (!search.trim()) return sortedProfessions
    const q = search.toLowerCase()
    return sortedProfessions.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q)
    )
  }, [sortedProfessions, search])

  const sortButtons = [
    { key: 'soonest', label: 'Soonest' },
    { key: 'furthest', label: 'Furthest' },
    { key: 'automated', label: 'Most Automated' },
  ]

  return (
    <div>
      {/* Hero */}
      <Hero
        value={data.medianDate}
        label="MEDIAN 50% AUTOMATION"
        color="amber"
        sub="Not when AI replaces the job. When AI does most of it."
      />

      {/* Section 2: Sort controls */}
      <Section title="Sort By">
        <div className="flex gap-2 flex-wrap">
          {sortButtons.map((b) => (
            <button
              key={b.key}
              onClick={() => setSortMode(b.key)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                sortMode === b.key
                  ? 'bg-amber text-bg border border-amber'
                  : 'bg-bg-card border border-border text-text-dim hover:border-amber/50'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Section 3: Profession table */}
      <Section title="Professions">
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search professions or sectors..."
            className="w-full bg-bg-card border border-border rounded-lg px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber/50 transition-colors"
          />
        </div>

        <div className="space-y-1">
          {filtered.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="bg-bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-primary">{p.name}</span>
                  <span className="text-xs text-text-muted px-1.5 py-0.5 bg-bg rounded border border-border">
                    {p.sector}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-amber">{p.date}</span>
                  <span className="text-xs" title={p.trend === 'up' ? 'Accelerating' : 'Stable'}>
                    {p.trend === 'up' ? '↑' : '→'}
                  </span>
                </div>
              </div>
              <HBar
                label=""
                value={p.current}
                max={100}
                color="#f59e0b"
                suffix="%"
              />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-text-muted text-sm py-8">
            No professions match "{search}"
          </div>
        )}
      </Section>

      {/* Section 4: Sector heatmap */}
      <Section title="Sector Heatmap">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {data.sectorHeat.map((s) => (
            <motion.div
              key={s.sector}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-lg p-4 text-center border border-border"
              style={{
                backgroundColor: `rgba(245, 158, 11, ${s.score / 100})`,
              }}
            >
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{
                  color: s.score > 50 ? '#0a0a0f' : '#f59e0b',
                }}
              >
                {s.sector}
              </div>
              <div
                className="font-mono text-lg font-bold mt-1"
                style={{
                  color: s.score > 50 ? '#0a0a0f' : '#f59e0b',
                }}
              >
                {s.score}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Footnote>
        O*NET task database (BLS), AI benchmark scores by domain, McKinsey automation estimates calibrated against actual model performance.
      </Footnote>

      <FlavorText>
        The plumber sleeps soundly. The paralegal does not.
      </FlavorText>

      <Footer />
    </div>
  )
}
