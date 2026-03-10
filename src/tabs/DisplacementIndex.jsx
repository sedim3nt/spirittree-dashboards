import { motion } from 'framer-motion'
import { Card, Section, Footnote, Footer, FlavorText } from '../components/Card'
import { SemiGauge, MiniGauge, HBar, LineChart } from '../components/Charts'
import data from '../data/displacement-index.json'

export default function DisplacementIndex() {
  const labels90d = ['90d ago', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Today']

  return (
    <div>
      {/* Hero: SemiGauge */}
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          <SemiGauge
            value={data.score}
            max={100}
            color="#ef4444"
            label={data.label}
            size={260}
          />
        </motion.div>
      </div>

      <FlavorText>
        The signals are structural. The question isn't if — it's which jobs, and when.
      </FlavorText>

      {/* Section 2: Signal gauges */}
      <Section title="Component Signals">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.signals.map((s) => (
            <Card key={s.name} className="!p-3">
              <MiniGauge
                label={s.name}
                value={s.value}
                max={100}
                color="#ef4444"
              />
            </Card>
          ))}
        </div>
      </Section>

      {/* Section 3: Sector breakdown */}
      <Section title="Sector Displacement Scores">
        {data.sectors.map((s) => (
          <HBar
            key={s.name}
            label={s.name}
            value={s.score}
            max={100}
            color="#ef4444"
          />
        ))}
      </Section>

      {/* Section 4: 90-day trend */}
      <Section title="90-Day Trend">
        <Card>
          <LineChart
            points={data.history90d}
            color="#ef4444"
            height={140}
            labels={labels90d}
          />
        </Card>
      </Section>

      <Footnote>
        BLS employment data, Indeed Hiring Lab, LMSYS Arena, corporate earnings transcripts.
      </Footnote>

      <FlavorText>
        This isn't a prediction. It's a measurement. The index reads what's already happening.
      </FlavorText>

      <Footer />
    </div>
  )
}
