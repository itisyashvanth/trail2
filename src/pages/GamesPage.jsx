import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Clock, Zap, ChevronRight, TrendingUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── design tokens matching the app's dark system ── */
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

const MINI_GAMES = [
  { id: 'hangman',    name: 'Hangman',        icon: '🪢', color: T.teal,   xp: 20, difficulty: 'Easy',   time: '5 min'  },
  { id: 'budget',     name: 'Budget Builder', icon: '👛', color: T.orange, xp: 30, difficulty: 'Easy',   time: '8 min'  },
  { id: 'invest',     name: 'Invest Quest',   icon: '📈', color: T.violet, xp: 40, difficulty: 'Medium', time: '12 min' },
  { id: 'tax',        name: 'Tax Escape',     icon: '📄', color: T.lime,   xp: 25, difficulty: 'Easy',   time: '6 min'  },
  { id: 'realestate', name: 'Real Estate',    icon: '🏠', color: T.orange, xp: 50, difficulty: 'Hard',   time: '15 min' },
  { id: 'crypto',     name: 'Crypto Myth',    icon: '₿',  color: T.violet, xp: 35, difficulty: 'Medium', time: '10 min' },
];

const CATEGORIES = ['All', 'Budgeting', 'Investing', 'Saving', 'Tax'];
const TABS = ['Recent', 'Games', 'Favorites'];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.3, ease: 'easeOut' },
});

const card = {
  background: 'rgba(18,10,45,0.95)',
  border: `1px solid rgba(139,92,246,0.2)`,
  borderRadius: 16,
  backdropFilter: 'blur(14px)',
};

export default function GamesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Games');
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = MINI_GAMES.filter(g =>
    (activeCategory === 'All' || true) &&
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen px-4 md:px-8 pt-8 pb-24" style={{ background: T.bg, maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Page Header ── */}
      <motion.div {...fade(0)} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-black text-3xl" style={{ color: T.text }}>Game Library</h1>
          <p className="text-sm mt-1" style={{ color: T.textSub }}>Pick a challenge and earn XP</p>
        </div>
        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: T.muted }} />
            <input
              type="text"
              placeholder="Search games…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-sm pl-9 pr-4 py-2.5 rounded-xl outline-none w-56 transition-all"
              style={{ background: T.surface, border: `1px solid ${T.surfaceBorder}`, color: T.text }}
            />
          </div>
          <button
            className="relative p-2.5 rounded-xl transition-all hover:bg-white/10"
            style={{ background: T.surface, border: `1px solid ${T.surfaceBorder}`, color: T.textSub }}
          >
            <Bell size={18} />
          </button>
        </div>
      </motion.div>

      {/* ── Tabs ── */}
      <motion.div {...fade(0.05)} className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: T.surface }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-5 py-2 rounded-lg text-sm font-bold transition-all"
            style={{
              background: activeTab === tab ? T.violet : 'transparent',
              color: activeTab === tab ? '#fff' : T.muted,
            }}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* ── Main 2-column layout ── */}
      <div className="flex gap-8 items-start">

        {/* ── Left Column: Featured + Mini-games grid ── */}
        <div className="flex-1 flex flex-col gap-8 min-w-0">

          {/* Featured Game — full-width hero card */}
          <motion.div {...fade(0.1)}>
            <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: T.muted }}>Featured</p>
            <div
              className="rounded-2xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.01]"
              style={{ ...card, boxShadow: '0 0 40px rgba(139,92,246,0.15)' }}
              onClick={() => navigate('/app/games/quiz')}
            >
              <div className="flex">
                {/* Left: art area */}
                <div
                  className="relative w-72 shrink-0 flex items-end p-6"
                  style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(0,212,200,0.2))', minHeight: 220 }}
                >
                  <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black"
                    style={{ background: T.lime, color: '#0A0A1A' }}
                  >
                    ⚡ Featured
                  </span>
                  {/* Illustrative shapes */}
                  <div className="absolute right-4 top-8 flex gap-2 opacity-70">
                    <div className="w-12 h-20 rounded-t-xl" style={{ background: T.orange, border: '2px solid rgba(0,0,0,0.2)' }} />
                    <div className="w-10 h-14 rounded-t-xl" style={{ background: T.lime, border: '2px solid rgba(0,0,0,0.2)' }} />
                    <div className="w-12 h-16 rounded-t-xl" style={{ background: T.teal, border: '2px solid rgba(0,0,0,0.2)' }} />
                  </div>
                  <div className="flex gap-1 mt-auto">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} fill={T.lime} color={T.lime} />
                    ))}
                  </div>
                </div>

                {/* Right: details */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-black mb-2" style={{ color: T.text }}>Market Crash Master</h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: T.textSub }}>
                      Navigate a simulated stock market crash. Buy low, sell high, and protect your portfolio before time runs out.
                    </p>
                    <div className="flex items-center gap-6 text-sm font-bold" style={{ color: T.muted }}>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ background: T.orange }} />
                        Medium
                      </span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> 15 mins</span>
                      <span className="flex items-center gap-1.5" style={{ color: '#FFCD75' }}>🪙 +500 coins</span>
                      <span className="flex items-center gap-1.5" style={{ color: T.lime }}>
                        <Zap size={14} fill="currentColor" /> +120 XP
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <button
                      className="px-8 py-3 rounded-xl font-black text-sm transition-all hover:brightness-110"
                      style={{ background: T.violet, color: '#fff', boxShadow: '4px 4px 0 rgba(0,0,0,0.4)' }}
                    >
                      ▶  Play Now
                    </button>
                    <button
                      className="px-5 py-3 rounded-xl font-bold text-sm transition-all hover:bg-white/10"
                      style={{ border: `1px solid ${T.surfaceBorder}`, color: T.textSub }}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category filter + Mini-game grid */}
          <motion.div {...fade(0.2)}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-black tracking-widest uppercase" style={{ color: T.muted }}>All Games</p>
              <div className="flex gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: activeCategory === cat ? `${T.violet}33` : 'transparent',
                      color: activeCategory === cat ? T.violet : T.muted,
                      border: `1px solid ${activeCategory === cat ? T.violet : T.surfaceBorder}`,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((game, i) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(0,0,0,0.4)` }}
                  onClick={() => navigate('/app/games/quiz')}
                  className="relative text-left p-5 rounded-2xl flex flex-col gap-4 transition-all"
                  style={{ ...card }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                    style={{ background: `${game.color}20`, border: `2px solid ${game.color}30` }}
                  >
                    {game.icon}
                  </div>

                  <div>
                    <p className="font-black text-base mb-1" style={{ color: T.text }}>{game.name}</p>
                    <div className="flex items-center gap-3 text-xs font-bold" style={{ color: T.muted }}>
                      <span>{game.difficulty}</span>
                      <span>·</span>
                      <span>{game.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black flex items-center gap-1" style={{ color: T.lime }}>
                      <Zap size={12} fill="currentColor" /> +{game.xp} XP
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: `${game.color}20`, color: game.color }}
                    >
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right Sidebar: stats + how it works ── */}
        <div className="hidden lg:flex flex-col gap-5 shrink-0" style={{ width: 280 }}>
          <div className="sticky top-20 flex flex-col gap-5">

            {/* Your progress card */}
            <motion.div {...fade(0.15)} style={{ ...card, padding: 20 }}>
              <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: T.muted }}>Your Progress</p>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Games Played', value: '3', color: T.teal },
                  { label: 'Total XP Earned', value: '0', color: T.lime },
                  { label: 'Coins', value: '4,200', color: '#FFCD75' },
                  { label: 'Win Rate', value: '0%', color: T.violet },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: T.textSub }}>{label}</span>
                    <span className="font-black text-sm" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Daily Challenge */}
            <motion.div
              {...fade(0.2)}
              style={{ ...card, padding: 20, border: `1px solid ${T.teal}33` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎯</span>
                <p className="text-sm font-black" style={{ color: T.text }}>Daily Challenge</p>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: T.textSub }}>
                Complete "Budget Builder" today for a 2× XP bonus.
              </p>
              <div className="h-2 rounded-full mb-3" style={{ background: T.surfaceBorder }}>
                <div className="h-full rounded-full w-0" style={{ background: `linear-gradient(90deg,${T.teal},${T.lime})` }} />
              </div>
              <button
                className="w-full py-2.5 rounded-xl font-black text-sm transition-all hover:brightness-110"
                style={{ background: T.teal, color: '#0A0A1A', boxShadow: `3px 3px 0 rgba(0,0,0,0.3)` }}
                onClick={() => navigate('/app/games/quiz')}
              >
                Start Challenge
              </button>
            </motion.div>

            {/* How it works — muted, secondary */}
            <motion.div {...fade(0.25)} style={{ padding: 20 }}>
              <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: T.muted }}>How it Works</p>
              <div className="flex flex-col gap-3">
                {[
                  'Pick a game and tap Play.',
                  'Answer correctly to earn XP & Coins.',
                  'Unlock new chapters on the Path.',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-black text-xs shrink-0 mt-0.5" style={{ color: T.surfaceBorder }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-xs leading-snug" style={{ color: T.muted }}>{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
