import React from 'react';
import { useStore } from '../../store/useStore';
import { UI } from '../../constants/constants';

export const BaseSettings: React.FC = () => {
  const { 
    showBase, setShowBase, 
    baseWidth, baseHeight, baseDepth, setBaseDimensions,
    baseColor, setBaseColor 
  } = useStore();

  return (
    <div className="flex flex-col gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex justify-between items-center">
        <label className={UI.LABEL_STYLE}>Alucobond Base</label>
        <button 
          onClick={() => setShowBase(!showBase)}
          className={`px-3 py-1 rounded-full text-[10px] font-bold ${UI.TRANSITION} ${
            showBase ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white'
          }`}
        >
          {showBase ? 'ON' : 'OFF'}
        </button>
      </div>

      {showBase && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Base Width: {baseWidth}ft</label>
            <input type="range" min="1" max="20" step="0.5" value={baseWidth} onChange={(e) => setBaseDimensions(parseFloat(e.target.value), baseHeight, baseDepth)} className={UI.ACCENT_COLOR} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Base Height: {baseHeight}ft</label>
            <input type="range" min="0.5" max="15" step="0.5" value={baseHeight} onChange={(e) => setBaseDimensions(baseWidth, parseFloat(e.target.value), baseDepth)} className={UI.ACCENT_COLOR} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Base Thickness: {baseDepth.toFixed(0)}mm</label>
            <input type="range" min="1" max="20" step="1" value={baseDepth} onChange={(e) => setBaseDimensions(baseWidth, baseHeight, parseFloat(e.target.value))} className={UI.ACCENT_COLOR} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Base Color</label>
            <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-full h-8 bg-transparent border border-white/20 rounded cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};
