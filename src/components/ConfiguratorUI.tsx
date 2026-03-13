import React from 'react';
import { useStore, type MaterialType } from '../store/useStore';

export const ConfiguratorUI: React.FC = () => {
  const {
    text, setText,
    pattiWidth, setPattiWidth,
    faceColor, setFaceColor,
    faceMaterial, setFaceMaterial,
    sideColor, setSideColor,
    sideMaterial, setSideMaterial,
    mountingStyle, setMountingStyle,
    frontlightEnabled, backlightEnabled, setLighting,
    showBase, setShowBase,
    baseWidth, baseHeight, baseDepth, setBaseDimensions,
    baseColor, setBaseColor,
    setBackgroundImage
  } = useStore();

  const handleAddToCart = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const screenshot = canvas.toDataURL('image/png');
      console.log('Capturing Screenshot:', screenshot.substring(0, 50));
      alert('Adding to Shopify Cart!');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setBackgroundImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const OptionButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button 
      onClick={onClick}
      className={`flex-1 py-2 rounded text-xs font-bold transition-all ${
        active 
          ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] border-transparent' 
          : 'bg-transparent border border-white/20 text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="h-full w-80 bg-black/85 text-white p-6 overflow-y-auto border-r border-white/10 backdrop-blur-lg shadow-2xl flex flex-col gap-6 flex-shrink-0 relative z-10">
      <h2 className="text-cyan-400 text-xl font-bold tracking-widest uppercase m-0">3D Configurator</h2>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Signage Text</label>
        <input 
          className="w-full bg-white/10 border border-white/20 rounded p-2.5 text-white outline-none focus:border-cyan-400 transition-colors"
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">
          Width (Extrusion): {pattiWidth.toFixed(1)}m
        </label>
        <input 
          type="range" 
          min="0.1" max="2" step="0.1" 
          value={pattiWidth} 
          onChange={(e) => setPattiWidth(parseFloat(e.target.value))}
          className="w-full accent-cyan-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Face Color</label>
          <div className="relative">
            <input 
              type="color" 
              value={faceColor} 
              onChange={(e) => setFaceColor(e.target.value)} 
              className="w-full h-10 bg-transparent border border-white/20 rounded cursor-pointer" 
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Side Color</label>
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
          <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Face Material</label>
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
          <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Side Material</label>
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

      <div className="flex flex-col gap-2">
        <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Lighting Style</label>
        <div className="flex gap-2">
          <OptionButton active={frontlightEnabled} onClick={() => setLighting(!frontlightEnabled, backlightEnabled)}>FRONT</OptionButton>
          <OptionButton active={backlightEnabled} onClick={() => setLighting(frontlightEnabled, !backlightEnabled)}>BACK</OptionButton>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Mounting</label>
        <div className="flex gap-2">
          <OptionButton active={mountingStyle === 'flush'} onClick={() => setMountingStyle('flush')}>FLUSH</OptionButton>
          <OptionButton active={mountingStyle === 'bolt'} onClick={() => setMountingStyle('bolt')}>BOLT</OptionButton>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
        <div className="flex justify-between items-center">
          <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Alucobond Base</label>
          <button 
            onClick={() => setShowBase(!showBase)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              showBase ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white'
            }`}
          >
            {showBase ? 'ON' : 'OFF'}
          </button>
        </div>

        {showBase && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Base Width: {baseWidth}m</label>
              <input type="range" min="1" max="15" step="0.5" value={baseWidth} onChange={(e) => setBaseDimensions(parseFloat(e.target.value), baseHeight, baseDepth)} className="w-full accent-cyan-400" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Base Height: {baseHeight}m</label>
              <input type="range" min="0.5" max="10" step="0.5" value={baseHeight} onChange={(e) => setBaseDimensions(baseWidth, parseFloat(e.target.value), baseDepth)} className="w-full accent-cyan-400" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Base Thickness: {baseDepth}m</label>
              <input type="range" min="0.05" max="0.5" step="0.05" value={baseDepth} onChange={(e) => setBaseDimensions(baseWidth, baseHeight, parseFloat(e.target.value))} className="w-full accent-cyan-400" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-neutral-500 uppercase tracking-wider">Base Color</label>
              <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-full h-8 bg-transparent border border-white/20 rounded cursor-pointer" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Wall Preview</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageUpload} 
          className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-400/10 file:text-cyan-400 hover:file:bg-cyan-400/20 cursor-pointer" 
        />
      </div>

      <button 
        onClick={handleAddToCart}
        className="mt-4 w-full py-4 bg-cyan-400 text-black rounded-lg font-bold tracking-widest hover:bg-cyan-300 transition-colors shadow-[0_5px_20px_rgba(0,229,255,0.3)]"
      >
        ADD TO CART
      </button>
    </div>
  );
};
