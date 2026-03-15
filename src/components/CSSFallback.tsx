import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { UNITS } from '../constants/constants';
import { AlucobondBase } from './Rendering/AlucobondBase';
import { ExtrudedTextLayer } from './Rendering/ExtrudedTextLayer';

export const CSSFallback: React.FC = () => {
  const { 
    text, faceColor, sideColor, pattiWidth, 
    glowColor, backlightEnabled, backgroundImage,
    showBase, baseWidth, baseHeight, baseDepth, baseColor,
    fontSize, textAlign
  } = useStore();
  
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      setRotation(prev => ({
        x: prev.x - deltaY * 0.5,
        y: prev.y + deltaX * 0.5
      }));

      setOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));

      setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, lastMousePos]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const pattiWidthFt = pattiWidth * UNITS.MM_TO_FT;
  const layers = Math.max(2, Math.floor(pattiWidthFt * 200)); 
  const lines = (text || ' ').split('\n');

  // Map textAlign to flexbox align-items
  const flexAlign = textAlign === 'center' ? 'items-center' : textAlign === 'right' ? 'items-end' : 'items-start';

  return (
    <div 
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden cursor-move select-none"
      onMouseDown={handleMouseDown}
      style={{
        background: backgroundImage ? `url(${backgroundImage}) center/cover no-repeat` : '#111',
        perspective: UNITS.PERSPECTIVE
      }}
    >
      <div className="absolute top-4 right-4 bg-orange-500/20 text-orange-400 border border-orange-500/50 px-4 py-2 rounded text-sm font-bold backdrop-blur-sm z-50 pointer-events-none shadow-lg">
        WebGL Disabled - CSS 3D Fallback Mode
      </div>
      
      <div 
        className={`relative transition-transform duration-75 ease-out flex flex-col ${flexAlign} justify-center`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `translate(${offset.x}px, ${offset.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          fontSize: `${fontSize * UNITS.FT_TO_REM}rem`
        }}
      >
        <AlucobondBase 
          showBase={showBase}
          baseWidth={baseWidth}
          baseHeight={baseHeight}
          baseDepth={baseDepth}
          baseColor={baseColor}
          scale={UNITS.FT_TO_REM}
        />

        <div className="flex flex-col gap-4" style={{ transformStyle: 'preserve-3d', textAlign }}>
          {lines.map((line, lineIdx) => (
            <ExtrudedTextLayer 
              key={lineIdx}
              line={line}
              layers={layers}
              faceColor={faceColor}
              sideColor={sideColor}
              glowColor={glowColor}
              backlightEnabled={backlightEnabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
