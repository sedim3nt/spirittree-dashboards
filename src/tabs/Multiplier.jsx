import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, StatCard, Section, Footnote, Footer, FlavorText, Hero } from '../components/Card'
import data from '../data/multiplier-rates.json'

export default function Multiplier() {
  const [teamSize, setTeamSize] = useState(10)
  const [roleIndex, setRoleIndex] = useState(0)
  const [hoursOnTasks, setHoursOnTasks] = useState(20)

  const selectedRole = data.roles[roleIndex]

  const results = useMemo(() => {
    const avgMultiplier = data.tasks.reduce((sum, t) => sum + t.multiplier, 0) / data.tasks.length
    const hoursSaved = hoursOnTasks * (1 - 1 / avgMultiplier)
    const fteEquivalent = (hoursSaved * teamSize) / 40
    const annualSavings = hoursSaved * teamSize * selectedRole.avgCost * 52
    const roiWeeks = Math.round((teamSize * 30 * 12) / (hoursSaved * teamSize * selectedRole.avgCost)) || 3

    return {
      avgMultiplier: avgMultiplier.toFixed(1),
      hoursSaved: hoursSaved.toFixed(1),
      fteEquivalent: fteEquivalent.toFixed(1),
      annualSavings,
      roiWeeks: Math.max(roiWeeks, 1),
    }
  }, [teamSize, roleIndex, hoursOnTasks, selectedRole])

  return (
    <div>
      <Hero
        value="Productivity Multiplier"
        color="rose"
        sub="How much more productive would YOUR team be with AI?"
      />

      {/* Section 2: Interactive calculator */}
      <Section title="Configure Your Team">
        <Card>
          <div className="space-y-6">
            {/* Team size */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-dim">Team Size</span>
                <span className="text-rose font-mono font-bold">{teamSize}</span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>

            {/* Role */}
            <div>
              <div className="text-text-dim text-sm mb-2">Role</div>
              <select
                value={roleIndex}
                onChange={(e) => setRoleIndex(Number(e.target.value))}
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-rose-500"
              >
                {data.roles.map((role, i) => (
                  <option key={role.name} value={i}>
                    {role.name} (${role.avgCost}/hr)
                  </option>
                ))}
              </select>
            </div>

            {/* Hours on AI-automatable tasks */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-dim">Hours/week on AI-automatable tasks</span>
                <span className="text-rose font-mono font-bold">{hoursOnTasks}h</span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                value={hoursOnTasks}
                onChange={(e) => setHoursOnTasks(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>
          </div>
        </Card>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4"
        >
          <Card className="border-rose-500/30">
            <h4 className="text-rose text-xs uppercase tracking-widest mb-4 font-bold">Your Results</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-text-muted text-xs uppercase tracking-wider mb-1">Hours saved/week per person</div>
                <div className="text-rose font-mono text-2xl font-bold">{results.hoursSaved}h</div>
              </div>
              <div>
                <div className="text-text-muted text-xs uppercase tracking-wider mb-1">FTE equivalent for team</div>
                <div className="text-rose font-mono text-2xl font-bold">{results.fteEquivalent}</div>
              </div>
              <div>
                <div className="text-text-muted text-xs uppercase tracking-wider mb-1">Annual cost savings</div>
                <div className="text-rose font-mono text-2xl font-bold">
                  ${results.annualSavings >= 1000000
                    ? (results.annualSavings / 1000000).toFixed(1) + 'M'
                    : results.annualSavings >= 1000
                      ? Math.round(results.annualSavings / 1000) + 'K'
                      : Math.round(results.annualSavings)}
                </div>
              </div>
              <div>
                <div className="text-text-muted text-xs uppercase tracking-wider mb-1">ROI timeline</div>
                <div className="text-rose font-mono text-2xl font-bold">~{results.roiWeeks} weeks</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Section 3: Task multiplier reference table */}
      <Section title="Task Multiplier Reference">
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-text-dim text-xs uppercase tracking-wider py-2 pr-4">Task</th>
                  <th className="text-right text-text-dim text-xs uppercase tracking-wider py-2 px-4">Multiplier</th>
                  <th className="text-right text-text-dim text-xs uppercase tracking-wider py-2 pl-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {data.tasks.map((task) => (
                  <tr key={task.name} className="border-b border-border/50">
                    <td className="py-2.5 pr-4 text-text">{task.name}</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="text-rose font-mono font-bold">{task.multiplier}x</span>
                    </td>
                    <td className="py-2.5 pl-4 text-right text-text-muted text-xs">{task.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      {/* Section 4: Comparison visual */}
      <Section title="The Multiplier Effect">
        <Card>
          <div className="text-center py-4">
            <div className="text-text-dim text-sm mb-4">With AI, your team operates like...</div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div>
                <div className="text-rose font-mono text-5xl font-bold">{teamSize}</div>
                <div className="text-text-dim text-xs uppercase tracking-wider mt-1">with AI</div>
              </div>
              <div className="text-text-muted text-2xl">=</div>
              <div>
                <div className="text-rose font-mono text-5xl font-bold">
                  {Math.round(teamSize + parseFloat(results.fteEquivalent))}
                </div>
                <div className="text-text-dim text-xs uppercase tracking-wider mt-1">without AI</div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Footnote>
        GitHub Copilot research, McKinsey 2025, Intercom/Zendesk automation data, internal benchmarks.
      </Footnote>

      <FlavorText>
        You don't need more people. You need better infrastructure.
      </FlavorText>

      <Footer />
    </div>
  )
}
