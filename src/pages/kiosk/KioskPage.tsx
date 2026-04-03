import { useState } from 'react'
import type { Language } from '../../types/patient'
import KioskStep1Welcome from './KioskStep1Welcome'
import KioskStep2Symptoms from './KioskStep2Symptoms'
import KioskStep3MedicalHistory from './KioskStep3MedicalHistory'
import KioskStep4Logistics from './KioskStep4Logistics'
import KioskStep5Review from './KioskStep5Review'
import { KioskHeader } from '../../components/kiosk/KioskHeader'
import { KioskFooter } from '../../components/kiosk/KioskFooter'

const TOTAL_STEPS = 5

export default function KioskPage() {
  const [step, setStep] = useState(0) // 0 = welcome, 1-5 = steps
  const [lang, setLang] = useState<Language>('EN')
  const [done, setDone] = useState(false)

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1))
  }

  if (done) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-6 text-center px-8">
        <div className="h-24 w-24 rounded-card bg-green-100 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-4xl font-heading font-bold text-text-primary">
          {lang === 'EN' ? 'Registration Complete!' : 'ลงทะเบียนสำเร็จ!'}
        </h1>
        <p className="text-xl font-body text-text-secondary max-w-lg">
          {lang === 'EN'
            ? 'Please take a seat. A nurse will call your queue number shortly.'
            : 'กรุณานั่งรอ พยาบาลจะเรียกหมายเลขคิวของคุณในไม่ช้า'}
        </p>
        <div className="flex flex-col items-center gap-2 bg-white rounded-card shadow-card px-12 py-6">
          <p className="text-sm font-body text-text-muted">
            {lang === 'EN' ? 'Your Queue Number' : 'หมายเลขคิวของคุณ'}
          </p>
          <p className="text-6xl font-heading font-black text-primary">A-043</p>
        </div>
        <button
          onClick={() => { setStep(0); setDone(false) }}
          className="btn-secondary mt-4"
        >
          {lang === 'EN' ? 'New Registration' : 'ลงทะเบียนใหม่'}
        </button>
      </div>
    )
  }

  // Welcome screen (step 0)
  if (step === 0) {
    return <KioskStep1Welcome lang={lang} onStart={() => setStep(1)} />
  }

  return (
    <div className="relative">
      <KioskHeader step={step} totalSteps={TOTAL_STEPS} lang={lang} onLangChange={setLang} />

      {step === 1 && <KioskStep2Symptoms lang={lang} />}
      {step === 2 && <KioskStep3MedicalHistory lang={lang} />}
      {step === 3 && <KioskStep4Logistics lang={lang} />}
      {step === 4 && <KioskStep5Review lang={lang} onConfirm={next} />}
      {step === 5 && (() => { setDone(true); return null })()}

      <KioskFooter
        step={step}
        totalSteps={TOTAL_STEPS}
        onBack={step > 1 ? back : undefined}
        onNext={step < 4 ? next : () => setDone(true)}
        nextLabel={step === 4 ? (lang === 'EN' ? 'Submit' : 'ส่งข้อมูล') : lang === 'EN' ? 'Continue' : 'ถัดไป'}
        backLabel={lang === 'EN' ? 'Back' : 'ย้อนกลับ'}
      />
    </div>
  )
}
