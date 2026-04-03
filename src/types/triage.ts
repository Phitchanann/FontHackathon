import type { TriageLevel } from './patient'

export interface TriageConfig {
  level: TriageLevel
  label: string
  labelTH: string
  color: string
  bgColor: string
  borderColor: string
  maxWaitMinutes: number
}

export const TRIAGE_CONFIG: Record<TriageLevel, TriageConfig> = {
  red: {
    level: 'red',
    label: 'Immediate',
    labelTH: 'วิกฤต',
    color: '#ba1a1a',
    bgColor: '#fde8e8',
    borderColor: '#ba1a1a',
    maxWaitMinutes: 0,
  },
  orange: {
    level: 'orange',
    label: 'Urgent',
    labelTH: 'เร่งด่วน',
    color: '#e65100',
    bgColor: '#fff3e0',
    borderColor: '#e65100',
    maxWaitMinutes: 10,
  },
  yellow: {
    level: 'yellow',
    label: 'Semi-Urgent',
    labelTH: 'ค่อนข้างเร่งด่วน',
    color: '#f9a825',
    bgColor: '#fffde7',
    borderColor: '#f9a825',
    maxWaitMinutes: 30,
  },
  green: {
    level: 'green',
    label: 'Non-Urgent',
    labelTH: 'ไม่เร่งด่วน',
    color: '#2e7d32',
    bgColor: '#e8f5e9',
    borderColor: '#2e7d32',
    maxWaitMinutes: 60,
  },
  white: {
    level: 'white',
    label: 'Routine',
    labelTH: 'ทั่วไป',
    color: '#424752',
    bgColor: '#f3f4f5',
    borderColor: '#c2c6d4',
    maxWaitMinutes: 120,
  },
}
