import { useState } from 'react'
import { ProgressBar } from '../../components/ui/ProgressBar'

interface SignUpStep1Props {
  lang: 'EN' | 'TH'
  onNext: () => void
}

const STEPS_EN = ['Personal', 'Contact', 'Emergency', 'Insurance', 'Alerts']
const STEPS_TH = ['ข้อมูลส่วนตัว', 'ติดต่อ', 'ฉุกเฉิน', 'ประกัน', 'แจ้งเตือน']

export default function SignUpStep1Personal({ lang, onNext }: SignUpStep1Props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstNameTH, setFirstNameTH] = useState('')
  const [lastNameTH, setLastNameTH] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [hn, setHn] = useState('')

  const steps = lang === 'EN' ? STEPS_EN : STEPS_TH

  return (
    <div className="min-h-screen bg-surface">
      {/* Registration header */}
      <header className="bg-white shadow-header px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="font-heading font-bold text-xl text-primary-dark">Clinical Clarity</span>
        </div>
        <ProgressBar current={1} total={5} steps={steps} />
        <div className="flex gap-4">
          <button className="text-sm font-body text-text-secondary hover:text-primary">
            {lang === 'EN' ? 'Save & Exit' : 'บันทึกและออก'}
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto py-12 px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-bold text-text-primary">
            {lang === 'EN' ? 'Personal Information' : 'ข้อมูลส่วนตัว'}
          </h1>
          <p className="text-lg font-body text-text-secondary mt-2">
            {lang === 'EN' ? 'Step 1 of 5 — Your basic information' : 'ขั้นตอนที่ 1 จาก 5'}
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); onNext() }}>
          {/* HN */}
          <div className="bg-primary-light rounded-chip p-4 flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00478d" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <div className="flex-1">
              <input
                value={hn}
                onChange={(e) => setHn(e.target.value)}
                placeholder={lang === 'EN' ? 'Hospital Number (HN) — leave blank for new patient' : 'เลขประจำตัวผู้ป่วย (ถ้ามี)'}
                className="w-full bg-transparent font-body text-primary placeholder:text-primary/50 outline-none"
              />
            </div>
          </div>

          {/* Name EN */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'First Name (EN)' : 'ชื่อ (อังกฤษ)'}
              </label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Somchai" className="input-field" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'Last Name (EN)' : 'นามสกุล (อังกฤษ)'}
              </label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Jaidee" className="input-field" />
            </div>
          </div>

          {/* Name TH */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'First Name (TH)' : 'ชื่อ (ไทย)'}
              </label>
              <input value={firstNameTH} onChange={(e) => setFirstNameTH(e.target.value)} placeholder="เช่น สมชาย" className="input-field" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'Last Name (TH)' : 'นามสกุล (ไทย)'}
              </label>
              <input value={lastNameTH} onChange={(e) => setLastNameTH(e.target.value)} placeholder="เช่น ใจดี" className="input-field" />
            </div>
          </div>

          {/* DOB & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'Date of Birth' : 'วันเกิด'}
              </label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="input-field" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-body text-text-secondary">
                {lang === 'EN' ? 'Gender' : 'เพศ'}
              </label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-field">
                <option value="">{lang === 'EN' ? 'Select...' : 'เลือก...'}</option>
                <option value="male">{lang === 'EN' ? 'Male' : 'ชาย'}</option>
                <option value="female">{lang === 'EN' ? 'Female' : 'หญิง'}</option>
                <option value="other">{lang === 'EN' ? 'Other / Prefer not to say' : 'อื่นๆ'}</option>
              </select>
            </div>
          </div>

          {/* National ID */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-body text-text-secondary">
              {lang === 'EN' ? 'National ID / Passport Number' : 'เลขบัตรประชาชน / Passport'}
            </label>
            <input
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="1-XXXX-XXXXX-XX-X"
              className="input-field tracking-widest"
              maxLength={17}
            />
          </div>

          <div className="flex justify-between pt-4">
            <div />
            <button type="submit" className="btn-primary">
              {lang === 'EN' ? 'Next: Contact Info' : 'ถัดไป: ข้อมูลติดต่อ'}
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
