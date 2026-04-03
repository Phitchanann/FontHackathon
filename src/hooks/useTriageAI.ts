import { useState } from 'react'
import type { TriageLevel } from '../types/patient'

interface TriageInput {
  chiefComplaint: string
  painScale: number
  symptoms: string[]
  duration: string
}

interface TriageResult {
  level: TriageLevel
  confidence: number
  reasoning: string
  suggestedRoom: string
}

// Simulated AI triage — replace with real API call
function inferTriage(input: TriageInput): TriageResult {
  const { painScale, chiefComplaint, symptoms } = input
  const text = (chiefComplaint + ' ' + symptoms.join(' ')).toLowerCase()

  const isChestPain = text.includes('chest') || text.includes('heart')
  const isBreathing = text.includes('breath') || text.includes('spo2')
  const isStroke = text.includes('stroke') || text.includes('facial') || text.includes('weakness')

  if (painScale >= 8 || isChestPain || isBreathing || isStroke) {
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

  return { result, loading, assess }
}
