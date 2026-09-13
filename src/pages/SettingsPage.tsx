import { motion } from 'framer-motion';
import { User, Eye, Layers, BarChart3, AlertTriangle } from 'lucide-react';
import { AppState } from '../types';

interface Props {
  state: AppState;
  onReset: () => void;
}

export default function SettingsPage({ state, onReset }: Props) {
  return (
    <div className="min-h-screen pb-32 pt-8 sm:pt-10 px-5 sm:px-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Configuración</h1>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-4"
        >
          <div className="flex items-center gap-2 mb-5">
            <User size={14} className="text-indigo-400" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold">Identidad</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-zinc-600 uppercase tracking-wider">Nombre</p>
              <p className="text-lg font-semibold text-white">{state.user.name}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-600 uppercase tracking-wider">Identidad</p>
              <p className="text-sm text-zinc-300">{state.user.identity}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-600 uppercase tracking-wider">Propósito</p>
              <p className="text-sm text-zinc-300">{state.user.purpose}</p>
            </div>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-6 mb-4"
        >
          <div className="flex items-center gap-2 mb-5">
            <Eye size={14} className="text-purple-400" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold">Visión</p>
          </div>
          <p className="text-sm text-zinc-300 italic mb-4 leading-relaxed">"{state.vision.statement}"</p>
          <div className="flex flex-wrap gap-2">
            {state.vision.values.map((value, i) => (
              <span key={i} className="px-3 py-1.5 bg-zinc-800/50 text-zinc-400 text-[11px] rounded-lg font-medium border border-zinc-700/50">
                {value}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-4"
        >
          <div className="flex items-center gap-2 mb-5">
            <Layers size={14} className="text-emerald-400" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold">Áreas de vida</p>
          </div>
          <div className="space-y-3">
            {state.areas.map(area => (
              <div key={area.id} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: area.color, boxShadow: `0 0 10px ${area.color}40` }} />
                <span className="text-sm text-zinc-300">{area.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-6 mb-4"
        >
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={14} className="text-amber-400" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold">Estadísticas</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-white font-mono">{state.projects.length}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Proyectos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-mono">{state.sessions.filter(s => s.status === 'completed').length}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Sesiones</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-mono">{state.reviews.length}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Revisiones</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-mono">
                {Math.round(state.sessions.filter(s => s.status === 'completed').reduce((a, s) => a + s.duration, 0) / 60)}h
              </p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Horas totales</p>
            </div>
          </div>
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-4 border-red-500/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-red-400" />
            <p className="text-[10px] text-red-400 uppercase tracking-[0.2em] font-semibold">Zona de peligro</p>
          </div>
          <p className="text-sm text-zinc-500 mb-4">Reiniciar todos los datos de demostración.</p>
          <button
            onClick={() => {
              if (confirm('¿Seguro que quieres reiniciar todos los datos?')) {
                onReset();
              }
            }}
            className="px-4 py-2 rounded-xl border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-all"
          >
            Reiniciar datos
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-[10px] text-zinc-600 tracking-wider">LifeOS v0.1</p>
          <p className="text-[10px] text-zinc-700 mt-1 italic">"No administres tu tiempo. Dirige tu vida."</p>
        </motion.div>
      </div>
    </div>
  );
}
