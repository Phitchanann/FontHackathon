import { useMemo, useState } from 'react'
import SignUpShell from '../../components/signup/SignUpShell'

interface SignUpStep5Props {
  lang: 'EN' | 'TH'
  onLangChange: (lang: 'EN' | 'TH') => void
  onBack: () => void
  onSubmit: () => void
}

type BloodGroup = 'A' | 'B' | 'O' | 'AB'
type RhFactor = '+' | '-'

export default function SignUpStep5ClinicalAlerts({ lang, onLangChange, onBack, onSubmit }: SignUpStep5Props) {
  const [noKnownDrugAllergies, setNoKnownDrugAllergies] = useState(false)
  const [drugAllergy, setDrugAllergy] = useState('Penicillin Allergy')
  const [foodAllergy, setFoodAllergy] = useState('Shellfish')
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O')
  const [rhFactor, setRhFactor] = useState<RhFactor>('+')
  const [consent, setConsent] = useState(true)

  const bloodTypeLabel = useMemo(
    () => `${bloodGroup}${rhFactor === '+' ? '+' : '-'}`,
    [bloodGroup, rhFactor]
  )

  return (
    <SignUpShell
      currentStep={5}
      lang={lang}
      onLangChange={onLangChange}
      title={
        <>
          {lang === 'EN' ? 'Clinical Alerts ' : 'การแจ้งเตือนทางคลินิก '}
          <span className="text-primary">{lang === 'EN' ? 'Patient Safety' : 'เพื่อความปลอดภัยผู้ป่วย'}</span>
        </>
      }
      subtitle={
        lang === 'EN'
          ? 'Please provide critical medical information to ensure your safe treatment.'
          : 'โปรดให้ข้อมูลทางการแพทย์ที่สำคัญเพื่อความปลอดภัยในการรักษาของคุณ'
      }
      contentWidthClassName="max-w-[1140px]"
      footer={
        <div className="flex items-center justify-between gap-4">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-body text-text-secondary transition-colors hover:text-text-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            {lang === 'EN' ? 'Previous' : 'ย้อนกลับ'}
          </button>
          <button
            onClick={onSubmit}
            disabled={!consent}
            className={`btn-primary ${!consent ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {lang === 'EN' ? 'Complete Registration' : 'เสร็จสิ้นการลงทะเบียน'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </button>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr,280px]">
        <div className="space-y-6">
          <section className="signup-panel p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-danger">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-text-primary">
                    {lang === 'EN' ? 'Drug Allergies' : 'การแพ้ยา'}
                  </h2>
                  <p className="signup-helper mt-1">{lang === 'EN' ? 'การแพ้ยา' : 'ระบุยาที่แพ้และความรุนแรง'}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNoKnownDrugAllergies((previous) => !previous)}
                className={`inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-body transition-colors ${
                  noKnownDrugAllergies ? 'bg-[#eef7ef] text-green-700' : 'bg-[#f5f7fa] text-text-secondary'
                }`}
              >
                <span
                  className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${noKnownDrugAllergies ? 'bg-green-600' : 'bg-[#d6dde8]'}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${noKnownDrugAllergies ? 'translate-x-5' : 'translate-x-0.5'}`}
                  />
                </span>
                {lang === 'EN' ? 'No Known Drug Allergies (NKDA)' : 'ไม่มีประวัติแพ้ยา'}
              </button>
            </div>

            <div className="mt-5 rounded-[24px] bg-[#fcfcfd] p-5">
              <div className="flex items-center justify-between gap-4">
                <label className="signup-label">
                  {lang === 'EN' ? 'Critical Allergy Details' : 'รายละเอียดการแพ้ที่สำคัญ'}
                </label>
                {!noKnownDrugAllergies && (
                  <span className="rounded-full bg-danger px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-[0.14em] text-white">
                    Critical
                  </span>
                )}
              </div>
              <textarea
                value={noKnownDrugAllergies ? '' : drugAllergy}
                onChange={(event) => setDrugAllergy(event.target.value)}
                disabled={noKnownDrugAllergies}
                placeholder={
                  lang === 'EN'
                    ? 'Please list all drugs you are allergic to and your reactions (e.g. Penicillin - rash)'
                    : 'กรุณาระบุยาที่แพ้และอาการตอบสนอง เช่น Penicillin - ผื่น'
                }
                className={`textarea-field mt-3 min-h-32 ${noKnownDrugAllergies ? 'opacity-60' : ''}`}
              />
            </div>
          </section>

          <section className="signup-panel p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 2v11" />
                  <path d="M11 2v11" />
                  <path d="M5 6h8" />
                  <path d="M16 3s1.5 2 1.5 4A3.5 3.5 0 0 1 14 10.5c0-2 2-4.5 2-4.5z" />
                  <path d="M5 14h14" />
                  <path d="M6 18h12" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-primary">
                  {lang === 'EN' ? 'Food & Chemical Allergies' : 'การแพ้อาหารและสารเคมี'}
                </h2>
                <p className="signup-helper mt-1">{lang === 'EN' ? 'การแพ้อาหารทางการแพทย์/สารเคมี' : 'ระบุอาหารหรือสารเคมีที่แพ้'}</p>
              </div>
            </div>

            <input
              value={foodAllergy}
              onChange={(event) => setFoodAllergy(event.target.value)}
              placeholder={lang === 'EN' ? 'e.g. Shellfish, Latex, Peanuts' : 'เช่น อาหารทะเล ยางลาเท็กซ์ ถั่ว'}
              className="input-field mt-5"
            />
          </section>

          <section className="signup-panel p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20" />
                  <path d="M2 12h20" />
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-primary">
                  {lang === 'EN' ? 'Blood Type' : 'หมู่เลือด'}
                </h2>
                <p className="signup-helper mt-1">{lang === 'EN' ? 'หมู่เลือด' : 'เลือกหมู่เลือดและ Rh factor'}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {(['A', 'B', 'O', 'AB'] as BloodGroup[]).map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setBloodGroup(group)}
                  className={`flex h-14 min-w-[76px] items-center justify-center rounded-2xl text-xl font-heading font-bold transition-all ${
                    bloodGroup === group
                      ? 'bg-primary text-white shadow-btn'
                      : 'bg-[#f3f5f8] text-text-primary hover:bg-primary-light'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-[22px] bg-[#f5f7fa] px-4 py-4">
              <span className="text-sm font-body text-text-secondary">Rh Factor</span>
              {(['+', '-'] as RhFactor[]).map((factor) => (
                <button
                  key={factor}
                  type="button"
                  onClick={() => setRhFactor(factor)}
                  className={`rounded-xl px-5 py-2 text-sm font-heading font-bold transition-colors ${
                    rhFactor === factor ? 'bg-primary text-white' : 'bg-white text-text-secondary'
                  }`}
                >
                  Rh{factor}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="signup-panel p-5">
            <div className="flex items-center gap-2 text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              <h3 className="text-lg font-heading font-bold text-text-primary">
                {lang === 'EN' ? 'Review Summary' : 'สรุปข้อมูล'}
              </h3>
            </div>

            <div className="mt-5 space-y-4 text-sm font-body">
              <div>
                <p className="signup-label text-danger">{lang === 'EN' ? 'Critical Alert' : 'จุดสำคัญ'}</p>
                <p className="mt-2 font-semibold text-text-primary">
                  {noKnownDrugAllergies ? (lang === 'EN' ? 'No known drug allergies' : 'ไม่มีประวัติแพ้ยา') : drugAllergy || 'Penicillin Allergy'}
                </p>
                <p className="mt-1 text-text-muted">{lang === 'EN' ? 'Reaction: Severe anaphylaxis' : 'ปฏิกิริยา: เสี่ยงรุนแรง'}</p>
              </div>

              <div>
                <p className="signup-label text-primary">{lang === 'EN' ? 'Blood Profile' : 'ข้อมูลเลือด'}</p>
                <p className="mt-2 font-semibold text-text-primary">{lang === 'EN' ? `Type ${bloodTypeLabel}` : `หมู่เลือด ${bloodTypeLabel}`}</p>
              </div>

              <div>
                <p className="signup-label text-green-700">{lang === 'EN' ? 'Dietary / Chemical' : 'อาหาร / สารเคมี'}</p>
                <p className="mt-2 font-semibold text-text-primary">{foodAllergy || (lang === 'EN' ? 'None reported' : 'ไม่มีข้อมูล')}</p>
              </div>
            </div>
          </section>

          <section className="signup-panel p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-body font-semibold text-text-primary">
                  {lang === 'EN' ? 'Final Verification' : 'การยืนยันขั้นสุดท้าย'}
                </p>
                <p className="mt-2 text-sm font-body leading-6 text-text-secondary">
                  {lang === 'EN'
                    ? 'By clicking complete, you verify that all clinical alerts provided are accurate to the best of your knowledge.'
                    : 'เมื่อกดเสร็จสิ้น คุณยืนยันว่าข้อมูลเตือนทางคลินิกทั้งหมดถูกต้องตามที่คุณทราบ'}
                </p>

                <label className="mt-4 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-surface-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-body text-text-secondary">
                    {lang === 'EN' ? 'I confirm and consent to save this information.' : 'ฉันยืนยันและยินยอมให้บันทึกข้อมูลนี้'}
                  </span>
                </label>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1e8ab7] via-[#4bb5db] to-[#d2f4ff] p-5 text-white shadow-card">
            <div className="rounded-[22px] bg-white/20 p-4 backdrop-blur-sm">
              <p className="text-sm font-body font-semibold">{lang === 'EN' ? 'Data Security' : 'ความปลอดภัยข้อมูล'}</p>
              <p className="mt-2 text-sm font-body leading-6 text-white/85">
                {lang === 'EN'
                  ? 'Your data is encrypted and handled according to hospital security standards and privacy policy.'
                  : 'ข้อมูลของคุณถูกเข้ารหัสและดูแลตามมาตรฐานความปลอดภัยและนโยบายความเป็นส่วนตัวของโรงพยาบาล'}
              </p>
            </div>
          </section>
        </div>
      </div>
    </SignUpShell>
  )
}
