import { useState } from 'react'
import { Card } from '../../components/ui/Card'

interface KioskStep4Props {
  lang: 'EN' | 'TH'
}

type InsuranceType = 'government' | 'social-security' | 'private' | 'self-pay'

const INSURANCE_OPTIONS: { value: InsuranceType; label: string; labelTH: string; icon: string }[] = [
  { value: 'government', label: 'Government / UC Scheme', labelTH: 'บัตรทอง / สิทธิ์ราชการ', icon: '🏛️' },
  { value: 'social-security', label: 'Social Security (SSO)', labelTH: 'ประกันสังคม', icon: '🛡️' },
  { value: 'private', label: 'Private Insurance', labelTH: 'ประกันเอกชน', icon: '💼' },
  { value: 'self-pay', label: 'Self-Pay / Cash', labelTH: 'ชำระเอง', icon: '💵' },
]

export default function KioskStep4Logistics({ lang }: KioskStep4Props) {
  const [insurance, setInsurance] = useState<InsuranceType>('government')
  const [provider, setProvider] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [preferredDoctor, setPreferredDoctor] = useState('')
  const [preferredLang, setPreferredLang] = useState<'EN' | 'TH'>('TH')
  const [interpreter, setInterpreter] = useState(false)
  const [accessibility, setAccessibility] = useState<string[]>([])

  function toggleAccessibility(a: string) {
    setAccessibility((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]))
  }

  const accessibilityOptions = [
    { value: 'wheelchair', label: lang === 'EN' ? 'Wheelchair' : 'รถเข็น' },
    { value: 'hearing', label: lang === 'EN' ? 'Hearing impaired' : 'บกพร่องทางการได้ยิน' },
    { value: 'vision', label: lang === 'EN' ? 'Vision impaired' : 'บกพร่องทางการมองเห็น' },
    { value: 'stretcher', label: lang === 'EN' ? 'Stretcher needed' : 'ต้องการเปล' },
  ]

  return (
    <div className="pt-20 pb-28 bg-surface min-h-screen px-12">
      <div className="max-w-screen-xl mx-auto pt-14">
        <div className="mb-12">
          <h1 className="text-5xl font-heading font-black text-text-primary tracking-tight">
            {lang === 'EN' ? 'Logistics & Insurance' : 'ข้อมูลสิทธิ์การรักษา'}
          </h1>
          <p className="text-xl font-body text-text-secondary opacity-80 mt-4">
            {lang === 'EN'
              ? 'Step 4: Help us prepare your visit efficiently.'
              : 'ขั้นตอนที่ 4: ช่วยให้เราเตรียมการเยี่ยมของคุณได้อย่างมีประสิทธิภาพ'}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Insurance selection */}
          <div className="col-span-7 flex flex-col gap-8">
            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                <svg width="22" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {lang === 'EN' ? 'Insurance / Coverage' : 'สิทธิ์การรักษา'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {INSURANCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setInsurance(opt.value)}
                    className={`h-24 flex flex-col items-start justify-center px-6 rounded-chip border-2 transition-all text-left ${
                      insurance === opt.value
                        ? 'bg-primary-light border-primary'
                        : 'bg-white border-transparent shadow-sm hover:border-primary-light'
                    }`}
                  >
                    <span className="text-2xl mb-1">{opt.icon}</span>
                    <span className="text-base font-body text-text-primary">
                      {lang === 'EN' ? opt.label : opt.labelTH}
                    </span>
                  </button>
                ))}
              </div>

              {(insurance === 'private' || insurance === 'social-security') && (
                <div className="mt-6 flex flex-col gap-4">
                  <input
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    placeholder={lang === 'EN' ? 'Insurance provider name...' : 'ชื่อบริษัทประกัน...'}
                    className="input-field"
                  />
                  <input
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    placeholder={lang === 'EN' ? 'Policy / Member number...' : 'หมายเลขกรมธรรม์...'}
                    className="input-field"
                  />
                </div>
              )}
            </Card>

            {/* Accessibility */}
            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="5" r="3" />
                  <path d="M12 8v8M8 17H5a1 1 0 0 0-1 1v2M16 17h3a1 1 0 0 1 1 1v2" />
                </svg>
                {lang === 'EN' ? 'Accessibility Needs' : 'ความต้องการพิเศษ'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {accessibilityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleAccessibility(opt.value)}
                    className={`px-5 py-3 rounded-chip text-base font-body transition-colors ${
                      accessibility.includes(opt.value)
                        ? 'bg-primary-light text-primary border-2 border-primary'
                        : 'bg-surface-input text-text-secondary'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="col-span-5 flex flex-col gap-8">
            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {lang === 'EN' ? 'Preferred Doctor' : 'แพทย์ที่ต้องการ'}
              </h2>
              <input
                value={preferredDoctor}
                onChange={(e) => setPreferredDoctor(e.target.value)}
                placeholder={lang === 'EN' ? 'Doctor name or ID (optional)...' : 'ชื่อแพทย์หรือรหัส (ถ้ามี)...'}
                className="input-field"
              />
              <p className="text-sm font-body text-text-muted mt-3">
                {lang === 'EN'
                  ? 'Leave blank for next available doctor'
                  : 'เว้นว่างไว้หากไม่ต้องการระบุแพทย์'}
              </p>
            </Card>

            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {lang === 'EN' ? 'Language Preference' : 'ภาษาที่ต้องการ'}
              </h2>
              <div className="flex gap-3 mb-6">
                {(['TH', 'EN'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setPreferredLang(l)}
                    className={`flex-1 h-14 rounded-btn text-lg font-body transition-colors ${
                      preferredLang === l
                        ? 'bg-primary text-white shadow-btn'
                        : 'bg-surface-input text-text-secondary'
                    }`}
                  >
                    {l === 'TH' ? '🇹🇭 ภาษาไทย' : 'EN English'}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-body text-text-primary">
                    {lang === 'EN' ? 'Need interpreter?' : 'ต้องการล่าม?'}
                  </p>
                  <p className="text-sm font-body text-text-muted">
                    {lang === 'EN' ? 'Medical interpreter available' : 'มีล่ามการแพทย์'}
                  </p>
                </div>
                <button
                  onClick={() => setInterpreter((v) => !v)}
                  className={`relative h-8 w-14 rounded-full transition-colors ${
                    interpreter ? 'bg-primary' : 'bg-surface-input'
                  }`}
                >
                  <div
                    className={`absolute top-1 h-6 w-6 bg-white rounded-full border border-surface-border shadow transition-transform ${
                      interpreter ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
