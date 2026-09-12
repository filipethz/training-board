import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockSlots } from './data'
import type { DisplayScale, Exercise, Slot, ViewMode } from './types'

type TrainingStore = {
  slots: Slot[]
  mode: ViewMode
  activeSlotId: string | null
  displayScale: DisplayScale
  setMode: (mode: ViewMode) => void
  setActiveSlot: (slotId: string | null) => void
  setDisplayScale: (scale: DisplayScale) => void
  updateExercise: (slotId: string, studentId: string, exerciseId: string, patch: Partial<Exercise>) => void
  toggleHighlight: (slotId: string, studentId: string, exerciseId: string) => void
  addExercise: (slotId: string, studentId: string) => void
  removeExercise: (slotId: string, studentId: string, exerciseId: string) => void
    reorderExercises: (slotId: string, studentId: string, fromIndex: number, toIndex: number) => void
  updateStudentName: (slotId: string, studentId: string, name: string) => void
  updateSlotTime: (slotId: string, time: string) => void
  addStudent: (slotId: string) => void
  removeStudent: (slotId: string, studentId: string) => void
  addSlot: () => void
  removeSlot: (slotId: string) => void
}

export const useTrainingStore = create<TrainingStore>()(
  persist(
    (set) => ({
      slots: mockSlots,
      mode: 'display',
      activeSlotId: mockSlots[0]?.id ?? null,
      displayScale: 'md',

      setMode: (mode) => set({ mode }),

      setActiveSlot: (activeSlotId) => set({ activeSlotId }),

      setDisplayScale: (displayScale: DisplayScale) => set({ displayScale }),

      updateExercise: (slotId, studentId, exerciseId, patch) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id !== slotId
              ? slot
              : {
                  ...slot,
                  students: slot.students.map((student) =>
                    student.id !== studentId
                      ? student
                      : {
                          ...student,
                          exercises: student.exercises.map((ex) =>
                            ex.id !== exerciseId ? ex : { ...ex, ...patch }
                          ),
                        }
                  ),
                }
          ),
        })),

      toggleHighlight: (slotId, studentId, exerciseId) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id !== slotId
              ? slot
              : {
                  ...slot,
                  students: slot.students.map((student) =>
                    student.id !== studentId
                      ? student
                      : {
                          ...student,
                          exercises: student.exercises.map((ex) =>
                            ex.id !== exerciseId ? ex : { ...ex, highlighted: !ex.highlighted }
                          ),
                        }
                  ),
                }
          ),
        })),

      addExercise: (slotId, studentId) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id !== slotId
              ? slot
              : {
                  ...slot,
                  students: slot.students.map((student) =>
                    student.id !== studentId
                      ? student
                      : {
                          ...student,
                          exercises: [
                            ...student.exercises,
                            {
                              id: `ex-${Date.now()}`,
                              name: 'Novo exercício',
                              equipment: '',
                              sets: '',
                              reps: '',
                              measureType: 'none',
                              measureValue: '',
                              notes: '',
                              highlighted: false,
                            },
                          ],
                        }
                  ),
                }
          ),
        })),

      removeExercise: (slotId, studentId, exerciseId) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id !== slotId
              ? slot
              : {
                  ...slot,
                  students: slot.students.map((student) =>
                    student.id !== studentId
                      ? student
                      : {
                          ...student,
                          exercises: student.exercises.filter((ex) => ex.id !== exerciseId),
                        }
                  ),
                }
          ),
        })),

      reorderExercises: (slotId, studentId, fromIndex, toIndex) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id !== slotId
              ? slot
              : {
                  ...slot,
                  students: slot.students.map((student) => {
                    if (student.id !== studentId) return student
                    const next = [...student.exercises]
                    const [moved] = next.splice(fromIndex, 1)
                    next.splice(toIndex, 0, moved)
                    return { ...student, exercises: next }
                  }),
                }
          ),
        })),
      updateStudentName: (slotId, studentId, name) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id !== slotId
              ? slot
              : {
                  ...slot,
                  students: slot.students.map((student) =>
                    student.id !== studentId ? student : { ...student, name }
                  ),
                }
          ),
        })),

      updateSlotTime: (slotId, time) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id !== slotId ? slot : { ...slot, time }
          ),
        })),

      addStudent: (slotId) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id !== slotId
              ? slot
              : {
                  ...slot,
                  students: [
                    ...slot.students,
                    {
                      id: `stu-${Date.now()}`,
                      name: 'Novo aluno',
                      exercises: [],
                    },
                  ],
                }
          ),
        })),

      removeStudent: (slotId, studentId) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id !== slotId
              ? slot
              : {
                  ...slot,
                  students: slot.students.filter((s) => s.id !== studentId),
                }
          ),
        })),

      addSlot: () =>
        set((state) => ({
          slots: [
            ...state.slots,
            {
              id: `slot-${Date.now()}`,
              time: '00:00',
              students: [],
            },
          ],
        })),

      removeSlot: (slotId) =>
        set((state) => {
          const remaining = state.slots.filter((s) => s.id !== slotId)
          return {
            slots: remaining,
            activeSlotId:
              state.activeSlotId === slotId ? (remaining[0]?.id ?? null) : state.activeSlotId,
          }
        }),
    }),
    {
      name: 'training-board-store',
      partialize: (state) => ({
        slots: state.slots,
        displayScale: state.displayScale,
      }),
    }
  )
)