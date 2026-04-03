import type { Language } from '../../types/patient'

interface KioskStep1Props {
  lang: Language
  onStart: () => void
}

const content = {
  EN: {
    welcome: 'Welcome to',
    hospital: 'Clinical Clarity',
    subtitle: 'Mahidol University Hospital',
    description: 'Self-registration takes about 5 minutes.\nPlease have your ID card or hospital number ready.',
    start: 'Start Registration',
    returning: 'Returning Patient? Enter HN',
    emergency: '🚨 EMERGENCY? Press Here',
  },
  TH: {
    welcome: 'ยินดีต้อนรับสู่',
    hospital: 'Clinical Clarity',
    subtitle: 'โรงพยาบาลมหิดล',
    description: 'การลงทะเบียนใช้เวลาประมาณ 5 นาที\nกรุณาเตรียมบัตรประชาชนหรือเลขประจำตัวผู้ป่วย',
    start: 'เริ่มลงทะเบียน',
    returning: 'ผู้ป่วยเก่า? กรอก HN',
    emergency: '🚨 ฉุกเฉิน? กดที่นี่',
  },
}

export default function KioskStep1Welcome({ lang, onStart }: KioskStep1Props) {
  const t = content[lang]

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-8 py-20">
      {/* Logo & branding */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="h-24 w-24 rounded-3xl bg-primary flex items-center justify-center shadow-btn">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-xl font-body text-text-secondary">{t.welcome}</p>
          <h1 className="text-5xl font-heading font-black text-primary-dark tracking-tight mt-1">
            {t.hospital}
          </h1>
          <p className="text-xl font-body text-text-secondary mt-2">{t.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xl font-body text-text-secondary text-center max-w-lg leading-relaxed mb-12 whitespace-pre-line">
        {t.description}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <button
          onClick={onStart}
          className="w-full h-16 bg-primary text-white text-xl font-body rounded-btn shadow-btn hover:bg-primary-dark transition-colors flex items-center justify-center gap-3"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          {t.start}
        </button>

        <button className="w-full h-14 border-2 border-surface-border text-text-primary text-lg font-body rounded-btn hover:bg-surface-input transition-colors">
          {t.returning}
        </button>

        <button className="w-full h-14 bg-danger text-white text-lg font-body rounded-btn hover:opacity-90 transition-opacity mt-4">
          {t.emergency}
        </button>
      </div>

      {/* Clock / Queue info */}
      <div className="mt-16 flex gap-12 text-center">
        {[
          { label: lang === 'EN' ? 'Current Queue' : 'คิวปัจจุบัน', value: 'A-042' },
          { label: lang === 'EN' ? 'Est. Wait' : 'รอประมาณ', value: '28 min' },
          { label: lang === 'EN' ? 'Doctors On Duty' : 'แพทย์เวร', value: '5' },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="text-3xl font-heading font-bold text-primary">{value}</span>
            <span className="text-sm font-body text-text-secondary">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
