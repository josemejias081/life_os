import { useState } from 'react';
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
    onEnd(session.id, result, energy, notes);
  };

  const handleSkipNotes = () => {
    onEnd(session.id, result, energy, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-6">
      <div className="max-w-md w-full page-transition">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Sesión finalizada</p>
          <h2 className="text-xl font-semibold text-white">{project?.name}</h2>
        </div>

        {/* Step 1: Result */}
        {step === 'result' && (
          <div className="page-transition">
            <p className="text-center text-gray-300 text-lg mb-8">
              ¿Terminaste la misión?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleResultSelect('completed')}
                className="w-full bg-white/10 border border-white/10 text-white py-4 rounded-xl text-left px-5 hover:bg-white/15 transition-all active:scale-[0.98]"
              >
                <span className="text-lg mr-3">✓</span>
                <span className="font-medium">Sí, completada</span>
              </button>
              <button
                onClick={() => handleResultSelect('partial')}
                className="w-full bg-white/10 border border-white/10 text-white py-4 rounded-xl text-left px-5 hover:bg-white/15 transition-all active:scale-[0.98]"
              >
                <span className="text-lg mr-3">◐</span>
                <span className="font-medium">Parcialmente</span>
              </button>
              <button
                onClick={() => handleResultSelect('not-completed')}
                className="w-full bg-white/10 border border-white/10 text-white py-4 rounded-xl text-left px-5 hover:bg-white/15 transition-all active:scale-[0.98]"
              >
                <span className="text-lg mr-3">✗</span>
                <span className="font-medium">No la terminé</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Energy */}
        {step === 'energy' && (
          <div className="page-transition">
            <p className="text-center text-gray-300 text-lg mb-8">
              ¿Cómo estuvo tu energía?
            </p>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => handleEnergySelect('excellent')}
                className="flex flex-col items-center gap-2 bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-all active:scale-[0.98]"
              >
                <span className="text-3xl">😀</span>
                <span className="text-[10px] text-gray-400">Excelente</span>
              </button>
              <button
                onClick={() => handleEnergySelect('good')}
                className="flex flex-col items-center gap-2 bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-all active:scale-[0.98]"
              >
                <span className="text-3xl">🙂</span>
                <span className="text-[10px] text-gray-400">Buena</span>
              </button>
              <button
                onClick={() => handleEnergySelect('normal')}
                className="flex flex-col items-center gap-2 bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-all active:scale-[0.98]"
              >
                <span className="text-3xl">😐</span>
                <span className="text-[10px] text-gray-400">Normal</span>
              </button>
              <button
                onClick={() => handleEnergySelect('low')}
                className="flex flex-col items-center gap-2 bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-all active:scale-[0.98]"
              >
                <span className="text-3xl">😞</span>
                <span className="text-[10px] text-gray-400">Baja</span>
              </button>
            </div>
            <button
              onClick={() => setStep('result')}
              className="w-full mt-6 text-gray-500 text-sm hover:text-gray-300 transition-colors"
            >
              ← Volver
            </button>
          </div>
        )}

        {/* Step 3: Notes */}
        {step === 'notes' && (
          <div className="page-transition">
            <p className="text-center text-gray-300 text-lg mb-6">
              ¿Algo que quieras recordar?
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Una nota opcional sobre la sesión..."
              rows={4}
              className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500/50 text-sm"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSkipNotes}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 font-medium hover:bg-white/5 transition-all"
              >
                Saltar
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all active:scale-[0.98]"
              >
                Guardar
              </button>
            </div>
            <button
              onClick={() => setStep('energy')}
              className="w-full mt-4 text-gray-500 text-sm hover:text-gray-300 transition-colors"
            >
              ← Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
