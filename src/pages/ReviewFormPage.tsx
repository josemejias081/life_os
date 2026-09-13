import { useState } from 'react';

interface Props {
  onSave: (proud: string, blocked: string, change: string) => void;
  onCancel: () => void;
}

export default function ReviewFormPage({ onSave, onCancel }: Props) {
  const [proud, setProud] = useState('');
  const [blocked, setBlocked] = useState('');
  const [change, setChange] = useState('');

  const canSave = proud.trim() || blocked.trim() || change.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full page-transition">
        <div className="text-center mb-10">
          <span className="text-3xl mb-4 block">🔄</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Revisión Semanal</h1>
          <p className="text-gray-500">Tres preguntas. Sin prisa.</p>
        </div>

        <div className="space-y-6">
          {/* Question 1 */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                ¿Qué avance te hace sentir orgulloso?
              </span>
              <textarea
                value={proud}
                onChange={(e) => setProud(e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
                className="w-full border-0 border-b border-gray-100 focus:border-blue-300 focus:ring-0 text-gray-800 placeholder-gray-300 resize-none text-sm"
              />
            </label>
          </div>

          {/* Question 2 */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                ¿Qué te bloqueó?
              </span>
              <textarea
                value={blocked}
                onChange={(e) => setBlocked(e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
                className="w-full border-0 border-b border-gray-100 focus:border-blue-300 focus:ring-0 text-gray-800 placeholder-gray-300 resize-none text-sm"
              />
            </label>
          </div>

          {/* Question 3 */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                ¿Qué harás diferente?
              </span>
              <textarea
                value={change}
                onChange={(e) => setChange(e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
                className="w-full border-0 border-b border-gray-100 focus:border-blue-300 focus:ring-0 text-gray-800 placeholder-gray-300 resize-none text-sm"
              />
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={() => canSave && onSave(proud, blocked, change)}
            disabled={!canSave}
            className="flex-1 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
