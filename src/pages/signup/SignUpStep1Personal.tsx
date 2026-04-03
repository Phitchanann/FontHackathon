import { useState } from 'react'
import { Link } from 'react-router-dom'
import SignUpShell from '../../components/signup/SignUpShell'
import { MOCK_CITIZEN_CARD } from '../../data/mockCitizenCard'

interface SignUpStep1Props {
  lang: 'EN' | 'TH'
  onLangChange: (lang: 'EN' | 'TH') => void
  onNext: () => void
}

export default function SignUpStep1Personal({ lang, onLangChange, onNext }: SignUpStep1Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [dob, setDob] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [cardStatus, setCardStatus] = useState<'idle' | 'ready'>('idle')

  function fillFromCitizenCard() {
    setName(lang === 'EN' ? MOCK_CITIZEN_CARD.fullNameEN : MOCK_CITIZEN_CARD.fullNameTH)
    setDob(MOCK_CITIZEN_CARD.dob)
    setIdNumber(MOCK_CITIZEN_CARD.idNumber)
    setGender(MOCK_CITIZEN_CARD.gender)
    setCardStatus('ready')
  }

  const age = 34
  const heightCm = 175
  const weightKg = 74
  const bmi = (weightKg / ((heightCm / 100) ** 2)).toFixed(1)

  return (
    <SignUpShell
      currentStep={1}
      lang={lang}
      onLangChange={onLangChange}
      title={lang === 'EN' ? 'Demographics & Identity' : 'ข้อมูลส่วนตัวและตัวตน'}
      subtitle={
        lang === 'EN'
          ? 'Start your registration by telling us who you are. This helps us create a new patient record before clinical check-in.'
          : 'เริ่มต้นการลงทะเบียนโดยกรอกข้อมูลส่วนตัว เพื่อสร้างประวัติผู้ป่วยใหม่ก่อนเข้าสู่ขั้นตอนคัดกรอง'
      }
      footer={
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-body text-text-secondary transition-colors hover:text-text-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            {lang === 'EN' ? 'Back to Home' : 'กลับหน้าหลัก'}
          </Link>
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
      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <section className="signup-panel p-6 sm:p-7">
            <div className="mb-5 rounded-3xl border border-dashed border-primary/25 bg-primary-light/35 px-5 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-body uppercase tracking-[0.18em] text-primary">{lang === 'EN' ? 'Citizen ID Card Reader' : 'เครื่องอ่านบัตรประชาชน'}</p>
                  <p className="mt-1 text-sm font-body text-text-secondary">
                    {lang === 'EN'
                      ? 'Insert or tap the card to auto-fill identity fields.'
                      : 'เสียบหรือแตะบัตรเพื่อดึงข้อมูลส่วนตัวเข้าฟอร์มอัตโนมัติ'}
                  </p>
                </div>
                <button type="button" onClick={fillFromCitizenCard} className="btn-primary whitespace-nowrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M7 9h10M7 13h5" />
                  </svg>
                  {lang === 'EN' ? 'Read ID Card' : 'อ่านบัตรประชาชน'}
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-body text-text-secondary">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
                  <span className={`h-2.5 w-2.5 rounded-full ${cardStatus === 'ready' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {cardStatus === 'ready'
                    ? lang === 'EN'
                      ? 'Card data loaded'
                      : 'ดึงข้อมูลจากบัตรแล้ว'
                    : lang === 'EN'
                    ? 'Waiting for card'
                    : 'รอเสียบบัตร'}
                </span>
                <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 shadow-sm">
                  {lang === 'EN' ? 'Auto-fill Full Name / DOB / ID / Gender' : 'เติมอัตโนมัติ: ชื่อ วันเกิด เลขบัตร เพศ'}
                </span>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="signup-label">
                  {lang === 'EN' ? 'Full Name' : 'ชื่อ-นามสกุล'}
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={lang === 'EN' ? 'e.g. Somchai Rakdee' : 'เช่น สมชาย รักดี'}
                  className="input-field mt-2"
                />
              </div>

              <div>
                <label className="signup-label">
                  {lang === 'EN' ? 'Mobile Number' : 'เบอร์โทรศัพท์'}
                </label>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="08X-XXX-XXXX"
                  className="input-field mt-2"
                />
              </div>

              <div>
                <label className="signup-label">
                  {lang === 'EN' ? 'Date of Birth' : 'วันเดือนปีเกิด'}
                </label>
                <input
                  value={dob}
                  onChange={(event) => setDob(event.target.value)}
                  placeholder="DD / MM / YYYY"
                  className="input-field mt-2"
                />
              </div>

              <div>
                <label className="signup-label">
                  {lang === 'EN' ? 'National ID / Passport' : 'เลขบัตรประชาชน / พาสปอร์ต'}
                </label>
                <input
                  value={idNumber}
                  onChange={(event) => setIdNumber(event.target.value)}
                  placeholder="1-2345-67890-12-3"
                  className="input-field mt-2"
                />
              </div>

              <div>
                <label className="signup-label">
                  {lang === 'EN' ? 'Gender' : 'เพศ'}
                </label>
                <div className="mt-2 flex flex-wrap gap-3">
                  {[
                    { value: 'male' as const, en: 'Male', th: 'ชาย' },
                    { value: 'female' as const, en: 'Female', th: 'หญิง' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setGender(option.value)}
                      className={`inline-flex min-w-[130px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-body transition-colors ${
                        gender === option.value
                          ? 'bg-primary text-white shadow-btn'
                          : 'bg-[#f3f6fa] text-text-secondary hover:bg-primary-light'
                      }`}
                    >
                      {lang === 'EN' ? option.en : option.th}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="signup-panel p-6 sm:p-7">
            <label className="signup-label">
              {lang === 'EN' ? 'Intake Notes' : 'หมายเหตุเบื้องต้น'}
            </label>
            <textarea
              className="textarea-field mt-2 min-h-40"
              placeholder={
                lang === 'EN'
                  ? 'Add anything our staff should know before you continue...'
                  : 'ระบุข้อมูลเพิ่มเติมที่เจ้าหน้าที่ควรทราบก่อนดำเนินการต่อ...'
              }
            />
          </section>
        </div>

        <div className="space-y-6">
          <section className="signup-panel overflow-hidden">
            <div className="border-b border-[#edf2f7] px-6 py-5">
              <p className="signup-label">{lang === 'EN' ? 'Instant Snapshot' : 'ข้อมูลสรุปด่วน'}</p>
              <p className="mt-2 text-3xl font-heading font-black text-text-primary">{age}</p>
              <p className="signup-helper mt-1">{lang === 'EN' ? 'Estimated age from intake' : 'อายุโดยประมาณจากข้อมูลเบื้องต้น'}</p>
            </div>

            <div className="grid grid-cols-2 border-b border-[#edf2f7]">
              <div className="px-6 py-5">
                <p className="signup-label">{lang === 'EN' ? 'Height' : 'ส่วนสูง'}</p>
                <p className="mt-2 text-2xl font-heading font-bold text-text-primary">{heightCm} cm</p>
              </div>
              <div className="border-l border-[#edf2f7] px-6 py-5">
                <p className="signup-label">{lang === 'EN' ? 'Weight' : 'น้ำหนัก'}</p>
                <p className="mt-2 text-2xl font-heading font-bold text-text-primary">{weightKg} kg</p>
              </div>
            </div>

            <div className="bg-primary px-6 py-6 text-white">
              <p className="text-xs font-body uppercase tracking-[0.18em] opacity-80">BMI</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-heading font-black">{bmi}</span>
                <span className="pb-1 text-sm font-body opacity-80">
                  {lang === 'EN' ? 'Healthy range' : 'เกณฑ์ปกติ'}
                </span>
              </div>
            </div>
          </section>

          <section className="signup-panel bg-gradient-to-br from-primary to-[#0a67c4] p-6 text-white">
            <p className="text-xs font-body uppercase tracking-[0.18em] opacity-75">
              {lang === 'EN' ? 'Registration Guidance' : 'คำแนะนำการลงทะเบียน'}
            </p>
            <h2 className="mt-3 text-2xl font-heading font-bold">
              {lang === 'EN' ? 'A nurse will verify these details after step five.' : 'พยาบาลจะตรวจสอบข้อมูลอีกครั้งหลังจบขั้นตอนที่ห้า'}
            </h2>
            <p className="mt-4 text-sm font-body leading-6 text-white/80">
              {lang === 'EN'
                ? 'You can continue now and fill in your address, emergency contact, insurance, and safety profile in the next screens.'
                : 'คุณสามารถดำเนินการต่อเพื่อกรอกข้อมูลติดต่อ ผู้ติดต่อฉุกเฉิน ประกัน และข้อมูลด้านความปลอดภัยของผู้ป่วยในหน้าถัดไป'}
            </p>
          </section>
        </div>
      </div>
    </SignUpShell>
  )
}
