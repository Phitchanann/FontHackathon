import { TriageBadge } from '../../components/ui/Badge'
import type { QueuePatient } from '../../types/patient'

interface PatientDetailPanelProps {
  patient: QueuePatient
  lang: 'EN' | 'TH'
  onClose: () => void
  onStatusChange: (id: string, status: QueuePatient['status']) => void
}

export default function PatientDetailPanel({ patient, lang, onClose, onStatusChange }: PatientDetailPanelProps) {
  const vitals = patient.vitalSigns

  return (
    <aside className="w-80 bg-white border-l border-surface-border flex flex-col overflow-y-auto shrink-0">
      {/* Header */}
      <div className="p-5 border-b border-surface-border flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TriageBadge level={patient.triage} lang={lang} />
          </div>
          <h2 className="text-lg font-heading font-bold text-text-primary">{patient.nameTH}</h2>
          <p className="text-sm font-body text-text-muted">{patient.name} · {patient.hn}</p>
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary p-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Queue info */}
      <div className="p-5 border-b border-surface-border flex gap-6">
        <div>
          <p className="text-xs font-body text-text-muted">{lang === 'EN' ? 'Queue' : 'คิว'}</p>
          <p className="text-xl font-heading font-bold text-primary">{patient.queueNumber}</p>
        </div>
        <div>
          <p className="text-xs font-body text-text-muted">{lang === 'EN' ? 'Arrival' : 'เวลามา'}</p>
          <p className="text-xl font-heading font-bold text-text-primary">{patient.arrivalTime}</p>
        </div>
        <div>
          <p className="text-xs font-body text-text-muted">{lang === 'EN' ? 'Pain' : 'ปวด'}</p>
          <p className={`text-xl font-heading font-bold ${patient.painScale >= 8 ? 'text-danger' : patient.painScale >= 5 ? 'text-yellow-600' : 'text-green-600'}`}>
            {patient.painScale}<span className="text-sm text-text-muted">/10</span>
          </p>
        </div>
      </div>

      {/* Chief complaint */}
      <div className="p-5 border-b border-surface-border">
        <p className="text-xs font-body text-text-muted mb-2 uppercase tracking-wide">
          {lang === 'EN' ? 'Chief Complaint' : 'อาการหลัก'}
        </p>
        <p className="text-sm font-body text-text-primary leading-relaxed">{patient.chiefComplaint}</p>
      </div>

      {/* Vital signs */}
      {vitals && (
        <div className="p-5 border-b border-surface-border">
          <p className="text-xs font-body text-text-muted mb-3 uppercase tracking-wide">
            {lang === 'EN' ? 'Vital Signs' : 'สัญญาณชีพ'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'BP', value: vitals.bloodPressure, unit: 'mmHg', alert: false },
              { label: 'HR', value: vitals.heartRate, unit: 'bpm', alert: vitals.heartRate > 100 },
              { label: 'Temp', value: vitals.temperature, unit: '°C', alert: vitals.temperature > 38 },
              { label: 'SpO₂', value: vitals.spo2, unit: '%', alert: vitals.spo2 < 95 },
              { label: 'RR', value: vitals.respiratoryRate, unit: '/min', alert: vitals.respiratoryRate > 20 },
            ].map(({ label, value, unit, alert }) => (
              <div
                key={label}
                className={`p-3 rounded-chip ${alert ? 'bg-red-50 border border-red-200' : 'bg-surface-input'}`}
              >
                <p className="text-xs font-body text-text-muted">{label}</p>
                <p className={`text-base font-heading font-bold ${alert ? 'text-danger' : 'text-text-primary'}`}>
                  {value}
                  <span className="text-xs font-body font-normal text-text-muted ml-0.5">{unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Room assignment */}
      <div className="p-5 border-b border-surface-border">
        <p className="text-xs font-body text-text-muted mb-3 uppercase tracking-wide">
          {lang === 'EN' ? 'Room Assignment' : 'ห้องที่จัดให้'}
        </p>
        {patient.room ? (
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-chip bg-primary-light flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00478d" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </span>
            <span className="text-base font-heading font-bold text-primary">{patient.room}</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {['Exam 1', 'Exam 2', 'Exam 3', 'Resus'].map((room) => (
              <button
                key={room}
                onClick={() => onStatusChange(patient.id, 'in-progress')}
                className="h-10 bg-surface-input rounded-chip text-sm font-body text-text-primary hover:bg-primary-light hover:text-primary transition-colors"
              >
                {room}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-5 flex flex-col gap-3 mt-auto">
        {patient.status === 'waiting' && (
          <button
            onClick={() => onStatusChange(patient.id, 'in-progress')}
            className="btn-primary justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            {lang === 'EN' ? 'Call Patient' : 'เรียกผู้ป่วย'}
          </button>
        )}
        {patient.status === 'in-progress' && (
          <button
            onClick={() => onStatusChange(patient.id, 'done')}
            className="h-14 px-8 bg-green-600 text-white rounded-btn font-body text-lg flex items-center justify-center gap-3 hover:bg-green-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {lang === 'EN' ? 'Mark as Done' : 'เสร็จสิ้น'}
          </button>
        )}
        <button className="btn-secondary justify-center text-base">
          {lang === 'EN' ? 'View Full Record' : 'ดูประวัติทั้งหมด'}
        </button>
      </div>
    </aside>
  )
}
