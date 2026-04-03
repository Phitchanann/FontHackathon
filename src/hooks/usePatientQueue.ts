import { useState } from 'react'
import type { QueuePatient } from '../types/patient'
import { mockQueue } from '../data/mockPatients'

export function usePatientQueue() {
  const [queue, setQueue] = useState<QueuePatient[]>(mockQueue)

  function updateStatus(id: string, status: QueuePatient['status']) {
    setQueue((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    )
  }

  function assignRoom(id: string, room: string) {
    setQueue((prev) =>
      prev.map((p) => (p.id === id ? { ...p, room, status: 'in-progress' } : p))
    )
  }

  const waiting = queue.filter((p) => p.status === 'waiting')
  const inProgress = queue.filter((p) => p.status === 'in-progress')
  const done = queue.filter((p) => p.status === 'done')

  return { queue, waiting, inProgress, done, updateStatus, assignRoom }
}
