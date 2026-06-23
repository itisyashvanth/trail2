import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Flame, Play, Home, Zap } from 'lucide-react';
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

// ── Typewriter ──
const useTypewriter = (text, speed = 55) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return displayed;
};

const Cursor = () => {
  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 500); return () => clearInterval(t); }, []);
  return <span style={{ opacity: v ? 1 : 0 }}>_</span>;
};

// ── ChapterDots ──
const ChapterDots = ({ total = 5, current = 1 }) => (
  <div className="flex items-center gap-2">
    {[...Array(total)].map((_, i) => (
      <div key={i} style={{
        width: i === current - 1 ? 24 : 12,
        height: 12,
        background: i < current ? PALETTE.violet : PALETTE.base,
        border: '2px solid #000',
      }} />
    ))}
  </div>
);

// ── Main HeroSection ──
const HeroSection = ({
  username = 'Player',
  level = 1,
  xp = 0,
  maxXp = 100,
}) => {
  const greeting = useTypewriter(`HEY ${username.toUpperCase()}!`, 60);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col"
      style={{
        background: PALETTE.base,
        border: B,
        boxShadow: SH_LG,
      }}
    >
      {/* ── 1. Greeting Row ── */}
      <div className="flex items-center gap-4 px-6 pt-6 pb-4" style={{ borderBottom: B }}>
        <div
          className="shrink-0 flex items-center justify-center"
          style={{
            width: 48,
            height: 48,
            background: PALETTE.violet,
            border: B,
            boxShadow: '3px 3px 0 #000',
          }}
        >
          <Bot size={28} color="#000" />
        </div>
        <p className="font-black text-2xl uppercase tracking-tight" style={{ color: PALETTE.text, lineHeight: 1.1 }}>
          {greeting}<span style={{ color: PALETTE.violet }}><Cursor /></span>
        </p>
      </div>

      {/* ── 2. XP Bar ── */}
      <div className="px-6 py-6" style={{ borderBottom: B, background: `${PALETTE.lime}15` }}>
        <div className="flex items-center gap-4">
          {/* Level badge left */}
          <div className="shrink-0 flex items-center justify-center font-black text-lg"
            style={{
              width: 48, height: 48,
              background: PALETTE.lime, border: B, boxShadow: '3px 3px 0 #000', color: '#000',
            }}>
            {level}
          </div>

          {/* Bar */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-2">
              <span className="font-black text-sm uppercase" style={{ color: PALETTE.text }}>Level Progress</span>
              <span className="font-black text-xs" style={{ color: PALETTE.muted }}>{xp} / {maxXp} XP</span>
            </div>
            <div className="w-full h-4" style={{ background: '#000', border: '2px solid #000' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${maxXp > 0 ? (xp / maxXp) * 100 : 0}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full relative"
                style={{ background: PALETTE.lime }}
              />
            </div>
          </div>

          {/* Next level badge right */}
          <div className="shrink-0 flex items-center justify-center font-black text-lg"
            style={{
              width: 48, height: 48,
              background: PALETTE.base, border: B, color: PALETTE.muted,
            }}>
            {level + 1}
          </div>
        </div>
      </div>

      {/* ── 3. Quest Card ── */}
      <div className="px-6 py-8">
        <p className="font-black text-xs uppercase tracking-widest mb-4" style={{ color: PALETTE.muted }}>Current Quest</p>
        <div className="flex items-center gap-6">
          {/* Quest icon */}
          <div className="shrink-0 flex items-center justify-center"
            style={{
              width: 100, height: 100,
              background: PALETTE.teal, border: B, boxShadow: SH,
            }}>
            <Home size={48} color="#000" />
          </div>

          {/* Right content */}
          <div className="flex-1 min-w-0">
            <ChapterDots total={5} current={1} />
            <h2 className="font-black uppercase tracking-tight mt-3 mb-4" style={{ fontSize: 24, color: PALETTE.text, lineHeight: 1.1 }}>
              Real Estate Tycoon
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/app/games/quiz')}
                className="flex items-center justify-center gap-2 flex-1 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5 py-4"
                style={{
                  background: PALETTE.lime, color: '#000', border: B, boxShadow: SH,
                }}
              >
                <Play size={18} fill="currentColor" /> Resume Quest
              </button>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default HeroSection;
