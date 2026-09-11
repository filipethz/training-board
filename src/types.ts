export type MeasureType = 'load' | 'time' | 'distance' | 'none'

export type Exercise = {
  id: string
  name: string
  equipment?: string
  sets: string
  reps: string
  measureType: MeasureType
  measureValue?: string
  notes?: string
  highlighted: boolean
}

export type Student = {
  id: string
  name: string
  exercises: Exercise[]
}

export type Slot = {
  id: string
  time: string // "07:00"
  students: Student[]
}

export type ViewMode = 'display' | 'edit'
export type DisplayScale = 'sm' | 'md' | 'lg' | 'xl'