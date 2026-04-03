import { useState } from 'react'
import { ProgressBar } from '../../components/ui/ProgressBar'

interface SignUpStep3Props {
  lang: 'EN' | 'TH'
  onBack: () => void
  onNext: () => void
}

const RELATIONSHIPS_EN = ['Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Other']
const RELATIONSHIPS_TH = ['คู่สมรส', 'พ่อ/แม่', 'ลูก', 'พี่น้อง', 'เพื่อน', 'อื่นๆ']
const STEPS_EN = ['Personal', 'Contact', 'Emergency', 'Insurance', 'Alerts']

export default function SignUpStep3Emergency({ lang, onBack, onNext }: SignUpStep3Props) {
  const [name, setName] = useState('')
  const [nameTH, setNameTH] = useState('')
  const [relationship, setRelationship] = useState('')
  const [phone, setPhone] = useState('')
  const [phone2, setPhone2] = useState('')
  const [email, setEmail] = useState('')

  const relationships = lang === 'EN' ? RELATIONSHIPS_EN : RELATIONSHIPS_TH

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-white shadow-header px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="font-heading font-bold text-xl text-primary-dark">Clinical Clarity</span>
        </div>
        <ProgressBar current={3} total={5} steps={STEPS_EN} />
      </header>

      <div className="max-w-2xl mx-auto py-12 px-8">
        {/* Header with decorative element */}
        <div className="mb-10 relative">
          <div className="absolute -top-4 -right-4 h-32 w-32 bg-primary-light rounded-full opacity-50 blur-2xl pointer-events-none" />
          <h1 className="text-4xl font-heading font-bold text-text-primary">
            {lang === 'EN' ? 'Emergency Contact' : 'ผู้ติดต่อฉุกเฉิน'}
          </h1>
          <p className="text-lg font-body text-text-secondary mt-2">
            {lang === 'EN'
              ? 'Step 3 of 5 — Someone we can contact in case of emergency'
              : 'ขั้นตอนที่ 3 จาก 5 — ผู้ที่ติดต่อได้เมื่อเกิดเหตุฉุกเฉิน'}
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); onNext() }}>
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'Full Name (EN) *' : 'ชื่อ-นามสกุล (อังกฤษ) *'}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name..."
                className="input-field"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'Full Name (TH)' : 'ชื่อ-นามสกุล (ไทย)'}
              </label>
              <input
                value={nameTH}
                onChange={(e) => setNameTH(e.target.value)}
                placeholder="ชื่อ-นามสกุล..."
                className="input-field"
              />
            </div>
          </div>

          {/* Relationship */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'Relationship *' : 'ความสัมพันธ์ *'}
            </label>
            <div className="flex flex-wrap gap-3">
              {relationships.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRelationship(r)}
                  className={`px-5 h-12 rounded-chip text-base font-body transition-colors ${
                    relationship === r
                      ? 'bg-primary-light text-primary border-2 border-primary'
                      : 'bg-surface-input text-text-secondary'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Phone numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'Phone Number *' : 'เบอร์โทรศัพท์ *'}
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08X-XXX-XXXX"
                type="tel"
                className="input-field"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'Alt. Phone Number' : 'เบอร์สำรอง'}
              </label>
              <input
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                placeholder="08X-XXX-XXXX"
                type="tel"
                className="input-field"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'Email (for notifications)' : 'อีเมล (สำหรับแจ้งเตือน)'}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@email.com"
              type="email"
              className="input-field"
            />
          </div>

          {/* Info box */}
          <div className="bg-primary-light rounded-chip p-4 flex gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00478d" strokeWidth="2" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-sm font-body text-primary">
              {lang === 'EN'
                ? 'This person will be contacted in case of emergency or if you are unable to communicate.'
                : 'บุคคลนี้จะได้รับการติดต่อในกรณีฉุกเฉินหรือหากคุณไม่สามารถสื่อสารได้'}
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <button type="button" onClick={onBack} className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {lang === 'EN' ? 'Back' : 'ย้อนกลับ'}
            </button>
            <button type="submit" className="btn-primary">
              {lang === 'EN' ? 'Next: Insurance' : 'ถัดไป: สิทธิ์การรักษา'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
