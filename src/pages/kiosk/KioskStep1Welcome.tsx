import type { Language } from '../../types/patient'

interface KioskStep1Props {
  lang: Language
  onStart: () => void
  onExisting?: () => void
}

export default function KioskStep1Welcome({ lang, onStart, onExisting }: KioskStep1Props) {
  return (
    <div className="min-h-screen bg-[#f0f4ff] flex flex-col">
      {/* Top bar */}
      <header className="bg-white px-8 py-4 flex items-center justify-between shadow-header">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="font-heading font-bold text-lg text-primary-dark tracking-tight">Clinical Clarity</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Language */}
          <div className="flex gap-1 bg-surface-input rounded-chip px-1 py-1">
            {(['EN', 'TH'] as const).map((l) => (
              <button key={l} className={`px-3 py-1 rounded-chip text-sm font-body ${lang === l ? 'bg-white text-primary shadow-sm' : 'text-text-muted'}`}>
                {l}
              </button>
            ))}
          </div>
          {/* Bell */}
          <button className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-surface-input">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#424752" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          {/* Settings */}
          <button className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-surface-input">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#424752" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <h1 className="text-5xl font-heading font-black text-text-primary text-center mb-3">
          Welcome to <span className="text-primary">Clinical Clarity</span>
        </h1>
        <p className="text-lg font-body text-text-secondary text-center mb-2">
          {lang === 'EN' ? 'Have you registered with us before?' : 'คุณเคยลงทะเบียนกับเราก่อนหน้านี้ไหม?'}
        </p>
        <p className="text-base font-body text-text-muted text-center mb-12">
          {lang === 'EN'
            ? 'Select an option below to continue / เลือกตัวเลือกด้านล่างเพื่อดำเนินการ'
            : 'เลือกตัวเลือกด้านล่างเพื่อดำเนินการ'}
        </p>

        {/* Two main cards */}
        <div className="flex gap-8 mb-12 w-full max-w-2xl">
          {/* New Patient */}
          <button
            onClick={onStart}
            className="flex-1 bg-white rounded-2xl shadow-card p-8 flex flex-col items-center gap-4 hover:shadow-btn hover:-translate-y-1 transition-all group border-2 border-transparent hover:border-primary"
          >
            <div className="h-20 w-20 rounded-2xl bg-primary-light flex items-center justify-center group-hover:bg-primary transition-colors">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00478d" className="group-hover:stroke-white transition-colors" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M12 14v7M9 17h6" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xl font-heading font-bold text-text-primary">New Patient</p>
              <p className="text-base font-body text-text-secondary">ผู้ป่วยใหม่</p>
            </div>
            <span className="text-sm font-body text-primary flex items-center gap-1">
              Start Registration
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>

          {/* Existing Patient */}
          <button
            onClick={onExisting}
            className="flex-1 bg-white rounded-2xl shadow-card p-8 flex flex-col items-center gap-4 hover:shadow-btn hover:-translate-y-1 transition-all group border-2 border-transparent hover:border-[#00bcd4]"
          >
            <div className="h-20 w-20 rounded-2xl bg-cyan-50 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" className="group-hover:stroke-white transition-colors" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M16 11l2 2 4-4" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xl font-heading font-bold text-text-primary">Existing Patient</p>
              <p className="text-base font-body text-text-secondary">มีประวัติแล้ว</p>
            </div>
            <span className="text-sm font-body text-cyan-600 flex items-center gap-1">
              Check-in Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Info row */}
        <div className="flex items-center gap-10 text-sm font-body text-text-muted">
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
            </svg>
            {lang === 'EN' ? 'Biometric Login Available' : 'ล็อกอินด้วยไบโอเมตริก'}
          </span>
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M9 12h6" />
            </svg>
            {lang === 'EN' ? 'Scan QR Appointment' : 'สแกน QR นัดหมาย'}
          </span>
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
            </svg>
            {lang === 'EN' ? 'Need Assistance?' : 'ต้องการความช่วยเหลือ?'}
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <footer className="bg-primary px-8 py-4 flex items-center justify-between">
        <div className="text-white">
          <p className="text-sm font-body opacity-80">
            {lang === 'EN'
              ? '🚨 Emergency? Please contact our staff immediately.'
              : '🚨 ฉุกเฉิน? กรุณาติดต่อเจ้าหน้าที่ทันที'}
          </p>
          <p className="text-xs font-body opacity-60 mt-0.5">
            {lang === 'EN' ? 'ฉุกเฉิน กรุณาแจ้งเจ้าหน้าที่บริเวณห้องฉุกเฉินทันที' : 'Emergency room staff on call 24/7'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-white">
            <p className="text-sm font-heading font-bold">Bangkok General Hospital</p>
            <p className="text-xs opacity-70">Room ID: 404 0402 22</p>
          </div>
          <button className="h-12 w-12 bg-danger rounded-xl flex items-center justify-center font-heading font-bold text-white text-sm shadow-btn hover:opacity-90">
            SOS
          </button>
        </div>
      </footer>
    </div>
  )
}
