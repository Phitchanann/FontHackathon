import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface SidebarStep {
  id: number
  label: string
  labelTH: string
  icon: ReactNode
}

interface SignUpSidebarProps {
  currentStep: number
  lang: 'EN' | 'TH'
}

const steps: SidebarStep[] = [
  {
    id: 1,
    label: 'Demographics',
    labelTH: 'ข้อมูลส่วนตัว',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'Contact',
    labelTH: 'ติดต่อ',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.8 19.8 0 0 1 1.61 5 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11l-.98.98a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.82.7a2 2 0 0 1 1.73 1.99z" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'Emergency',
    labelTH: 'ฉุกเฉิน',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h8l-1 8 11-12h-8l1-8z" />
      </svg>
    ),
  },
  {
    id: 4,
    label: 'Insurance',
    labelTH: 'ประกัน',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 5,
    label: 'Clinical Alerts',
    labelTH: 'Clinical Alerts',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
]

export default function SignUpSidebar({ currentStep, lang }: SignUpSidebarProps) {
  return (
    <aside className="flex h-full min-h-[420px] flex-col">
      <div className="signup-shell-card bg-[#f9fbfe] p-5">
        <p className="text-xs font-body font-semibold text-primary">Registration Progress</p>
        <p className="mt-1 text-xs font-body text-text-muted">
          {lang === 'EN' ? `Step ${currentStep} of 5` : `ขั้นตอนที่ ${currentStep} จาก 5`}
        </p>
        <div className="mt-3 h-1.5 rounded-full bg-[#dde5f0]">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      <nav className="mt-5 flex flex-col gap-2">
        {steps.map((step) => {
          const isActive = step.id === currentStep
          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-body transition-colors ${
                isActive ? 'bg-white text-primary shadow-sm' : 'text-text-primary/75'
              }`}
            >
              <span className={`${isActive ? 'text-primary' : 'text-text-muted'}`}>{step.icon}</span>
              <span className={isActive ? 'font-semibold' : ''}>
                {lang === 'EN' ? step.label : step.labelTH}
              </span>
            </div>
          )
        })}
      </nav>

      <div className="mt-auto pt-6">
        <Link to="/" className="btn-danger-outline w-full">
          {lang === 'EN' ? 'Cancel Check-in' : 'ยกเลิกการเช็คอิน'}
        </Link>
      </div>
    </aside>
  )
}
