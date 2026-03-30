import React from 'react';
import { useStore, type MaterialType, type FaceDesign } from '../../store/useStore';
import { UI } from '../../constants/constants';

export const MaterialSelector: React.FC = () => {
  const { 
    faceColor, setFaceColor, 
    sideColor, setSideColor,
    faceMaterial, setFaceMaterial,
    sideMaterial, setSideMaterial,
    faceDesign, setFaceDesign,
    hasCollarPatti, setHasCollarPatti
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
            <option value="stainless_steel">Stainless Steel</option>
            <option value="metal_steel">Metal Steel</option>
            <option value="metal">Metal</option>
            <option value="aluminium">Aluminium</option>
            <option value="wooden">Wooden</option>
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
            <option value="acrylic">Acrylic</option>
            <option value="stainless_steel">Stainless Steel</option>
            <option value="metal_steel">Metal Steel</option>
            <option value="metal">Metal</option>
            <option value="aluminium">Aluminium</option>
            <option value="wooden">Wooden</option>
            <option value="wood">Wood</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className={UI.LABEL_STYLE}>Face Design</label>
          <select 
            value={faceDesign} 
            onChange={(e) => setFaceDesign(e.target.value as FaceDesign)}
            className="w-full bg-neutral-900 border border-white/20 rounded p-2 text-white text-sm outline-none focus:border-cyan-400"
          >
            <option value="none">None</option>
            <option value="stars">Stars</option>
            <option value="dots">Dots</option>
            <option value="holes">Holes</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className={UI.LABEL_STYLE}>Collar Patti</label>
          <button
            onClick={() => setHasCollarPatti(!hasCollarPatti)}
            className={`w-full py-2 rounded text-xs font-bold transition-all ${
              hasCollarPatti 
                ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] border-transparent' 
                : 'bg-transparent border border-white/20 text-white hover:bg-white/10'
            }`}
          >
            {hasCollarPatti ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>
    </div>
  );
};
