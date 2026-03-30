import React, { useState, useEffect } from 'react';
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

export const TextEditor: React.FC = () => {
  const { text, setText, textAlign, setTextAlign } = useStore();
  const [localText, setLocalText] = useState(text);

  useEffect(() => {
    if (text !== localText) {
      setLocalText(text);
    }
  }, [text]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localText !== text) {
        setText(localText);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [localText, text, setText]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className={UI.LABEL_STYLE}>Signage Text</label>
        <textarea 
          className="w-full bg-white/10 border border-white/20 rounded p-2.5 text-white outline-none focus:border-cyan-400 transition-colors resize-none h-24 text-sm"
          value={localText} 
          onChange={(e) => setLocalText(e.target.value)} 
          placeholder="Enter text..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={UI.LABEL_STYLE}>Line Alignment</label>
        <div className="flex gap-2">
          <OptionButton active={textAlign === 'left'} onClick={() => setTextAlign('left')}>LEFT</OptionButton>
          <OptionButton active={textAlign === 'center'} onClick={() => setTextAlign('center')}>CENTER</OptionButton>
          <OptionButton active={textAlign === 'right'} onClick={() => setTextAlign('right')}>RIGHT</OptionButton>
        </div>
      </div>
    </div>
  );
};
