import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Star, Zap, Target, TrendingUp, Wallet, Coins, Shield, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const B    = '3px solid #000';
const B_THICK = '4px solid #000';
const SH   = '5px 5px 0 #000';
const SH_LG = '8px 8px 0 #000';

const PALETTE = {
  bg:     '#0D0D1A',
  base:   '#1A1A2E',
  teal:   '#00D4C8',
  lime:   '#B8F400',
  violet: '#8B5CF6',
  orange: '#F97316',
  text:   '#F4F4F4',
  muted:  '#94A3B8',
  track:  '#2a2a4a',
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

// Layout Constants
const PATH_WIDTH = 400;
const NODE_HEIGHT = 150;

// Pre-compute coordinates
const pathNodes = [];
const decorations = [];
let currentY = 30;

CHAPTERS.forEach((chapter) => {
  // Chapter Header
  pathNodes.push({ type: 'header', title: `CHAPTER ${chapter.id}: ${chapter.title}`, y: currentY, accent: chapter.accent });
  currentY += 90;

  chapter.levels.forEach((lvl) => {
    const index = pathNodes.filter(n => n.type === 'node').length;
    // Zig-zag pattern
    const pattern = [200, 80, 200, 320];
    const x = pattern[index % pattern.length];

    pathNodes.push({ type: 'node', ...lvl, index, accent: chapter.accent, x, y: currentY });
    
    // Add a decoration on the opposite side
    if (index % 2 === 0 && !lvl.isBoss) {
      decorations.push({
        id: `dec-${index}`,
        Icon: [TrendingUp, Wallet, Coins, Shield][index % 4],
        x: x > 200 ? x - 140 : x + 140,
        y: currentY - 20,
        color: [PALETTE.teal, PALETTE.lime, PALETTE.orange, PALETTE.violet][index % 4]
      });
    }

    currentY += NODE_HEIGHT;
  });
  currentY += 50;
});

const TOTAL_HEIGHT = currentY;

// Path generator
const generatePath = (onlyActive = false) => {
  const nodes = pathNodes.filter(n => n.type === 'node');
  if (nodes.length === 0) return '';
  
  let targetNodes = nodes;
  if (onlyActive) {
    targetNodes = [];
    for (const n of nodes) {
      targetNodes.push(n);
      if (n.state === 'current' || n.state === 'locked') break;
    }
  }

  if (targetNodes.length === 0) return '';

  let d = `M ${targetNodes[0].x} ${targetNodes[0].y}`;
  for (let i = 1; i < targetNodes.length; i++) {
    const prev = targetNodes[i - 1];
    const curr = targetNodes[i];
    const cp1X = prev.x;
    const cp1Y = prev.y + NODE_HEIGHT / 2.5;
    const cp2X = curr.x;
    const cp2Y = curr.y - NODE_HEIGHT / 2.5;
    d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${curr.y}`;
  }
  return d;
};


// ── Components ──

const StarRow = ({ count }) => (
  <div className="flex gap-1 mt-2">
    {[1,2,3].map(i => (
      <div key={i} className="flex items-center justify-center">
        <Star size={16} fill={i <= count ? '#FFCD75' : 'none'} color={i <= count ? '#000' : '#000'} style={{ strokeWidth: 2.5 }} />
      </div>
    ))}
  </div>
);

const LevelNode = ({ node, onPlay }) => {
  const isCompleted = node.state === 'completed';
  const isCurrent   = node.state === 'current';
  const isLocked    = node.state === 'locked';

  const size = node.isBoss ? 96 : 80;

  let bg = PALETTE.track;
  let iconColor = PALETTE.muted;
  if (isCompleted) { bg = PALETTE.violet; iconColor = '#fff'; }
  if (isCurrent)   { bg = node.accent; iconColor = '#000'; }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: node.index * 0.07, type: 'spring', stiffness: 300 }}
      className="absolute flex flex-col items-center"
      style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)', zIndex: isCurrent ? 20 : 10 }}
    >
      <button
        onClick={() => !isLocked && onPlay()}
        disabled={isLocked}
        className="relative flex flex-col items-center justify-center transition-all"
        style={{
          width: size, height: size,
          background: bg,
          border: B_THICK,
          boxShadow: isLocked ? 'none' : (isCurrent ? `0 0 0 6px ${PALETTE.lime}, 8px 8px 0 #000` : SH_LG),
          borderRadius: '50%',
          opacity: isLocked ? 0.6 : 1,
          cursor: isLocked ? 'not-allowed' : 'pointer',
        }}
      >
        {isCompleted && <Play size={28} fill={iconColor} color={iconColor} />}
        {isCurrent   && <Play size={32} fill={iconColor} color={iconColor} className="ml-1" />}
        {isLocked    && (node.isBoss ? <Target size={28} color={iconColor} /> : <Lock size={24} color={iconColor} />)}
      </button>

      <div className="absolute top-full mt-3 flex flex-col items-center w-32">
        <div 
          className="px-3 py-1 font-black text-xs uppercase tracking-tight text-center"
          style={{ background: '#000', color: isLocked ? PALETTE.muted : '#fff', border: B, borderRadius: 8 }}
        >
          {node.label}
        </div>
        {!isLocked && <StarRow count={node.stars} />}
      </div>
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
        <h1 className="font-black uppercase tracking-tight mb-1" style={{ fontSize: 40, color: PALETTE.text }}>
          Your Journey
        </h1>
        <p className="font-bold uppercase tracking-wider text-sm" style={{ color: PALETTE.muted }}>
          Follow the path to master finance
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

        {/* ── LEFT: Curvy Path Map ── */}
        <div className="flex-1 w-full flex justify-center min-w-0 overflow-hidden" style={{ background: PALETTE.base, border: B, boxShadow: SH_LG, borderRadius: 24 }}>
          
          <div className="relative" style={{ width: PATH_WIDTH, height: TOTAL_HEIGHT }}>
            
            {/* SVG Tracks */}
            <svg className="absolute inset-0 pointer-events-none" width={PATH_WIDTH} height={TOTAL_HEIGHT}>
              {/* Background Track */}
              <path
                d={generatePath(false)}
                fill="none"
                stroke={PALETTE.track}
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={generatePath(false)}
                fill="none"
                stroke="#000"
                strokeWidth="24"
                strokeDasharray="4 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.3}
              />
              
              {/* Active Track */}
              <path
                d={generatePath(true)}
                fill="none"
                stroke={PALETTE.teal}
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Active track inner stripe for style */}
              <path
                d={generatePath(true)}
                fill="none"
                stroke="#000"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.2}
              />
            </svg>

            {/* Decorations */}
            {decorations.map((dec) => (
              <motion.div
                key={dec.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="absolute flex items-center justify-center opacity-60"
                style={{ left: dec.x, top: dec.y, transform: 'translate(-50%, -50%)', width: 48, height: 48, background: '#000', border: B, borderRadius: 12, transform: `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)` }}
              >
                <dec.Icon size={24} color={dec.color} />
              </motion.div>
            ))}

            {/* Nodes and Headers */}
            {pathNodes.map((item, i) => {
              if (item.type === 'header') {
                return (
                  <motion.div
                    key={`header-${i}`}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="absolute w-full px-8"
                    style={{ top: item.y, transform: 'translateY(-50%)' }}
                  >
                    <div 
                      className="px-6 py-3 font-black text-lg uppercase tracking-tight inline-block"
                      style={{ background: item.accent, color: '#000', border: B, boxShadow: SH }}
                    >
                      {item.title}
                    </div>
                  </motion.div>
                );
              }

              if (item.type === 'node') {
                return <LevelNode key={`node-${item.id}`} node={item} onPlay={() => navigate('/app/games/quiz')} />;
              }
              return null;
            })}

          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="hidden lg:flex flex-col gap-5 shrink-0" style={{ width: 320 }}>
          <div className="sticky top-[76px] flex flex-col gap-5">

            {/* Progress card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              style={{ background: PALETTE.base, border: B, boxShadow: SH, padding: 24 }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PALETTE.muted }}>
                Overall Progress
              </p>
              <div className="flex items-end justify-between mb-3">
                <span className="font-black" style={{ fontSize: 42, color: PALETTE.text, lineHeight: 1 }}>
                  {completedLevels}
                </span>
                <span className="font-black text-sm mb-1.5" style={{ color: PALETTE.muted }}>/ {totalLevels} levels</span>
              </div>
              <div className="h-3" style={{ background: '#000', border: B }}>
                <div
                  className="h-full"
                  style={{ width: `${(completedLevels / totalLevels) * 100}%`, background: PALETTE.teal }}
                />
              </div>
            </motion.div>

            {/* Up Next card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              style={{ background: PALETTE.teal, border: B, boxShadow: SH, padding: 24 }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#000' }}>
                Up Next
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 flex items-center justify-center text-2xl" style={{ background: '#000', border: B }}>
                  <Trophy size={24} color={PALETTE.teal} />
                </div>
                <div>
                  <p className="font-black text-lg uppercase leading-tight" style={{ color: '#000' }}>Saving Goals</p>
                  <p className="font-bold text-sm mt-1" style={{ color: '#1a3a38' }}>Chapter 1 · Level 3</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/app/games/quiz')}
                className="w-full py-4 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                style={{ background: '#000', color: PALETTE.teal, border: B, boxShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}
              >
                <Play size={16} fill="currentColor" /> Continue
              </button>
            </motion.div>

            {/* Tip block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
              className="p-5"
              style={{ background: `${PALETTE.violet}1A`, border: `3px solid ${PALETTE.violet}`, color: PALETTE.muted }}
            >
              <p className="font-black text-xs uppercase tracking-widest mb-2" style={{ color: PALETTE.violet }}>PRO TIP</p>
              <p className="font-bold text-sm leading-relaxed">
                Get all 3 stars on a level to earn bonus XP and unlock leaderboard rewards!
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
