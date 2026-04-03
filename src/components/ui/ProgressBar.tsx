interface ProgressBarProps {
  current: number
  total: number
  steps?: string[]
}

export function ProgressBar({ current, total, steps }: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-2 flex-1 max-w-lg px-12">
      {steps && (
        <div className="flex justify-between">
          {steps.map((step, i) => (
            <span
              key={step}
              className={`text-xs font-body tracking-widest uppercase ${
                i + 1 === current ? 'text-primary font-medium' : 'text-text-secondary'
              }`}
            >
              {step}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              i < current
                ? 'bg-gradient-to-r from-primary to-primary-dark'
                : 'bg-surface-input'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

interface SimpleProgressProps {
  current: number
  total: number
  size?: 'sm' | 'md'
}

export function SimpleProgress({ current, total, size = 'sm' }: SimpleProgressProps) {
  const h = size === 'sm' ? 'h-2' : 'h-2.5'
  return (
    <div className={`flex gap-1 ${h === 'h-2' ? 'w-64' : 'w-full'}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`${h} flex-1 rounded-full ${i < current ? 'bg-primary-dark' : 'bg-surface-input'}`}
        />
      ))}
    </div>
  )
}
