import { Card } from '../../components/ui/Card'

interface KioskStep5Props {
  lang: 'EN' | 'TH'
  onConfirm: () => void
}

// Mocked summary data (in real app, collected from prev steps via context/state)
const summaryData = {
  name: 'Somchai Jaidee',
  nameTH: 'สมชาย ใจดี',
  dob: '12 Mar 1980',
  hn: 'HN-2024-001',
  chiefComplaint: 'Chest pain, shortness of breath since this morning',
  painScale: 8,
  duration: 'Today',
  symptoms: ['Fever', 'Nausea'],
  chronic: ['Hypertension'],
  medications: 'Amlodipine 5mg once daily',
  allergies: 'Penicillin',
  insurance: 'Government / UC Scheme',
  lang: 'Thai',
}

export default function KioskStep5Review({ lang, onConfirm }: KioskStep5Props) {
  return (
    <div className="pt-20 pb-28 bg-surface min-h-screen px-12">
      <div className="max-w-screen-xl mx-auto pt-14">
        <div className="mb-12">
          <h1 className="text-5xl font-heading font-black text-text-primary tracking-tight">
            {lang === 'EN' ? 'Review & Confirm' : 'ตรวจสอบและยืนยัน'}
          </h1>
          <p className="text-xl font-body text-text-secondary opacity-80 mt-4">
            {lang === 'EN'
              ? 'Step 5: Please review your information before submitting.'
              : 'ขั้นตอนที่ 5: ตรวจสอบข้อมูลก่อนส่ง'}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 flex flex-col gap-6">
            {/* Patient Identity */}
            <Card>
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-text-primary">
                  {lang === 'EN' ? 'Patient Identity' : 'ข้อมูลผู้ป่วย'}
                </h2>
                <button className="text-sm font-body text-primary hover:underline">
                  {lang === 'EN' ? 'Edit' : 'แก้ไข'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: lang === 'EN' ? 'Full Name' : 'ชื่อ-นามสกุล', value: `${summaryData.nameTH} (${summaryData.name})` },
                  { label: lang === 'EN' ? 'Date of Birth' : 'วันเกิด', value: summaryData.dob },
                  { label: lang === 'EN' ? 'Hospital Number' : 'เลขผู้ป่วย', value: summaryData.hn },
                  { label: lang === 'EN' ? 'Insurance' : 'สิทธิ์การรักษา', value: summaryData.insurance },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-sm font-body text-text-muted mb-1">{label}</p>
                    <p className="text-base font-body text-text-primary font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chief Complaint Summary */}
            <Card>
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-text-primary">
                  {lang === 'EN' ? 'Symptoms' : 'อาการ'}
                </h2>
                <button className="text-sm font-body text-primary hover:underline">
                  {lang === 'EN' ? 'Edit' : 'แก้ไข'}
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-body text-text-muted mb-1">
                    {lang === 'EN' ? 'Chief Complaint' : 'อาการหลัก'}
                  </p>
                  <p className="text-base font-body text-text-primary">{summaryData.chiefComplaint}</p>
                </div>
                <div className="flex gap-8">
                  <div>
                    <p className="text-sm font-body text-text-muted mb-1">
                      {lang === 'EN' ? 'Pain Scale' : 'ระดับความเจ็บปวด'}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-chip bg-danger/10 border border-danger/30 flex items-center justify-center">
                        <span className="text-danger font-heading font-bold text-sm">{summaryData.painScale}</span>
                      </div>
                      <span className="text-base font-body text-text-primary">/ 10 — Severe</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-body text-text-muted mb-1">
                      {lang === 'EN' ? 'Duration' : 'ระยะเวลา'}
                    </p>
                    <p className="text-base font-body text-text-primary">{summaryData.duration}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-body text-text-muted mb-2">
                    {lang === 'EN' ? 'Other Symptoms' : 'อาการอื่นๆ'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {summaryData.symptoms.map((s) => (
                      <span key={s} className="px-3 py-1 bg-primary-light text-primary text-sm font-body rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Medical History Summary */}
            <Card>
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-text-primary">
                  {lang === 'EN' ? 'Medical History' : 'ประวัติสุขภาพ'}
                </h2>
                <button className="text-sm font-body text-primary hover:underline">
                  {lang === 'EN' ? 'Edit' : 'แก้ไข'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm font-body text-text-muted mb-2">
                    {lang === 'EN' ? 'Chronic Conditions' : 'โรคประจำตัว'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {summaryData.chronic.map((c) => (
                      <span key={c} className="px-3 py-1 bg-surface-input text-text-primary text-sm font-body rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-body text-text-muted mb-1">
                    {lang === 'EN' ? 'Allergies' : 'การแพ้'}
                  </p>
                  <p className="text-base font-body text-danger font-medium">⚠ {summaryData.allergies}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-body text-text-muted mb-1">
                    {lang === 'EN' ? 'Current Medications' : 'ยาที่ใช้'}
                  </p>
                  <p className="text-base font-body text-text-primary">{summaryData.medications}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Consent & Confirm */}
          <div className="col-span-4 flex flex-col gap-6">
            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6">
                {lang === 'EN' ? 'AI Triage Estimate' : 'ผลการประเมินเบื้องต้น'}
              </h2>
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="h-20 w-20 rounded-card bg-red-50 border-2 border-danger/30 flex items-center justify-center">
                  <span className="text-3xl">🔴</span>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-heading font-bold text-danger">Immediate</p>
                  <p className="text-sm font-body text-text-muted mt-1">
                    {lang === 'EN' ? 'High-acuity — Please see nurse immediately' : 'วิกฤต — กรุณาพบพยาบาลทันที'}
                  </p>
                </div>
                <div className="w-full bg-surface-input rounded-chip px-4 py-3">
                  <p className="text-xs font-body text-text-muted text-center">
                    {lang === 'EN'
                      ? 'This is an AI estimate only. Final triage by nurse.'
                      : 'นี่คือการประเมินเบื้องต้นโดย AI เท่านั้น'}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-4">
                {lang === 'EN' ? 'Consent' : 'ความยินยอม'}
              </h2>
              <p className="text-sm font-body text-text-secondary leading-relaxed mb-6">
                {lang === 'EN'
                  ? 'By submitting, I consent to share this information with the attending medical team for the purpose of providing care.'
                  : 'การส่งข้อมูลนี้ถือว่าคุณยินยอมให้ทีมแพทย์ใช้ข้อมูลนี้ในการดูแลรักษา'}
              </p>
              <button
                onClick={onConfirm}
                className="w-full btn-primary justify-center text-xl"
              >
                {lang === 'EN' ? '✓ Confirm & Submit' : '✓ ยืนยันและส่งข้อมูล'}
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
