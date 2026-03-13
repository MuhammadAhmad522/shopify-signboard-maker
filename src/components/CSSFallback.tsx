import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

export const CSSFallback: React.FC = () => {
  const { text, faceColor, sideColor, pattiWidth, glowColor, backlightEnabled, backgroundImage } = useStore();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * -40;
      setRotation({ x: y, y: x });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const layers = Math.max(2, Math.floor(pattiWidth * 20));
  const displayText = text || ' ';

  return (
    <div 
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      style={{
        background: backgroundImage ? `url(${backgroundImage}) center/cover no-repeat` : '#111',
        perspective: '1000px'
      }}
    >
      <div className="absolute top-4 right-4 bg-orange-500/20 text-orange-400 border border-orange-500/50 px-4 py-2 rounded text-sm font-bold backdrop-blur-sm z-50 pointer-events-none shadow-lg">
        WebGL Disabled - CSS 3D Fallback Mode
      </div>
      
      <div 
        className="relative transition-transform duration-75 ease-out"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
        }}
      >
        {/* Invisible sizing element */}
        <div className="text-8xl md:text-[12rem] font-bold whitespace-nowrap opacity-0 pointer-events-none">
          {displayText}
        </div>

        {/* Backlight Glow */}
        {backlightEnabled && (
          <div 
            className="absolute inset-0 flex items-center justify-center text-8xl md:text-[12rem] font-bold whitespace-nowrap blur-3xl opacity-60"
            style={{ 
              color: glowColor, 
              transform: 'translateZ(-10px)' 
            }}
          >
            {displayText}
          </div>
        )}
        
        {/* 3D Extrusion Layers */}
        {Array.from({ length: layers }).map((_, i) => {
          const isFace = i === layers - 1;
          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center text-8xl md:text-[12rem] font-bold whitespace-nowrap"
              style={{
                color: isFace ? faceColor : sideColor,
                transform: `translateZ(${i * 2}px)`,
                WebkitTextStroke: isFace ? 'none' : `3px ${sideColor}`,
              }}
            >
              {displayText}
            </div>
          );
        })}
      </div>
    </div>
  );
};
