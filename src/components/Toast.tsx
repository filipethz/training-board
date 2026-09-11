import { motion, AnimatePresence } from 'framer-motion'
import { useToastStore } from '../stores/toastStore'

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={
              'rounded-xl border shadow-2xl px-4 py-3 flex items-start gap-3 min-w-[260px] ' +
              (toast.variant === 'success'
                ? 'bg-emerald-950 border-emerald-700/50 text-emerald-100'
                : toast.variant === 'error'
                  ? 'bg-red-950 border-red-700/50 text-red-100'
                  : 'bg-slate-900 border-slate-700 text-slate-100')
            }
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{toast.message}</p>
              {toast.description && (
                <p className="text-xs opacity-80 mt-0.5">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-current opacity-60 hover:opacity-100 transition-opacity text-sm leading-none"
              aria-label="Fechar"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}