import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Bell, Play, Lock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ──────────────────────────────────────────────
   Path data — each level in the journey
   ────────────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 1,
    title: 'Money Basics',
    levels: [
      { id: 1, state: 'completed', label: 'Budgeting 101', stars: 3 },
      { id: 2, state: 'completed', label: 'Needs vs Wants', stars: 2 },
      { id: 3, state: 'current',   label: 'Saving Goals',  stars: 0 },
      { id: 4, state: 'locked',    label: 'Debt 101',      stars: 0 },
      { id: 5, state: 'locked',    label: 'Boss Level',    stars: 0, isBoss: true },
    ],
  },
  {
    id: 2,
    title: 'Investing',
    levels: [
      { id: 6, state: 'locked', label: 'Stocks 101',  stars: 0 },
      { id: 7, state: 'locked', label: 'Crypto Myth', stars: 0 },
      { id: 8, state: 'locked', label: 'Boss Level',  stars: 0, isBoss: true },
    ],
  },
];

/* Alternating left / right offset for the snaking effect */
const OFFSETS = ['ml-4', 'ml-auto mr-4', 'ml-auto mr-16', 'ml-16', 'ml-auto mr-4'];

const StarRow = ({ count }) => (
  <div className="flex gap-0.5 justify-center mt-1">
    {[1, 2, 3].map(i => (
      <Star
        key={i}
        size={12}
        fill={i <= count ? '#FFCD75' : 'none'}
        stroke={i <= count ? '#FFCD75' : '#2a2a4a'}
      />
    ))}
  </div>
);

const LevelNode = ({ level, index, onPlay }) => {
  const isCompleted = level.state === 'completed';
  const isCurrent = level.state === 'current';
  const isLocked = level.state === 'locked';

  /* Visual sizing — boss nodes bigger */
  const size = level.isBoss ? 'w-24 h-24' : 'w-20 h-20';

  /* Colors */
  let bg = '#1e1e3a';
  let border = '#2a2a4a';
  let iconColor = '#566C86';
  if (isCompleted) { bg = '#8B5CF6'; border = '#7C3AED'; iconColor = '#fff'; }
  if (isCurrent)   { bg = '#00D4C8'; border = '#00B8AD'; iconColor = '#0A0A1A'; }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 300 }}
      className={`flex flex-col items-center ${OFFSETS[index % OFFSETS.length]}`}
    >
      <button
        onClick={() => !isLocked && onPlay()}
        disabled={isLocked}
        className={`${size} rounded-full flex flex-col items-center justify-center relative transition-all`}
        style={{
          background: bg,
          border: `3px solid ${border}`,
          boxShadow: isCurrent ? `0 0 24px rgba(0,212,200,0.5), 4px 4px 0 #000` : `3px 3px 0 #000`,
          cursor: isLocked ? 'not-allowed' : 'pointer',
          opacity: isLocked ? 0.55 : 1,
        }}
      >
        {/* Pulse ring for current level */}
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ border: '3px solid #00D4C8' }}
          />
        )}

        {isCompleted && <Play size={24} fill={iconColor} color={iconColor} />}
        {isCurrent && <Play size={28} fill={iconColor} color={iconColor} className="ml-1" />}
        {isLocked && <Lock size={20} color={iconColor} />}
        {level.isBoss && isLocked && (
          <span className="text-xs font-black mt-1" style={{ color: iconColor, opacity: 0.7 }}>BOSS</span>
        )}
      </button>

      {/* Label below node */}
      <p
        className="text-xs font-bold text-center mt-2 leading-tight max-w-[80px]"
        style={{ color: isLocked ? '#566C86' : '#F4F4F4' }}
      >
        {level.label}
      </p>
      <StarRow count={level.stars} />
    </motion.div>
  );
};

export default function PathPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#0A0A1A', color: '#F4F4F4' }}>

      {/* ── Top Bar ── */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(10,10,26,0.92)', backdropFilter: 'blur(10px)', borderBottom: '2px solid #1e1e3a' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 font-bold text-sm px-3 py-2 rounded-xl transition-all hover:bg-white/10"
          style={{ border: '2px solid #2a2a4a', color: '#94a3b8' }}
        >
          <ChevronLeft size={18} /> Back
        </button>

        <span className="font-black tracking-wide" style={{ color: '#00D4C8' }}>Your Journey</span>

        <button
          className="relative p-2 rounded-xl transition-all hover:bg-white/10"
          style={{ border: '2px solid #2a2a4a', color: '#94a3b8' }}
        >
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0A0A1A] text-white text-[9px] font-black flex items-center justify-center">1</span>
        </button>
      </div>

      <div className="max-w-sm mx-auto px-4 pt-6 pb-32">
        {CHAPTERS.map((chapter, ci) => (
          <div key={chapter.id} className="mb-12">

            {/* Chapter Header */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: ci * 0.1 }}
              className="flex items-center gap-4 mb-8 px-2"
            >
              <div className="flex-1 h-px" style={{ background: '#1e1e3a' }} />
              <div
                className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase"
                style={{ background: '#12123A', border: '2px solid #2a2a4a', color: '#00D4C8' }}
              >
                Ch.{chapter.id} · {chapter.title}
              </div>
              <div className="flex-1 h-px" style={{ background: '#1e1e3a' }} />
            </motion.div>

            {/* Level nodes */}
            <div className="flex flex-col gap-10 relative">
              {/* Connector line down center */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 pointer-events-none"
                style={{ background: 'linear-gradient(180deg,#1e1e3a,#1e1e3a)', opacity: 0.6, zIndex: 0 }}
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
          </div>
        ))}
      </div>

      {/* ── Chapter Progress Bar (fixed bottom) ── */}
      <div
        className="fixed bottom-0 left-0 right-0 px-4 py-3 z-20 flex justify-center"
        style={{ background: 'rgba(10,10,26,0.95)', borderTop: '2px solid #1e1e3a' }}
      >
        <div className="w-full max-w-sm flex items-center gap-4">
          <div>
            <p className="text-xs font-black" style={{ color: '#7B8DB0' }}>Chapter 1 of 2</p>
            <p className="text-xs font-bold" style={{ color: '#00D4C8' }}>Money Basics</p>
          </div>
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: '#1e1e3a' }}>
            <div className="h-full rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg,#8B5CF6,#00D4C8)' }} />
          </div>
          <span className="text-xs font-black" style={{ color: '#F4F4F4' }}>3/5</span>
        </div>
      </div>
    </div>
  );
}
