import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle2, Plus } from 'lucide-react';
import { AppState } from '../types';

interface Props {
  state: AppState;
  onStartReview: () => void;
}

export default function ReviewsPage({ state, onStartReview }: Props) {
  const weeklyReviews = state.reviews
    .filter(r => r.type === 'weekly')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lastReview = weeklyReviews[0];
  let daysSinceLastReview = 999;
  if (lastReview) {
    daysSinceLastReview = Math.floor((new Date().getTime() - new Date(lastReview.date).getTime()) / 86400000);
  }
  const needsReview = daysSinceLastReview >= 7;

  return (
    <div className="min-h-screen pb-32 pt-10 px-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-white tracking-tight">Revisiones</h1>
          <p className="text-zinc-500 text-sm mt-2">¿Qué aprendí esta semana?</p>
        </motion.div>

        {/* Review CTA */}
        {needsReview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass-card p-6 mb-8 border-indigo-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <RotateCcw size={18} className="text-indigo-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Es hora de tu revisión semanal</p>
                  <p className="text-sm text-zinc-500">Solo 3 preguntas. 5 minutos.</p>
                </div>
              </div>
              <button
                onClick={onStartReview}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Hacer revisión
              </button>
            </div>
          </motion.div>
        )}

        {!needsReview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass-card p-6 mb-8 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={22} className="text-emerald-400" />
            </div>
            <p className="text-zinc-200 font-medium">Revisión al día</p>
            <p className="text-sm text-zinc-500 mt-1">
              Última revisión hace {daysSinceLastReview} día{daysSinceLastReview !== 1 ? 's' : ''}
            </p>
            <button
              onClick={onStartReview}
              className="mt-4 text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
            >
              Hacer otra revisión →
            </button>
          </motion.div>
        )}

        {/* Review History */}
        {weeklyReviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold mb-4">Historial</p>
            <div className="space-y-3">
              {weeklyReviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                  className="glass-card p-5"
                >
                  <p className="text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-4">
                    {new Date(review.date).toLocaleDateString('es-ES', {
                      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </p>
                  <div className="space-y-3">
                    {review.proud && (
                      <div>
                        <p className="text-[10px] text-indigo-400 uppercase tracking-wider font-medium mb-1">Orgullo</p>
                        <p className="text-sm text-zinc-300">{review.proud}</p>
                      </div>
                    )}
                    {review.blocked && (
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider font-medium mb-1">Bloqueo</p>
                        <p className="text-sm text-zinc-300">{review.blocked}</p>
                      </div>
                    )}
                    {review.change && (
                      <div>
                        <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-medium mb-1">Cambio</p>
                        <p className="text-sm text-zinc-300">{review.change}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {weeklyReviews.length === 0 && !needsReview && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
              <RotateCcw size={24} className="text-zinc-600" />
            </div>
            <p className="text-zinc-500 text-sm">Aún no hay revisiones</p>
          </div>
        )}
      </div>
    </div>
  );
}
