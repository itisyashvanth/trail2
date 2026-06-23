import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, Lightbulb, Flame, PackageOpen, Pause, Trophy, Coins, Dog, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const B    = '3px solid #000';
const SH   = '5px 5px 0 #000';
const SH_SM = '3px 3px 0 #000';

const PALETTE = {
  bg:     '#0D0D1A',
  base:   '#1A1A2E',
  teal:   '#00D4C8',
  lime:   '#B8F400',
  violet: '#8B5CF6',
  orange: '#F97316',
  text:   '#F4F4F4',
  muted:  '#94A3B8',
};

const QUESTION = {
  chapter: 'Finance Basics · Chapter 2',
  title: 'What is a Diversified Portfolio?',
  body: 'Spreading investments across different asset classes to reduce risk is a core principle of sound financial planning.',
  answers: [
    { id: 'a', text: 'Putting all money in one high-return stock',    color: PALETTE.violet, textColor: '#fff'       },
    { id: 'b', text: 'Mixing stocks, bonds and cash to reduce risk',  color: PALETTE.teal,   textColor: '#000', correct: true },
    { id: 'c', text: 'Saving every coin in a single savings account', color: PALETTE.orange, textColor: '#000'       },
    { id: 'd', text: 'Only investing in government bonds',            color: PALETTE.lime,   textColor: '#000'   },
  ],
};

const ALL_QUESTIONS = 8;
const CURRENT_Q = 3;

export default function QuizPage() {
  const navigate = useNavigate();
  const [selected, setSelected]   = useState(null);
  const [revealed, setRevealed]   = useState(false);
  const [showHint, setShowHint]   = useState(false);
  const [lives]                   = useState(3);

  const handleSelect = (id) => {
    if (revealed) return;
    setSelected(id);
    setRevealed(true);
  };

  const isCorrect = (id) => QUESTION.answers.find(a => a.id === id)?.correct;

  return (
    <div className="w-full min-h-screen px-6 md:px-10 pt-8 pb-28 font-sans" style={{ background: PALETTE.bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Top Status Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 px-6 py-4"
          style={{ background: PALETTE.base, border: B, boxShadow: SH }}
        >
          {/* Left: lives */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="font-black uppercase tracking-wider text-sm px-4 py-3 transition-all hover:-translate-y-0.5"
              style={{ background: PALETTE.base, border: B, color: PALETTE.text, boxShadow: SH_SM }}
            >
              ← Back
            </button>
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: PALETTE.base, border: B, boxShadow: SH_SM }}>
              {[1, 2, 3].map(i => (
                <Heart key={i} size={18} fill={i <= lives ? '#ef4444' : 'none'} color={i <= lives ? '#ef4444' : PALETTE.muted} />
              ))}
            </div>
          </div>

          {/* Center: progress */}
          <div className="flex items-center gap-4 flex-1 max-w-xs mx-8">
            <span className="font-black text-sm shrink-0" style={{ color: PALETTE.muted }}>{CURRENT_Q}/{ALL_QUESTIONS}</span>
            <div className="flex-1 h-3" style={{ background: '#2a2a4a', border: B }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(CURRENT_Q / ALL_QUESTIONS) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full"
                style={{ background: PALETTE.teal }}
              />
            </div>
            <span className="font-black text-sm flex items-center gap-1 shrink-0" style={{ color: PALETTE.lime }}>
              <Zap size={14} fill="currentColor" /> +50 XP
            </span>
          </div>

          {/* Right: coins + pause */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: PALETTE.base, border: B, boxShadow: SH_SM }}>
              <Coins size={18} color="#FFCD75" />
              <span className="font-black text-sm" style={{ color: '#FFCD75' }}>320</span>
            </div>
            <button
              className="p-3 transition-all hover:-translate-y-0.5"
              style={{ background: PALETTE.base, border: B, color: PALETTE.muted, boxShadow: SH_SM }}
            >
              <Pause size={18} />
            </button>
          </div>
        </motion.div>

        {/* ── Main 2-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* ── Left Column: Question + Answers ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Question card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8"
              style={{ background: PALETTE.base, border: B, boxShadow: SH }}
            >
              <p className="font-black text-xs uppercase tracking-widest mb-3" style={{ color: PALETTE.teal }}>
                {QUESTION.chapter}
              </p>
              <h2 className="font-black text-2xl uppercase tracking-tight mb-3" style={{ color: PALETTE.text, lineHeight: 1.2 }}>
                {QUESTION.title}
              </h2>
              <p className="font-bold text-sm leading-relaxed" style={{ color: PALETTE.muted }}>
                {QUESTION.body}
              </p>
            </motion.div>

            {/* Answer grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {QUESTION.answers.map((ans, i) => {
                const isSelected       = selected === ans.id;
                const correctRevealed  = revealed && ans.correct;
                const wrongSelected    = revealed && isSelected && !ans.correct;
                const fadedOut         = revealed && !ans.correct && !isSelected;

                return (
                  <motion.button
                    key={ans.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: fadedOut ? 0.35 : 1, scale: 1 }}
                    transition={{ delay: 0.22 + i * 0.06 }}
                    whileHover={!revealed ? { y: -2, boxShadow: '7px 7px 0 #000' } : {}}
                    onClick={() => handleSelect(ans.id)}
                    disabled={revealed}
                    className="relative p-6 text-left font-black text-base leading-snug transition-all flex flex-col justify-between"
                    style={{
                      background: ans.color,
                      color: ans.textColor,
                      minHeight: 140,
                      cursor: revealed ? 'default' : 'pointer',
                      border: correctRevealed
                        ? `4px solid ${PALETTE.lime}`
                        : wrongSelected
                        ? '4px solid #ef4444'
                        : B,
                      boxShadow: correctRevealed ? `0 0 0 4px ${PALETTE.lime}, 5px 5px 0 #000` : SH,
                    }}
                  >
                    <span className="text-xs font-black uppercase opacity-60 mb-3" style={{ color: ans.textColor }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{ans.text}</span>

                    {/* Result icons */}
                    {correctRevealed && (
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute top-4 right-4"
                      >
                        <CheckCircle2 size={28} color={PALETTE.lime} fill="#000" />
                      </motion.div>
                    )}
                    {wrongSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4"
                      >
                        <XCircle size={28} color="#ef4444" fill="#000" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-5 overflow-hidden px-6 py-6"
                  style={{ background: PALETTE.teal, border: B, boxShadow: SH }}
                >
                  <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ background: '#000', border: B }}>
                    <Dog size={24} color={PALETTE.teal} />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-wider mb-2" style={{ color: '#000' }}>Piggy's Tip</p>
                    <p className="font-bold text-sm leading-relaxed" style={{ color: '#1a3a38' }}>
                      Think about what happens when you put all your eggs in one basket versus spreading them out. Which approach protects you better if one investment fails?
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result feedback */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-5 px-6 py-6"
                  style={{
                    background: isCorrect(selected) ? PALETTE.lime : '#ef4444',
                    border: B,
                    boxShadow: SH,
                  }}
                >
                  <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ background: '#000', border: B }}>
                    {isCorrect(selected) ? <CheckCircle2 size={24} color={PALETTE.lime} /> : <XCircle size={24} color="#ef4444" />}
                  </div>
                  <div>
                    <p className="font-black text-lg uppercase tracking-tight mb-1" style={{ color: '#000' }}>
                      {isCorrect(selected) ? 'Correct! +50 XP earned' : 'Not quite right!'}
                    </p>
                    <p className="font-bold text-sm" style={{ color: '#1a3a38' }}>
                      {isCorrect(selected)
                        ? 'Diversification means spreading investments to lower risk.'
                        : 'The correct answer is B — mixing asset types reduces overall portfolio risk.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action row */}
            <div className="flex items-center gap-3">
              <div className="flex gap-3">
                {[
                  { label: 'Hint',     icon: <Lightbulb size={16} />, color: PALETTE.teal,   action: () => setShowHint(h => !h) },
                  { label: 'Power Up', icon: <Flame size={16} />,     color: PALETTE.orange, action: () => {} },
                  { label: 'Items',    icon: <PackageOpen size={16}/>, color: PALETTE.violet, action: () => {} },
                ].map(({ label, icon, color, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="flex items-center gap-2 px-5 py-3 font-black uppercase tracking-wider text-xs transition-all hover:-translate-y-0.5"
                    style={{ background: PALETTE.base, border: B, color, boxShadow: SH_SM }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>

              {revealed && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-auto px-8 py-4 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                  style={{
                    background: PALETTE.teal,
                    color: '#000',
                    border: B,
                    boxShadow: SH,
                  }}
                >
                  Next Question →
                </motion.button>
              )}
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="hidden lg:flex flex-col gap-5 shrink-0" style={{ width: 320 }}>
            <div className="sticky top-[76px] flex flex-col gap-5">

              {/* Session stats */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                style={{ background: PALETTE.base, border: B, boxShadow: SH, padding: 20 }}
              >
                <p className="font-black text-xs uppercase tracking-widest mb-4" style={{ color: PALETTE.muted }}>This Session</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Questions Done', value: `${CURRENT_Q - 1}/${ALL_QUESTIONS}`, color: PALETTE.teal   },
                    { label: 'XP Earned',      value: `${(CURRENT_Q - 1) * 50}`,           color: PALETTE.lime   },
                    { label: 'Accuracy',        value: '100%',                              color: PALETTE.violet },
                    { label: 'Streak',          value: '3',                                 color: PALETTE.orange },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="font-bold text-xs" style={{ color: PALETTE.muted }}>{label}</span>
                      <span className="font-black text-sm" style={{ color }}>{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Progress through this level */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="p-5"
                style={{ background: `${PALETTE.violet}22`, border: `3px solid ${PALETTE.violet}` }}
              >
                <p className="font-black text-xs uppercase mb-1" style={{ color: PALETTE.violet }}>📍 Saving Goals</p>
                <p className="font-bold text-xs" style={{ color: PALETTE.muted }}>Question {CURRENT_Q} of {ALL_QUESTIONS}</p>
                <div className="mt-4 h-2" style={{ background: '#2a2a4a', border: B }}>
                  <div
                    className="h-full"
                    style={{ width: `${(CURRENT_Q / ALL_QUESTIONS) * 100}%`, background: PALETTE.violet }}
                  />
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
