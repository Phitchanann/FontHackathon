import { Button } from '../ui/Button'

interface KioskFooterProps {
  step: number
  totalSteps: number
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  backLabel?: string
  canContinue?: boolean
}

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export function KioskFooter({
  step,
  totalSteps,
  onBack,
  onNext,
  nextLabel = 'Continue',
  backLabel = 'Back',
  canContinue = true,
}: KioskFooterProps) {
  // Dot indicators
  const dots = Array.from({ length: totalSteps }).map((_, i) => {
    if (i + 1 === step) return 'active'
    if (i + 1 < step) return 'done'
    return 'pending'
  })

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white h-28 flex items-center justify-between px-8 shadow-bar">
      {onBack ? (
        <Button variant="secondary" icon={<ArrowLeft />} onClick={onBack}>
          {backLabel}
        </Button>
      ) : (
        <div />
      )}

      {/* Dot progress */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5">
          {dots.map((state, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                state === 'active'
                  ? 'bg-primary-dark w-8 h-3'
                  : state === 'done'
                  ? 'bg-primary-dark h-3 w-3'
                  : 'bg-surface-input h-3 w-3'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-body text-text-secondary">
          Step {step} of {totalSteps}
        </span>
      </div>

      <Button
        variant="primary"
        icon={<ArrowRight />}
        iconPosition="right"
        onClick={onNext}
        disabled={!canContinue}
        className={!canContinue ? 'opacity-50 cursor-not-allowed' : ''}
      >
        {nextLabel}
      </Button>
    </footer>
  )
}
