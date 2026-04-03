import { useState } from 'react'
import { Card } from '../../components/ui/Card'

interface KioskStep2Props {
  lang: 'EN' | 'TH'
}

const SYMPTOMS = ['Fever', 'Chills', 'Nausea', 'Vomiting', 'Cough', 'Shortness of breath', 'Dizziness', 'Fatigue']
const DURATIONS = ['< 1 hour', 'Today', '2 - 7 days', '> 1 week', 'Chronic (Months/Years)']

type BodyView = 'Front' | 'Back'
type ZoneTone = 'danger' | 'primary' | 'amber' | 'cyan' | 'emerald'
type ZoneGroup = 'head' | 'core' | 'arm' | 'leg'
type BodyZone = {
  id: string
  labelEN: string
  labelTH: string
  descriptionEN: string
  descriptionTH: string
  top: number
  left: number
  tone: ZoneTone
  group: ZoneGroup
}

const BODY_ZONES: BodyZone[] = [
  {
    id: 'head',
    labelEN: 'Head',
    labelTH: 'ศีรษะ',
    descriptionEN: 'Headache, migraine, dizziness',
    descriptionTH: 'ปวดศีรษะ ไมเกรน เวียนศีรษะ',
    top: 12,
    left: 50,
    tone: 'danger',
    group: 'head',
  },
  {
    id: 'chest',
    labelEN: 'Chest',
    labelTH: 'หน้าอก',
    descriptionEN: 'Tightness, cough, shortness of breath',
    descriptionTH: 'แน่นหน้าอก ไอ หายใจลำบาก',
    top: 31,
    left: 50,
    tone: 'primary',
    group: 'core',
  },
  {
    id: 'abdomen',
    labelEN: 'Abdomen',
    labelTH: 'ช่องท้อง',
    descriptionEN: 'Cramping, nausea, stomach pain',
    descriptionTH: 'ปวดท้อง คลื่นไส้ จุกเสียด',
    top: 47,
    left: 50,
    tone: 'amber',
    group: 'core',
  },
  {
    id: 'left-arm',
    labelEN: 'Left Arm',
    labelTH: 'แขนซ้าย',
    descriptionEN: 'Numbness, pain, weakness',
    descriptionTH: 'ชา ปวด อ่อนแรง',
    top: 50,
    left: 18,
    tone: 'cyan',
    group: 'arm',
  },
  {
    id: 'right-arm',
    labelEN: 'Right Arm',
    labelTH: 'แขนขวา',
    descriptionEN: 'Numbness, pain, weakness',
    descriptionTH: 'ชา ปวด อ่อนแรง',
    top: 50,
    left: 82,
    tone: 'cyan',
    group: 'arm',
  },
  {
    id: 'left-leg',
    labelEN: 'Left Leg',
    labelTH: 'ขาซ้าย',
    descriptionEN: 'Pain, cramping, swelling, weakness',
    descriptionTH: 'ปวด ตะคริว บวม หรืออ่อนแรง',
    top: 80,
    left: 43,
    tone: 'emerald',
    group: 'leg',
  },
  {
    id: 'right-leg',
    labelEN: 'Right Leg',
    labelTH: 'ขาขวา',
    descriptionEN: 'Pain, cramping, swelling, weakness',
    descriptionTH: 'ปวด ตะคริว บวม หรืออ่อนแรง',
    top: 80,
    left: 57,
    tone: 'emerald',
    group: 'leg',
  },
]

const ZONE_TONE_STYLES: Record<ZoneTone, { dot: string; soft: string; outline: string; chip: string }> = {
  danger: {
    dot: 'bg-danger',
    soft: 'bg-danger/10',
    outline: 'border-danger/30 text-danger',
    chip: 'border-danger/20 bg-danger/10 text-danger',
  },
  primary: {
    dot: 'bg-primary',
    soft: 'bg-primary/10',
    outline: 'border-primary/30 text-primary',
    chip: 'border-primary/20 bg-primary/10 text-primary',
  },
  amber: {
    dot: 'bg-amber-500',
    soft: 'bg-amber-500/10',
    outline: 'border-amber-500/30 text-amber-700',
    chip: 'border-amber-500/20 bg-amber-500/10 text-amber-700',
  },
  cyan: {
    dot: 'bg-cyan-500',
    soft: 'bg-cyan-500/10',
    outline: 'border-cyan-500/30 text-cyan-700',
    chip: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700',
  },
  emerald: {
    dot: 'bg-emerald-500',
    soft: 'bg-emerald-500/10',
    outline: 'border-emerald-500/30 text-emerald-700',
    chip: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700',
  },
}

const BODY_VIEW_COPY: Record<BodyView, { EN: string; TH: string }> = {
  Front: {
    EN: 'Tap every area that feels painful, tender, numb, or uncomfortable on the front of the body.',
    TH: 'แตะทุกบริเวณที่ปวด เจ็บ ชา หรือไม่สบายบริเวณด้านหน้าของร่างกาย',
  },
  Back: {
    EN: 'Use the back view when pain is focused on the neck, shoulders, back, or the rear side of the arms.',
    TH: 'ใช้มุมมองด้านหลังเมื่ออาการอยู่บริเวณคอ ไหล่ หลัง หรือด้านหลังของแขน',
  },
}

export default function KioskStep2Symptoms({ lang }: KioskStep2Props) {
  const [complaint, setComplaint] = useState('')
  const [duration, setDuration] = useState('Today')
  const [painScale, setPainScale] = useState(6)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Fever', 'Nausea'])
  const [bodyView, setBodyView] = useState<BodyView>('Front')
  const [selectedZones, setSelectedZones] = useState<string[]>(['head'])
  const [showFrontReferenceImage, setShowFrontReferenceImage] = useState(true)

  function toggleSymptom(s: string) {
    setSelectedSymptoms((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  function toggleZone(z: string) {
    setSelectedZones((prev) => (prev.includes(z) ? prev.filter((x) => x !== z) : [...prev, z]))
  }

  const painEmojis = ['😊', '🙂', '😐', '😟', '😫', '😭']
  const painLabel =
    lang === 'EN'
      ? painScale === 0
        ? 'No Pain'
        : painScale <= 3
        ? 'Mild'
        : painScale <= 6
        ? 'Moderate'
        : 'Severe'
      : painScale === 0
      ? 'ไม่เจ็บ'
      : painScale <= 3
      ? 'เล็กน้อย'
      : painScale <= 6
      ? 'ปานกลาง'
      : 'รุนแรง'
  const selectedZoneDetails = BODY_ZONES.filter((zone) => selectedZones.includes(zone.id))
  const armZoneCount = selectedZoneDetails.filter((zone) => zone.group === 'arm').length
  const legZoneCount = selectedZoneDetails.filter((zone) => zone.group === 'leg').length

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
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-heading font-bold text-text-primary flex items-center gap-2">
                    <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="5" r="3" /><path d="M12 8v8M8 12H4M20 12h-4M9 20l-1-4M15 20l1-4" />
                    </svg>
                    {lang === 'EN' ? 'Where is the pain?' : 'ปวดที่ไหน?'}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm font-body leading-6 text-text-secondary">
                    {BODY_VIEW_COPY[bodyView][lang]}
                  </p>
                </div>

                <div className="bg-surface-input p-1.5 rounded-2xl flex shadow-inner">
                  {(['Front', 'Back'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setBodyView(v)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-body transition-all ${
                        bodyView === v ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary opacity-70'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr),240px]">
                <div className="relative overflow-hidden rounded-[32px] border border-[#dbe5f3] bg-gradient-to-b from-[#f8fbff] via-white to-[#eef4ff] px-8 py-8">
                  <div className="absolute left-1/2 top-10 h-28 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(214,227,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(214,227,255,0.45) 1px, transparent 1px)',
                      backgroundSize: '34px 34px',
                    }}
                  />

                  <div className="relative flex items-center justify-center py-4">
                    <div className="relative h-[470px] w-[320px]">
                      {bodyView === 'Front' && showFrontReferenceImage ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src="/body-front-reference.png"
                            alt="Front body reference"
                            className="h-full w-auto object-contain"
                            onError={() => setShowFrontReferenceImage(false)}
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg viewBox="0 0 248 563" className="h-full">
                            <g fill="none" stroke="#1f2937" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <ellipse cx="124" cy="54" rx="18" ry="22" />
                              <path d="M111 74C96 79 83 87 74 98C64 110 60 126 62 143C64 160 70 178 75 196C81 218 81 240 77 261C73 282 69 305 70 328C72 344 78 357 84 370C90 387 92 405 92 423C92 457 90 490 90 524C90 538 89 552 87 563" />
                              <path d="M137 74C152 79 165 87 174 98C184 110 188 126 186 143C184 160 178 178 173 196C167 218 167 240 171 261C175 282 179 305 178 328C176 344 170 357 164 370C158 387 156 405 156 423C156 457 158 490 158 524C158 538 159 552 161 563" />
                              <path d="M74 124C63 146 56 170 54 196C53 220 56 244 61 267C66 286 66 306 61 323C57 337 50 351 47 364C45 372 49 379 55 379C60 379 65 376 67 370C67 377 72 382 78 382C85 381 89 375 89 367C91 375 96 379 103 375C109 372 111 363 108 355C102 336 100 315 101 294C102 262 103 230 99 197C95 170 87 145 74 124" />
                              <path d="M174 124C185 146 192 170 194 196C195 220 192 244 187 267C182 286 182 306 187 323C191 337 198 351 201 364C203 372 199 379 193 379C188 379 183 376 181 370C181 377 176 382 170 382C163 381 159 375 159 367C157 375 152 379 145 375C139 372 137 363 140 355C146 336 148 315 147 294C146 262 145 230 149 197C153 170 161 145 174 124" />
                              <path d="M102 130C101 166 98 205 98 244C98 283 101 322 105 360C108 390 106 420 103 449C101 474 100 499 102 524C104 539 105 552 105 563" />
                              <path d="M146 130C147 166 150 205 150 244C150 283 147 322 143 360C140 390 142 420 145 449C147 474 148 499 146 524C144 539 143 552 143 563" />
                              {bodyView === 'Front' ? (
                                <>
                                  <path d="M112 96C116 93 120 92 124 92C128 92 132 93 136 96" />
                                  <path d="M100 172C108 164 116 161 124 161C132 161 140 164 148 172" />
                                  <path d="M104 282C111 273 117 270 124 270C131 270 137 273 144 282" />
                                  <path d="M118 558C120 560 122 561 124 561C126 561 128 560 130 558" />
                                </>
                              ) : (
                                <>
                                  <path d="M124 96V352" />
                                  <path d="M102 176C109 185 117 189 124 189C131 189 139 185 146 176" />
                                  <path d="M100 280C109 291 117 296 124 296C131 296 139 291 148 280" />
                                  <path d="M108 92C114 88 120 86 124 86C128 86 134 88 140 92" />
                                </>
                              )}
                            </g>
                          </svg>
                        </div>
                      )}

                      {BODY_ZONES.map((zone) => {
                        const isSelected = selectedZones.includes(zone.id)
                        const tone = ZONE_TONE_STYLES[zone.tone]

                        return (
                          <div
                            key={zone.id}
                            className="absolute"
                            style={{ top: `${zone.top}%`, left: `${zone.left}%`, transform: 'translate(-50%, -50%)' }}
                          >
                            <button
                              onClick={() => toggleZone(zone.id)}
                              aria-pressed={isSelected}
                              className={`relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-200 ${
                                isSelected
                                  ? `${tone.soft} ${tone.outline} scale-110 shadow-[0_12px_28px_rgba(25,28,29,0.12)]`
                                  : 'border-white/80 bg-white/75 text-text-muted shadow-[0_8px_20px_rgba(25,28,29,0.08)] hover:border-primary/25 hover:bg-white'
                              }`}
                            >
                              {isSelected && (
                                <span className={`absolute inset-0 rounded-full animate-ping ${tone.soft}`} />
                              )}
                              <span className={`relative h-3.5 w-3.5 rounded-full ${isSelected ? tone.dot : 'bg-text-muted/40'}`} />
                            </button>

                            {isSelected && (
                              <div className="absolute left-1/2 top-[calc(100%+12px)] min-w-max -translate-x-1/2">
                                <div className={`rounded-full border px-3 py-1.5 text-xs font-body font-medium shadow-sm backdrop-blur ${tone.chip}`}>
                                  {lang === 'EN' ? zone.labelEN : zone.labelTH}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="relative mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/80 bg-white/75 px-5 py-4 shadow-sm">
                    <div>
                      <p className="text-sm font-heading font-bold text-text-primary">
                        {bodyView === 'Front'
                          ? lang === 'EN'
                            ? 'Front Body Reference'
                            : 'มุมมองด้านหน้า'
                          : lang === 'EN'
                          ? 'Back Body Reference'
                          : 'มุมมองด้านหลัง'}
                      </p>
                      <p className="mt-1 text-xs font-body text-text-secondary">
                        {lang === 'EN'
                          ? 'Tap once to add a painful area, tap again to remove it. Choose left and right arms or legs separately.'
                          : 'แตะหนึ่งครั้งเพื่อเลือกจุดที่ปวด และแตะซ้ำเพื่อลบออก โดยสามารถเลือกแขนซ้าย/ขวา และขาซ้าย/ขวาแยกกันได้'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-body text-text-secondary">
                      <span className="inline-flex items-center gap-2 rounded-full bg-surface-input px-3 py-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        {lang === 'EN' ? 'Interactive markers' : 'จุดที่กดเลือกได้'}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-2 text-primary">
                        <span className="font-heading font-bold">{selectedZoneDetails.length}</span>
                        {lang === 'EN' ? 'selected' : 'ตำแหน่งที่เลือก'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-[28px] border border-[#e2e8f2] bg-[#f8fbff] p-5 shadow-card">
                    <p className="text-sm font-heading font-bold text-text-primary">
                      {lang === 'EN' ? 'Selected Areas' : 'จุดที่เลือก'}
                    </p>
                    <p className="mt-2 text-xs font-body leading-5 text-text-secondary">
                      {lang === 'EN'
                        ? 'Your chosen pain points appear here. Arms and legs are tracked separately on the left and right side.'
                        : 'จุดที่เลือกไว้จะแสดงที่นี่ โดยจะแยกแขนและขาซ้าย/ขวาออกจากกันอย่างชัดเจน'}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-2xl bg-white px-3 py-3 shadow-sm">
                        <p className="text-[11px] font-body uppercase tracking-[0.16em] text-cyan-700">
                          {lang === 'EN' ? 'Arms' : 'แขน'}
                        </p>
                        <p className="mt-1 text-sm font-heading font-bold text-text-primary">{armZoneCount}/2</p>
                      </div>
                      <div className="rounded-2xl bg-white px-3 py-3 shadow-sm">
                        <p className="text-[11px] font-body uppercase tracking-[0.16em] text-emerald-700">
                          {lang === 'EN' ? 'Legs' : 'ขา'}
                        </p>
                        <p className="mt-1 text-sm font-heading font-bold text-text-primary">{legZoneCount}/2</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedZoneDetails.length > 0 ? (
                        selectedZoneDetails.map((zone) => {
                          const tone = ZONE_TONE_STYLES[zone.tone]

                          return (
                            <button
                              key={zone.id}
                              onClick={() => toggleZone(zone.id)}
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-body font-medium transition-colors hover:opacity-85 ${tone.chip}`}
                            >
                              <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                              {lang === 'EN' ? zone.labelEN : zone.labelTH}
                            </button>
                          )
                        })
                      ) : (
                        <div className="rounded-2xl border border-dashed border-surface-border px-4 py-4 text-xs font-body text-text-muted">
                          {lang === 'EN' ? 'No body areas selected yet.' : 'ยังไม่ได้เลือกตำแหน่งที่มีอาการ'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[28px] bg-gradient-to-br from-primary via-primary-dark to-[#0a67c4] p-5 text-white shadow-btn">
                    <p className="text-xs font-body uppercase tracking-[0.18em] opacity-75">
                      {lang === 'EN' ? 'Smart Triage Tip' : 'เคล็ดลับการคัดกรอง'}
                    </p>
                    <p className="mt-3 text-base font-heading font-bold leading-6">
                      {lang === 'EN'
                        ? 'Mark every painful spot so the nurse can assess spread, severity, and urgency faster.'
                        : 'เลือกทุกจุดที่มีอาการ เพื่อให้พยาบาลประเมินการกระจายของอาการและความเร่งด่วนได้เร็วขึ้น'}
                    </p>
                  </div>

                  {selectedZoneDetails[0] && (
                    <div className="rounded-[28px] border border-[#e5ebf4] bg-white p-5 shadow-card">
                      <p className="text-xs font-body uppercase tracking-[0.18em] text-text-muted">
                        {lang === 'EN' ? 'Focused Note' : 'บันทึกเพิ่มเติม'}
                      </p>
                      <p className="mt-2 text-lg font-heading font-bold text-text-primary">
                        {lang === 'EN' ? selectedZoneDetails[0].labelEN : selectedZoneDetails[0].labelTH}
                      </p>
                      <p className="mt-2 text-sm font-body leading-6 text-text-secondary">
                        {lang === 'EN' ? selectedZoneDetails[0].descriptionEN : selectedZoneDetails[0].descriptionTH}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-5 text-sm font-body italic text-text-secondary text-center">
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
