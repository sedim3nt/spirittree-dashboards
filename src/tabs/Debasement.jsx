import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, StatCard, Section, Footnote, Footer, FlavorText, Hero } from '../components/Card'
import { HBar } from '../components/Charts'
import data from '../data/debasement.json'

function formatDebt(n) {
  return '$' + Math.floor(n).toLocaleString('en-US')
}

export default function Debasement() {
  const [debt, setDebt] = useState(data.nationalDebt)
  const [savings, setSavings] = useState(10000)

  useEffect(() => {
    const interval = setInterval(() => {
      setDebt((prev) => prev + data.debtGrowthPerSecond * 0.05)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const erosion = savings * 0.072

  return (
    <div>
      {/* Hero: Animated debt counter */}
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          <div
            className="font-mono text-4xl md:text-6xl font-bold"
            style={{ color: '#fbbf24' }}
          >
            {formatDebt(debt)}
          </div>
          <div className="text-text-dim text-sm uppercase tracking-widest mt-3 font-bold">
            US NATIONAL DEBT
          </div>
        </motion.div>
      </div>

      <FlavorText>
        Every dollar you hold is worth less than it was yesterday. That's not opinion. It's arithmetic.
      </FlavorText>

      {/* Section 2: Key stats */}
      <Section title="Debasement Metrics">
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="M2 Money Supply" value="$21.5T" color="gold" />
          <StatCard label="Purchasing Power of $1 (since 1971)" value="$0.14" color="gold" />
          <StatCard label="Real Interest Rate" value="-1.2%" color="gold" />
        </div>
      </Section>

      {/* Section 3: The Everything Code */}
      <Section title="The Everything Code">
        {data.correlations.map((c) => (
          <HBar
            key={c.asset}
            label={c.asset}
            value={c.r2}
            max={1.0}
            color="#fbbf24"
            suffix=""
          />
        ))}
      </Section>

      {/* Section 4: Savings erosion calculator */}
      <Section title="Savings Erosion Calculator">
        <Card>
          <div className="space-y-4">
            <div>
              <label className="text-text-dim text-xs uppercase tracking-wider block mb-2">
                Your Savings ($)
              </label>
              <input
                type="number"
                value={savings}
                onChange={(e) => setSavings(Number(e.target.value) || 0)}
                className="w-full bg-bg-card border border-border rounded-lg px-4 py-2 text-text font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="text-center pt-2">
              <div className="text-text-muted text-sm">
                Your{' '}
                <span className="font-mono font-bold" style={{ color: '#fbbf24' }}>
                  ${savings.toLocaleString('en-US')}
                </span>{' '}
                savings lost{' '}
                <span className="font-mono font-bold" style={{ color: '#b45309' }}>
                  ${Math.round(erosion).toLocaleString('en-US')}
                </span>{' '}
                real value this year
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Section 5: Global Liquidity */}
      <Section title="Global Liquidity">
        <Card>
          <HBar label="Fed" value={data.globalLiquidity.fed} max={8} color="#fbbf24" suffix="T" />
          <HBar label="ECB" value={data.globalLiquidity.ecb} max={8} color="#fbbf24" suffix="T" />
          <HBar label="BOJ" value={data.globalLiquidity.boj} max={8} color="#fbbf24" suffix="T" />
          <HBar label="PBOC" value={data.globalLiquidity.pboc} max={8} color="#fbbf24" suffix="T" />
          <div className="mt-4 pt-4 border-t border-border text-center">
            <span className="text-text-dim text-sm uppercase tracking-wider">Total: </span>
            <span className="font-mono font-bold text-lg" style={{ color: '#fbbf24' }}>
              {data.globalLiquidity.label}
            </span>
          </div>
        </Card>
      </Section>

      <Footnote>
        FRED (M2, CPI, Federal Funds Rate), Treasury Direct, CoinGecko, central bank balance sheets.
      </Footnote>

      <FlavorText>
        The money printer doesn't stop. Your purchasing power is the ink.
      </FlavorText>

      <Footer />
    </div>
  )
}
