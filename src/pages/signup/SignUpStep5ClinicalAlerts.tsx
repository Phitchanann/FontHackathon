import { useState } from 'react'
import { ProgressBar } from '../../components/ui/ProgressBar'

interface SignUpStep5Props {
  lang: 'EN' | 'TH'
  onBack: () => void
  onSubmit: () => void
}

const STEPS_EN = ['Personal', 'Contact', 'Emergency', 'Insurance', 'Alerts']

interface AlertEntry {
  id: string
  type: 'allergy' | 'medication' | 'condition'
  severity: 'high' | 'medium' | 'low'
  description: string
}

const severityColors = {
  high: 'bg-red-50 border-red-200 text-red-700',
  medium: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  low: 'bg-green-50 border-green-200 text-green-700',
}

const severityDot = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
}

export default function SignUpStep5ClinicalAlerts({ lang, onBack, onSubmit }: SignUpStep5Props) {
  const [alerts, setAlerts] = useState<AlertEntry[]>([
    { id: '1', type: 'allergy', severity: 'high', description: 'Penicillin — anaphylaxis risk' },
    { id: '2', type: 'condition', severity: 'medium', description: 'Hypertension — monitor BP' },
  ])
  const [newDesc, setNewDesc] = useState('')
  const [newType, setNewType] = useState<AlertEntry['type']>('allergy')
  const [newSeverity, setNewSeverity] = useState<AlertEntry['severity']>('high')
  const [consent, setConsent] = useState(false)
  const [dataSharing, setDataSharing] = useState(false)

  function addAlert() {
    if (!newDesc.trim()) return
    setAlerts((prev) => [
      ...prev,
      { id: Date.now().toString(), type: newType, severity: newSeverity, description: newDesc },
    ])
    setNewDesc('')
  }

  function removeAlert(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

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
        <ProgressBar current={5} total={5} steps={STEPS_EN} />
      </header>

      <div className="max-w-2xl mx-auto py-12 px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-bold text-text-primary">
            {lang === 'EN' ? 'Clinical Alerts' : 'แจ้งเตือนทางคลินิก'}
          </h1>
          <p className="text-lg font-body text-text-secondary mt-2">
            {lang === 'EN'
              ? 'Step 5 of 5 — Important health alerts for medical staff'
              : 'ขั้นตอนที่ 5 จาก 5 — ข้อมูลสำคัญสำหรับบุคลากรทางการแพทย์'}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Existing alerts */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-heading font-bold text-text-primary">
              {lang === 'EN' ? 'Active Alerts' : 'การแจ้งเตือนที่ใช้งาน'}
            </h2>
            {alerts.length === 0 && (
              <p className="text-sm font-body text-text-muted py-4 text-center">
                {lang === 'EN' ? 'No alerts added yet.' : 'ยังไม่มีการแจ้งเตือน'}
              </p>
            )}
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-4 p-4 rounded-chip border ${severityColors[alert.severity]}`}
              >
                <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${severityDot[alert.severity]}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-body uppercase tracking-wide opacity-70">{alert.type}</span>
                    <span className="text-xs font-body uppercase tracking-wide opacity-70">•</span>
                    <span className="text-xs font-body uppercase tracking-wide opacity-70">{alert.severity}</span>
                  </div>
                  <p className="text-base font-body">{alert.description}</p>
                </div>
                <button onClick={() => removeAlert(alert.id)} className="text-current opacity-50 hover:opacity-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Add new alert */}
          <div className="bg-white rounded-card shadow-card p-6 flex flex-col gap-4">
            <h2 className="text-lg font-heading font-bold text-text-primary">
              {lang === 'EN' ? 'Add Alert' : 'เพิ่มการแจ้งเตือน'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-body text-text-muted">
                  {lang === 'EN' ? 'Type' : 'ประเภท'}
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as AlertEntry['type'])}
                  className="input-field"
                >
                  <option value="allergy">{lang === 'EN' ? 'Allergy' : 'การแพ้'}</option>
                  <option value="medication">{lang === 'EN' ? 'Medication' : 'ยา'}</option>
                  <option value="condition">{lang === 'EN' ? 'Condition' : 'โรค'}</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-body text-text-muted">
                  {lang === 'EN' ? 'Severity' : 'ความรุนแรง'}
                </label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as AlertEntry['severity'])}
                  className="input-field"
                >
                  <option value="high">{lang === 'EN' ? 'High' : 'สูง'}</option>
                  <option value="medium">{lang === 'EN' ? 'Medium' : 'ปานกลาง'}</option>
                  <option value="low">{lang === 'EN' ? 'Low' : 'ต่ำ'}</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addAlert()}
                placeholder={lang === 'EN' ? 'Describe the alert...' : 'อธิบายการแจ้งเตือน...'}
                className="input-field flex-1"
              />
              <button type="button" onClick={addAlert} className="btn-primary px-6">
                {lang === 'EN' ? 'Add' : 'เพิ่ม'}
              </button>
            </div>
          </div>

          {/* Consent */}
          <div className="bg-white rounded-card shadow-card p-6 flex flex-col gap-4">
            <h2 className="text-lg font-heading font-bold text-text-primary">
              {lang === 'EN' ? 'Consent & Agreement' : 'ความยินยอม'}
            </h2>
            {[
              {
                key: 'consent',
                value: consent,
                set: setConsent,
                text: lang === 'EN'
                  ? 'I consent to the collection and use of my personal health information for the purpose of medical treatment at this facility.'
                  : 'ฉันยินยอมให้เก็บรวบรวมและใช้ข้อมูลสุขภาพส่วนบุคคลของฉันเพื่อการรักษาพยาบาลที่สถานพยาบาลนี้',
              },
              {
                key: 'dataSharing',
                value: dataSharing,
                set: setDataSharing,
                text: lang === 'EN'
                  ? 'I agree to share my medical records with referring physicians and specialists as needed for my care.'
                  : 'ฉันยินยอมให้แชร์ประวัติทางการแพทย์กับแพทย์และผู้เชี่ยวชาญที่เกี่ยวข้องตามความจำเป็น',
              },
            ].map(({ key, value, set, text }) => (
              <label key={key} className="flex items-start gap-4 cursor-pointer">
                <button
                  type="button"
                  onClick={() => set((v: boolean) => !v)}
                  className={`mt-1 h-6 w-6 rounded shrink-0 border-2 flex items-center justify-center transition-colors ${
                    value ? 'bg-primary border-primary' : 'border-surface-border'
                  }`}
                >
                  {value && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
                <span className="text-sm font-body text-text-secondary leading-relaxed">{text}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button type="button" onClick={onBack} className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {lang === 'EN' ? 'Back' : 'ย้อนกลับ'}
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!consent}
              className={`btn-primary ${!consent ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {lang === 'EN' ? '✓ Complete Registration' : '✓ ลงทะเบียนเสร็จสิ้น'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
