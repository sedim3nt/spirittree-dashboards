import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, StatCard, Section, Footnote, Footer, FlavorText, Hero } from '../components/Card'
import { HBar, BarChartVertical } from '../components/Charts'
import data from '../data/thought-clock.json'

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const millis = Math.floor(ms % 1000)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`
}

export default function ThoughtClock() {
  const [elapsed, setElapsed] = useState(0)
  const [stopped, setStopped] = useState(false)
  const [flash, setFlash] = useState(false)
  const startRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    startRef.current = performance.now()

    const tick = (now) => {
      const ms = now - startRef.current
      if (ms >= 3700) {
        setElapsed(3700)
        setStopped(true)
        setFlash(true)
        setTimeout(() => setFlash(false), 400)
        return
      }
      setElapsed(ms)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const clockColor = flash ? '#ef4444' : '#00ff88'

  return (
    <div>
      {/* Hero: Giant millisecond clock */}
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="font-mono text-5xl md:text-7xl font-bold transition-colors duration-100"
          style={{ color: clockColor }}
        >
          {formatTime(elapsed)}
        </motion.div>
        {stopped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-emerald text-sm uppercase tracking-widest mt-3 font-bold"
          >
            DONE
          </motion.div>
        )}
      </div>

      <FlavorText>GPT-5.4 just processed everything your brain will think today.</FlavorText>

      {/* Section 2: Stats 2x2 */}
      <Section title="By the Numbers">
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Thoughts / Day" value="6,200" color="emerald" />
          <StatCard label="Token Equivalent" value="1.55M" color="emerald" />
          <StatCard label="Human Time" value="5.5 hrs" color="emerald" />
          <StatCard label="AI Time (GPT-5.4)" value="3.7 sec" color="emerald" />
        </div>
      </Section>

      {/* Section 3: Model comparison */}
      <Section title="Model Race (seconds to process a day's thoughts)">
        {data.models.map((m) => (
          <HBar
            key={m.name}
            label={m.name}
            value={m.seconds}
            max={25}
            color="#00ff88"
            suffix="s"
          />
        ))}
        <div className="mt-4 pt-4 border-t border-border">
          <HBar
            label="Human Brain"
            value={19800}
            max={19800}
            color="#666"
            suffix=""
            sub="5.5 hours (19,800 seconds)"
          />
        </div>
      </Section>

      {/* Section 4: Historical chart */}
      <Section title="Time to Process a Day's Thoughts (seconds, best model)">
        <BarChartVertical
          items={data.historical.map((h) => ({
            label: h.date,
            value: h.seconds,
          }))}
          color="#00ff88"
          height={180}
        />
      </Section>

      {/* Section 5: Projection */}
      <Section title="Projection">
        <Card>
          <div className="text-center">
            <div className="text-emerald font-mono text-3xl font-bold">{'< 1 second'}</div>
            <div className="text-text-dim text-sm mt-2 uppercase tracking-wider">
              by {data.projectionDate}
            </div>
            <div className="text-text-muted text-xs mt-1">
              Projected: {data.projectionSeconds}s at current improvement rate
            </div>
          </div>
        </Card>
      </Section>

      <Footnote>
        Tseng &amp; Poppenk 2020 (6,200 thoughts/day), inner speech ~250ms/thought, Artificial Analysis benchmarks for model throughput.
      </Footnote>

      <FlavorText>
        Your brain runs 24 hours to do what silicon handles before your coffee cools.
      </FlavorText>

      <Footer />
    </div>
  )
}
