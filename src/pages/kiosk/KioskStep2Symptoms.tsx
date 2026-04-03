import { useState } from 'react'
import { Card } from '../../components/ui/Card'

interface KioskStep2Props {
  lang: 'EN' | 'TH'
}

const SYMPTOMS = ['Fever', 'Chills', 'Nausea', 'Vomiting', 'Cough', 'Shortness of breath', 'Dizziness', 'Fatigue']
const DURATIONS = ['< 1 hour', 'Today', '2 - 7 days', '> 1 week', 'Chronic (Months/Years)']

// Body map hotspots [label, top%, left%]
const BODY_ZONES: [string, number, number][] = [
  ['Head', 5, 41.5],
  ['Chest', 27, 39],
  ['Abdomen', 40, 38],
  ['Left Arm', 50, 25],
  ['Right Arm', 50, 63],
]

export default function KioskStep2Symptoms({ lang }: KioskStep2Props) {
  const [complaint, setComplaint] = useState('')
  const [duration, setDuration] = useState('Today')
  const [painScale, setPainScale] = useState(6)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Fever', 'Nausea'])
  const [bodyView, setBodyView] = useState<'Front' | 'Back'>('Front')
  const [selectedZones, setSelectedZones] = useState<string[]>(['Head'])

  function toggleSymptom(s: string) {
    setSelectedSymptoms((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  function toggleZone(z: string) {
    setSelectedZones((prev) => (prev.includes(z) ? prev.filter((x) => x !== z) : [...prev, z]))
  }

  const painEmojis = ['😊', '🙂', '😐', '😟', '😫', '😭']
  const painLabel = painScale === 0 ? 'No Pain' : painScale <= 3 ? 'Mild' : painScale <= 6 ? 'Moderate' : 'Severe'

  return (
    <div className="pt-20 pb-28 bg-surface min-h-screen px-12">
      <div className="max-w-screen-xl mx-auto pt-14">
        {/* Page title */}
        <div className="mb-12">
          <h1 className="text-5xl font-heading font-black text-text-primary tracking-tight">
            {lang === 'EN' ? "What brings you in today?" : "อาการที่มาพบแพทย์"}
          </h1>
          <p className="text-xl font-body text-text-secondary opacity-80 mt-4">
            {lang === 'EN'
              ? 'Step 2: Tell us about your symptoms and where it hurts.'
              : 'ขั้นตอนที่ 2: บอกเราเกี่ยวกับอาการและตำแหน่งที่เจ็บ'}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left column */}
          <div className="col-span-7 flex flex-col gap-8">
            {/* Chief Complaint */}
            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                <svg width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {lang === 'EN' ? 'Chief Complaint' : 'อาการหลัก'}
              </h2>
              <div className="relative">
                <textarea
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder={lang === 'EN' ? 'Describe your symptoms in your own words...' : 'อธิบายอาการด้วยคำพูดของคุณ...'}
                  className="w-full min-h-40 bg-surface-input rounded-chip px-6 py-6 text-lg font-body text-text-primary placeholder:text-text-muted resize-none outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="absolute bottom-4 right-4 h-16 w-16 bg-primary rounded-btn flex items-center justify-center shadow-btn">
                  <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                  </svg>
                </button>
              </div>
            </Card>

            {/* Body Map */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-text-primary flex items-center gap-2">
                  <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="5" r="3" /><path d="M12 8v8M8 12H4M20 12h-4M9 20l-1-4M15 20l1-4" />
                  </svg>
                  {lang === 'EN' ? 'Where is the pain?' : 'ปวดที่ไหน?'}
                </h2>
                <div className="bg-surface-input p-1 rounded-chip flex">
                  {(['Front', 'Back'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setBodyView(v)}
                      className={`px-6 py-2 rounded-chip text-sm font-body transition-colors ${
                        bodyView === v ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary opacity-70'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body silhouette */}
              <div className="flex items-center justify-center py-12">
                <div className="relative w-72 h-[450px]">
                  {/* Silhouette placeholder */}
                  <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                    <svg viewBox="0 0 100 200" className="h-full" fill="#424752">
                      <circle cx="50" cy="15" r="12" />
                      <rect x="35" y="30" width="30" height="55" rx="4" />
                      <rect x="10" y="32" width="22" height="50" rx="4" />
                      <rect x="68" y="32" width="22" height="50" rx="4" />
                      <rect x="35" y="88" width="13" height="65" rx="4" />
                      <rect x="52" y="88" width="13" height="65" rx="4" />
                      <rect x="32" y="155" width="13" height="40" rx="4" />
                      <rect x="55" y="155" width="13" height="40" rx="4" />
                    </svg>
                  </div>
                  {/* Hotspots */}
                  {BODY_ZONES.map(([zone, top, left]) => (
                    <button
                      key={zone}
                      onClick={() => toggleZone(zone)}
                      style={{ top: `${top}%`, left: `${left}%` }}
                      className={`absolute h-12 w-12 rounded-chip border-2 flex items-center justify-center transition-all ${
                        selectedZones.includes(zone)
                          ? 'bg-danger/10 border-danger/30'
                          : 'bg-surface-input/30 border-surface-border'
                      }`}
                    >
                      {selectedZones.includes(zone) && (
                        <div className="h-2 w-2 rounded-full bg-danger" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm font-body italic text-text-secondary text-center">
                {lang === 'EN' ? 'Tap the areas on the body that are bothering you' : 'แตะบริเวณที่มีอาการ'}
              </p>
            </Card>
          </div>

          {/* Right column */}
          <div className="col-span-5 flex flex-col gap-8">
            {/* Duration */}
            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                {lang === 'EN' ? 'Duration' : 'ระยะเวลา'}
              </h2>
              <div className="flex flex-col gap-3">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`h-14 px-6 rounded-btn text-left text-base font-body transition-colors ${
                      duration === d
                        ? 'bg-primary text-white shadow-btn'
                        : 'bg-surface-input text-text-primary hover:bg-primary-light'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Card>

            {/* Pain Scale */}
            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                <svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {lang === 'EN' ? 'Pain Scale (0-10)' : 'ระดับความเจ็บปวด (0-10)'}
              </h2>
              {/* Emoji row */}
              <div className="flex justify-between mb-4">
                {painEmojis.map((e, i) => (
                  <span
                    key={i}
                    className={`text-3xl transition-transform ${
                      Math.round((painScale / 10) * 5) === i ? 'scale-125' : 'opacity-50'
                    }`}
                  >
                    {e}
                  </span>
                ))}
              </div>
              {/* Gradient slider */}
              <div className="relative py-6">
                <div className="h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-600" />
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={painScale}
                  onChange={(e) => setPainScale(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                />
                {/* Thumb indicator */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-10 w-10 bg-white border-4 border-primary rounded-chip shadow-card flex items-center justify-center pointer-events-none"
                  style={{ left: `calc(${(painScale / 10) * 100}% - 20px)` }}
                >
                  <span className="text-primary font-heading font-bold text-sm">{painScale}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm font-body text-text-secondary mt-1">
                <span>{lang === 'EN' ? 'No Pain' : 'ไม่เจ็บ'}</span>
                <span>{lang === 'EN' ? 'Moderate' : 'ปานกลาง'} ({painLabel})</span>
                <span>{lang === 'EN' ? 'Severe' : 'รุนแรง'}</span>
              </div>
            </Card>

            {/* Other Symptoms */}
            <Card>
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                <svg width="20" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                {lang === 'EN' ? 'Other Symptoms' : 'อาการอื่นๆ'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {SYMPTOMS.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    className={`px-5 py-3 rounded-chip text-base font-body transition-colors flex items-center gap-2 ${
                      selectedSymptoms.includes(s)
                        ? 'bg-primary-light text-primary border-2 border-primary'
                        : 'bg-surface-input text-text-secondary hover:bg-primary-light'
                    }`}
                  >
                    {s}
                    {selectedSymptoms.includes(s) && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                        <circle cx="4" cy="4" r="4" />
                      </svg>
                    )}
                  </button>
                ))}
                <button className="px-5 py-3 rounded-chip text-base font-body border-2 border-dashed border-surface-border text-text-secondary flex items-center gap-2 hover:border-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  {lang === 'EN' ? 'More' : 'เพิ่มเติม'}
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
