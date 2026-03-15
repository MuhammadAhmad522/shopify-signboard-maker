import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

export const CSSFallback: React.FC = () => {
  const { 
    text, 
    faceColor, 
    sideColor, 
    pattiWidth, 
    glowColor, 
    backlightEnabled, 
    backgroundImage,
    showBase,
    baseWidth,
    baseHeight,
    baseDepth,
    baseColor
  } = useStore();
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

  // Conversion factor: 1 ft = 304.8 mm
  const mmToFt = 1 / 304.8;
  const pattiWidthFt = pattiWidth * mmToFt;
  const baseDepthFt = baseDepth * mmToFt;

  const layers = Math.max(2, Math.floor(pattiWidthFt * 200)); // Increased multiplier for mm precision
  const baseLayers = Math.max(1, Math.floor(baseDepthFt * 200));
  const displayText = text || ' ';

  // Scale factor: mapping Three.js units (relative to fontSize in feet) to CSS rem
  const scale = 6; 

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
        className="relative transition-transform duration-75 ease-out flex items-center justify-center"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
        }}
      >
        {/* Alucobond Base Rendering */}
        {showBase && (
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'translateZ(0px)' // Attached directly to the back of the text
            }}
          >
            {/* Create depth for the base using layers */}
            {Array.from({ length: baseLayers }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-lg shadow-2xl transition-all duration-300"
                style={{
                  width: `${baseWidth * scale}rem`,
                  height: `${baseHeight * scale}rem`,
                  backgroundColor: baseColor,
                  transform: `translateZ(${i * -1}px)`, // Extrude backwards (reduced gap per layer)
                  border: '1px solid rgba(255,255,255,0.1)',
                  filter: i === 0 ? 'brightness(1.2)' : `brightness(${1 - (i * 0.1)})`
                }}
              />
            ))}
          </div>
        )}

        {/* Invisible sizing element to maintain layout */}
        <div className="text-8xl md:text-[12rem] font-bold whitespace-nowrap opacity-0 pointer-events-none">
          {displayText}
        </div>

        {/* Backlight Glow */}
        {backlightEnabled && (
          <div 
            className="absolute inset-0 flex items-center justify-center text-8xl md:text-[12rem] font-bold whitespace-nowrap blur-3xl opacity-60"
            style={{ 
              color: glowColor, 
              transform: 'translateZ(-5px)' 
            }}
          >
            {displayText}
          </div>
        )}
        
        {/* 3D Extrusion Layers for Text */}
        {Array.from({ length: layers }).map((_, i) => {
          const isFace = i === layers - 1;
          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center text-8xl md:text-[12rem] font-bold whitespace-nowrap"
              style={{
                color: isFace ? faceColor : sideColor,
                transform: `translateZ(${i * 1}px)`, // Thinner stacks for better mm feel
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
