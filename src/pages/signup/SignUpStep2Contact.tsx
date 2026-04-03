import { useState } from 'react'
import SignUpShell from '../../components/signup/SignUpShell'

interface SignUpStep2Props {
  lang: 'EN' | 'TH'
  onLangChange: (lang: 'EN' | 'TH') => void
  onBack: () => void
  onNext: () => void
}

const PROVINCES = ['Bangkok (กรุงเทพมหานคร)', 'Chiang Mai (เชียงใหม่)', 'Phuket (ภูเก็ต)', 'Khon Kaen (ขอนแก่น)']
const DISTRICTS = ['Pathum Wan (ปทุมวัน)', 'Bang Rak (บางรัก)', 'Watthana (วัฒนา)', 'Huai Khwang (ห้วยขวาง)']

export default function SignUpStep2Contact({ lang, onLangChange, onBack, onNext }: SignUpStep2Props) {
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState(PROVINCES[0])
  const [district, setDistrict] = useState(DISTRICTS[0])
  const [registeredAddress, setRegisteredAddress] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [sameAsRegistered, setSameAsRegistered] = useState(false)

  const displayedCurrentAddress = sameAsRegistered ? registeredAddress : currentAddress

  return (
    <SignUpShell
      currentStep={2}
      lang={lang}
      onLangChange={onLangChange}
      title={lang === 'EN' ? 'Contact & Location Data' : 'ข้อมูลติดต่อและที่อยู่'}
      subtitle={
        lang === 'EN'
          ? 'ข้อมูลการติดต่อและที่อยู่ / Contact information and location details.'
          : 'กรอกข้อมูลการติดต่อและตำแหน่งที่อยู่ของคุณ'
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
        <section className="signup-panel border-l-4 border-l-primary p-6 sm:p-7">
          <label className="signup-label">
            {lang === 'EN' ? 'Mobile Phone Number' : 'เบอร์โทรศัพท์มือถือ'}
          </label>
          <p className="signup-helper mt-1">
            {lang === 'EN' ? 'หมายเลขโทรศัพท์ที่ใช้ติดต่อกลับ (สำหรับการแจ้งเตือน SMS/LINE)' : 'เบอร์โทรที่ใช้ติดต่อกลับสำหรับการแจ้งเตือน'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[22px] bg-[#f4f6fa] p-4 sm:flex-nowrap">
            <div className="inline-flex h-14 items-center gap-2 rounded-2xl bg-white px-4 text-text-primary shadow-sm">
              <span className="text-lg">+66</span>
            </div>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="08X-XXX-XXXX"
              className="min-w-[220px] flex-1 bg-transparent text-3xl font-heading font-medium tracking-[0.08em] text-text-primary outline-none placeholder:text-[#c7d0dc]"
            />
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 9h8" />
                <path d="M8 13h5" />
              </svg>
            </button>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.05fr,0.7fr]">
          <div className="space-y-6">
            <section className="signup-panel p-6 sm:p-7">
              <label className="signup-label">
                {lang === 'EN' ? 'Registered Address' : 'ที่อยู่ตามทะเบียนบ้าน'}
              </label>
              <p className="signup-helper mt-1">
                {lang === 'EN' ? 'ข้อมูลตามทะเบียนบ้าน' : 'กรอกข้อมูลตามทะเบียนบ้าน'}
              </p>
              <textarea
                value={registeredAddress}
                onChange={(event) => setRegisteredAddress(event.target.value)}
                placeholder={lang === 'EN' ? 'House No, Street, Sub-district...' : 'บ้านเลขที่ ถนน แขวง/ตำบล...'}
                className="textarea-field mt-4 min-h-44"
              />
            </section>

            <section className="signup-panel p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label className="signup-label">
                    {lang === 'EN' ? 'Current Address' : 'ที่อยู่ปัจจุบัน'}
                  </label>
                  <p className="signup-helper mt-1">
                    {lang === 'EN' ? 'ที่อยู่ที่สามารถติดต่อได้ในขณะนี้' : 'ที่อยู่ที่สามารถติดต่อได้ปัจจุบัน'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSameAsRegistered((previous) => !previous)
                    if (!sameAsRegistered) {
                      setCurrentAddress(registeredAddress)
                    }
                  }}
                  className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${sameAsRegistered ? 'bg-primary' : 'bg-[#d9e1eb]'}`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${sameAsRegistered ? 'translate-x-7' : 'translate-x-1'}`}
                  />
                </button>
              </div>

              <p className="mt-3 text-[11px] font-body font-semibold uppercase tracking-[0.14em] text-text-muted">
                {lang === 'EN' ? 'Same as Registered' : 'เหมือนทะเบียนบ้าน'}
              </p>
              <textarea
                value={displayedCurrentAddress}
                onChange={(event) => {
                  if (!sameAsRegistered) {
                    setCurrentAddress(event.target.value)
                  }
                }}
                placeholder={lang === 'EN' ? 'Room No, Building, Area...' : 'ห้อง อาคาร หรือพื้นที่ปัจจุบัน...'}
                disabled={sameAsRegistered}
                className={`textarea-field mt-4 min-h-36 ${sameAsRegistered ? 'opacity-70' : ''}`}
              />
            </section>
          </div>

          <section className="signup-panel p-6 sm:p-7">
            <label className="signup-label">
              {lang === 'EN' ? 'Geographic Selection' : 'การเลือกพื้นที่'}
            </label>
            <p className="signup-helper mt-1">
              {lang === 'EN' ? 'การระบุตำแหน่งและพื้นที่ (เพื่อการวิเคราะห์ความหนาแน่น)' : 'ใช้เพื่อระบุตำแหน่งพื้นที่ของผู้ป่วย'}
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="signup-label">{lang === 'EN' ? 'Province / จังหวัด' : 'จังหวัด'}</label>
                <select value={province} onChange={(event) => setProvince(event.target.value)} className="input-field mt-2">
                  {PROVINCES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="signup-label">{lang === 'EN' ? 'District / เขต-อำเภอ' : 'เขต / อำเภอ'}</label>
                <select value={district} onChange={(event) => setDistrict(event.target.value)} className="input-field mt-2">
                  {DISTRICTS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#78c2de] via-[#a4daf0] to-[#d9f4ff] p-4">
              <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden rounded-[20px] bg-white/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.6),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.45),transparent_35%)]" />
                <div className="absolute h-28 w-28 rounded-full border-[16px] border-danger bg-white shadow-[0_12px_30px_rgba(186,26,26,0.18)]" />
                <div className="absolute top-[58%] h-16 w-16 rotate-45 rounded-2xl bg-danger" />
                <div className="absolute h-11 w-11 rounded-full bg-white shadow-inner" />
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-body font-semibold uppercase tracking-[0.12em] text-primary shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {lang === 'EN' ? 'Location Analysis Active' : 'กำลังวิเคราะห์ตำแหน่ง'}
              </div>
            </div>
          </section>
        </div>
      </div>
    </SignUpShell>
  )
}
