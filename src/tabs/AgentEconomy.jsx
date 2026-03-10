import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, StatCard, Section, Footnote, Footer, FlavorText, Hero } from '../components/Card'
import { HBar } from '../components/Charts'
import data from '../data/agent-economy.json'

export default function AgentEconomy() {
  const [agentCount, setAgentCount] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    startRef.current = performance.now()
    const target = data.activeAgents
    const duration = 2000

    const tick = (now) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAgentCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div>
      {/* Hero: Animated agent counter */}
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          <div
            className="font-mono text-4xl md:text-6xl font-bold"
            style={{ color: '#14b8a6' }}
          >
            {agentCount.toLocaleString('en-US')}
          </div>
          <div className="text-text-dim text-sm uppercase tracking-widest mt-3 font-bold">
            ACTIVE AI AGENTS WORLDWIDE
          </div>
        </motion.div>
      </div>

      <FlavorText>
        Nobody is measuring the agent economy. Until now.
      </FlavorText>

      {/* Section 2: Key stats 2x2 */}
      <Section title="Agent Metrics">
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Agent-generated code" value="38%" color="teal" />
          <StatCard label="Agent content" value="22%" color="teal" />
          <StatCard label="Cost per agent-hour" value="$0.42" color="teal" />
          <StatCard label="Human-to-agent ratio" value="14:1" color="teal" />
        </div>
      </Section>

      {/* Section 3: Agent activity by sector */}
      <Section title="Agent Activity by Sector">
        {data.sectors.map((s) => (
          <HBar
            key={s.name}
            label={s.name}
            value={s.pct}
            max={50}
            color="#14b8a6"
            suffix="%"
          />
        ))}
      </Section>

      {/* Section 4: Agent GDP */}
      <Section title="Agent GDP">
        <Card>
          <div className="text-center">
            <div
              className="font-mono text-4xl md:text-5xl font-bold"
              style={{ color: '#14b8a6' }}
            >
              {data.agentGDP}
            </div>
            <div className="text-text-dim text-sm mt-2 uppercase tracking-wider">
              Estimated annual economic output by AI agents
            </div>
          </div>
        </Card>
      </Section>

      {/* Section 5: Autonomy spectrum */}
      <Section title="Autonomy Spectrum">
        {data.autonomySpectrum.map((a) => (
          <HBar
            key={a.level}
            label={a.level}
            value={a.pct}
            max={60}
            color="#14b8a6"
            suffix="%"
          />
        ))}
      </Section>

      <Footnote>
        GitHub Copilot stats, API usage estimates from quarterly earnings, Base/ETH agent wallet analysis.
      </Footnote>

      <FlavorText>
        Somewhere right now, an agent is doing a job that was listed on LinkedIn last month.
      </FlavorText>

      <Footer />
    </div>
  )
}
