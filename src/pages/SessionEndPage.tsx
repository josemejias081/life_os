import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Circle, XCircle, ArrowLeft } from 'lucide-react';
import { AppState, Session } from '../types';

interface Props {
  session: Session;
  state: AppState;
  onEnd: (sessionId: string, result: Session['result'], energy: Session['energy'], notes: string) => void;
}

export default function SessionEndPage({ session, state, onEnd }: Props) {
  const [step, setStep] = useState<'result' | 'energy' | 'notes'>('result');
  const [result, setResult] = useState<Session['result']>(null);
  const [energy, setEnergy] = useState<Session['energy']>(null);
  const [notes, setNotes] = useState('');

  const project = state.projects.find(p => p.id === session.projectId);

  const handleResultSelect = (r: Session['result']) => {
    setResult(r);
    setStep('energy');
  };

  const handleEnergySelect = (e: Session['energy']) => {
    setEnergy(e);
    setStep('notes');
  };

  const handleFinish = () => {
    onEnd(session.id, result!, energy!, notes);
  };

  const handleSkipNotes = () => {
    onEnd(session.id, result!, energy!, '');
  };

  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-2">Sesión finalizada</p>
          <h2 className="text-xl font-semibold text-white">{project?.name}</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Result */}
          {step === 'result' && (
            <motion.div
              key="result"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className="text-center text-zinc-300 text-lg mb-8 font-light">
                ¿Terminaste la misión?
              </p>
              <div className="space-y-3">
                {[
                  { value: 'completed' as const, icon: Check, label: 'Sí, completada', color: 'emerald' },
                  { value: 'partial' as const, icon: Circle, label: 'Parcialmente', color: 'amber' },
                  { value: 'not-completed' as const, icon: XCircle, label: 'No la terminé', color: 'red' }
                ].map(({ value, icon: Icon, label, color }) => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResultSelect(value)}
                    className="w-full glass-card py-4 px-5 text-left flex items-center gap-4 group hover:border-indigo-500/20 transition-all"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      color === 'emerald' ? 'bg-emerald-500/10' :
                      color === 'amber' ? 'bg-amber-500/10' : 'bg-red-500/10'
                    }`}>
                      <Icon size={16} className={
                        color === 'emerald' ? 'text-emerald-400' :
                        color === 'amber' ? 'text-amber-400' : 'text-red-400'
                      } />
                    </div>
                    <span className="font-medium text-zinc-200 group-hover:text-white transition-colors">{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Energy */}
          {step === 'energy' && (
            <motion.div
              key="energy"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className="text-center text-zinc-300 text-lg mb-8 font-light">
                ¿Cómo estuvo tu energía?
              </p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: 'excellent' as const, emoji: '😀', label: 'Excelente' },
                  { value: 'good' as const, emoji: '🙂', label: 'Buena' },
                  { value: 'normal' as const, emoji: '😐', label: 'Normal' },
                  { value: 'low' as const, emoji: '😞', label: 'Baja' }
                ].map(({ value, emoji, label }) => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEnergySelect(value)}
                    className="glass-card p-4 flex flex-col items-center gap-2 group hover:border-indigo-500/20"
                  >
                    <span className="text-3xl">{emoji}</span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-medium">{label}</span>
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setStep('result')}
                className="w-full mt-8 text-zinc-500 text-sm hover:text-indigo-400 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={12} />
                Volver
              </button>
            </motion.div>
          )}

          {/* Step 3: Notes */}
          {step === 'notes' && (
            <motion.div
              key="notes"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className="text-center text-zinc-300 text-lg mb-6 font-light">
                ¿Algo que quieras recordar?
              </p>
              <div className="glass-card p-5 mb-6">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Una nota opcional sobre la sesión..."
                  rows={4}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-600 resize-none focus:outline-none focus:border-indigo-500/50 text-sm leading-relaxed"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSkipNotes}
                  className="btn-ghost flex-1"
                >
                  Saltar
                </button>
                <button
                  onClick={handleFinish}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  Guardar
                </button>
              </div>
              <button
                onClick={() => setStep('energy')}
                className="w-full mt-6 text-zinc-500 text-sm hover:text-indigo-400 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={12} />
                Volver
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
