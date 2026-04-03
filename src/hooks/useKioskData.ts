import { useState } from 'react'

interface KioskFormData {
  chiefComplaint: string
  duration: string
  painScale: number
  selectedSymptoms: string[]
  selectedZones: string[]
  chronicDiseases: string[]
  medications: string
  allergies: string
  insurance: string
  preferredDoctor: string
}

const INITIAL_DATA: KioskFormData = {
  chiefComplaint: '',
  duration: '',
  painScale: 0,
  selectedSymptoms: [],
  selectedZones: [],
  chronicDiseases: [],
  medications: '',
  allergies: '',
  insurance: '',
  preferredDoctor: '',
}

export function useKioskData() {
  const [formData, setFormData] = useState<KioskFormData>(INITIAL_DATA)

  function updateFormData(data: Partial<KioskFormData>) {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  function getFormData() {
    return formData
  }

  function clearFormData() {
    setFormData(INITIAL_DATA)
  }

  function saveToLocalStorage() {
    localStorage.setItem('kioskFormData', JSON.stringify(formData))
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('kioskFormData')
    if (saved) {
      setFormData(JSON.parse(saved))
      return JSON.parse(saved)
    }
  }

  return {
    formData,
    updateFormData,
    getFormData,
    clearFormData,
    saveToLocalStorage,
    loadFromLocalStorage,
  }
}
