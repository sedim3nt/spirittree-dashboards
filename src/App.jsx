import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const tabs = [
  { id: 'thought-clock', name: 'Thought Clock', icon: '🧠', color: '#00ff88' },
  { id: 'displacement', name: 'Displacement', icon: '💎', color: '#ef4444' },
  { id: 'last-worker', name: 'Last Worker', icon: '⏳', color: '#f59e0b' },
  { id: 'sorns-law', name: "Sørn's Law", icon: '📉', color: '#3b82f6' },
  { id: 'ai-pulse', name: 'AI Pulse', icon: '💜', color: '#a855f7' },
  { id: 'arms-race', name: 'Arms Race', icon: '⚔️', color: '#eab308' },
  { id: 'debasement', name: 'Debasement', icon: '🪙', color: '#fbbf24' },
  { id: 'agent-economy', name: 'Agents', icon: '🤖', color: '#14b8a6' },
  { id: 'multiplier', name: 'Multiplier', icon: '🚀', color: '#f43f5e' },
  { id: 'singularity', name: 'Singularity', icon: '🕛', color: '#e2e8f0' },
]

const tabComponents = {
  'thought-clock': lazy(() => import('./tabs/ThoughtClock')),
  'displacement': lazy(() => import('./tabs/DisplacementIndex')),
  'last-worker': lazy(() => import('./tabs/LastWorker')),
  'sorns-law': lazy(() => import('./tabs/IntelligenceCost')),
  'ai-pulse': lazy(() => import('./tabs/FearGreed')),
  'arms-race': lazy(() => import('./tabs/ArmsRace')),
  'debasement': lazy(() => import('./tabs/Debasement')),
  'agent-economy': lazy(() => import('./tabs/AgentEconomy')),
  'multiplier': lazy(() => import('./tabs/Multiplier')),
  'singularity': lazy(() => import('./tabs/SingularityClock')),
}

function getHash() {
  return window.location.hash.replace('#', '') || 'thought-clock'
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getHash)

  useEffect(() => {
    const onHash = () => setActiveTab(getHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const handleTab = (id) => {
    window.location.hash = id
    setActiveTab(id)
  }

  const ActiveComponent = tabComponents[activeTab]
  const activeTabData = tabs.find(t => t.id === activeTab)

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-border bg-bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[860px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🦋</span>
            <h1 className="text-text text-sm font-bold tracking-tight">SpiritTree Dashboards</h1>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTab(tab.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all shrink-0"
                style={{
                  background: activeTab === tab.id ? `${tab.color}15` : 'transparent',
                  color: activeTab === tab.id ? tab.color : '#8888a0',
                  borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : '2px solid transparent',
                }}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[860px] mx-auto px-4 py-6">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-text-dim text-sm font-mono"
            >
              Loading...
            </motion.div>
          </div>
        }>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {ActiveComponent && <ActiveComponent />}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  )
}
