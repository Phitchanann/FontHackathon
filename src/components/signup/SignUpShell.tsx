import type { ReactNode } from 'react'
import SignUpSidebar from './SignUpSidebar'

interface SignUpShellProps {
  currentStep: number
  lang: 'EN' | 'TH'
  onLangChange: (lang: 'EN' | 'TH') => void
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  footer: ReactNode
  contentWidthClassName?: string
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

export default function SignUpShell({
  currentStep,
  lang,
  onLangChange,
  title,
  subtitle,
  children,
  footer,
  contentWidthClassName = 'max-w-[980px]',
}: SignUpShellProps) {
  return (
    <div className="min-h-screen bg-[#eef2f7] px-4 py-4 sm:px-5">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1380px] flex-col overflow-hidden rounded-[30px] border border-[#dfe6ef] bg-[#fbfcfe] shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <header className="flex items-center justify-between border-b border-[#edf2f7] bg-white px-6 py-5 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="font-heading text-xl font-black tracking-tight text-primary">Clinical Clarity</span>
          </div>

          <div className="flex items-center gap-2 text-text-secondary">
            <div className="flex items-center rounded-full bg-[#f3f6fa] p-1">
              {(['EN', 'TH'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => onLangChange(option)}
                  className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-body transition-colors ${
                    lang === option ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'
                  }`}
                >
                  {option === 'EN' && <GlobeIcon />}
                  <span>{option}</span>
                </button>
              ))}
            </div>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f6fa] transition-colors hover:bg-[#e8eef7]">
              <InfoIcon />
            </button>
          </div>
        </header>

        <div className="grid flex-1 overflow-hidden lg:grid-cols-[250px,minmax(0,1fr)]">
          <div className="border-b border-[#edf2f7] bg-[#f6f8fb] p-5 lg:border-b-0 lg:border-r">
            <SignUpSidebar currentStep={currentStep} lang={lang} />
          </div>

          <div className="flex min-h-0 flex-col">
            <main className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
              <div className={`mx-auto w-full ${contentWidthClassName}`}>
                <div className="mb-8">
                  <h1 className="text-4xl font-heading font-black leading-tight text-text-primary sm:text-5xl">
                    {title}
                  </h1>
                  {subtitle && (
                    <div className="mt-3 max-w-3xl text-sm font-body leading-6 text-text-secondary sm:text-base">
                      {subtitle}
                    </div>
                  )}
                </div>
                {children}
              </div>
            </main>

            <footer className="border-t border-[#edf2f7] bg-white/90 px-5 py-4 backdrop-blur sm:px-8 lg:px-10">
              <div className={`mx-auto w-full ${contentWidthClassName}`}>{footer}</div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
