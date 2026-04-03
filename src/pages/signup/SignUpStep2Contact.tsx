import { useState } from 'react'
import { ProgressBar } from '../../components/ui/ProgressBar'

interface SignUpStep2Props {
  lang: 'EN' | 'TH'
  onBack: () => void
  onNext: () => void
}

const PROVINCES_TH = ['กรุงเทพมหานคร', 'เชียงใหม่', 'นครราชสีมา', 'ขอนแก่น', 'สงขลา', 'ชลบุรี', 'ภูเก็ต']
const STEPS_EN = ['Personal', 'Contact', 'Emergency', 'Insurance', 'Alerts']

export default function SignUpStep2Contact({ lang, onBack, onNext }: SignUpStep2Props) {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [lineId, setLineId] = useState('')

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
        <ProgressBar current={2} total={5} steps={STEPS_EN} />
      </header>

      <div className="max-w-2xl mx-auto py-12 px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-bold text-text-primary">
            {lang === 'EN' ? 'Contact & Location' : 'ข้อมูลติดต่อและที่อยู่'}
          </h1>
          <p className="text-lg font-body text-text-secondary mt-2">
            {lang === 'EN' ? 'Step 2 of 5 — Your contact details' : 'ขั้นตอนที่ 2 จาก 5'}
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); onNext() }}>
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'Phone Number *' : 'เบอร์โทรศัพท์ *'}
            </label>
            <div className="flex gap-2">
              <div className="input-field w-20 text-center flex items-center justify-center bg-surface-input">
                <span className="text-base font-body text-text-primary">🇹🇭 +66</span>
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08X-XXX-XXXX"
                className="input-field flex-1"
                type="tel"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'Email Address' : 'อีเมล'}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              type="email"
              className="input-field"
            />
          </div>

          {/* LINE ID */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'LINE ID (optional)' : 'ไอดีไลน์ (ถ้ามี)'}
            </label>
            <input
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              placeholder="@yourlineid"
              className="input-field"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'Address *' : 'ที่อยู่ *'}
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={lang === 'EN' ? 'House no., Street, Building...' : 'บ้านเลขที่ ถนน อาคาร...'}
              className="textarea-field min-h-24"
              required
            />
          </div>

          {/* District + Province */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'District / Subdistrict' : 'เขต/ตำบล'}
              </label>
              <input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder={lang === 'EN' ? 'District...' : 'เขต/อำเภอ...'}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'Province' : 'จังหวัด'}
              </label>
              <select value={province} onChange={(e) => setProvince(e.target.value)} className="input-field">
                <option value="">{lang === 'EN' ? 'Select Province...' : 'เลือกจังหวัด...'}</option>
                {PROVINCES_TH.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Postal code */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'Postal Code' : 'รหัสไปรษณีย์'}
            </label>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="XXXXX"
              className="input-field w-36"
              maxLength={5}
            />
          </div>

          <div className="flex justify-between pt-4">
            <button type="button" onClick={onBack} className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {lang === 'EN' ? 'Back' : 'ย้อนกลับ'}
            </button>
            <button type="submit" className="btn-primary">
              {lang === 'EN' ? 'Next: Emergency Contact' : 'ถัดไป: ผู้ติดต่อฉุกเฉิน'}
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
