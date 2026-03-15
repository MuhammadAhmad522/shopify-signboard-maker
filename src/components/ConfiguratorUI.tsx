import React from 'react';
import { useStore } from '../store/useStore';
import { TextEditor } from './ConfiguratorUI/TextEditor';
import { MeasurementGroup } from './ConfiguratorUI/MeasurementGroup';
import { MaterialSelector } from './ConfiguratorUI/MaterialSelector';
import { LightingControls } from './ConfiguratorUI/LightingControls';
import { BaseSettings } from './ConfiguratorUI/BaseSettings';

export const ConfiguratorUI: React.FC = () => {
  const { setBackgroundImage } = useStore();

  const handleAddToCart = () => {
    alert('Adding to Shopify Cart!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setBackgroundImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full w-80 bg-black/85 text-white p-6 overflow-y-auto border-r border-white/10 backdrop-blur-lg shadow-2xl flex flex-col gap-6 flex-shrink-0 relative z-10">
      <h2 className="text-cyan-400 text-xl font-bold tracking-widest uppercase m-0">3D Configurator</h2>

      <TextEditor />
      <MeasurementGroup />
      <MaterialSelector />
      <LightingControls />
      <BaseSettings />

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
