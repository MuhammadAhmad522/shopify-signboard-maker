import React from 'react';
import { useStore, type MaterialType } from '../../store/useStore';
import { UI } from '../../constants/constants';

export const MaterialSelector: React.FC = () => {
  const { 
    faceColor, setFaceColor, 
    sideColor, setSideColor,
    faceMaterial, setFaceMaterial,
    sideMaterial, setSideMaterial
  } = useStore();

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className={UI.LABEL_STYLE}>Face Color</label>
          <input 
            type="color" 
            value={faceColor} 
            onChange={(e) => setFaceColor(e.target.value)} 
            className="w-full h-10 bg-transparent border border-white/20 rounded cursor-pointer" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={UI.LABEL_STYLE}>Side Color</label>
          <input 
            type="color" 
            value={sideColor} 
            onChange={(e) => setSideColor(e.target.value)} 
            className="w-full h-10 bg-transparent border border-white/20 rounded cursor-pointer" 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className={UI.LABEL_STYLE}>Face Material</label>
          <select 
            value={faceMaterial} 
            onChange={(e) => setFaceMaterial(e.target.value as MaterialType)}
            className="w-full bg-neutral-900 border border-white/20 rounded p-2 text-white text-sm outline-none focus:border-cyan-400"
          >
            <option value="acrylic">Acrylic</option>
            <option value="metal">Metal</option>
            <option value="wood">Wood</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className={UI.LABEL_STYLE}>Side Material</label>
          <select 
            value={sideMaterial} 
            onChange={(e) => setSideMaterial(e.target.value as MaterialType)}
            className="w-full bg-neutral-900 border border-white/20 rounded p-2 text-white text-sm outline-none focus:border-cyan-400"
          >
            <option value="metal">Metal</option>
            <option value="acrylic">Acrylic</option>
            <option value="wood">Wood</option>
          </select>
        </div>
      </div>
    </div>
  );
};
