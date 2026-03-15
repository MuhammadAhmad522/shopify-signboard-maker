import React from 'react';
import { useStore } from '../../store/useStore';
import { UI } from '../../constants/constants';

export const MeasurementGroup: React.FC = () => {
  const { fontSize, setFontSize, pattiWidth, setPattiWidth } = useStore();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className={UI.LABEL_STYLE}>
          Font Size (Letter Height): {fontSize.toFixed(1)}ft
        </label>
        <input 
          type="range" 
          min="0.5" max="10" step="0.5" 
          value={fontSize} 
          onChange={(e) => setFontSize(parseFloat(e.target.value))}
          className={UI.ACCENT_COLOR}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={UI.LABEL_STYLE}>
          Extrusion (Patti): {pattiWidth.toFixed(0)}mm
        </label>
        <input 
          type="range" 
          min="1" max="100" step="1" 
          value={pattiWidth} 
          onChange={(e) => setPattiWidth(parseFloat(e.target.value))}
          className={UI.ACCENT_COLOR}
        />
      </div>
    </div>
  );
};
