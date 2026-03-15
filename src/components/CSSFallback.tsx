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
    baseColor,
    fontSize,
    textAlign
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

  const layers = Math.max(2, Math.floor(pattiWidthFt * 200)); 
  const baseLayers = Math.max(1, Math.floor(baseDepthFt * 200));

  const lines = (text || ' ').split('\n');

  // Scale factor: mapping Three.js units (relative to fontSize in feet) to CSS rem
  const scale = 6; 

  // Map textAlign to flexbox align-items
  const flexAlign = textAlign === 'center' ? 'items-center' : textAlign === 'right' ? 'items-end' : 'items-start';

  return (
    <div 
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      style={{
        background: backgroundImage ? `url(${backgroundImage}) center/cover no-repeat` : '#111',
        perspective: '2000px' // Increased perspective for multiple lines
      }}
    >
      <div className="absolute top-4 right-4 bg-orange-500/20 text-orange-400 border border-orange-500/50 px-4 py-2 rounded text-sm font-bold backdrop-blur-sm z-50 pointer-events-none shadow-lg">
        WebGL Disabled - CSS 3D Fallback Mode
      </div>
      
      <div 
        className={`relative transition-transform duration-75 ease-out flex flex-col ${flexAlign} justify-center`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          fontSize: `${fontSize * 6}rem` // Dynamic font size in rem
        }}
      >
        {/* Alucobond Base Rendering */}
        {showBase && (
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
        )}

        {/* Lines Rendering Container */}
        <div className="flex flex-col gap-4" style={{ transformStyle: 'preserve-3d', textAlign }}>
          {lines.map((line, lineIdx) => (
            <div key={lineIdx} className="relative" style={{ transformStyle: 'preserve-3d' }}>
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
          ))}
        </div>
      </div>
    </div>
  );
};
