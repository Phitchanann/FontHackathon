import { useState } from 'react'
import type { ReactNode } from 'react'
import SignUpShell from '../../components/signup/SignUpShell'

interface SignUpStep4Props {
  lang: 'EN' | 'TH'
  onLangChange: (lang: 'EN' | 'TH') => void
  onBack: () => void
  onNext: () => void
}

type PrimaryRight = 'self-pay' | 'social-security' | '30-baht' | 'civil-servant'

const PRIMARY_RIGHTS: Array<{
  value: PrimaryRight
  en: string
  th: string
  desc: string
  icon: ReactNode
}> = [
  {
    value: 'self-pay',
    en: 'Self-pay',
    th: 'ชำระเงินเอง',
    desc: 'ชำระเงินเอง',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M12 10v4" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    value: 'social-security',
    en: 'Social Security',
    th: 'ประกันสังคม',
    desc: 'ประกันสังคม',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 8v6" />
        <path d="M23 11h-6" />
      </svg>
    ),
  },
  {
    value: '30-baht',
    en: '30-Baht',
    th: 'บัตรทอง',
    desc: 'บัตรทอง',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    value: 'civil-servant',
    en: 'Civil Servant',
    th: 'สิทธิข้าราชการ',
    desc: 'สิทธิข้าราชการ',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
]

export default function SignUpStep4Insurance({ lang, onLangChange, onBack, onNext }: SignUpStep4Props) {
  const [primaryRight, setPrimaryRight] = useState<PrimaryRight>('self-pay')
  const [companyName, setCompanyName] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [occupation, setOccupation] = useState('')
  const [workplace, setWorkplace] = useState('')

  return (
    <SignUpShell
      currentStep={4}
      lang={lang}
      onLangChange={onLangChange}
      title={
        <>
          {lang === 'EN' ? 'Financial & Insurance ' : 'ข้อมูลการเงินและประกัน '}
          <span className="text-primary">{lang === 'EN' ? 'Data' : 'การรักษา'}</span>
        </>
      }
      subtitle={
        lang === 'EN'
          ? 'Please provide your coverage information. This helps with accurate billing and occupational health analysis.'
          : 'กรุณาระบุข้อมูลสิทธิ์การรักษา เพื่อให้การเรียกเก็บเงินถูกต้องและช่วยวิเคราะห์ความเสี่ยงจากการทำงาน'
      }
      footer={
        <div className="flex items-center justify-between gap-4">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-body text-text-secondary transition-colors hover:text-text-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            {lang === 'EN' ? 'Previous Step' : 'ขั้นตอนก่อนหน้า'}
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
      <div className="space-y-8">
        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-sm font-heading font-bold text-white">1</div>
            <h2 className="text-2xl font-heading font-bold text-text-primary">
              {lang === 'EN' ? 'Primary Right' : 'สิทธิ์หลัก'}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PRIMARY_RIGHTS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPrimaryRight(option.value)}
                className={`signup-panel flex flex-col items-center gap-4 p-5 text-center transition-all ${
                  primaryRight === option.value
                    ? 'border-primary text-primary shadow-[0_16px_40px_rgba(0,71,141,0.14)]'
                    : 'hover:border-primary/30'
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${primaryRight === option.value ? 'bg-primary text-white' : 'bg-[#f3f5f8] text-text-secondary'}`}>
                  {option.icon}
                </div>
                <div>
                  <p className="text-base font-body font-semibold text-text-primary">
                    {lang === 'EN' ? option.en : option.th}
                  </p>
                  <p className="mt-1 text-sm font-body text-text-muted">{option.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400 text-sm font-heading font-bold text-white">2</div>
            <h2 className="text-2xl font-heading font-bold text-text-primary">
              {lang === 'EN' ? 'Private Insurance / ประกันเอกชน' : 'ประกันเอกชน'}
            </h2>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr,340px]">
            <section className="signup-panel p-6 sm:p-7">
              <div className="grid gap-5">
                <div>
                  <label className="signup-label">
                    {lang === 'EN' ? 'Company Name / ชื่อบริษัทประกัน' : 'ชื่อบริษัทประกัน'}
                  </label>
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    placeholder={lang === 'EN' ? 'e.g. Allianz, AIA, Muang Thai' : 'เช่น Allianz, AIA, เมืองไทย'}
                    className="input-field mt-2"
                  />
                </div>

                <div>
                  <label className="signup-label">
                    {lang === 'EN' ? 'Policy Number / หมายเลขกรมธรรม์' : 'หมายเลขกรมธรรม์'}
                  </label>
                  <input
                    value={policyNumber}
                    onChange={(event) => setPolicyNumber(event.target.value)}
                    placeholder="XXX-XXX-XXXX"
                    className="input-field mt-2"
                  />
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#163f5f] via-[#1d6fae] to-[#64c0e7] p-6 text-white shadow-card">
              <p className="text-xs font-body uppercase tracking-[0.18em] text-white/70">Occupational Safety</p>
              <h3 className="mt-4 text-3xl font-heading font-bold leading-tight">
                Personalized
                <br />
                Health Analysis
              </h3>
              <p className="mt-4 max-w-[240px] text-sm font-body leading-6 text-white/80">
                {lang === 'EN'
                  ? 'We use insurance and work information to prepare the right triage and billing workflow.'
                  : 'เราใช้ข้อมูลสิทธิ์และการทำงานเพื่อจัดเส้นทางคัดกรองและการเงินที่เหมาะสม'}
              </p>

              <div className="relative mt-8 h-28 overflow-hidden rounded-[22px] bg-white/10">
                <div className="absolute left-6 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-white/20 blur-xl" />
                <div className="absolute right-8 top-6 h-8 w-8 rounded-full bg-white/20" />
                <div className="absolute inset-x-0 bottom-8 h-px bg-white/30" />
                <div className="absolute bottom-8 left-4 right-4 h-10 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.8),transparent_20%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7),transparent_24%),radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.5),transparent_18%)]" />
              </div>
            </section>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-600 text-sm font-heading font-bold text-white">3</div>
            <h2 className="text-2xl font-heading font-bold text-text-primary">
              {lang === 'EN' ? 'Occupation & Workplace / อาชีพและสถานที่ทำงาน' : 'อาชีพและสถานที่ทำงาน'}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <section className="signup-panel p-6">
              <label className="signup-label">
                {lang === 'EN' ? 'Current Occupation / อาชีพปัจจุบัน' : 'อาชีพปัจจุบัน'}
              </label>
              <input
                value={occupation}
                onChange={(event) => setOccupation(event.target.value)}
                placeholder={lang === 'EN' ? 'Specify your role' : 'ระบุอาชีพ'}
                className="input-field mt-3"
              />
              <p className="signup-helper mt-3">
                {lang === 'EN' ? '* Used for occupational disease risk analysis.' : '* ใช้เพื่อประเมินความเสี่ยงโรคจากการทำงาน'}
              </p>
            </section>

            <section className="signup-panel p-6">
              <label className="signup-label">
                {lang === 'EN' ? 'Workplace / Company Name' : 'สถานที่ทำงาน / ชื่อบริษัท'}
              </label>
              <input
                value={workplace}
                onChange={(event) => setWorkplace(event.target.value)}
                placeholder={lang === 'EN' ? 'Company Name' : 'ชื่อบริษัท'}
                className="input-field mt-3"
              />
              <p className="signup-helper mt-3">
                {lang === 'EN' ? '* Required for corporate billing if applicable.' : '* ใช้ในกรณีต้องออกเอกสารหรือเรียกเก็บกับองค์กร'}
              </p>
            </section>
          </div>
        </section>
      </div>
    </SignUpShell>
  )
}
