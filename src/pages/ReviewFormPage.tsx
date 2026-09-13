import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';

interface Props {
  onSave: (proud: string, blocked: string, change: string) => void;
  onCancel: () => void;
}

export default function ReviewFormPage({ onSave, onCancel }: Props) {
  const [proud, setProud] = useState('');
  const [blocked, setBlocked] = useState('');
  const [change, setChange] = useState('');
  const canSave = proud.trim() || blocked.trim() || change.trim();

  const questions = [
    { key: 'proud', label: '¿Qué avance te hace sentir orgulloso?', value: proud, setter: setProud, color: 'indigo', placeholder: 'Algo de lo que te sientes bien...' },
    { key: 'blocked', label: '¿Qué te bloqueó?', value: blocked, setter: setBlocked, color: 'amber', placeholder: 'El obstáculo principal...' },
    { key: 'change', label: '¿Qué harás diferente?', value: change, setter: setChange, color: 'emerald', placeholder: 'Un cambio concreto para la próxima semana...' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔄</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Revisión Semanal</h1>
          <p className="text-zinc-500 text-sm">Tres preguntas. Sin prisa.</p>
        </motion.div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((q, i) => (
            <motion.div
              key={q.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="glass-card p-5"
            >
              <label className="block">
                <span className={`text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block ${
                  q.color === 'indigo' ? 'text-indigo-400' :
                  q.color === 'amber' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {q.label}
                </span>
                <textarea
                  value={q.value}
                  onChange={(e) => q.setter(e.target.value)}
                  placeholder={q.placeholder}
                  rows={2}
                  className="w-full bg-transparent text-zinc-200 placeholder-zinc-600 resize-none text-sm focus:outline-none leading-relaxed"
                />
              </label>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 mt-8"
        >
          <button
            onClick={onCancel}
            className="btn-ghost flex-1 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} />
            Cancelar
          </button>
          <button
            onClick={() => canSave && onSave(proud, blocked, change)}
            disabled={!canSave}
            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Check size={16} />
            Guardar
          </button>
        </motion.div>
      </div>
    </div>
  );
}
