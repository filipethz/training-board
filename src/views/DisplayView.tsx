import { useTrainingStore } from '../store'
import type { DisplayScale } from '../types'

const scaleMap: Record<DisplayScale, {
  studentName: string
  exerciseName: string
  meta: string
  notes: string
  number: string
  tab: string
  header: string
  gap: string
  padding: string
}> = {
  sm: {
    studentName: 'text-2xl',
    exerciseName: 'text-lg',
    meta: 'text-base',
    notes: 'text-sm',
    number: 'text-base',
    tab: 'text-xl px-6 py-3',
    header: 'text-xs',
    gap: 'gap-4',
    padding: 'p-5',
  },
  md: {
    studentName: 'text-3xl',
    exerciseName: 'text-2xl',
    meta: 'text-lg',
    notes: 'text-base',
    number: 'text-lg',
    tab: 'text-2xl px-7 py-3.5',
    header: 'text-sm',
    gap: 'gap-6',
    padding: 'p-6',
  },
  lg: {
    studentName: 'text-4xl',
    exerciseName: 'text-3xl',
    meta: 'text-2xl',
    notes: 'text-xl',
    number: 'text-2xl',
    tab: 'text-3xl px-8 py-4',
    header: 'text-lg',
    gap: 'gap-8',
    padding: 'p-8',
  },
  xl: {
    studentName: 'text-5xl',
    exerciseName: 'text-4xl',
    meta: 'text-3xl',
    notes: 'text-2xl',
    number: 'text-3xl',
    tab: 'text-4xl px-10 py-5',
    header: 'text-xl',
    gap: 'gap-10',
    padding: 'p-10',
  },
}

export function DisplayView() {
  const slots = useTrainingStore((s) => s.slots)
  const activeSlotId = useTrainingStore((s) => s.activeSlotId)
  const setActiveSlot = useTrainingStore((s) => s.setActiveSlot)
  const displayScale = useTrainingStore((s) => s.displayScale)

  const scale = scaleMap[displayScale]
  const activeSlot = slots.find((s) => s.id === activeSlotId) ?? slots[0]

  if (!activeSlot) {
    return <div className="text-center text-slate-500 py-20 text-3xl">Nenhum horário cadastrado</div>
  }

  return (
    <div className="space-y-10">
      {/* Abas de horário */}
      <nav className="flex gap-4 flex-wrap">
        {slots.map((slot) => {
          const isActive = slot.id === activeSlot.id
          return (
            <button
              key={slot.id}
              onClick={() => setActiveSlot(slot.id)}
              className={
                'rounded-2xl font-bold transition-colors ' +
                scale.tab +
                ' ' +
                (isActive
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700')
              }
            >
              {slot.time}
            </button>
          )
        })}
      </nav>

      {/* Grid de alunos */}
      <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ' + scale.gap}>
        {activeSlot.students.map((student) => (
          <article
            key={student.id}
            className={
              'rounded-3xl bg-slate-900 border border-slate-800 ' + scale.padding
            }
          >
            <header className={'mb-6 pb-5 border-b border-slate-800'}>
              <h2 className={'font-bold text-white ' + scale.studentName}>
                {student.name}
              </h2>
              <p className={'text-slate-500 mt-2 ' + scale.header}>
                {student.exercises.length} exercícios
              </p>
            </header>

            <ol className="space-y-5">
              {student.exercises.map((ex, idx) => (
                <li
                  key={ex.id}
                  className={
                    'rounded-xl px-5 py-4 transition-colors ' +
                    (ex.highlighted
                      ? 'bg-amber-500/15 border-2 border-amber-500/40'
                      : 'bg-slate-800/50')
                  }
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={
                        'font-mono text-slate-500 mt-0.5 w-8 shrink-0 ' +
                        scale.number
                      }
                    >
                      {idx + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={'font-bold text-white leading-tight ' + scale.exerciseName}>
                        {ex.name}
                      </p>
                      <p className={'text-sky-300 mt-2 ' + scale.meta}>
                        {[
                          ex.equipment,
                          ex.sets && ex.reps ? `${ex.sets} x ${ex.reps}` : null,
                          ex.measureType !== 'none' ? ex.measureValue : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                      {ex.notes && (
                        <p className={'text-amber-300 mt-2 italic ' + scale.notes}>
                          {ex.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  )
}