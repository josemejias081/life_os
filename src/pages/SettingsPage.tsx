import { AppState } from '../types';

interface Props {
  state: AppState;
  onReset: () => void;
}

export default function SettingsPage({ state, onReset }: Props) {
  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Configuración</h1>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-4">Identidad</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400">Nombre</p>
              <p className="text-lg font-medium text-gray-900">{state.user.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Identidad</p>
              <p className="text-sm text-gray-700">{state.user.identity}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Propósito</p>
              <p className="text-sm text-gray-700">{state.user.purpose}</p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-4">Visión</h3>
          <p className="text-sm text-gray-700 italic mb-4">"{state.vision.statement}"</p>
          <div className="flex flex-wrap gap-2">
            {state.vision.values.map((value, i) => (
              <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full font-medium">
                {value}
              </span>
            ))}
          </div>
        </div>

        {/* Areas */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-4">Áreas de vida</h3>
          <div className="space-y-2">
            {state.areas.map(area => (
              <div key={area.id} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: area.color }} />
                <span className="text-sm text-gray-700">{area.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-4">Estadísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{state.projects.length}</p>
              <p className="text-xs text-gray-400">Proyectos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{state.sessions.filter(s => s.status === 'completed').length}</p>
              <p className="text-xs text-gray-400">Sesiones totales</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{state.reviews.length}</p>
              <p className="text-xs text-gray-400">Revisiones</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(state.sessions.filter(s => s.status === 'completed').reduce((a, s) => a + s.duration, 0) / 60)}h
              </p>
              <p className="text-xs text-gray-400">Horas totales</p>
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="bg-white rounded-2xl border border-red-100 p-6">
          <h3 className="text-xs text-red-400 uppercase tracking-wider font-medium mb-2">Zona de peligro</h3>
          <p className="text-sm text-gray-500 mb-4">Reiniciar todos los datos de demostración.</p>
          <button
            onClick={() => {
              if (confirm('¿Seguro que quieres reiniciar todos los datos?')) {
                onReset();
              }
            }}
            className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-all"
          >
            Reiniciar datos
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-300">LifeOS v0.1</p>
          <p className="text-xs text-gray-300 mt-1">"No administres tu tiempo. Dirige tu vida."</p>
        </div>
      </div>
    </div>
  );
}
