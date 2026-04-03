import { useState } from 'react'
import { ProgressBar } from '../../components/ui/ProgressBar'

interface SignUpStep4Props {
  lang: 'EN' | 'TH'
  onBack: () => void
  onNext: () => void
}

const STEPS_EN = ['Personal', 'Contact', 'Emergency', 'Insurance', 'Alerts']

type InsuranceType = 'government' | 'social-security' | 'private' | 'self-pay'

const OPTIONS = [
  { value: 'government' as InsuranceType, labelEN: 'Government / UC Scheme (บัตรทอง)', labelTH: 'บัตรทอง / สิทธิ์ราชการ', icon: '🏛️' },
  { value: 'social-security' as InsuranceType, labelEN: 'Social Security (SSO)', labelTH: 'ประกันสังคม', icon: '🛡️' },
  { value: 'private' as InsuranceType, labelEN: 'Private Insurance', labelTH: 'ประกันเอกชน', icon: '💼' },
  { value: 'self-pay' as InsuranceType, labelEN: 'Self-Pay / Cash', labelTH: 'ชำระเอง / เงินสด', icon: '💵' },
]

export default function SignUpStep4Insurance({ lang, onBack, onNext }: SignUpStep4Props) {
  const [insuranceType, setInsuranceType] = useState<InsuranceType>('government')
  const [provider, setProvider] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [memberNumber, setMemberNumber] = useState('')
  const [idCardFile, setIdCardFile] = useState<string | null>(null)

  const showProviderFields = insuranceType === 'private' || insuranceType === 'social-security'

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
        <ProgressBar current={4} total={5} steps={STEPS_EN} />
      </header>

      <div className="max-w-2xl mx-auto py-12 px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-bold text-text-primary">
            {lang === 'EN' ? 'Financial & Insurance' : 'สิทธิ์การรักษาและการเงิน'}
          </h1>
          <p className="text-lg font-body text-text-secondary mt-2">
            {lang === 'EN' ? 'Step 4 of 5 — Coverage information' : 'ขั้นตอนที่ 4 จาก 5'}
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); onNext() }}>
          {/* Insurance type */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'Insurance Type *' : 'ประเภทสิทธิ์ *'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setInsuranceType(opt.value)}
                  className={`h-20 flex items-center gap-3 px-5 rounded-chip border-2 transition-all text-left ${
                    insuranceType === opt.value
                      ? 'bg-primary-light border-primary'
                      : 'bg-white border-transparent shadow-sm hover:border-primary-light'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-base font-body text-text-primary">
                    {lang === 'EN' ? opt.labelEN : opt.labelTH}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Provider fields */}
          {showProviderFields && (
            <div className="flex flex-col gap-4 p-6 bg-surface-input rounded-chip">
              <p className="text-sm font-body text-text-secondary font-medium">
                {lang === 'EN' ? 'Insurance Details' : 'รายละเอียดประกัน'}
              </p>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-body text-text-muted">
                  {lang === 'EN' ? 'Insurance Provider' : 'บริษัทประกัน'}
                </label>
                <input
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  placeholder={lang === 'EN' ? 'e.g. AIA, Muang Thai Life...' : 'เช่น AIA, เมืองไทยประกันชีวิต...'}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-body text-text-muted">
                    {lang === 'EN' ? 'Policy Number' : 'หมายเลขกรมธรรม์'}
                  </label>
                  <input value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} className="input-field" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-body text-text-muted">
                    {lang === 'EN' ? 'Member Number' : 'หมายเลขสมาชิก'}
                  </label>
                  <input value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} className="input-field" />
                </div>
              </div>
            </div>
          )}

          {/* ID / Insurance card upload */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'Upload ID / Insurance Card (optional)' : 'อัปโหลดบัตรประชาชน / บัตรประกัน'}
            </label>
            <label className="cursor-pointer">
              <div className="h-32 border-2 border-dashed border-surface-border rounded-chip flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary-light/20 transition-colors">
                {idCardFile ? (
                  <span className="text-sm font-body text-primary">✓ File uploaded</span>
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c2c6d4" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                    <span className="text-sm font-body text-text-muted">
                      {lang === 'EN' ? 'Click to upload or take photo' : 'คลิกเพื่ออัปโหลดหรือถ่ายรูป'}
                    </span>
                    <span className="text-xs font-body text-text-muted">JPG, PNG, PDF — max 5MB</span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setIdCardFile(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <button type="button" onClick={onBack} className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {lang === 'EN' ? 'Back' : 'ย้อนกลับ'}
            </button>
            <button type="submit" className="btn-primary">
              {lang === 'EN' ? 'Next: Clinical Alerts' : 'ถัดไป: แจ้งเตือนทางคลินิก'}
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
