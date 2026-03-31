import React from 'react';
import { useStore, type MaterialType } from '../../store/useStore';
import { UI } from '../../constants/constants';

export const MaterialSelector: React.FC = () => {
  const faceColor = useStore(state => state.faceColor);
  const setFaceColor = useStore(state => state.setFaceColor);
  const sideColor = useStore(state => state.sideColor);
  const setSideColor = useStore(state => state.setSideColor);
  const faceMaterial = useStore(state => state.faceMaterial);
  const setFaceMaterial = useStore(state => state.setFaceMaterial);
  const sideMaterial = useStore(state => state.sideMaterial);
  const setSideMaterial = useStore(state => state.setSideMaterial);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="face-color" className={UI.LABEL_STYLE}>Face Color</label>
          <input 
            id="face-color"
            type="color" 
            value={faceColor} 
            onChange={(e) => setFaceColor(e.target.value)} 
            className="w-full h-10 bg-transparent border border-white/20 rounded cursor-pointer" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="side-color" className={UI.LABEL_STYLE}>Side Color</label>
          <input 
            id="side-color"
            type="color" 
            value={sideColor} 
            onChange={(e) => setSideColor(e.target.value)} 
            className="w-full h-10 bg-transparent border border-white/20 rounded cursor-pointer" 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="face-material" className={UI.LABEL_STYLE}>Face Material</label>
          <select 
            id="face-material"
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
          <label htmlFor="side-material" className={UI.LABEL_STYLE}>Side Material</label>
          <select 
            id="side-material"
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
