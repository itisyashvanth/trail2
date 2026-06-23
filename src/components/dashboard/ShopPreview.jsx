import React from 'react';
import { ShoppingBag, Coins } from 'lucide-react';

const B    = '3px solid #000';
const SH   = '5px 5px 0 #000';

const PALETTE = {
  base:   '#1A1A2E',
  gold:   '#FFCD75',
  text:   '#F4F4F4',
  muted:  '#94A3B8',
};

const ShopPreview = ({ coins = 0, onBrowse }) => {
  return (
    <div 
      className="p-6"
      style={{
        background: PALETTE.base,
        border: B,
        boxShadow: SH,
      }}
    >
      <div className="flex items-center justify-between mb-5">
         <p className="font-black text-xs uppercase tracking-widest" style={{ color: PALETTE.gold }}>Item Shop</p>
         <div className="flex items-center gap-1.5 px-2 py-1" style={{ background: '#000', border: '2px solid #000' }}>
           <Coins size={14} color={PALETTE.gold} />
           <span className="font-black text-xs" style={{ color: PALETTE.gold }}>{coins}</span>
         </div>
      </div>
      
      <div className="flex justify-center mb-6">
         <div className="w-16 h-16 flex items-center justify-center"
           style={{ background: PALETTE.gold, border: B, boxShadow: '4px 4px 0 #000' }}>
           <ShoppingBag size={32} color="#000" />
         </div>
      </div>
      
      <button 
        onClick={onBrowse}
        className="w-full py-4 font-black uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5"
        style={{
          background: PALETTE.gold,
          color: '#000',
          border: B,
          boxShadow: '4px 4px 0 #000',
        }}
      >
        Browse Store →
      </button>
    </div>
  );
};

export default ShopPreview;
