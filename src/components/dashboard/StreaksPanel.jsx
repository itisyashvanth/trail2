import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const B    = '3px solid #000';
const SH   = '5px 5px 0 #000';

const PALETTE = {
  base:   '#1A1A2E',
  orange: '#F97316',
  text:   '#F4F4F4',
  muted:  '#94A3B8',
};

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const StreaksPanel = ({ currentStreak = 0 }) => {
  // For brand new user: all days inactive
  const ACTIVE = Array(7).fill(false);

  return (
    <div
      className="p-6"
      style={{
        background: PALETTE.base,
        border: B,
        boxShadow: SH,
      }}
    >
      {/* Header: streak count */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-black text-xs uppercase tracking-widest" style={{ color: PALETTE.orange }}>
            Current Streak
          </p>
          <div className="flex items-end gap-2 mt-1">
            <span className="font-black" style={{ fontSize: 48, color: PALETTE.text, lineHeight: 1 }}>
              {currentStreak}
            </span>
            <span className="font-bold text-sm mb-1.5" style={{ color: PALETTE.muted }}>days</span>
          </div>
        </div>
        <div className="w-14 h-14 flex items-center justify-center" style={{ background: '#000', border: B }}>
          <Flame size={28} color={PALETTE.orange} fill={PALETTE.orange} />
        </div>
      </div>

      {/* Day tiles */}
      <div className="flex justify-between items-center px-4 py-4 mb-6" style={{ background: '#000', border: B }}>
        {DAYS.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase" style={{ color: PALETTE.muted }}>{day}</span>
            <div style={{
              width: 24, height: 24,
              border: B,
              background: ACTIVE[i] ? PALETTE.orange : '#2a2a4a',
            }} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        className="w-full py-4 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5"
        style={{
          background: PALETTE.orange,
          color: '#000',
          border: B,
          boxShadow: '4px 4px 0 #000',
        }}
      >
        Start Lesson →
      </button>
    </div>
  );
};

export default StreaksPanel;
