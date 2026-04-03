import type { TriageLevel } from '../../types/patient'
import { TRIAGE_CONFIG } from '../../types/triage'

interface TriageBadgeProps {
  level: TriageLevel
  lang?: 'EN' | 'TH'
  size?: 'sm' | 'md'
}

export function TriageBadge({ level, lang = 'EN', size = 'md' }: TriageBadgeProps) {
  const config = TRIAGE_CONFIG[level]
  const label = lang === 'TH' ? config.labelTH : config.label
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  return (
    <span
      className={`inline-flex items-center rounded-full font-body font-medium ${sizeClass}`}
      style={{ color: config.color, backgroundColor: config.bgColor, border: `1px solid ${config.borderColor}` }}
    >
      <span
        className="mr-1.5 h-2 w-2 rounded-full inline-block"
        style={{ backgroundColor: config.color }}
      />
      {label}
    </span>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger'
}

const badgeVariants = {
  default: 'bg-surface-input text-text-secondary',
  info: 'bg-primary-light text-primary',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full text-xs font-medium px-2.5 py-1 ${badgeVariants[variant]}`}>
      {children}
    </span>
  )
}
