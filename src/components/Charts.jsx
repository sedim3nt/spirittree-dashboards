import { motion } from 'framer-motion'

export function HBar({ label, value, max = 100, color = '#00ff88', suffix = '%', sub }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-text font-medium">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>{value}{suffix}</span>
      </div>
      <div className="h-2.5 bg-bg rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}66, ${color})` }}
        />
      </div>
      {sub && <div className="text-text-muted text-xs mt-1">{sub}</div>}
    </div>
  )
}

export function MiniGauge({ label, value, max = 100, color = '#00ff88' }) {
  const pct = (value / max) * 100
  const r = 28
  const circ = Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <div className="flex flex-col items-center p-3">
      <svg width="68" height="42" viewBox="0 0 68 42">
        <path d="M 4 38 A 28 28 0 0 1 64 38" fill="none" stroke="#1e1e2e" strokeWidth="5" strokeLinecap="round" />
        <motion.path
          d="M 4 38 A 28 28 0 0 1 64 38"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="font-mono text-sm font-bold mt-1" style={{ color }}>{value}</div>
      <div className="text-text-muted text-xs text-center mt-0.5 leading-tight">{label}</div>
    </div>
  )
}

export function SemiGauge({ value, max = 100, color = '#ef4444', label, size = 200 }) {
  const pct = (value / max) * 100
  const r = size * 0.4
  const cx = size / 2
  const cy = size * 0.48
  const circ = Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.55} viewBox={`0 0 ${size} ${size * 0.55}`}>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="#1e1e2e" strokeWidth="12" strokeLinecap="round"
        />
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <text x={cx} y={cy - 10} textAnchor="middle" fill={color} fontSize="36" fontFamily="var(--font-mono)" fontWeight="bold">
          {value}
        </text>
      </svg>
      {label && <div className="text-sm font-bold uppercase tracking-wider mt-1" style={{ color }}>{label}</div>}
    </div>
  )
}

export function LineChart({ points, color = '#00ff88', height = 120, labels }) {
  if (!points.length) return null
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = 100
  const h = height
  const pad = 10

  const coords = points.map((v, i) => ({
    x: pad + (i / (points.length - 1)) * (w - pad * 2),
    y: pad + (1 - (v - min) / range) * (h - pad * 2)
  }))

  const pathD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
  const areaD = pathD + ` L ${coords[coords.length - 1].x} ${h - pad} L ${coords[0].x} ${h - pad} Z`

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
        <defs>
          <linearGradient id={`lg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={areaD} fill={`url(#lg-${color.replace('#', '')})`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
        <motion.path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="1.5" fill={color} />
        ))}
      </svg>
      {labels && (
        <div className="flex justify-between text-text-muted text-xs px-2 -mt-1">
          {labels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      )}
    </div>
  )
}

export function BarChartVertical({ items, color = '#00ff88', height = 160 }) {
  const max = Math.max(...items.map(i => i.value))
  return (
    <div className="flex items-end justify-between gap-1" style={{ height }}>
      {items.map((item, i) => {
        const pct = (item.value / max) * 100
        return (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="font-mono text-xs mb-1" style={{ color }}>{item.value}</div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${pct}%` }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="w-full max-w-8 rounded-t"
              style={{ background: `linear-gradient(to top, ${color}44, ${color})` }}
            />
            <div className="text-text-muted text-xs mt-1 text-center leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {item.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
