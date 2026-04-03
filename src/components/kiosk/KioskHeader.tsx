import { SimpleProgress } from '../ui/ProgressBar'

interface KioskHeaderProps {
  step: number
  totalSteps: number
  lang: 'EN' | 'TH'
  onLangChange: (lang: 'EN' | 'TH') => void
}

export function KioskHeader({ step, totalSteps, lang, onLangChange }: KioskHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface h-20 flex items-center justify-between px-8 shadow-header">
      <div className="flex items-center gap-8">
        <span className="font-heading font-bold text-2xl text-primary-dark tracking-tight">
          Clinical Clarity
        </span>
        <SimpleProgress current={step} total={totalSteps} />
      </div>
      <div className="flex items-center gap-6">
        {/* Language switcher */}
        <div className="bg-surface-input p-1 rounded-chip flex">
          {(['EN', 'TH'] as const).map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              className={`px-4 py-2 rounded-chip text-sm font-body transition-colors ${
                lang === l
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-text-secondary opacity-70'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        {/* Notification + profile icons */}
        <div className="flex gap-2">
          <button className="h-12 w-12 flex items-center justify-center rounded-chip hover:bg-surface-input transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button className="h-12 w-12 flex items-center justify-center rounded-chip hover:bg-surface-input transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
