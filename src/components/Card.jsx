import { motion } from 'framer-motion'

export function Card({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-bg-card border border-border rounded-xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function StatCard({ label, value, sub, color = 'text' }) {
  return (
    <Card>
      <div className="text-text-dim text-xs uppercase tracking-wider mb-2">{label}</div>
      <div className={`text-${color} font-mono text-2xl font-bold`}>{value}</div>
      {sub && <div className="text-text-muted text-xs mt-1">{sub}</div>}
    </Card>
  )
}

export function Section({ title, children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`mt-8 ${className}`}
    >
      {title && <h3 className="text-text-dim text-xs uppercase tracking-widest mb-4">{title}</h3>}
      {children}
    </motion.section>
  )
}

export function Footnote({ children }) {
  return (
    <div className="mt-8 pt-4 border-t border-border text-text-muted text-xs leading-relaxed">
      <span className="uppercase tracking-wider text-text-dim">Methodology: </span>
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <div className="mt-12 pt-6 border-t border-border text-center text-text-muted text-xs">
      The fruiting body is not the organism. 🦋 · Built by SpiritTree
    </div>
  )
}

export function FlavorText({ children }) {
  return (
    <p className="text-text-dim text-sm italic mt-3 leading-relaxed">{children}</p>
  )
}

export function Hero({ value, label, color = 'emerald', sub }) {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className={`text-${color} font-mono text-5xl md:text-7xl font-bold`}
      >
        {value}
      </motion.div>
      {label && (
        <div className={`text-${color} text-sm uppercase tracking-widest mt-3 font-bold`}>
          {label}
        </div>
      )}
      {sub && <FlavorText>{sub}</FlavorText>}
    </div>
  )
}
