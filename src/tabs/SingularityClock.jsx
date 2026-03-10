import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, Section, Footnote, Footer, FlavorText } from '../components/Card'
import { HBar } from '../components/Charts'
import data from '../data/singularity.json'

function ClockFace() {
  const cx = 120
  const cy = 120
  const r = 100

  // 12 hour markers
  const markers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180)
    const x1 = cx + (r - 8) * Math.cos(angle)
    const y1 = cy + (r - 8) * Math.sin(angle)
    const x2 = cx + (r - 16) * Math.cos(angle)
    const y2 = cy + (r - 16) * Math.sin(angle)
    return { x1, y1, x2, y2 }
  })

  // Hour hand: 354 degrees from 12 o'clock (0 = 12 o'clock, clockwise)
  const hourAngle = data.clockPosition
  const hourRad = (hourAngle - 90) * (Math.PI / 180)
  const hourLen = 55
  const hourX = cx + hourLen * Math.cos(hourRad)
  const hourY = cy + hourLen * Math.sin(hourRad)

  // Minute hand: 54 minutes = 324 degrees from 12
  const minuteAngle = (54 / 60) * 360
  const minuteRad = (minuteAngle - 90) * (Math.PI / 180)
  const minuteLen = 75
  const minuteX = cx + minuteLen * Math.cos(minuteRad)
  const minuteY = cy + minuteLen * Math.sin(minuteRad)

  // Midnight (12 o'clock) position for glow
  const midnightRad = -90 * (Math.PI / 180)
  const glowX = cx + r * Math.cos(midnightRad)
  const glowY = cy + r * Math.sin(midnightRad)

  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="flex flex-col items-center"
      >
        <svg width="240" height="240" viewBox="0 0 240 240">
          <defs>
            <radialGradient id="midnight-glow" cx={glowX / 240} cy={glowY / 240} r="0.15">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ffd700" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
            </radialGradient>
            <filter id="hand-glow">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glow at midnight */}
          <circle cx={glowX} cy={glowY} r="36" fill="url(#midnight-glow)" />

          {/* Clock face border */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffd700" strokeWidth="2" opacity="0.6" />
          <circle cx={cx} cy={cy} r={r - 2} fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.2" />

          {/* Hour markers */}
          {markers.map((m, i) => (
            <line
              key={i}
              x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2}
              stroke={i === 0 ? '#ffd700' : '#e2e8f0'}
              strokeWidth={i === 0 ? 2.5 : 1.5}
              opacity={i === 0 ? 1 : 0.5}
              strokeLinecap="round"
            />
          ))}

          {/* Hour hand */}
          <motion.line
            x1={cx} y1={cy} x2={hourX} y2={hourY}
            stroke="#e2e8f0"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#hand-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Minute hand */}
          <motion.line
            x1={cx} y1={cy} x2={minuteX} y2={minuteY}
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#hand-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* Center dot */}
          <circle cx={cx} cy={cy} r="3" fill="#ffd700" />
        </svg>

        <div className="mt-4">
          <div className="font-mono text-4xl md:text-5xl font-bold" style={{ color: '#ffd700' }}>
            11:54 PM
          </div>
          <div className="text-text-dim text-sm mt-2 uppercase tracking-widest">
            6 minutes to midnight
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function SingularityClock() {
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % data.quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* Hero: Analog clock face */}
      <ClockFace />

      <FlavorText>
        We don't know what midnight looks like. But we can measure the approach.
      </FlavorText>

      {/* Section 2: Component factors */}
      <Section title="Component Factors">
        {data.factors.map((f) => (
          <HBar
            key={f.name}
            label={f.name}
            value={f.value}
            max={100}
            color="#ffd700"
            sub={f.description}
          />
        ))}
      </Section>

      {/* Section 3: Historical clock positions */}
      <Section title="Historical Clock Positions">
        <Card>
          <div className="overflow-x-auto">
            <div className="flex items-center justify-between min-w-[500px] py-4 px-2 relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-4 right-4 h-px" style={{ background: 'linear-gradient(90deg, #ffd70033, #ffd700, #ffd70033)' }} />

              {data.historicalPositions.map((pos, i) => (
                <div key={pos.year} className="flex flex-col items-center relative z-10">
                  <div className="text-text-muted text-xs mb-2">{pos.label}</div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    className="w-3 h-3 rounded-full border-2"
                    style={{
                      borderColor: '#ffd700',
                      background: i === data.historicalPositions.length - 1 ? '#ffd700' : 'transparent',
                    }}
                  />
                  <div className="font-mono text-xs mt-2 font-bold" style={{ color: '#ffd700' }}>
                    {pos.year}
                  </div>
                  <div className="text-text-muted text-xs">{pos.minutes}m to go</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      {/* Section 4: Expert quotes carousel */}
      <Section title="Expert Perspectives">
        <Card>
          <div className="min-h-[120px] flex flex-col justify-center">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center px-4"
            >
              <p className="text-text italic text-base leading-relaxed">
                "{data.quotes[quoteIndex].text}"
              </p>
              <p className="text-text-muted text-sm mt-3">
                — {data.quotes[quoteIndex].author}
              </p>
            </motion.div>
          </div>
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => setQuoteIndex((i) => (i - 1 + data.quotes.length) % data.quotes.length)}
              className="text-text-muted hover:text-text text-sm px-3 py-1 border border-border rounded-lg transition-colors"
            >
              Prev
            </button>
            <div className="flex items-center gap-1.5">
              {data.quotes.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-colors"
                  style={{ background: i === quoteIndex ? '#ffd700' : '#333' }}
                />
              ))}
            </div>
            <button
              onClick={() => setQuoteIndex((i) => (i + 1) % data.quotes.length)}
              className="text-text-muted hover:text-text text-sm px-3 py-1 border border-border rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        </Card>
      </Section>

      {/* Section 5: What happens at midnight? */}
      <Section title="What Happens at Midnight?">
        <Card>
          <p className="text-text text-sm leading-relaxed">
            Midnight represents the theoretical point where artificial intelligence matches or exceeds
            human-level general intelligence across all domains. Not a single benchmark — all of them.
            The clock measures our collective approach to that threshold based on current trajectories,
            capabilities, and expert consensus.
          </p>
        </Card>
      </Section>

      <Footnote>
        GPQA benchmarks, SWE-Bench, expert surveys (AI Impacts, Metaculus), research papers on self-improvement.
      </Footnote>

      <FlavorText>
        The Bulletin of the Atomic Scientists has their clock. This is ours. Same gravity. Different bomb.
      </FlavorText>

      <Footer />
    </div>
  )
}
