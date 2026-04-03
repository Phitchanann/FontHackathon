import { useState } from 'react'
import { TriageBadge } from '../../components/ui/Badge'
import { usePatientQueue } from '../../hooks/usePatientQueue'
import { mockNurseStats } from '../../data/mockPatients'
import type { QueuePatient } from '../../types/patient'
import PatientDetailPanel from './PatientDetailPanel'

interface NurseDashboardProps {
  lang: 'EN' | 'TH'
  onLangChange: (l: 'EN' | 'TH') => void
}

type ViewTab = 'queue' | 'in-progress' | 'done'

const NAV_ITEMS = [
  { id: 'queue', iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', labelEN: 'Queue', labelTH: 'คิว' },
  { id: 'stats', iconPath: 'M18 20V10M12 20V4M6 20v-6', labelEN: 'Stats', labelTH: 'สถิติ' },
  { id: 'rooms', iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', labelEN: 'Rooms', labelTH: 'ห้อง' },
  { id: 'alerts', iconPath: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0', labelEN: 'Alerts', labelTH: 'แจ้งเตือน' },
]

const STAT_CARDS = [
  { labelEN: 'Waiting', labelTH: 'รอ', key: 'waiting', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { labelEN: 'In Progress', labelTH: 'กำลังรักษา', key: 'inProgress', color: 'text-blue-600', bg: 'bg-blue-50' },
  { labelEN: 'Done Today', labelTH: 'เสร็จวันนี้', key: 'done', color: 'text-green-600', bg: 'bg-green-50' },
  { labelEN: 'Avg. Wait', labelTH: 'เฉลี่ยรอ', key: 'avgWait', color: 'text-purple-600', bg: 'bg-purple-50' },
]

export default function NurseDashboard({ lang, onLangChange }: NurseDashboardProps) {
  const { queue, updateStatus } = usePatientQueue()
  const [activeTab, setActiveTab] = useState<ViewTab>('queue')
  const [selectedPatient, setSelectedPatient] = useState<QueuePatient | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeNav, setActiveNav] = useState('queue')

  const filteredQueue = queue.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameTH.includes(searchQuery) ||
      p.queueNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hn.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayQueue =
    activeTab === 'queue'
      ? filteredQueue.filter((p) => p.status === 'waiting')
      : activeTab === 'in-progress'
      ? filteredQueue.filter((p) => p.status === 'in-progress')
      : filteredQueue.filter((p) => p.status === 'done')

  const stats = {
    waiting: queue.filter((p) => p.status === 'waiting').length,
    inProgress: queue.filter((p) => p.status === 'in-progress').length,
    done: queue.filter((p) => p.status === 'done').length,
    avgWait: mockNurseStats.avgWaitMinutes,
  }

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Sidebar */}
      <aside className="w-20 bg-white border-r border-surface-border flex flex-col items-center py-6 gap-6 shrink-0">
        {/* Logo */}
        <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            title={lang === 'EN' ? item.labelEN : item.labelTH}
            className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
              activeNav === item.id ? 'bg-primary-light text-primary' : 'text-text-muted hover:bg-surface-input'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={item.iconPath} />
            </svg>
          </button>
        ))}
        <div className="mt-auto">
          <button className="h-12 w-12 rounded-xl flex items-center justify-center text-text-muted hover:bg-surface-input">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-surface-border px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl font-heading font-bold text-text-primary">
              {lang === 'EN' ? 'Nurse Station' : 'สถานีพยาบาล'}
            </h1>
            <p className="text-sm font-body text-text-muted">
              {new Date().toLocaleDateString(lang === 'TH' ? 'th-TH' : 'en-GB', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'EN' ? 'Search patient, HN, queue...' : 'ค้นหาผู้ป่วย HN คิว...'}
                className="pl-10 pr-4 py-2 bg-surface-input rounded-chip text-sm font-body w-64 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {/* Lang switcher */}
            <div className="bg-surface-input p-1 rounded-chip flex">
              {(['EN', 'TH'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => onLangChange(l)}
                  className={`px-3 py-1 rounded-chip text-sm font-body transition-colors ${
                    lang === l ? 'bg-white text-primary shadow-sm' : 'text-text-secondary opacity-70'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            {/* Notification */}
            <button className="relative h-10 w-10 rounded-xl bg-surface-input flex items-center justify-center text-text-muted">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {stats.waiting > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-danger rounded-full text-white text-xs flex items-center justify-center font-body">
                  {stats.waiting}
                </span>
              )}
            </button>
            {/* Avatar */}
            <div className="h-10 w-10 rounded-xl bg-primary-light flex items-center justify-center">
              <span className="text-sm font-heading font-bold text-primary">N</span>
            </div>
          </div>
        </header>

        {/* Stats row */}
        <div className="px-6 py-4 grid grid-cols-4 gap-4 shrink-0">
          {STAT_CARDS.map((s) => (
            <div key={s.key} className={`${s.bg} rounded-chip p-4 flex items-center gap-4`}>
              <div className="flex flex-col">
                <span className={`text-3xl font-heading font-bold ${s.color}`}>
                  {s.key === 'avgWait' ? `${stats.avgWait}m` : stats[s.key as keyof typeof stats]}
                </span>
                <span className="text-sm font-body text-text-muted">
                  {lang === 'EN' ? s.labelEN : s.labelTH}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Queue list */}
        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 flex flex-col overflow-hidden px-6 pb-6">
            {/* Tab switcher */}
            <div className="flex gap-1 bg-surface-input p-1 rounded-chip mb-4 w-fit shrink-0">
              {(['queue', 'in-progress', 'done'] as ViewTab[]).map((tab) => {
                const labels = {
                  queue: lang === 'EN' ? `Waiting (${stats.waiting})` : `รอ (${stats.waiting})`,
                  'in-progress': lang === 'EN' ? `In Progress (${stats.inProgress})` : `กำลังรักษา (${stats.inProgress})`,
                  done: lang === 'EN' ? `Done (${stats.done})` : `เสร็จ (${stats.done})`,
                }
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-chip text-sm font-body transition-colors ${
                      activeTab === tab ? 'bg-white text-primary shadow-sm font-medium' : 'text-text-muted'
                    }`}
                  >
                    {labels[tab]}
                  </button>
                )
              })}
            </div>

            {/* Queue table */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-surface">
                  <tr>
                    {[
                      { en: 'Queue', th: 'คิว' },
                      { en: 'Patient', th: 'ผู้ป่วย' },
                      { en: 'Arrival', th: 'เวลามา' },
                      { en: 'Chief Complaint', th: 'อาการ' },
                      { en: 'Triage', th: 'Triage' },
                      { en: 'Pain', th: 'ปวด' },
                      { en: 'Wait', th: 'รอ' },
                      { en: 'Actions', th: 'จัดการ' },
                    ].map((h) => (
                      <th
                        key={h.en}
                        className="text-left text-xs font-body text-text-muted uppercase tracking-wide py-3 px-3 border-b border-surface-border"
                      >
                        {lang === 'EN' ? h.en : h.th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayQueue.map((patient) => (
                    <PatientRow
                      key={patient.id}
                      patient={patient}
                      lang={lang}
                      onSelect={() => setSelectedPatient(patient)}
                      onStatusChange={updateStatus}
                      isSelected={selectedPatient?.id === patient.id}
                    />
                  ))}
                  {displayQueue.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-text-muted font-body text-sm">
                        {lang === 'EN' ? 'No patients in this category.' : 'ไม่มีผู้ป่วยในหมวดนี้'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Patient detail panel */}
          {selectedPatient && (
            <PatientDetailPanel
              patient={selectedPatient}
              lang={lang}
              onClose={() => setSelectedPatient(null)}
              onStatusChange={updateStatus}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Row component
function PatientRow({
  patient,
  lang,
  onSelect,
  onStatusChange,
  isSelected,
}: {
  patient: QueuePatient
  lang: 'EN' | 'TH'
  onSelect: () => void
  onStatusChange: (id: string, status: QueuePatient['status']) => void
  isSelected: boolean
}) {
  const painColor =
    patient.painScale >= 8 ? 'text-red-600' : patient.painScale >= 5 ? 'text-yellow-600' : 'text-green-600'

  return (
    <tr
      onClick={onSelect}
      className={`border-b border-surface-border cursor-pointer transition-colors ${
        isSelected ? 'bg-primary-light/50' : 'hover:bg-surface-input'
      }`}
    >
      <td className="py-4 px-3">
        <span className="font-heading font-bold text-text-primary">{patient.queueNumber}</span>
      </td>
      <td className="py-4 px-3">
        <div>
          <p className="text-sm font-body font-medium text-text-primary">{patient.nameTH}</p>
          <p className="text-xs font-body text-text-muted">{patient.name} · {patient.hn}</p>
        </div>
      </td>
      <td className="py-4 px-3">
        <span className="text-sm font-body text-text-secondary">{patient.arrivalTime}</span>
      </td>
      <td className="py-4 px-3 max-w-48">
        <p className="text-sm font-body text-text-primary truncate">{patient.chiefComplaint}</p>
      </td>
      <td className="py-4 px-3">
        <TriageBadge level={patient.triage} lang={lang} size="sm" />
      </td>
      <td className="py-4 px-3">
        <span className={`text-sm font-heading font-bold ${painColor}`}>{patient.painScale}/10</span>
      </td>
      <td className="py-4 px-3">
        <span className="text-sm font-body text-text-secondary">
          {patient.status === 'waiting' ? `${patient.waitMinutes}m` : patient.room ?? '—'}
        </span>
      </td>
      <td className="py-4 px-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-1">
          {patient.status === 'waiting' && (
            <button
              onClick={() => onStatusChange(patient.id, 'in-progress')}
              className="px-3 py-1.5 bg-primary text-white text-xs font-body rounded-chip hover:bg-primary-dark"
            >
              {lang === 'EN' ? 'Call' : 'เรียก'}
            </button>
          )}
          {patient.status === 'in-progress' && (
            <button
              onClick={() => onStatusChange(patient.id, 'done')}
              className="px-3 py-1.5 bg-green-600 text-white text-xs font-body rounded-chip hover:bg-green-700"
            >
              {lang === 'EN' ? 'Done' : 'เสร็จ'}
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}
