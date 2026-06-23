import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Star, ChevronRight } from 'lucide-react';
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

const card = {
  background: T.card,
  border: `1px solid ${T.cardBorder}`,
  borderRadius: 16,
  backdropFilter: 'blur(14px)',
};

const CHAPTERS = [
  {
    id: 1,
    title: 'Money Basics',
    color: T.teal,
    levels: [
      { id: 1, state: 'completed', label: 'Budgeting 101',  stars: 3, xp: 50  },
      { id: 2, state: 'completed', label: 'Needs vs Wants', stars: 2, xp: 50  },
      { id: 3, state: 'current',   label: 'Saving Goals',   stars: 0, xp: 60  },
      { id: 4, state: 'locked',    label: 'Emergency Fund', stars: 0, xp: 60  },
      { id: 5, state: 'locked',    label: '⚔️ Boss Level',  stars: 0, xp: 150, isBoss: true },
    ],
  },
  {
    id: 2,
    title: 'Investing',
    color: T.violet,
    levels: [
      { id: 6, state: 'locked', label: 'Stocks 101',     stars: 0, xp: 70  },
      { id: 7, state: 'locked', label: 'Diversification',stars: 0, xp: 80  },
      { id: 8, state: 'locked', label: 'Crypto Myth',    stars: 0, xp: 70  },
      { id: 9, state: 'locked', label: '⚔️ Boss Level',  stars: 0, xp: 200, isBoss: true },
    ],
  },
];

const StarRow = ({ count }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3].map(i => (
      <Star key={i} size={11} fill={i <= count ? '#FFCD75' : 'none'} color={i <= count ? '#FFCD75' : '#2a2a4a'} />
    ))}
  </div>
);

const LevelNode = ({ level, index, onPlay }) => {
  const isCompleted = level.state === 'completed';
  const isCurrent   = level.state === 'current';
  const isLocked    = level.state === 'locked';

  let bg     = T.surfaceBorder;
  let border = T.surfaceBorder;
  let shadow = 'none';
  let textColor = T.muted;

  if (isCompleted) { bg = T.violet; border = '#7C3AED'; textColor = '#fff'; shadow = '3px 3px 0 rgba(0,0,0,0.4)'; }
  if (isCurrent)   { bg = T.teal;   border = '#00B8AD'; textColor = '#0A0A1A'; shadow = `0 0 24px rgba(0,212,200,0.4), 3px 3px 0 rgba(0,0,0,0.4)`; }

  const size = level.isBoss ? 88 : 72;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 280 }}
      className="flex flex-col items-center gap-2 relative"
    >
      {/* Connector dot */}
      {index > 0 && (
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6"
          style={{ background: isCompleted ? `${T.violet}60` : T.surfaceBorder }}
        />
      )}

      <button
        onClick={() => !isLocked && onPlay()}
        disabled={isLocked}
        className="relative flex flex-col items-center justify-center rounded-full transition-all"
        style={{
          width: size, height: size,
          background: bg, border: `3px solid ${border}`,
          boxShadow: shadow,
          opacity: isLocked ? 0.45 : 1,
          cursor: isLocked ? 'not-allowed' : 'pointer',
        }}
      >
        {/* Pulse ring for current */}
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ border: `3px solid ${T.teal}` }}
          />
        )}
        {isCompleted && <Play size={22} fill={textColor} color={textColor} />}
        {isCurrent   && <Play size={26} fill={textColor} color={textColor} className="ml-1" />}
        {isLocked    && <Lock size={20} color={T.muted} />}
      </button>

      <p className="text-xs font-bold text-center leading-tight" style={{ color: isLocked ? T.muted : T.text, maxWidth: 80 }}>
        {level.label}
      </p>
      <StarRow count={level.stars} />
      {!isLocked && (
        <span className="text-xs font-black" style={{ color: T.lime }}>+{level.xp} XP</span>
      )}
    </motion.div>
  );
};

export default function PathPage() {
  const navigate = useNavigate();

  const totalLevels = CHAPTERS.flatMap(c => c.levels).length;
  const completedLevels = CHAPTERS.flatMap(c => c.levels).filter(l => l.state === 'completed').length;

  return (
    <div className="w-full min-h-screen px-4 md:px-8 pt-8 pb-24" style={{ background: T.bg, maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-black text-3xl mb-1" style={{ color: T.text }}>Your Journey</h1>
        <p className="text-sm" style={{ color: T.textSub }}>Complete levels to earn XP and unlock new chapters</p>
      </motion.div>

      <div className="flex gap-8 items-start">

        {/* ── Left: Path map ── */}
        <div className="flex-1 min-w-0">
          {CHAPTERS.map((chapter, ci) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1 }}
              className="mb-10 rounded-2xl overflow-hidden"
              style={{ ...card }}
            >
              {/* Chapter header strip */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ background: `${chapter.color}15`, borderBottom: `1px solid ${chapter.color}30` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                    style={{ background: `${chapter.color}30`, color: chapter.color, border: `1px solid ${chapter.color}40` }}
                  >
                    {chapter.id}
                  </div>
                  <span className="font-black text-lg" style={{ color: T.text }}>Chapter {chapter.id}: {chapter.title}</span>
                </div>
                <div
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: `${chapter.color}20`, color: chapter.color, border: `1px solid ${chapter.color}40` }}
                >
                  {chapter.levels.filter(l => l.state === 'completed').length} / {chapter.levels.length} done
                </div>
              </div>

              {/* Levels row — horizontal on web */}
              <div className="p-8 flex items-start justify-around gap-4 relative">
                {/* Connecting track line */}
                <div
                  className="absolute top-[56px] left-[10%] right-[10%] h-0.5"
                  style={{ background: T.surfaceBorder }}
                />
                {/* Progress fill on the track */}
                <div
                  className="absolute top-[56px] left-[10%] h-0.5 transition-all"
                  style={{
                    background: `linear-gradient(90deg,${T.violet},${chapter.color})`,
                    width: `${(chapter.levels.filter(l => l.state === 'completed').length / chapter.levels.length) * 80}%`,
                  }}
                />

                {chapter.levels.map((level, li) => (
                  <LevelNode
                    key={level.id}
                    level={level}
                    index={li}
                    onPlay={() => navigate('/app/games/quiz')}
                  />
                ))}
              </div>

              {/* Chapter footer: Boss level callout if locked */}
              {chapter.levels.find(l => l.isBoss && l.state === 'locked') && (
                <div
                  className="px-6 py-3 text-xs font-bold flex items-center gap-2"
                  style={{ color: T.muted, borderTop: `1px solid ${T.surfaceBorder}` }}
                >
                  🔒 Complete all levels to unlock the Boss challenge
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Right sidebar: summary stats ── */}
        <div className="hidden lg:flex flex-col gap-5 shrink-0" style={{ width: 260 }}>
          <div className="sticky top-20 flex flex-col gap-5">

            {/* Overall progress */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              style={{ ...card, padding: 20 }}
            >
              <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: T.muted }}>Overall Progress</p>

              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-black" style={{ color: T.text }}>{completedLevels}</span>
                <span className="text-sm font-bold" style={{ color: T.muted }}>/ {totalLevels} levels</span>
              </div>
              <div className="h-2 rounded-full mb-5" style={{ background: T.surfaceBorder }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(completedLevels / totalLevels) * 100}%`,
                    background: `linear-gradient(90deg,${T.violet},${T.teal})`,
                  }}
                />
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { label: 'XP Earned',   value: '100',     color: T.lime },
                  { label: 'Stars',        value: '5 ⭐',    color: '#FFCD75' },
                  { label: 'Chapters',     value: '1 / 2',   color: T.teal },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: T.textSub }}>{label}</span>
                    <span className="text-sm font-black" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Current level card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ ...card, padding: 20, border: `1px solid ${T.teal}33` }}
            >
              <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: T.muted }}>Up Next</p>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${T.teal}20`, border: `2px solid ${T.teal}40` }}
                >
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <p className="font-black text-sm" style={{ color: T.text }}>Saving Goals</p>
                  <p className="text-xs" style={{ color: T.textSub }}>Chapter 1 · Level 3</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/app/games/quiz')}
                className="w-full py-2.5 rounded-xl font-black text-sm transition-all hover:brightness-110 flex items-center justify-center gap-2"
                style={{ background: T.teal, color: '#0A0A1A', boxShadow: `3px 3px 0 rgba(0,0,0,0.3)` }}
              >
                <Play size={14} fill="currentColor" /> Continue
              </button>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="text-xs leading-relaxed p-4 rounded-xl"
              style={{ background: `${T.violet}10`, border: `1px solid ${T.violet}20`, color: T.textSub }}
            >
              <span style={{ color: T.violet }} className="font-black">💡 Tip: </span>
              Complete all stars on a level to earn bonus coins and unlock leaderboard rewards.
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
