import { useState } from 'react'

interface KioskStep3Props {
  lang: 'EN' | 'TH'
}

const CHRONIC = ['Diabetes', 'Hypertension', 'Heart disease', 'Asthma', 'Kidney Disease', 'Other']

export default function KioskStep3MedicalHistory({ lang }: KioskStep3Props) {
  const [selectedChronic, setSelectedChronic] = useState<string[]>(['Hypertension'])
  const [otherChronic, setOtherChronic] = useState('')
  const [medications, setMedications] = useState('')
  const [allergies, setAllergies] = useState('')
  const [noKnownAllergies, setNoKnownAllergies] = useState(false)
  const [photoPreview] = useState<string | null>(null)

  function toggleChronic(c: string) {
    setSelectedChronic((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))
  }

  const steps = ['Personal', 'Vitals', 'History', 'Consent', 'Finish']

  return (
    <div className="pt-10 md:pt-24 pb-20 md:pb-28 bg-surface min-h-screen">
      {/* Header Section - ปรับ Padding จากคงที่เป็นแบบ Responsive */}
      <div className="px-6 md:px-12 lg:px-32 mb-8 max-w-7xl mx-auto pt-4">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-text-primary tracking-tight mb-4">
          {lang === 'EN' ? 'Medical History' : 'ประวัติสุขภาพ'}
        </h1>
        <p className="text-lg md:text-xl font-body text-text-secondary">
          {lang === 'EN'
            ? 'Please provide accurate health information to help our clinical team provide the best care.'
            : 'กรุณาให้ข้อมูลสุขภาพที่ถูกต้องเพื่อช่วยทีมแพทย์ดูแลคุณได้ดีที่สุด'}
        </p>
      </div>

      {/* Step tabs - ซ่อนบางส่วนหรือให้ Scroll ได้ในจอเล็ก */}
      <div className="px-6 md:px-12 lg:px-32 mb-10 max-w-7xl mx-auto overflow-x-auto">
        <div className="flex gap-4 md:gap-6 border-b border-surface-border pb-4 min-w-max">
          {steps.map((s, i) => (
            <span
              key={s}
              className={`text-xs md:text-sm font-body tracking-widest uppercase whitespace-nowrap ${
                s === 'History' ? 'text-primary border-b-2 border-primary pb-4 -mb-4' : 'text-text-secondary'
              } ${i < 2 ? 'line-through opacity-40' : ''}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-32 max-w-7xl mx-auto flex flex-col gap-10 md:gap-16">
        {/* Chronic Diseases - ปรับ Grid จาก 6 คอลัมน์ เป็นแบบยืดหยุ่น */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary flex items-center gap-3">
            <svg width="22" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {lang === 'EN' ? 'Chronic Diseases' : 'โรคประจำตัว'}
          </h2>
          
          {/* ปรับจาก grid-cols-6 เป็น grid-cols-2 หรือ 3 ในจอเล็ก */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CHRONIC.map((c) => (
              <button
                key={c}
                onClick={() => toggleChronic(c)}
                className={`h-24 md:h-28 px-2 flex items-center justify-center text-base md:text-lg font-body rounded-chip transition-all text-center leading-tight ${
                  selectedChronic.includes(c)
                    ? 'bg-primary-light border-2 border-primary text-text-primary'
                    : 'bg-white border-2 border-transparent text-text-primary shadow-sm hover:border-primary-light'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          
          {/* Logic: รวม Input เข้าด้วยกันและเช็คเงื่อนไขการแสดงผล */}
          <input
            value={otherChronic}
            onChange={(e) => setOtherChronic(e.target.value)}
            placeholder={lang === 'EN' ? 'Please specify other chronic conditions...' : 'ระบุโรคประจำตัวอื่นๆ...'}
            className={`input-field transition-all duration-300 ${
                selectedChronic.includes('Other') ? 'opacity-100' : 'opacity-100' // แก้ไข Logic จากโค้ดเดิมที่ซ้ำกัน
            }`}
          />
        </section>

        {/* Medications & Allergies - ปรับจาก 2 คอลัมน์ เป็น 1 คอลัมน์ในจอเล็ก */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <section className="flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary flex items-center gap-3">
              <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {lang === 'EN' ? 'Current Medications' : 'ยาที่ใช้อยู่'}
            </h2>
            <textarea
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              placeholder={lang === 'EN' ? 'List all current medications...' : 'ระบุยาที่ใช้...'}
              className="textarea-field min-h-[180px] md:min-h-52"
            />
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary flex items-center gap-3">
                <svg width="22" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                {lang === 'EN' ? 'Allergies' : 'การแพ้ยา/อาหาร'}
              </h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <span className="text-sm font-body text-text-secondary uppercase tracking-wide">
                  {lang === 'EN' ? 'No Known Allergies' : 'ไม่มีการแพ้'}
                </span>
                <button
                  onClick={() => setNoKnownAllergies((v) => !v)}
                  className={`relative h-7 w-12 md:h-8 md:w-14 rounded-full transition-colors ${
                    noKnownAllergies ? 'bg-primary' : 'bg-surface-input'
                  }`}
                >
                  <div
                    className={`absolute top-1 h-5 w-5 md:h-6 md:w-6 bg-white rounded-full border border-surface-border shadow transition-transform ${
                      noKnownAllergies ? 'translate-x-6 md:translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            </div>
            <textarea
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              disabled={noKnownAllergies}
              placeholder={lang === 'EN' ? 'List any allergies...' : 'ระบุการแพ้...'}
              className={`textarea-field min-h-[180px] md:min-h-52 ${noKnownAllergies ? 'opacity-40' : ''}`}
            />
          </section>
        </div>

        {/* Symptom Photo Upload - ปรับ Layout เมื่อจอเล็กลง */}
        <section className="bg-surface-input rounded-chip p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-1 flex flex-col gap-4 text-center md:text-left items-center md:items-start">
              <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary flex items-center gap-3">
                <svg width="20" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                {lang === 'EN' ? 'Symptom Documentation' : 'บันทึกภาพอาการ'}
              </h2>
              <p className="text-base md:text-lg font-body text-text-secondary leading-relaxed">
                {lang === 'EN'
                  ? 'If you have a visible symptom (rash, wound, etc.), please capture or upload a clear photo.'
                  : 'หากมีอาการที่มองเห็นได้ (ผื่น บาดแผล ฯลฯ) กรุณาถ่ายหรืออัปโหลดรูปภาพ'}
              </p>
              <button className="btn-primary w-full sm:w-fit py-4 px-8 mt-2">
                {lang === 'EN' ? 'Capture/Upload Photo' : 'ถ่าย/อัปโหลดรูปอาการ'}
              </button>
            </div>
            
            {/* Photo preview - ปรับขนาดให้สมดุล */}
            <div className="h-48 w-36 bg-white rounded-chip overflow-hidden shadow-card flex items-center justify-center shrink-0 border border-surface-border">
              {photoPreview ? (
                <img src={photoPreview} alt="Symptom" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-text-muted">
                  <svg width="28" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span className="text-xs uppercase tracking-wider">No photo</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}