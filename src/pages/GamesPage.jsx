import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Clock, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const FEATURED = {
  title: 'Market Crash Master',
  difficulty: 'Medium',
  duration: '15 mins',
  reward: 500,
  description: 'Navigate the stock market through a simulated crash and come out on top.',
  color: '#8B5CF6',
};

const MINI_GAMES = [
  { id: 'hangman',   name: 'Hangman',          icon: '🪢', color: '#00D4C8', xp: 20  },
  { id: 'budget',    name: 'Budget Builder',   icon: '👛', color: '#F97316', xp: 30  },
  { id: 'invest',    name: 'Invest Quest',     icon: '📈', color: '#8B5CF6', xp: 40  },
  { id: 'tax',       name: 'Tax Escape',       icon: '📄', color: '#B8F400', xp: 25  },
  { id: 'realestate',name: 'Real Estate',      icon: '🏠', color: '#F97316', xp: 50  },
];

const TABS = ['Recent', 'Games', 'Favorites'];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.3, ease: 'easeOut' },
});

export default function GamesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Games');
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen pb-24" style={{ background: '#0A0A1A', color: '#F4F4F4' }}>

      {/* ── Sticky Header ── */}
      <div
        className="sticky top-0 z-20 px-4 pt-4 pb-3"
        style={{ background: 'rgba(10,10,26,0.92)', backdropFilter: 'blur(10px)', borderBottom: '2px solid #1e1e3a' }}
      >
        {/* Search row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: '#566C86' }} />
            <input
              type="text"
              placeholder="Search games…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full text-sm font-medium pl-9 pr-4 py-2.5 rounded-xl outline-none transition-colors"
              style={{
                background: '#12123A',
                border: '2px solid #1e1e3a',
                color: '#F4F4F4',
              }}
            />
          </div>
          <button
            className="relative p-2.5 rounded-xl shrink-0"
            style={{ background: '#12123A', border: '2px solid #1e1e3a', color: '#7B8DB0' }}
          >
            <Bell size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-xl text-sm font-black transition-all"
              style={{
                background: activeTab === tab ? '#8B5CF6' : 'transparent',
                color: activeTab === tab ? '#fff' : '#566C86',
                border: activeTab === tab ? '2px solid #7C3AED' : '2px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-8">

        {/* ── Featured Game ── */}
        <motion.div {...fade(0)}>
          <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#566C86' }}>
            Featured
          </p>
          <div
            className="rounded-2xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
            style={{ border: '2px solid #2a2a4a', boxShadow: '4px 4px 0 #000' }}
            onClick={() => navigate('/app/games/quiz')}
          >
            {/* Art area */}
            <div
              className="h-44 relative flex items-end p-5"
              style={{ background: `linear-gradient(135deg, ${FEATURED.color}33, ${FEATURED.color}99)` }}
            >
              <span
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black"
                style={{ background: '#B8F400', color: '#0A0A1A' }}
              >
                Featured Game
              </span>
              {/* Simple illustrative shapes */}
              <div className="absolute right-8 top-6 flex gap-3 opacity-80">
                <div className="w-16 h-20 rounded-t-2xl" style={{ background: '#F97316', border: '2px solid rgba(0,0,0,0.3)' }} />
                <div className="w-12 h-14 rounded-t-2xl" style={{ background: '#B8F400', border: '2px solid rgba(0,0,0,0.3)' }} />
                <div className="w-16 h-16 rounded-t-2xl" style={{ background: '#00D4C8', border: '2px solid rgba(0,0,0,0.3)' }} />
              </div>
            </div>

            {/* Info row */}
            <div
              className="p-5 flex items-end justify-between gap-4"
              style={{ background: '#12123A' }}
            >
              <div>
                <h2 className="text-lg font-black mb-1">{FEATURED.title}</h2>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#7B8DB0' }}>
                  {FEATURED.description}
                </p>
                <div className="flex items-center gap-4 text-xs font-bold" style={{ color: '#566C86' }}>
                  <span>{FEATURED.difficulty}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {FEATURED.duration}</span>
                  <span className="flex items-center gap-1 text-yellow-400">🪙 +{FEATURED.reward}</span>
                </div>
              </div>
              <button
                className="shrink-0 px-6 py-3 rounded-xl font-black text-sm transition-all hover:brightness-110"
                style={{ background: FEATURED.color, color: '#fff', boxShadow: '3px 3px 0 #000', minWidth: 90 }}
              >
                Play
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Mini Games ── */}
        <motion.div {...fade(0.1)}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: '#566C86' }}>
              Mini-Games
            </p>
            <button className="text-xs font-bold flex items-center gap-0.5" style={{ color: '#00D4C8' }}>
              See all <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
            {MINI_GAMES.map((game, i) => (
              <motion.button
                key={game.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => navigate('/app/games/quiz')}
                className="shrink-0 snap-start flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:-translate-y-1"
                style={{
                  background: '#12123A',
                  border: '2px solid #1e1e3a',
                  width: 100,
                  boxShadow: '3px 3px 0 #000',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: `${game.color}22`, border: `2px solid ${game.color}44` }}
                >
                  {game.icon}
                </div>
                <p className="text-xs font-black text-center leading-tight">{game.name}</p>
                <span className="text-xs font-bold flex items-center gap-0.5" style={{ color: '#B8F400' }}>
                  <Zap size={10} fill="currentColor" /> +{game.xp} XP
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── How to Play ── Clean, Neutral Info Section ── */}
        <motion.div {...fade(0.2)}>
          <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#566C86' }}>
            How it Works
          </p>
          <div className="flex flex-col gap-3">
            {[
              { n: '01', text: 'Pick a game from the library and tap Play.' },
              { n: '02', text: 'Answer questions correctly to earn XP and Coins.' },
              { n: '03', text: 'Climb the leaderboard and unlock new chapters.' },
            ].map(({ n, text }) => (
              <div
                key={n}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: '#12123A', border: '2px solid #1e1e3a' }}
              >
                <span className="text-2xl font-black shrink-0" style={{ color: '#2a2a4a' }}>{n}</span>
                <p className="text-sm font-medium leading-snug" style={{ color: '#7B8DB0' }}>{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
