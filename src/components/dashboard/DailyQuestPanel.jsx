import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

const B    = '3px solid #000';
const SH   = '5px 5px 0 #000';

const PALETTE = {
  base:   '#1A1A2E',
  lime:   '#B8F400',
  text:   '#F4F4F4',
  muted:  '#94A3B8',
};

const useMidnightCountdown = () => {
  const getSecondsLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  };
  const [secs, setSecs] = useState(getSecondsLeft);
  useEffect(() => { const t = setInterval(() => setSecs(getSecondsLeft()), 1000); return () => clearInterval(t); }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const DailyQuestPanel = () => {
  const countdown = useMidnightCountdown();

  return (
    <div
      style={{
        background: PALETTE.lime,
        border: B,
        boxShadow: SH,
      }}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between px-5 py-3" style={{ background: '#000', borderBottom: B }}>
        <div className="flex items-center gap-2">
          <Zap size={16} color={PALETTE.lime} fill={PALETTE.lime} />
          <span className="font-black text-xs uppercase tracking-widest" style={{ color: PALETTE.lime }}>DAILY QUEST</span>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: PALETTE.muted }}>
          <Clock size={14} />
          <span className="font-bold text-xs">{countdown}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black uppercase tracking-tight text-center mb-5" style={{ color: '#000' }}>
          Budget Basics
        </h3>

        {/* CTA */}
        <button
          className="w-full py-4 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5"
          style={{
            background: '#000',
            color: PALETTE.lime,
            border: B,
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
          }}
        >
          Start Quest →
        </button>
      </div>
    </div>
  );
};

export default DailyQuestPanel;
