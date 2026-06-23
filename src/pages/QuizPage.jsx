import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Pause, Heart, Zap, Lightbulb, Flame, PackageOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ──────────────────────────────────────────────
   Quiz data — swap out for real data later
   ────────────────────────────────────────────── */
const QUESTION = {
  title: 'What is a Diversified Portfolio?',
  body: 'Spreading investments across different asset classes to reduce risk.',
  answers: [
    { id: 'a', text: 'Putting all money in one high-return stock', color: '#8B5CF6', textColor: '#fff' },
    { id: 'b', text: 'Mixing stocks, bonds and cash to reduce risk', color: '#00D4C8', textColor: '#0A0A1A', correct: true },
    { id: 'c', text: 'Saving every coin in a savings account', color: '#F97316', textColor: '#fff' },
    { id: 'd', text: 'Only investing in government bonds', color: '#B8F400', textColor: '#0A0A1A' },
  ],
};

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.3, ease: 'easeOut' },
});

export default function QuizPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (id) => {
    if (revealed) return;
    setSelected(id);
    setRevealed(true);
  };

  const isCorrect = (id) => QUESTION.answers.find(a => a.id === id)?.correct;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#0A0A1A', color: '#F4F4F4', fontFamily: 'inherit' }}
    >
      {/* ── Top Bar ── */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0 sticky top-0 z-20"
        style={{ background: 'rgba(10,10,26,0.92)', backdropFilter: 'blur(10px)', borderBottom: '2px solid #1e1e3a' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 font-bold text-sm px-3 py-2 rounded-xl transition-all hover:bg-white/10"
          style={{ border: '2px solid #2a2a4a', color: '#94a3b8' }}
        >
          <ChevronLeft size={18} /> Back
        </button>

        {/* Lives */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map(i => (
            <Heart key={i} size={22} className="fill-red-500 text-red-500" />
          ))}
        </div>

        {/* Coins */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ border: '2px solid #2a2a4a', background: '#12123A' }}>
          <span className="text-yellow-400 text-lg">🪙</span>
          <span className="font-black text-yellow-400 text-sm">320</span>
        </div>

        <button
          className="p-2 rounded-xl transition-all hover:bg-white/10"
          style={{ border: '2px solid #2a2a4a', color: '#94a3b8' }}
        >
          <Pause size={18} />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 pt-6 pb-8 gap-5">

        {/* Progress bar (question 3 of 8) */}
        <motion.div {...fade(0)} className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400">3 / 8</span>
          <div className="flex-1 h-2 rounded-full" style={{ background: '#1e1e3a' }}>
            <div className="h-full rounded-full" style={{ width: '37.5%', background: 'linear-gradient(90deg,#00D4C8,#8B5CF6)' }} />
          </div>
          <div className="flex items-center gap-1" style={{ color: '#B8F400' }}>
            <Zap size={14} fill="currentColor" />
            <span className="text-xs font-bold">+50 XP</span>
          </div>
        </motion.div>

        {/* Question card */}
        <motion.div
          {...fade(0.05)}
          className="rounded-2xl p-6"
          style={{ background: '#12123A', border: '2px solid #1e1e3a' }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#00D4C8' }}>
            Finance Basics · Chapter 2
          </p>
          <h2 className="text-xl font-black leading-snug mb-2">{QUESTION.title}</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#7B8DB0' }}>{QUESTION.body}</p>
        </motion.div>

        {/* Answer grid — 2×2, the primary focal point */}
        <motion.div {...fade(0.1)} className="grid grid-cols-2 gap-3">
          {QUESTION.answers.map((ans, i) => {
            const isSelected = selected === ans.id;
            const showResult = revealed && isSelected;
            const correctAndRevealed = revealed && ans.correct;

            let borderColor = '#2a2a4a';
            if (correctAndRevealed) borderColor = '#B8F400';
            else if (showResult && !ans.correct) borderColor = '#ef4444';

            return (
              <motion.button
                key={ans.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12 + i * 0.06 }}
                whileHover={!revealed ? { scale: 1.03 } : {}}
                whileTap={!revealed ? { scale: 0.97 } : {}}
                onClick={() => handleSelect(ans.id)}
                disabled={revealed}
                className="relative p-4 rounded-2xl text-left font-bold text-sm leading-snug transition-all min-h-[100px] flex flex-col justify-between"
                style={{
                  background: ans.color,
                  color: ans.textColor,
                  border: `3px solid ${borderColor}`,
                  boxShadow: correctAndRevealed ? '0 0 20px rgba(184,244,0,0.35)' : '4px 4px 0 #000',
                  opacity: revealed && !ans.correct && !isSelected ? 0.45 : 1,
                  cursor: revealed ? 'default' : 'pointer',
                }}
              >
                <span className="text-xs font-black uppercase opacity-60 mb-1">
                  {String.fromCharCode(65 + i)}
                </span>
                {ans.text}
                {correctAndRevealed && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-3 text-xl"
                  >
                    ✓
                  </motion.span>
                )}
                {showResult && !ans.correct && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-3 text-xl"
                  >
                    ✗
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── HINT SECTION (hidden until triggered) ── */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-3 overflow-hidden rounded-2xl p-4"
              style={{ background: '#12123A', border: '2px solid #1e1e3a' }}
            >
              <span className="text-3xl shrink-0">🐶</span>
              <div>
                <p className="font-black text-sm mb-1" style={{ color: '#00D4C8' }}>Piggy's Tip</p>
                <p className="text-sm leading-relaxed" style={{ color: '#7B8DB0' }}>
                  Think about what happens when you put all eggs in one basket vs. spreading them around. Which is safer?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RESULT FEEDBACK ── */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{
                background: isCorrect(selected) ? 'rgba(184,244,0,0.1)' : 'rgba(239,68,68,0.1)',
                border: `2px solid ${isCorrect(selected) ? '#B8F400' : '#ef4444'}`,
              }}
            >
              <span className="text-3xl">{isCorrect(selected) ? '🎉' : '😅'}</span>
              <div>
                <p className="font-black text-sm" style={{ color: isCorrect(selected) ? '#B8F400' : '#ef4444' }}>
                  {isCorrect(selected) ? 'Correct! +50 XP' : 'Not quite!'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#7B8DB0' }}>
                  {isCorrect(selected)
                    ? 'Diversification spreads risk across different assets.'
                    : 'Diversification = mixing asset types to reduce risk.'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue / Action row */}
        <motion.div {...fade(0.25)} className="flex items-center gap-3 mt-auto pt-2">
          {/* Secondary tools — small, unobtrusive */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowHint(h => !h)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-white/10"
              style={{ border: '2px solid #2a2a4a', color: '#00D4C8' }}
            >
              <Lightbulb size={14} /> Hint
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-white/10"
              style={{ border: '2px solid #2a2a4a', color: '#F97316' }}
            >
              <Flame size={14} /> Power Up
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-white/10"
              style={{ border: '2px solid #2a2a4a', color: '#8B5CF6' }}
            >
              <PackageOpen size={14} /> Items
            </button>
          </div>

          {/* Primary CTA — dominant */}
          {revealed && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-auto px-6 py-3 rounded-xl font-black text-sm transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg,#00D4C8,#8B5CF6)',
                color: '#fff',
                boxShadow: '4px 4px 0 #000',
              }}
            >
              Next →
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
