import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const B    = '3px solid #000';
const SH   = '5px 5px 0 #000';
const SH_LG = '7px 7px 0 #000';

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

const CHAPTERS = [
  {
    id: 1, title: 'Money Basics', accent: PALETTE.teal,
    levels: [
      { id: 1, state: 'completed', label: 'Budgeting 101',  stars: 3, xp: 50  },
      { id: 2, state: 'completed', label: 'Needs vs Wants', stars: 2, xp: 50  },
      { id: 3, state: 'current',   label: 'Saving Goals',   stars: 0, xp: 60  },
      { id: 4, state: 'locked',    label: 'Emergency Fund', stars: 0, xp: 60  },
      { id: 5, state: 'locked',    label: 'Boss Level',     stars: 0, xp: 150, isBoss: true },
    ],
  },
  {
    id: 2, title: 'Investing', accent: PALETTE.violet,
    levels: [
      { id: 6, state: 'locked', label: 'Stocks 101',      stars: 0, xp: 70  },
      { id: 7, state: 'locked', label: 'Diversification', stars: 0, xp: 80  },
      { id: 8, state: 'locked', label: 'Crypto Myth',     stars: 0, xp: 70  },
      { id: 9, state: 'locked', label: 'Boss Level',      stars: 0, xp: 200, isBoss: true },
    ],
  },
];

const StarRow = ({ count }) => (
  <div className="flex gap-0.5">
    {[1,2,3].map(i => (
      <Star key={i} size={12} fill={i <= count ? '#FFCD75' : 'none'} color={i <= count ? '#FFCD75' : '#2a2a4a'} />
    ))}
  </div>
);

const LevelNode = ({ level, accent, index, onPlay }) => {
  const isCompleted = level.state === 'completed';
  const isCurrent   = level.state === 'current';
  const isLocked    = level.state === 'locked';

  const size = level.isBoss ? 84 : 70;

  let bg = PALETTE.base;
  let borderColor = '#2a2a4a';
  let iconColor = '#2a2a4a';
  if (isCompleted) { bg = PALETTE.violet; borderColor = '#000'; iconColor = '#fff'; }
  if (isCurrent)   { bg = accent;         borderColor = '#000'; iconColor = '#000'; }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 300 }}
      className="flex flex-col items-center gap-2"
    >
      {/* The node */}
      <button
        onClick={() => !isLocked && onPlay()}
        disabled={isLocked}
        className="relative flex flex-col items-center justify-center transition-all"
        style={{
          width: size, height: size,
          background: bg,
          border: `3px solid ${borderColor}`,
          boxShadow: isLocked ? 'none' : (isCurrent ? `0 0 0 4px ${accent}, 5px 5px 0 #000` : SH),
          borderRadius: '50%',
          opacity: isLocked ? 0.4 : 1,
          cursor: isLocked ? 'not-allowed' : 'pointer',
        }}
      >
        {/* Current level pulse ring */}
        {isCurrent && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            animate={{ scale: [1, 1.35, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ inset: -6, border: `3px solid ${accent}` }}
          />
        )}
        {isCompleted && <Play size={20} fill={iconColor} color={iconColor} />}
        {isCurrent   && <Play size={24} fill={iconColor} color={iconColor} className="ml-1" />}
        {isLocked    && <Lock size={18} color={PALETTE.muted} />}
      </button>

      <p className="text-xs font-black text-center uppercase tracking-tight leading-tight" style={{ color: isLocked ? PALETTE.muted : PALETTE.text, maxWidth: 82 }}>
        {level.label}
      </p>
      <StarRow count={level.stars} />
      {!isLocked && (
        <span
          className="text-xs font-black px-1.5 py-0.5 flex items-center gap-1"
          style={{ background: PALETTE.lime, color: '#000', border: '2px solid #000' }}
        >
          <Zap size={10} fill="currentColor" />+{level.xp}XP
        </span>
      )}
    </motion.div>
  );
};

export default function PathPage() {
  const navigate = useNavigate();

  const totalLevels     = CHAPTERS.flatMap(c => c.levels).length;
  const completedLevels = CHAPTERS.flatMap(c => c.levels).filter(l => l.state === 'completed').length;

  return (
    <div className="w-full min-h-screen px-6 md:px-10 pt-8 pb-28 font-sans" style={{ background: PALETTE.bg, maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Page Header ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-black uppercase tracking-tight mb-1" style={{ fontSize: 36, color: PALETTE.text }}>
          Your Journey
        </h1>
        <p className="font-bold" style={{ color: PALETTE.muted, fontSize: 14 }}>
          Complete levels to earn XP and unlock new chapters
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

        {/* ── LEFT: Chapter cards ── */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {CHAPTERS.map((chapter, ci) => {
            const done = chapter.levels.filter(l => l.state === 'completed').length;
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
                style={{ background: PALETTE.base, border: B, boxShadow: SH_LG }}
              >
                {/* Chapter header strip */}
                <div
                  className="flex items-center justify-between px-6 py-4"
                  style={{ background: chapter.accent, borderBottom: B }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 flex items-center justify-center font-black text-sm"
                      style={{ background: '#000', color: chapter.accent, border: B }}
                    >
                      {chapter.id}
                    </span>
                    <span className="font-black text-lg uppercase tracking-tight" style={{ color: '#000' }}>
                      Chapter {chapter.id}: {chapter.title}
                    </span>
                  </div>
                  <span
                    className="font-black text-xs uppercase tracking-wider px-3 py-1"
                    style={{ background: '#000', color: chapter.accent, border: B }}
                  >
                    {done} / {chapter.levels.length} Done
                  </span>
                </div>

                {/* Level nodes — horizontal, connected by a track */}
                <div className="px-8 pt-10 pb-8 relative flex items-start justify-around gap-2">
                  {/* Track line */}
                  <div
                    className="absolute left-[10%] right-[10%] h-1"
                    style={{ top: 43, background: '#2a2a4a' }}
                  />
                  {/* Progress fill */}
                  <div
                    className="absolute left-[10%] h-1"
                    style={{
                      top: 43,
                      background: chapter.accent,
                      width: `${(done / chapter.levels.length) * 80}%`,
                    }}
                  />

                  {chapter.levels.map((level, li) => (
                    <LevelNode
                      key={level.id}
                      level={level}
                      accent={chapter.accent}
                      index={li}
                      onPlay={() => navigate('/app/games/quiz')}
                    />
                  ))}
                </div>

                {/* Boss locked footer */}
                {chapter.levels.find(l => l.isBoss && l.state === 'locked') && (
                  <div
                    className="px-6 py-3 font-bold text-xs flex items-center gap-2"
                    style={{ borderTop: B, color: PALETTE.muted }}
                  >
                    🔒 Unlock all levels to face the Boss challenge
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="hidden lg:flex flex-col gap-5 shrink-0" style={{ width: 320 }}>
          <div className="sticky top-[76px] flex flex-col gap-5">

            {/* Progress card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              style={{ background: PALETTE.base, border: B, boxShadow: SH, padding: 20 }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PALETTE.muted }}>
                Overall Progress
              </p>
              <div className="flex items-end justify-between mb-2">
                <span className="font-black" style={{ fontSize: 36, color: PALETTE.text, lineHeight: 1 }}>
                  {completedLevels}
                </span>
                <span className="font-black text-sm mb-1" style={{ color: PALETTE.muted }}>/ {totalLevels} levels</span>
              </div>
              <div className="h-3" style={{ background: '#2a2a4a', border: B }}>
                <div
                  className="h-full"
                  style={{
                    width: `${(completedLevels / totalLevels) * 100}%`,
                    background: PALETTE.teal,
                  }}
                />
              </div>
            </motion.div>

            {/* Up Next card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              style={{ background: PALETTE.teal, border: B, boxShadow: SH, padding: 20 }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#000' }}>
                Up Next
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center text-2xl" style={{ background: '#000', border: B }}>
                  💰
                </div>
                <div>
                  <p className="font-black text-sm uppercase" style={{ color: '#000' }}>Saving Goals</p>
                  <p className="font-bold text-xs" style={{ color: '#1a3a38' }}>Chapter 1 · Level 3</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/app/games/quiz')}
                className="w-full py-3 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                style={{ background: '#000', color: PALETTE.teal, border: B, boxShadow: SH }}
              >
                <Play size={14} fill="currentColor" /> Continue
              </button>
            </motion.div>

            {/* Tip block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
              className="p-4"
              style={{ background: `${PALETTE.violet}22`, border: `3px solid ${PALETTE.violet}`, color: PALETTE.muted }}
            >
              <p className="font-black text-xs mb-1" style={{ color: PALETTE.violet }}>💡 PRO TIP</p>
              <p className="font-bold text-xs leading-snug">
                Get all 3 stars on a level to earn bonus coins and unlock leaderboard rewards.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
