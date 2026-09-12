import { useTrainingStore } from '../store'
import type { DisplayScale, Exercise } from '../types'
import { motion, AnimatePresence } from 'framer-motion'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { SlotEditDialog } from '../components/SlotEditDialog'
import { StudentEditDialog } from '../components/StudentEditDialog'
import { useToastStore } from '../stores/toastStore'
import { useState } from 'react'
import { Pencil, Plus } from 'lucide-react'

const scales: { value: DisplayScale; label: string }[] = [
  { value: 'sm', label: 'Pequeno' },
  { value: 'md', label: 'Médio' },
  { value: 'lg', label: 'Grande' },
  { value: 'xl', label: 'Enorme' },
]

export function EditView() {
  const slots = useTrainingStore((s) => s.slots)
  const activeSlotId = useTrainingStore((s) => s.activeSlotId)
  const setActiveSlot = useTrainingStore((s) => s.setActiveSlot)
  const displayScale = useTrainingStore((s) => s.displayScale)
  const setDisplayScale = useTrainingStore((s) => s.setDisplayScale)
  const updateExercise = useTrainingStore((s) => s.updateExercise)
  const toggleHighlight = useTrainingStore((s) => s.toggleHighlight)
  const addExercise = useTrainingStore((s) => s.addExercise)
  const reorderExercises = useTrainingStore((s) => s.reorderExercises)
  const removeExercise = useTrainingStore((s) => s.removeExercise)
  const addSlot = useTrainingStore((s) => s.addSlot)
  const removeSlot = useTrainingStore((s) => s.removeSlot)
  const updateSlotTime = useTrainingStore((s) => s.updateSlotTime)
  const addStudent = useTrainingStore((s) => s.addStudent)
  const removeStudent = useTrainingStore((s) => s.removeStudent)
  const updateStudentName = useTrainingStore((s) => s.updateStudentName)
  const pushToast = useToastStore((s) => s.push)

  const [pendingRemoval, setPendingRemoval] = useState<{
    slotId: string
    studentId: string
    exerciseId: string
    exerciseName: string
  } | null>(null)

  const [pendingStudentRemoval, setPendingStudentRemoval] = useState<{
    slotId: string
    studentId: string
    studentName: string
  } | null>(null)

  const [pendingSlotRemoval, setPendingSlotRemoval] = useState<{
    slotId: string
    slotTime: string
  } | null>(null)

  const [slotEditOpen, setSlotEditOpen] = useState(false)
  const [studentEditId, setStudentEditId] = useState<string | null>(null)

  const activeSlot = slots.find((s) => s.id === activeSlotId) ?? slots[0]
  const studentBeingEdited = activeSlot?.students.find((s) => s.id === studentEditId)

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-20">
      {/* Controle de escala do display */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Tamanho da fonte no display
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {scales.map((s) => {
            const isActive = s.value === displayScale
            return (
              <button
                key={s.value}
                onClick={() => setDisplayScale(s.value)}
                className={
                  'py-2.5 rounded-lg text-sm font-medium transition-colors ' +
                  (isActive
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700')
                }
              >
                {s.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Horários */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Horários
          </h2>
          <button
            onClick={() => {
              addSlot()
              pushToast({ message: 'Horário adicionado', variant: 'success' })
            }}
            className="flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Plus size={14} strokeWidth={2.5} />
            Novo horário
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {slots.map((slot) => {
            const isActive = slot.id === activeSlot?.id
            return (
              <button
                key={slot.id}
                onClick={() => setActiveSlot(slot.id)}
                className={
                  'group flex items-center gap-2 pl-5 pr-2 py-2 rounded-lg text-base font-semibold transition-colors ' +
                  (isActive
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700')
                }
              >
                {slot.time}
                {isActive && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSlotEditOpen(true)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation()
                        setSlotEditOpen(true)
                      }
                    }}
                    title="Editar horário"
                    aria-label="Editar horário"
                    className="w-7 h-7 rounded-md flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer"
                  >
                    <Pencil size={14} strokeWidth={2.5} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* Alunos */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Alunos
          </h2>
          {activeSlot && (
            <button
              onClick={() => {
                addStudent(activeSlot.id)
                pushToast({ message: 'Aluno adicionado', variant: 'success' })
              }}
              className="flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Plus size={14} strokeWidth={2.5} />
              Novo aluno
            </button>
          )}
        </div>

        {activeSlot?.students.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-6">
            Nenhum aluno neste horário. Clique em "Novo aluno" para adicionar.
          </p>
        )}

        {activeSlot?.students.map((student) => (
          <div key={student.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">{student.name}</h3>
              <button
                onClick={() => setStudentEditId(student.id)}
                title="Editar aluno"
                aria-label="Editar aluno"
                className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
              >
                <Pencil size={15} strokeWidth={2.5} />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {student.exercises.map((ex, idx) => (
                <motion.div
                  key={ex.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <ExerciseEditor
                    exercise={ex}
                    onChange={(patch) =>
                      updateExercise(activeSlot.id, student.id, ex.id, patch)
                    }
                    onToggleHighlight={() => {
                      toggleHighlight(activeSlot.id, student.id, ex.id)
                      pushToast({
                        message: ex.highlighted
                          ? 'Destaque removido'
                          : 'Exercício destacado',
                        description: ex.name,
                        variant: 'info',
                      })
                    }}
                    onRemove={() =>
                      setPendingRemoval({
                        slotId: activeSlot.id,
                        studentId: student.id,
                        exerciseId: ex.id,
                        exerciseName: ex.name,
                      })
                    }
                    onMoveUp={() =>
                      reorderExercises(activeSlot.id, student.id, idx, idx - 1)
                    }
                    onMoveDown={() =>
                      reorderExercises(activeSlot.id, student.id, idx, idx + 1)
                    }
                    isFirst={idx === 0}
                    isLast={idx === student.exercises.length - 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={() => {
                addExercise(activeSlot.id, student.id)
                pushToast({
                  message: 'Exercício adicionado',
                  variant: 'success',
                })
              }}
              className="w-full py-3 rounded-lg border-2 border-dashed border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors text-sm font-medium"
            >
              + Adicionar exercício
            </button>
          </div>
        ))}
      </section>

      {/* Modal: edição de horário */}
      {activeSlot && (
        <SlotEditDialog
          open={slotEditOpen}
          initialTime={activeSlot.time}
          canRemove={slots.length > 1}
          onClose={() => setSlotEditOpen(false)}
          onSave={(time) => {
            updateSlotTime(activeSlot.id, time)
            setSlotEditOpen(false)
            pushToast({
              message: 'Horário atualizado',
              description: time,
              variant: 'success',
            })
          }}
          onRequestRemove={() => {
            setSlotEditOpen(false)
            setPendingSlotRemoval({
              slotId: activeSlot.id,
              slotTime: activeSlot.time,
            })
          }}
        />
      )}

      {/* Modal: edição de aluno */}
      {activeSlot && studentBeingEdited && (
        <StudentEditDialog
          open={studentEditId !== null}
          initialName={studentBeingEdited.name}
          onClose={() => setStudentEditId(null)}
          onSave={(name) => {
            updateStudentName(activeSlot.id, studentBeingEdited.id, name)
            setStudentEditId(null)
            pushToast({
              message: 'Aluno atualizado',
              description: name,
              variant: 'success',
            })
          }}
          onRequestRemove={() => {
            setStudentEditId(null)
            setPendingStudentRemoval({
              slotId: activeSlot.id,
              studentId: studentBeingEdited.id,
              studentName: studentBeingEdited.name,
            })
          }}
        />
      )}

      {/* Modal: remoção de exercício */}
      <ConfirmDialog
        open={pendingRemoval !== null}
        title="Remover exercício?"
        description={
          pendingRemoval
            ? `"${pendingRemoval.exerciseName}" será removido. Essa ação não pode ser desfeita.`
            : ''
        }
        confirmLabel="Remover"
        variant="danger"
        onConfirm={() => {
          if (pendingRemoval) {
            removeExercise(
              pendingRemoval.slotId,
              pendingRemoval.studentId,
              pendingRemoval.exerciseId,
            )
            pushToast({
              message: 'Exercício removido',
              description: pendingRemoval.exerciseName,
              variant: 'success',
            })
          }
          setPendingRemoval(null)
        }}
        onCancel={() => setPendingRemoval(null)}
      />

      {/* Modal: remoção de aluno */}
      <ConfirmDialog
        open={pendingStudentRemoval !== null}
        title="Remover aluno?"
        description={
          pendingStudentRemoval
            ? `"${pendingStudentRemoval.studentName}" e todos os seus exercícios serão removidos. Essa ação não pode ser desfeita.`
            : ''
        }
        confirmLabel="Remover"
        variant="danger"
        onConfirm={() => {
          if (pendingStudentRemoval) {
            removeStudent(
              pendingStudentRemoval.slotId,
              pendingStudentRemoval.studentId,
            )
            pushToast({
              message: 'Aluno removido',
              description: pendingStudentRemoval.studentName,
              variant: 'success',
            })
          }
          setPendingStudentRemoval(null)
        }}
        onCancel={() => setPendingStudentRemoval(null)}
      />

      {/* Modal: remoção de horário */}
      <ConfirmDialog
        open={pendingSlotRemoval !== null}
        title="Remover horário?"
        description={
          pendingSlotRemoval
            ? `O horário ${pendingSlotRemoval.slotTime} e todos os seus alunos serão removidos. Essa ação não pode ser desfeita.`
            : ''
        }
        confirmLabel="Remover"
        variant="danger"
        onConfirm={() => {
          if (pendingSlotRemoval) {
            removeSlot(pendingSlotRemoval.slotId)
            pushToast({
              message: 'Horário removido',
              description: pendingSlotRemoval.slotTime,
              variant: 'success',
            })
          }
          setPendingSlotRemoval(null)
        }}
        onCancel={() => setPendingSlotRemoval(null)}
      />
    </div>
  )
}

function ExerciseEditor({
  exercise,
  onChange,
  onToggleHighlight,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  exercise: Exercise
  onChange: (patch: Partial<Exercise>) => void
  onToggleHighlight: () => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}) {
  const inputClass =
    'w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors'
  const labelClass = 'block text-xs font-medium text-slate-500 mb-1.5'

  const measureLabels: Record<string, { label: string; placeholder: string }> = {
    load: { label: 'Carga', placeholder: '30kg' },
    time: { label: 'Tempo', placeholder: '30s, 1 min, 20 min' },
    distance: { label: 'Distância', placeholder: '5km' },
    none: { label: '', placeholder: '' },
  }

  return (
    <div
      className={
        'rounded-xl bg-slate-900 border p-4 transition-colors ' +
        (exercise.highlighted ? 'border-amber-500/50' : 'border-slate-800')
      }
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-3">
          {/* Nome */}
          <div>
            <label className={labelClass}>Exercício</label>
            <input
              type="text"
              value={exercise.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Nome do exercício"
              className={inputClass + ' font-semibold'}
            />
          </div>

          {/* Grid: equipamento, séries, reps, medida */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className={labelClass}>Equipamento</label>
              <input
                type="text"
                value={exercise.equipment ?? ''}
                onChange={(e) => onChange({ equipment: e.target.value })}
                placeholder="halteres"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Séries</label>
              <input
                type="text"
                value={exercise.sets}
                onChange={(e) => onChange({ sets: e.target.value })}
                placeholder="4"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Reps</label>
              <input
                type="text"
                value={exercise.reps}
                onChange={(e) => onChange({ reps: e.target.value })}
                placeholder="12"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tipo de medida</label>
              <select
                value={exercise.measureType}
                onChange={(e) =>
                  onChange({ measureType: e.target.value as Exercise['measureType'] })
                }
                className={inputClass}
              >
                <option value="none">Nenhuma</option>
                <option value="load">Carga</option>
                <option value="time">Tempo</option>
                <option value="distance">Distância</option>
              </select>
            </div>
          </div>

          {/* Valor da medida (condicional) */}
          {exercise.measureType !== 'none' && (
            <div>
              <label className={labelClass}>
                {measureLabels[exercise.measureType].label}
              </label>
              <input
                type="text"
                value={exercise.measureValue ?? ''}
                onChange={(e) => onChange({ measureValue: e.target.value })}
                placeholder={measureLabels[exercise.measureType].placeholder}
                className={inputClass}
              />
            </div>
          )}

          {/* Notas */}
          <div>
            <label className={labelClass}>Observações</label>
            <input
              type="text"
              value={exercise.notes ?? ''}
              onChange={(e) => onChange({ notes: e.target.value })}
              placeholder="Opcional"
              className={inputClass}
            />
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-2 shrink-0 pt-6">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            title="Mover para cima"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-400 disabled:cursor-not-allowed"
          >
            ↑
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            title="Mover para baixo"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-400 disabled:cursor-not-allowed"
          >
            ↓
          </button>
          <button
            onClick={onToggleHighlight}
            title={exercise.highlighted ? 'Remover destaque' : 'Destacar'}
            className={
              'w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-colors ' +
              (exercise.highlighted
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700')
            }
          >
            ★
          </button>
          <button
            onClick={onRemove}
            title="Remover exercício"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg bg-slate-800 text-slate-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}