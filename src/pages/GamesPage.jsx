import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Clock, Zap, ChevronRight, Star, Gamepad2, Wallet, TrendingUp, FileText, Home, Bitcoin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─── Neo-Brutalist tokens ─── */
const B = '3px solid #000';          // thick border
const SH = '5px 5px 0 #000';        // hard shadow — no blur
const SH_LG = '7px 7px 0 #000';     // large hard shadow

const PALETTE = {
  bg:     '#0D0D1A',   // page bg
  base:   '#1A1A2E',   // card base (solid, no transparency)
  teal:   '#00D4C8',
  lime:   '#B8F400',
  violet: '#8B5CF6',
  orange: '#F97316',
  pink:   '#F43F5E',
  text:   '#F4F4F4',
  muted:  '#94A3B8',
};

const MINI_GAMES = [
  { id: 'hangman',    name: 'Hangman',        Icon: Gamepad2,   color: PALETTE.teal,   xp: 20,  difficulty: 'Easy',   time: '5 min'  },
  { id: 'budget',     name: 'Budget Builder', Icon: Wallet,     color: PALETTE.orange, xp: 30,  difficulty: 'Easy',   time: '8 min'  },
  { id: 'invest',     name: 'Invest Quest',   Icon: TrendingUp, color: PALETTE.violet, xp: 40,  difficulty: 'Medium', time: '12 min' },
  { id: 'tax',        name: 'Tax Escape',     Icon: FileText,   color: PALETTE.lime,   xp: 25,  difficulty: 'Easy',   time: '6 min'  },
  { id: 'realestate', name: 'Real Estate',    Icon: Home,       color: PALETTE.pink,   xp: 50,  difficulty: 'Hard',   time: '15 min' },
  { id: 'crypto',     name: 'Crypto Myth',    Icon: Bitcoin,    color: PALETTE.violet, xp: 35,  difficulty: 'Medium', time: '10 min' },
];

const TABS = ['Recent', 'Games', 'Favorites'];

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: d, duration: 0.25 },
});

export default function GamesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Games');
  const [search, setSearch] = useState('');

  const filtered = MINI_GAMES.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="w-full min-h-screen px-6 md:px-10 pt-8 pb-28 font-sans"
      style={{ background: PALETTE.bg, maxWidth: 1200, margin: '0 auto' }}
    >
      {/* ── Page Header ── */}
      <motion.div {...fade(0)} className="flex items-start justify-between mb-8 gap-6">
        <div>
          <h1
            className="font-black uppercase tracking-tight"
            style={{ fontSize: 36, color: PALETTE.text, letterSpacing: '-0.02em' }}
          >
            Game Library
          </h1>
          <p className="font-bold mt-1" style={{ color: PALETTE.muted, fontSize: 14 }}>
            Pick a challenge. Earn XP. Level up.
          </p>
        </div>

        {/* Search + Bell */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: PALETTE.muted }} />
            <input
              type="text"
              placeholder="Search games…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-sm font-bold pl-9 pr-4 py-3 outline-none w-52"
              style={{
                background: PALETTE.base,
                border: B,
                boxShadow: SH,
                color: PALETTE.text,
                borderRadius: 0,
              }}
            />
          </div>
          <button
            className="p-3 transition-all hover:-translate-y-0.5"
            style={{ background: PALETTE.base, border: B, boxShadow: SH, color: PALETTE.muted }}
          >
            <Bell size={18} />
          </button>
        </div>
      </motion.div>

      {/* ── Tabs ── */}
      <motion.div {...fade(0.05)} className="flex gap-0 mb-8 w-fit" style={{ border: B, boxShadow: SH }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-6 py-3 text-sm font-black uppercase tracking-wider transition-all"
            style={{
              background: activeTab === tab ? PALETTE.teal : PALETTE.base,
              color: activeTab === tab ? '#000' : PALETTE.muted,
              borderRight: tab !== 'Favorites' ? B : 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* ── Main 2-col layout ── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

        {/* ── LEFT: Featured + Grid ── */}
        <div className="flex-1 flex flex-col gap-8 min-w-0">

          {/* FEATURED GAME — brutalist hero card */}
          <motion.div {...fade(0.08)}>
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: PALETTE.muted }}>
              ★ Featured
            </p>
            <div
              className="flex overflow-hidden cursor-pointer transition-all hover:-translate-y-1"
              style={{ border: B, boxShadow: SH_LG, background: PALETTE.base }}
              onClick={() => navigate('/app/games/quiz')}
            >
              {/* Art panel — solid color, no gradient */}
              <div
                className="relative flex items-end p-6 shrink-0"
                style={{ background: PALETTE.violet, width: 280, borderRight: B }}
              >
                <span
                  className="absolute top-4 left-4 px-3 py-1.5 font-black text-xs uppercase tracking-widest"
                  style={{ background: PALETTE.lime, color: '#000', border: B, boxShadow: '3px 3px 0 #000' }}
                >
                  ⚡ Featured
                </span>
                {/* Simple geometric building shapes */}
                <div className="absolute bottom-0 right-4 flex items-end gap-2">
                  <div style={{ width: 40, height: 80,  background: PALETTE.orange, border: B, borderBottom: 'none' }} />
                  <div style={{ width: 48, height: 100, background: PALETTE.lime,   border: B, borderBottom: 'none' }} />
                  <div style={{ width: 36, height: 60,  background: PALETTE.teal,   border: B, borderBottom: 'none' }} />
                </div>
                <div className="flex gap-1 z-10">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={PALETTE.lime} color={PALETTE.lime} />)}
                </div>
              </div>

              {/* Details panel */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <h2 className="font-black text-2xl mb-2 uppercase tracking-tight" style={{ color: PALETTE.text }}>
                    Market Crash Master
                  </h2>
                  <p className="font-bold text-sm leading-relaxed mb-5" style={{ color: PALETTE.muted }}>
                    Navigate a simulated stock market crash. Buy low, sell high, protect your portfolio before time runs out.
                  </p>
                  <div className="flex items-center gap-5 font-bold text-sm flex-wrap" style={{ color: PALETTE.muted }}>
                    <span
                      className="px-2 py-1 font-black text-xs uppercase"
                      style={{ background: PALETTE.orange, color: '#000', border: B }}
                    >
                      Medium
                    </span>
                    <span className="flex items-center gap-1"><Clock size={14} /> 15 mins</span>
                    <span className="flex items-center gap-1" style={{ color: '#FFCD75' }}>🪙 +500</span>
                    <span className="flex items-center gap-1" style={{ color: PALETTE.lime }}>
                      <Zap size={14} fill="currentColor" /> +120 XP
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <button
                    className="px-8 py-3 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5"
                    style={{ background: PALETTE.teal, color: '#000', border: B, boxShadow: SH }}
                  >
                    ▶ Play Now
                  </button>
                  <button
                    className="px-5 py-3 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5"
                    style={{ background: 'transparent', color: PALETTE.muted, border: B, boxShadow: SH }}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* MINI-GAME GRID */}
          <motion.div {...fade(0.18)}>
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: PALETTE.muted }}>
              All Games
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((game, i) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  whileHover={{ y: -4, boxShadow: SH_LG }}
                  onClick={() => navigate('/app/games/quiz')}
                  className="relative text-left p-5 flex flex-col gap-4 transition-all"
                  style={{
                    background: PALETTE.base,
                    border: B,
                    boxShadow: SH,
                    borderRadius: 0,
                  }}
                >
                  {/* Colored icon block */}
                  <div
                    className="w-14 h-14 flex items-center justify-center text-3xl font-black"
                    style={{ background: game.color, border: B, boxShadow: '3px 3px 0 #000' }}
                  >
                    <game.Icon size={28} color="#000" />
                  </div>

                  <div>
                    <p className="font-black text-base uppercase tracking-tight" style={{ color: PALETTE.text }}>
                      {game.name}
                    </p>
                    <p className="font-bold text-xs mt-1" style={{ color: PALETTE.muted }}>
                      {game.difficulty} · {game.time}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-black px-2 py-1 flex items-center gap-1"
                      style={{ background: PALETTE.lime, color: '#000', border: B }}
                    >
                      <Zap size={11} fill="currentColor" /> +{game.xp} XP
                    </span>
                    <ChevronRight size={18} style={{ color: game.color }} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="hidden lg:flex flex-col gap-5 shrink-0" style={{ width: 320 }}>
          <div className="sticky top-[76px] flex flex-col gap-5">

            {/* Daily Challenge */}
            <motion.div
              {...fade(0.17)}
              style={{ background: PALETTE.teal, border: B, boxShadow: SH, padding: 20 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
                <p className="font-black text-sm uppercase tracking-wider" style={{ color: '#000' }}>Daily Challenge</p>
              </div>
              <p className="font-bold text-sm mb-4" style={{ color: '#1a1a2e' }}>
                Complete "Budget Builder" today for a 2× XP bonus.
              </p>
              <div className="h-3 mb-4" style={{ background: 'rgba(0,0,0,0.2)', border: B }}>
                <div className="h-full w-0" style={{ background: '#000' }} />
              </div>
              <button
                className="w-full py-3 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5"
                style={{ background: '#000', color: PALETTE.teal, border: B, boxShadow: SH }}
                onClick={() => navigate('/app/games/quiz')}
              >
                Start Now →
              </button>
            </motion.div>

            {/* How it works — deliberately understated */}
            <motion.div {...fade(0.22)} style={{ padding: '4px 0' }}>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: PALETTE.muted }}>
                How it Works
              </p>
              {['Pick a game and hit Play.', 'Answer correctly to earn XP & Coins.', 'Unlock new chapters on your Path.'].map((text, i) => (
                <div key={i} className="flex items-start gap-3 mb-3">
                  <span
                    className="font-black text-xs shrink-0 w-6 h-6 flex items-center justify-center"
                    style={{ background: PALETTE.base, border: B, color: PALETTE.teal }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-xs font-bold leading-snug" style={{ color: PALETTE.muted }}>{text}</p>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
