import { useState } from 'react'
import type { TriageLevel } from '../types/patient'
import type { VitalSigns } from '../types/patient'

interface TriageInput {
  chiefComplaint: string
  painScale: number
  symptoms: string[]
  duration: string
  vitalSigns?: VitalSigns
}

interface TriageResult {
  level: TriageLevel
  confidence: number
  reasoning: string
  suggestedRoom: string
}

interface FollowUpInput {
  chiefComplaint: string
  painScale: number
  symptoms?: string[]
  duration?: string
  vitalSigns?: VitalSigns
}

// Simulated AI triage — replace with real API call
function inferTriage(input: TriageInput): TriageResult {
  const { painScale, chiefComplaint, symptoms, vitalSigns } = input
  const text = (chiefComplaint + ' ' + symptoms.join(' ')).toLowerCase()

  const isChestPain = text.includes('chest') || text.includes('heart')
  const isBreathing = text.includes('breath') || text.includes('spo2')
  const isStroke = text.includes('stroke') || text.includes('facial') || text.includes('weakness')

  const hasAbnormalVitals =
    Boolean(vitalSigns) &&
    (Number(vitalSigns?.heartRate) > 110 ||
      Number(vitalSigns?.temperature) >= 38.5 ||
      Number(vitalSigns?.spo2) < 94 ||
      Number(vitalSigns?.respiratoryRate) > 24)

  if (painScale >= 8 || isChestPain || isBreathing || isStroke || hasAbnormalVitals) {
    return { level: 'red', confidence: 0.92, reasoning: 'High-acuity presentation', suggestedRoom: 'Resus' }
  }
  if (painScale >= 6 || text.includes('fever') || text.includes('vomit')) {
    return { level: 'orange', confidence: 0.85, reasoning: 'Urgent symptoms detected', suggestedRoom: 'Acute Bay' }
  }
  if (painScale >= 4) {
    return { level: 'yellow', confidence: 0.78, reasoning: 'Moderate symptoms', suggestedRoom: 'Treatment Room' }
  }
  if (painScale >= 1) {
    return { level: 'green', confidence: 0.88, reasoning: 'Non-urgent presentation', suggestedRoom: 'Waiting Area' }
  }
  return { level: 'white', confidence: 0.95, reasoning: 'Routine visit / follow-up', suggestedRoom: 'Outpatient' }
}

function generateFollowUpQuestions(input: FollowUpInput, lang: 'EN' | 'TH'): string[] {
  const text = `${input.chiefComplaint} ${(input.symptoms ?? []).join(' ')}`.toLowerCase()
  const questions: string[] = []

  questions.push(
    lang === 'EN'
      ? 'When did this symptom start, and has it been getting worse?' : 'อาการเริ่มเมื่อไหร่ และแย่ลงต่อเนื่องหรือไม่?'
  )

  if (text.includes('chest') || text.includes('heart')) {
    questions.push(
      lang === 'EN'
        ? 'Does the chest pain radiate to the arm, jaw, or back?' : 'อาการเจ็บหน้าอกร้าวไปแขน กราม หรือหลังหรือไม่?'
    )
  }

  if (text.includes('breath') || text.includes('cough') || text.includes('หายใจ')) {
    questions.push(
      lang === 'EN'
        ? 'Any shortness of breath at rest, wheezing, or chest tightness?' : 'มีหอบเหนื่อยขณะพัก หายใจมีเสียงวี๊ด หรือแน่นหน้าอกหรือไม่?'
    )
  }

  if (text.includes('head') || text.includes('dizz') || text.includes('vision') || text.includes('ปวดหัว')) {
    questions.push(
      lang === 'EN'
        ? 'Any weakness, slurred speech, facial droop, or visual changes?' : 'มีแขนขาอ่อนแรง พูดไม่ชัด หน้าเบี้ยว หรือการมองเห็นเปลี่ยนไปหรือไม่?'
    )
  }

  if (text.includes('abdominal') || text.includes('stomach') || text.includes('nausea') || text.includes('ท้อง')) {
    questions.push(
      lang === 'EN'
        ? 'Any vomiting, diarrhea, blood in stool, or pain migration?' : 'มีอาเจียน ถ่ายเหลว ถ่ายมีเลือด หรือปวดท้องย้ายตำแหน่งหรือไม่?'
    )
  }

  if ((input.vitalSigns?.temperature ?? 0) >= 38) {
    questions.push(
      lang === 'EN'
        ? 'Any recent infection exposure, chills, rash, or urinary symptoms?' : 'มีประวัติสัมผัสผู้ป่วยติดเชื้อ หนาวสั่น ผื่น หรืออาการทางปัสสาวะหรือไม่?'
    )
  }

  if ((input.vitalSigns?.spo2 ?? 100) < 95) {
    questions.push(
      lang === 'EN'
        ? 'Any history of asthma/COPD and does oxygen improve symptoms?' : 'มีประวัติโรคหอบหืดหรือ COPD และให้ออกซิเจนแล้วดีขึ้นหรือไม่?'
    )
  }

  if (input.painScale >= 7) {
    questions.push(
      lang === 'EN'
        ? 'What makes the pain worse or better, and any previous similar episodes?' : 'อะไรทำให้อาการปวดมากขึ้นหรือน้อยลง และเคยเป็นลักษณะนี้มาก่อนหรือไม่?'
    )
  }

  questions.push(
    lang === 'EN'
      ? 'Current medications, drug allergies, and significant chronic diseases?' : 'ยาที่ใช้อยู่ แพ้ยาอะไรบ้าง และมีโรคประจำตัวสำคัญอะไร?'
  )

  return questions.slice(0, 6)
}

function summarizeSpeech(text: string, chiefComplaint: string, lang: 'EN' | 'TH'): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (!cleaned) {
    return lang === 'EN'
      ? `Patient reports: ${chiefComplaint}.`
      : `ผู้ป่วยให้ประวัติว่า: ${chiefComplaint}`
  }

  const textLower = cleaned.toLowerCase()
  const complaint = chiefComplaint.trim() || cleaned.split(/[.!?\n]+/)[0]?.trim() || cleaned

  const keySymptoms: string[] = []
  const symptomRules: Array<{ terms: string[]; labelEN: string; labelTH: string }> = [
    { terms: ['fever', 'ไข้'], labelEN: 'Fever', labelTH: 'มีไข้' },
    { terms: ['headache', 'ปวดหัว'], labelEN: 'Headache', labelTH: 'ปวดศีรษะ' },
    { terms: ['cough', 'ไอ'], labelEN: 'Cough', labelTH: 'ไอ' },
    { terms: ['shortness of breath', 'breathless', 'หอบ', 'เหนื่อย'], labelEN: 'Dyspnea', labelTH: 'หายใจลำบาก' },
    { terms: ['vomit', 'อาเจียน'], labelEN: 'Vomiting', labelTH: 'อาเจียน' },
    { terms: ['nausea', 'คลื่นไส้'], labelEN: 'Nausea', labelTH: 'คลื่นไส้' },
    { terms: ['chest pain', 'เจ็บหน้าอก'], labelEN: 'Chest pain', labelTH: 'เจ็บหน้าอก' },
    { terms: ['dizziness', 'เวียนหัว'], labelEN: 'Dizziness', labelTH: 'เวียนศีรษะ' },
  ]

  for (const rule of symptomRules) {
    if (rule.terms.some((term) => textLower.includes(term))) {
      keySymptoms.push(lang === 'EN' ? rule.labelEN : rule.labelTH)
    }
  }

  const tempMatch = cleaned.match(/(\d{2}(?:\.\d)?)\s?°?\s?c/i)
  const feverTag = tempMatch
    ? lang === 'EN'
      ? `Temp ${tempMatch[1]}°C`
      : `อุณหภูมิ ${tempMatch[1]}°C`
    : ''

  const severeTerms = ['severe', 'worst', 'รุนแรง', 'มาก']
  const hasSevere = severeTerms.some((term) => textLower.includes(term))
  const severity = hasSevere
    ? lang === 'EN'
      ? 'Severity: high'
      : 'ความรุนแรง: สูง'
    : lang === 'EN'
    ? 'Severity: moderate/unclear'
    : 'ความรุนแรง: ปานกลาง/ยังไม่ชัดเจน'

  const redFlags = ['chest pain', 'shortness of breath', 'faint', 'อ่อนแรงครึ่งซีก', 'หมดสติ']
  const hasRedFlag = redFlags.some((term) => textLower.includes(term))

  if (lang === 'EN') {
    return [
      `Chief issue: ${complaint}`,
      `Clinical summary: ${[...new Set(keySymptoms)].slice(0, 4).join(', ') || 'General discomfort'}${
        feverTag ? `, ${feverTag}` : ''
      }.`,
      severity,
      `Risk note: ${hasRedFlag ? 'Potential red-flag symptoms present.' : 'No explicit red-flag symptom stated.'}`,
      'Next step: verify onset, progression, meds/allergies, and vital signs.',
    ].join('\n')
  }

  return [
    `อาการนำ: ${complaint}`,
    `สรุปทางคลินิก: ${[...new Set(keySymptoms)].slice(0, 4).join(', ') || 'ไม่สบายทั่วไป'}${
      feverTag ? `, ${feverTag}` : ''
    }`,
    severity,
    `ประเด็นความเสี่ยง: ${hasRedFlag ? 'มีสัญญาณเตือนที่ควรประเมินทันที' : 'ยังไม่พบสัญญาณเตือนเด่นชัดจากข้อความ'}`,
    'ขั้นตอนถัดไป: ซักอาการเริ่มต้น การเปลี่ยนแปลงอาการ ยา/แพ้ยา และตรวจสัญญาณชีพ',
  ].join('\n')
}

export function useTriageAI() {
  const [result, setResult] = useState<TriageResult | null>(null)
  const [loading, setLoading] = useState(false)

  async function assess(input: TriageInput) {
    setLoading(true)
    // Simulate async API latency
    await new Promise((r) => setTimeout(r, 800))
    setResult(inferTriage(input))
    setLoading(false)
  }

  function suggestFollowUpQuestions(input: FollowUpInput, lang: 'EN' | 'TH') {
    return generateFollowUpQuestions(input, lang)
  }

  function summarizePatientSpeech(text: string, chiefComplaint: string, lang: 'EN' | 'TH') {
    return summarizeSpeech(text, chiefComplaint, lang)
  }

  return { result, loading, assess, suggestFollowUpQuestions, summarizePatientSpeech }
}
