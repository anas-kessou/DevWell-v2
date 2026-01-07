
import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
      <h3 className="font-bold mb-4">Rate Your Experience</h3>
      
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={24} />
          </div>
          <p className="font-bold text-sm">Thank You!</p>
          <p className="text-xs text-slate-500 mt-1">Your feedback helps us improve.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform active:scale-90"
              >
                <Star 
                  size={24} 
                  className={`${(hover || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} transition-colors`} 
                />
              </button>
            ))}
          </div>
          <textarea 
            placeholder="Any comments?"
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-3 text-xs min-h-[80px] focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            disabled={rating === 0}
            className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-3 rounded-2xl text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
