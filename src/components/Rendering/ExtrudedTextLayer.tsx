import React from 'react';

interface ExtrudedTextLayerProps {
  line: string;
  layers: number;
  faceColor: string;
  sideColor: string;
  glowColor: string;
  backlightEnabled: boolean;
}

export const ExtrudedTextLayer: React.FC<ExtrudedTextLayerProps> = ({
  line, layers, faceColor, sideColor, glowColor, backlightEnabled
}) => {
  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      {/* Invisible sizing element */}
      <div className="font-bold whitespace-nowrap opacity-0 pointer-events-none">
        {line || ' '}
      </div>

      {/* Backlight Glow */}
      {backlightEnabled && (
        <div 
          className="absolute inset-0 flex items-center justify-center font-bold whitespace-nowrap blur-3xl opacity-60 pointer-events-none"
          style={{ 
            color: glowColor, 
            transform: 'translateZ(-5px)' 
          }}
        >
          {line || ' '}
        </div>
      )}
      
      {/* 3D Extrusion Layers for Text */}
      {Array.from({ length: layers }).map((_, i) => {
        const isFace = i === layers - 1;
        return (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center font-bold whitespace-nowrap pointer-events-none"
            style={{
              color: isFace ? faceColor : sideColor,
              transform: `translateZ(${i * 1}px)`,
              WebkitTextStroke: isFace ? 'none' : `3px ${sideColor}`,
            }}
          >
            {line || ' '}
          </div>
        );
      })}
    </div>
  );
};
