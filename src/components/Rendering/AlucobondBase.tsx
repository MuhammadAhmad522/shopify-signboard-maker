import React from 'react';
import { UNITS } from '../../constants/constants';

interface AlucobondBaseProps {
  showBase: boolean;
  baseWidth: number;
  baseHeight: number;
  baseDepth: number;
  baseColor: string;
  scale: number;
}

export const AlucobondBase: React.FC<AlucobondBaseProps> = ({
  showBase, baseWidth, baseHeight, baseDepth, baseColor, scale
}) => {
  if (!showBase) return null;

  const baseLayers = Math.max(1, Math.floor(baseDepth * UNITS.MM_TO_FT * 200));

  return (
    <div 
      className="absolute flex items-center justify-center pointer-events-none"
      style={{ 
        transformStyle: 'preserve-3d',
        transform: 'translateZ(0px)' 
      }}
    >
      {Array.from({ length: baseLayers }).map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-lg shadow-2xl transition-all duration-300"
          style={{
            width: `${baseWidth * scale}rem`,
            height: `${baseHeight * scale}rem`,
            backgroundColor: baseColor,
            transform: `translateZ(${i * -1}px)`,
            border: '1px solid rgba(255,255,255,0.1)',
            filter: i === 0 ? 'brightness(1.2)' : `brightness(${1 - (i * 0.1)})`
          }}
        />
      ))}
    </div>
  );
};
