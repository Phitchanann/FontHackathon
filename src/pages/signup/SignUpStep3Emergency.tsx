import { useState } from 'react'
import SignUpShell from '../../components/signup/SignUpShell'

interface SignUpStep3Props {
  lang: 'EN' | 'TH'
  onLangChange: (lang: 'EN' | 'TH') => void
  onBack: () => void
  onNext: () => void
}

const RELATIONSHIPS = [
  { value: 'father', en: 'Father / บิดา', th: 'บิดา' },
  { value: 'mother', en: 'Mother / มารดา', th: 'มารดา' },
  { value: 'spouse', en: 'Spouse / คู่สมรส', th: 'คู่สมรส' },
  { value: 'child', en: 'Child / บุตร', th: 'บุตร' },
  { value: 'other', en: 'Other / อื่นๆ', th: 'อื่นๆ' },
]

export default function SignUpStep3Emergency({ lang, onLangChange, onBack, onNext }: SignUpStep3Props) {
  const [fullName, setFullName] = useState('')
  const [relationship, setRelationship] = useState('spouse')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  return (
    <SignUpShell
      currentStep={3}
      lang={lang}
      onLangChange={onLangChange}
      title={lang === 'EN' ? 'Emergency Contact' : 'ผู้ติดต่อฉุกเฉิน'}
      subtitle={
        lang === 'EN'
          ? 'Who should we reach in case of emergency?'
          : 'ควรติดต่อใครหากเกิดเหตุฉุกเฉิน'
      }
      footer={
        <div className="flex items-center justify-between gap-4">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-body text-text-secondary transition-colors hover:text-text-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            {lang === 'EN' ? 'Previous' : 'ย้อนกลับ'}
          </button>
          <button onClick={onNext} className="btn-primary">
            {lang === 'EN' ? 'Next Step' : 'ขั้นตอนถัดไป'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <section className="signup-panel bg-[#fbfcfe] p-6 sm:p-7">
          <div>
            <label className="signup-label">
              {lang === 'EN' ? 'Full Name of Emergency Contact' : 'ชื่อ-นามสกุลผู้ติดต่อฉุกเฉิน'}
            </label>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder={lang === 'EN' ? 'e.g. Somchai Rakdee' : 'เช่น สมชาย รักดี'}
              className="input-field mt-3"
            />
          </div>

          <div className="mt-6">
            <label className="signup-label">
              {lang === 'EN' ? 'Relationship / ความสัมพันธ์' : 'ความสัมพันธ์'}
            </label>
            <div className="mt-3 flex flex-wrap gap-3">
              {RELATIONSHIPS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRelationship(option.value)}
                  className={`rounded-2xl px-5 py-3 text-sm font-body transition-colors ${
                    relationship === option.value
                      ? 'bg-primary-light text-primary shadow-sm'
                      : 'bg-[#f3f5f8] text-text-secondary hover:bg-[#eaf0f8]'
                  }`}
                >
                  {lang === 'EN' ? option.en : option.th}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="signup-panel border-l-4 border-l-danger p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-danger">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.8 19.8 0 0 1 1.61 5 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11l-.98.98a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.82.7a2 2 0 0 1 1.73 1.99z" />
                </svg>
              </div>
              <div>
                <p className="signup-label">Phone Number</p>
                <p className="text-[11px] font-body uppercase tracking-[0.12em] text-danger/90">
                  {lang === 'EN' ? 'Required for consent' : 'จำเป็นสำหรับการยินยอม'}
                </p>
              </div>
            </div>

            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="08X-XXX-XXXX"
              className="input-field mt-5"
            />
          </section>

          <section className="signup-panel border-l-4 border-l-cyan-400 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="signup-label">Address</p>
                <p className="text-[11px] font-body uppercase tracking-[0.12em] text-text-muted">
                  {lang === 'EN' ? 'Optional' : 'ไม่บังคับ'}
                </p>
              </div>
            </div>

            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder={lang === 'EN' ? 'House no, Street, City...' : 'บ้านเลขที่ ถนน เมือง...'}
              className="input-field mt-5"
            />
          </section>
        </div>

        <section className="signup-panel bg-gradient-to-r from-[#eef6ff] to-[#f7fbff] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            <div>
              <p className="text-sm font-body font-semibold text-primary">
                {lang === 'EN' ? 'Privacy & Consent' : 'ความเป็นส่วนตัวและความยินยอม'}
              </p>
              <p className="mt-1 text-sm font-body leading-6 text-text-secondary">
                {lang === 'EN'
                  ? 'We only contact this person in case of a medical emergency or when legal consent is required during triage. Your data is protected by hospital security standards.'
                  : 'เราจะติดต่อบุคคลนี้เฉพาะเมื่อเกิดเหตุฉุกเฉินทางการแพทย์ หรือเมื่อต้องใช้ความยินยอมตามกฎหมายในขั้นตอนคัดกรอง ข้อมูลของคุณจะถูกเก็บรักษาตามมาตรฐานความปลอดภัยของโรงพยาบาล'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </SignUpShell>
  )
}
