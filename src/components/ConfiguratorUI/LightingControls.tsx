import React from 'react';
import { useStore } from '../../store/useStore';
import { UI } from '../../constants/constants';

const OptionButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-2 rounded text-xs font-bold transition-all ${
      active 
        ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] border-transparent' 
        : 'bg-transparent border border-white/20 text-white hover:bg-white/10'
    }`}
  >
    {children}
  </button>
);

export const LightingControls: React.FC = () => {
  const { frontlightEnabled, backlightEnabled, setLighting, mountingStyle, setMountingStyle } = useStore();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className={UI.LABEL_STYLE}>Lighting Style</label>
        <div className="flex gap-2">
          <OptionButton active={frontlightEnabled} onClick={() => setLighting(!frontlightEnabled, backlightEnabled)}>FRONT</OptionButton>
          <OptionButton active={backlightEnabled} onClick={() => setLighting(frontlightEnabled, !backlightEnabled)}>BACK</OptionButton>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={UI.LABEL_STYLE}>Mounting</label>
        <div className="flex gap-2">
          <OptionButton active={mountingStyle === 'flush'} onClick={() => setMountingStyle('flush')}>FLUSH</OptionButton>
          <OptionButton active={mountingStyle === 'bolt'} onClick={() => setMountingStyle('bolt')}>BOLT</OptionButton>
        </div>
      </div>
    </div>
  );
};
