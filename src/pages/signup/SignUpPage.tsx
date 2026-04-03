import { useState } from 'react'
import type { Language } from '../../types/patient'
import SignUpStep1Personal from './SignUpStep1Personal'
import SignUpStep2Contact from './SignUpStep2Contact'
import SignUpStep3Emergency from './SignUpStep3Emergency'
import SignUpStep4Insurance from './SignUpStep4Insurance'
import SignUpStep5ClinicalAlerts from './SignUpStep5ClinicalAlerts'
import { useNavigate } from 'react-router-dom'

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [lang] = useState<Language>('EN')
  const navigate = useNavigate()

  function next() { setStep((s) => Math.min(s + 1, 5)) }
  function back() { setStep((s) => Math.max(s - 1, 1)) }
  function handleSubmit() { navigate('/') }

  return (
    <>
      {step === 1 && <SignUpStep1Personal lang={lang} onNext={next} />}
      {step === 2 && <SignUpStep2Contact lang={lang} onBack={back} onNext={next} />}
      {step === 3 && <SignUpStep3Emergency lang={lang} onBack={back} onNext={next} />}
      {step === 4 && <SignUpStep4Insurance lang={lang} onBack={back} onNext={next} />}
      {step === 5 && <SignUpStep5ClinicalAlerts lang={lang} onBack={back} onSubmit={handleSubmit} />}
    </>
  )
}
