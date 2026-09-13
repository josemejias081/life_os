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
    <div className="min-h-screen pb-24 pt-8 px-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Revisiones</h1>
          <p className="text-gray-400 text-sm mt-1">¿Qué aprendí esta semana?</p>
        </div>

        {/* Review CTA */}
        {needsReview && (
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔄</span>
              <div>
                <p className="font-semibold text-gray-900">Es hora de tu revisión semanal</p>
                <p className="text-sm text-gray-500">Solo 3 preguntas. 5 minutos.</p>
              </div>
            </div>
            <button
              onClick={onStartReview}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-all active:scale-[0.98] mt-2"
            >
              Hacer revisión
            </button>
          </div>
        )}

        {!needsReview && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 text-center">
            <p className="text-3xl mb-2">✓</p>
            <p className="text-gray-600 font-medium">Revisión al día</p>
            <p className="text-sm text-gray-400 mt-1">
              Última revisión hace {daysSinceLastReview} día{daysSinceLastReview !== 1 ? 's' : ''}
            </p>
            <button
              onClick={onStartReview}
              className="mt-4 text-sm text-blue-600 font-medium hover:text-blue-700"
            >
              Hacer otra revisión →
            </button>
          </div>
        )}

        {/* Review History */}
        {weeklyReviews.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Historial</p>
            <div className="space-y-3">
              {weeklyReviews.map(review => (
                <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(review.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </p>
                  <div className="space-y-3">
                    {review.proud && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Orgullo</p>
                        <p className="text-sm text-gray-700">{review.proud}</p>
                      </div>
                    )}
                    {review.blocked && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Bloqueo</p>
                        <p className="text-sm text-gray-700">{review.blocked}</p>
                      </div>
                    )}
                    {review.change && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Cambio</p>
                        <p className="text-sm text-gray-700">{review.change}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {weeklyReviews.length === 0 && !needsReview && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-gray-400">Aún no hay revisiones</p>
          </div>
        )}
      </div>
    </div>
  );
}
