export type TriageLevel = 'red' | 'orange' | 'yellow' | 'green' | 'white'
export type Language = 'EN' | 'TH'

export interface Patient {
  id: string
  hn: string // Hospital Number
  firstName: string
  lastName: string
  firstNameTH: string
  lastNameTH: string
  dob: string // ISO date
  gender: 'male' | 'female' | 'other'
  nationalId: string
  phone: string
  email: string
  address: string
  province: string
  emergencyContact: EmergencyContact
  insurance: Insurance
  chronicDiseases: string[]
  medications: string
  allergies: string
  noKnownAllergies: boolean
  clinicalAlerts: ClinicalAlert[]
  registrationStep: number
  createdAt: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
}

export interface Insurance {
  type: 'government' | 'social-security' | 'private' | 'self-pay'
  provider?: string
  policyNumber?: string
}

export interface ClinicalAlert {
  id: string
  type: 'allergy' | 'medication' | 'condition' | 'other'
  severity: 'high' | 'medium' | 'low'
  description: string
}

export interface QueuePatient {
  id: string
  hn: string
  name: string
  nameTH: string
  queueNumber: string
  arrivalTime: string
  chiefComplaint: string
  triage: TriageLevel
  painScale: number
  waitMinutes: number
  status: 'waiting' | 'in-progress' | 'done'
  room?: string
  assignedNurse?: string
  vitalSigns?: VitalSigns
}

export interface VitalSigns {
  bloodPressure: string
  heartRate: number
  temperature: number
  spo2: number
  respiratoryRate: number
  weight?: number
  height?: number
}
