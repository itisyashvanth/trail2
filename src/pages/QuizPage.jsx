import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, Lightbulb, Flame, PackageOpen, Pause, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const T = {
  bg: '#0A0A1A',
  card: 'rgba(18,10,45,0.95)',
  cardBorder: 'rgba(139,92,246,0.2)',
  surface: '#12123A',
  surfaceBorder: '#1e1e3a',
  teal: '#00D4C8',
  lime: '#B8F400',
  violet: '#8B5CF6',
  orange: '#F97316',
  muted: '#566C86',
  text: '#F4F4F4',
  textSub: '#7B8DB0',
};

const QUESTION = {
  chapter: 'Finance Basics · Chapter 2',
  title: 'What is a Diversified Portfolio?',
  body: 'Spreading investments across different asset classes to reduce risk is a core principle of sound financial planning.',
  answers: [
    { id: 'a', text: 'Putting all money in one high-return stock',    color: T.violet, textColor: '#fff'       },
    { id: 'b', text: 'Mixing stocks, bonds and cash to reduce risk',  color: T.teal,   textColor: '#0A0A1A', correct: true },
    { id: 'c', text: 'Saving every coin in a single savings account', color: T.orange, textColor: '#fff'       },
    { id: 'd', text: 'Only investing in government bonds',            color: T.lime,   textColor: '#0A0A1A'   },
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
    <div className="w-full min-h-screen px-4 md:px-8 pt-8 pb-24" style={{ background: T.bg }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Top Status Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 px-6 py-4 rounded-2xl"
          style={{ background: T.card, border: `1px solid ${T.cardBorder}` }}
        >
          {/* Left: lives */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-sm font-bold px-4 py-2 rounded-xl transition-all hover:bg-white/10"
              style={{ border: `1px solid ${T.surfaceBorder}`, color: T.textSub }}
            >
              ← Back
            </button>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl" style={{ border: `1px solid ${T.surfaceBorder}` }}>
              {[1, 2, 3].map(i => (
                <Heart key={i} size={20} fill={i <= lives ? '#ef4444' : 'none'} color={i <= lives ? '#ef4444' : T.muted} />
              ))}
            </div>
          </div>

          {/* Center: progress */}
          <div className="flex items-center gap-4 flex-1 max-w-xs mx-8">
            <span className="text-xs font-black shrink-0" style={{ color: T.textSub }}>{CURRENT_Q}/{ALL_QUESTIONS}</span>
            <div className="flex-1 h-2.5 rounded-full" style={{ background: T.surfaceBorder }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(CURRENT_Q / ALL_QUESTIONS) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg,${T.violet},${T.teal})` }}
              />
            </div>
            <span className="text-xs font-black flex items-center gap-1 shrink-0" style={{ color: T.lime }}>
              <Zap size={12} fill="currentColor" /> +50 XP
            </span>
          </div>

          {/* Right: coins + pause */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ border: `1px solid ${T.surfaceBorder}` }}>
              <span className="text-base">🪙</span>
              <span className="font-black text-sm" style={{ color: '#FFCD75' }}>320</span>
            </div>
            <button
              className="p-2.5 rounded-xl transition-all hover:bg-white/10"
              style={{ border: `1px solid ${T.surfaceBorder}`, color: T.textSub }}
            >
              <Pause size={18} />
            </button>
          </div>
        </motion.div>

        {/* ── Main 2-column layout ── */}
        <div className="flex gap-8 items-start">

          {/* ── Left Column: Question + Answers ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Question card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl"
              style={{ background: T.card, border: `1px solid ${T.cardBorder}` }}
            >
              <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: T.teal }}>
                {QUESTION.chapter}
              </p>
              <h2 className="text-2xl font-black leading-snug mb-3" style={{ color: T.text }}>
                {QUESTION.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: T.textSub }}>
                {QUESTION.body}
              </p>
            </motion.div>

            {/* Answer grid — 2×2, the primary focal point of the entire page */}
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
                    whileHover={!revealed ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!revealed ? { scale: 0.98 } : {}}
                    onClick={() => handleSelect(ans.id)}
                    disabled={revealed}
                    className="relative p-6 rounded-2xl text-left font-bold text-base leading-snug transition-all flex flex-col justify-between"
                    style={{
                      background: ans.color,
                      color: ans.textColor,
                      minHeight: 130,
                      cursor: revealed ? 'default' : 'pointer',
                      border: correctRevealed
                        ? `3px solid ${T.lime}`
                        : wrongSelected
                        ? '3px solid #ef4444'
                        : '3px solid transparent',
                      boxShadow: correctRevealed
                        ? `0 0 28px rgba(184,244,0,0.4), 4px 4px 0 rgba(0,0,0,0.3)`
                        : '4px 4px 0 rgba(0,0,0,0.3)',
                    }}
                  >
                    <span className="text-xs font-black uppercase opacity-50 mb-2">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{ans.text}</span>

                    {/* Result icons */}
                    {correctRevealed && (
                      <motion.span
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute top-3 right-4 text-2xl"
                      >
                        ✓
                      </motion.span>
                    )}
                    {wrongSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-4 text-2xl"
                      >
                        ✗
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Hint (shown only when user taps it) */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-4 overflow-hidden rounded-2xl px-6 py-5"
                  style={{ background: T.surface, border: `1px solid ${T.teal}30` }}
                >
                  <span className="text-3xl shrink-0">🐶</span>
                  <div>
                    <p className="font-black text-sm mb-1" style={{ color: T.teal }}>Piggy's Tip</p>
                    <p className="text-sm leading-relaxed" style={{ color: T.textSub }}>
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
                  className="flex items-center gap-4 px-6 py-5 rounded-2xl"
                  style={{
                    background: isCorrect(selected) ? `rgba(184,244,0,0.08)` : 'rgba(239,68,68,0.08)',
                    border: `1px solid ${isCorrect(selected) ? T.lime : '#ef4444'}40`,
                  }}
                >
                  <span className="text-4xl">{isCorrect(selected) ? '🎉' : '😅'}</span>
                  <div>
                    <p className="font-black" style={{ color: isCorrect(selected) ? T.lime : '#ef4444' }}>
                      {isCorrect(selected) ? 'Correct! +50 XP earned' : 'Not quite right!'}
                    </p>
                    <p className="text-sm mt-1" style={{ color: T.textSub }}>
                      {isCorrect(selected)
                        ? 'Diversification means spreading investments to lower risk.'
                        : 'The correct answer is B — mixing asset types reduces overall portfolio risk.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action row: secondary tools + primary CTA */}
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {[
                  { label: 'Hint',     icon: <Lightbulb size={14} />, color: T.teal,   action: () => setShowHint(h => !h) },
                  { label: 'Power Up', icon: <Flame size={14} />,     color: T.orange, action: () => {} },
                  { label: 'Items',    icon: <PackageOpen size={14}/>, color: T.violet, action: () => {} },
                ].map(({ label, icon, color, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:bg-white/10"
                    style={{ border: `1px solid ${T.surfaceBorder}`, color }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>

              {revealed && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-auto px-8 py-3 rounded-xl font-black transition-all hover:brightness-110 active:scale-95"
                  style={{
                    background: `linear-gradient(135deg,${T.teal},${T.violet})`,
                    color: '#fff',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.4)',
                  }}
                >
                  Next Question →
                </motion.button>
              )}
            </div>
          </div>

          {/* ── Right Sidebar: context + stats ── */}
          <div className="hidden lg:flex flex-col gap-5 shrink-0" style={{ width: 280 }}>
            <div className="sticky top-20 flex flex-col gap-5">

              {/* Session stats */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: 20 }}
              >
                <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: T.muted }}>This Session</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Questions Done', value: `${CURRENT_Q - 1}/${ALL_QUESTIONS}`, color: T.teal   },
                    { label: 'XP Earned',      value: `${(CURRENT_Q - 1) * 50}`,           color: T.lime   },
                    { label: 'Accuracy',        value: '100%',                              color: T.violet },
                    { label: 'Streak',          value: '🔥 3',                              color: T.orange },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs font-bold" style={{ color: T.textSub }}>{label}</span>
                      <span className="text-sm font-black" style={{ color }}>{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Leaderboard mini */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: 20 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={16} color="#FFCD75" />
                  <p className="text-xs font-black tracking-widest uppercase" style={{ color: T.muted }}>Leaderboard</p>
                </div>
                {[
                  { rank: 1, name: 'FinanceKing', xp: 3240, color: '#FFCD75' },
                  { rank: 2, name: 'MoneyMaya',   xp: 2980, color: '#94B0C2' },
                  { rank: 3, name: 'CoinQueen',   xp: 2650, color: '#CD7F32' },
                  { rank: 14, name: 'You',         xp: 0,    color: T.teal,   isYou: true },
                ].map((p) => (
                  <div
                    key={p.rank}
                    className="flex items-center justify-between py-2 text-xs font-bold"
                    style={{
                      borderBottom: `1px solid ${T.surfaceBorder}`,
                      background: p.isYou ? `${T.teal}0D` : 'transparent',
                      borderLeft: p.isYou ? `2px solid ${T.teal}` : '2px solid transparent',
                      paddingLeft: p.isYou ? 8 : 0,
                      margin: '0 -20px',
                      padding: `8px ${p.isYou ? '20px 8px 20px' : '0 20px'}`,
                    }}
                  >
                    <span style={{ color: p.isYou ? T.teal : T.muted, minWidth: 20 }}>#{p.rank}</span>
                    <span className="flex-1 ml-2" style={{ color: p.isYou ? T.teal : T.text }}>{p.name}</span>
                    <span style={{ color: p.color }}>{p.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </motion.div>

              {/* Progress through this level */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="p-4 rounded-xl text-xs"
                style={{ background: `${T.violet}10`, border: `1px solid ${T.violet}20`, color: T.textSub }}
              >
                <span style={{ color: T.violet }} className="font-black">📍 Saving Goals</span>
                <span className="ml-1">— Question {CURRENT_Q} of {ALL_QUESTIONS}</span>
                <div className="mt-2 h-1.5 rounded-full" style={{ background: T.surfaceBorder }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(CURRENT_Q / ALL_QUESTIONS) * 100}%`, background: T.violet }}
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
