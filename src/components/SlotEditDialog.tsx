import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type SlotEditDialogProps = {
  open: boolean
  initialTime: string
  onClose: () => void
  onSave: (time: string) => void
  onRequestRemove: () => void
  canRemove: boolean
}

export function SlotEditDialog({
  open,
  initialTime,
  onClose,
  onSave,
  onRequestRemove,
  canRemove,
}: SlotEditDialogProps) {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    if (open) setTime(initialTime)
  }, [open, initialTime])

  const inputClass =
    'w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <h3 className="text-lg font-bold text-white mb-5">Editar horário</h3>

            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Horário
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputClass}
            />

            <div className="flex gap-2 mt-6">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => onSave(time)}
                className="flex-1 py-2.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-600 transition-colors text-sm font-semibold"
              >
                Salvar
              </button>
            </div>

            {canRemove && (
              <button
                onClick={onRequestRemove}
                className="w-full mt-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-xs font-medium"
              >
                Remover horário
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}