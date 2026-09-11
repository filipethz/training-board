import { useTrainingStore } from './store'
import { DisplayView } from './views/DisplayView'
import { EditView } from './views/EditView'
import { ToastContainer } from './components/Toast'

export default function App() {
  const mode = useTrainingStore((s) => s.mode)
  const setMode = useTrainingStore((s) => s.setMode)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-emerald-400">Training</span> Board
        </h1>
        <button
          onClick={() => setMode(mode === 'display' ? 'edit' : 'display')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm font-medium"
        >
          {mode === 'display' ? 'Editar' : 'Ver display'}
        </button>
      </header>

      <main className="p-6">
        {mode === 'display' ? <DisplayView /> : <EditView />}
      </main>

      <ToastContainer />
    </div>
  )
}